// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "./StructBase.sol";
import "./APIConsumer.sol";
import "./WinnerGet.sol";

contract ProcessBase is StructBase {
    event Registration(address eos, uint256 _gameId);
    event MakeGame(uint256 _gameId, uint256 _startAt, uint256 _finishAt);
    event StartGame(uint256 _gameId);
    event CancelGame(uint256 _gameId);
    event CloseJoin(uint256 _gameId);
    event FinishGame(uint256 _gameId);

    function searchPlayerIndex(
        address player,
        uint256 _gameId
    ) internal view returns (uint) {
        //Player의 index를 반환해주는 함수
        //Random Access용

        for (uint i = 0; i < 10; i++) {
            if (
                player == gameList[uint64(_gameId)].playerList[i].playerAddress
            ) {
                return i;
            }
        }
        return 100; //검색 실패
    }

    function searchBettorIndex(
        address bettor,
        uint256 _gameId
    ) internal view returns (uint) {
        //Bettor의 index를 반환해주는 함수
        //Random Access용

        for (uint i = 0; i < gameList[uint64(_gameId)].betList.length; i++) {
            if (bettor == gameList[uint64(_gameId)].betList[i].userAddress) {
                return i;
            }
        }
        return gameList[uint64(_gameId)].betList.length + 1;
    }

    function searchUser(address user) internal view returns (bool) {
        //해당 주소의 유저가 회원인지 참가중인지 확인해주는 함수

        for (uint i = 0; i < users.length; i++) {
            if (user == users[i].userAddress) {
                return true;
            }
        }
        return false;
    }

    function searchGame(uint256 gameId) internal view returns (bool) {
        //gameId로 게임이 존재하는지 확인해주는 함수
        //gameId 중복검사

        for (uint i = 0; i < games.length; i++) {
            if (uint64(gameId) == games[i].gameId) {
                return true;
            }
        }
        return false;
    }

    function searchPlayerNumber(uint256 _gameId) internal view returns (uint) {
        //참가중인 player들의 수 반환

        uint num = 0;
        for (uint i = 0; i < 10; i++) {
            if (
                gameList[uint64(_gameId)].playerList[i].playerAddress !=
                address(0)
            ) {
                num += 1;
            }
        }
        return num;
    }
}

contract GameProcess is ProcessBase {
    function _closeJoin(uint256 _gameId) internal {
        //게임의 Join을 종료시키고 Betting을 시작시킴
        //참가자 10명이 채워져야 종료가능

        require(searchPlayerNumber(_gameId) >= 10);

        gameList[uint64(_gameId)].gameStatus = GameStatus.Settled;
        emit CloseJoin(_gameId);
    }

    function _startGame(uint256 _gameId) internal {
        //게임의 Betting을 종료시키고 게임을 onAir상태로 변환
        //실행한 시간의 timestamp를 startAt에 저장

        gameList[uint64(_gameId)].startAt = block.timestamp;
        gameList[uint64(_gameId)].gameStatus = GameStatus.OnAir;
        emit StartGame(_gameId);
    }

    function _finishGame(uint256 _gameId) internal {
        //게임을 종료시키고 Closed 상태로 바꿈, finishAt에 현재 timestamp 저장
        //상금, 베팅금액 배분

        gameList[uint64(_gameId)].finishAt = block.timestamp;
        gameList[uint64(_gameId)].gameStatus = GameStatus.Closed;
        //whoIsWinner(_gameId);

        givePrize(_gameId);
        giveBet(_gameId);
        emit FinishGame(_gameId);
    }

    function givePrize(uint256 _gameId) internal {
        //상금 배분함수
        //playerList에 저장된 각 플레이어들의 팀을 검사해서
        //game 구조체의 winner값(1 or 2)와 team이 일치하는 플레이어에게
        //상금 ((prize + 총 참가비) / 이긴 팀 플레이어 수) 만큼 각각 지급
        //게임이 cancel되서 winner값이 0일 경우엔 모든 플레이어에게 참가비 반환

        uint8 winner = gameList[uint64(_gameId)].winner;
        uint totalPrize = gameList[uint64(_gameId)].totalJoin +
            gameList[uint64(_gameId)].prize;
        uint numofwinner = 0;

        gameList[uint64(_gameId)].totalJoin = 0;
        gameList[uint64(_gameId)].prize = 0;

        if (gameList[uint64(_gameId)].winner > 0) {
            for (uint i = 0; i < 10; i++) {
                if (gameList[uint64(_gameId)].playerList[i].team == winner) {
                    numofwinner += 1;
                }
            }
            for (uint i = 0; i < 10; i++) {
                if (gameList[uint64(_gameId)].playerList[i].team == winner)
                    payable(
                        gameList[uint64(_gameId)].playerList[i].playerAddress
                    ).transfer(totalPrize / numofwinner);
            }
        } else {
            gameList[uint64(_gameId)].totalJoin = 0;
            for (uint i = 0; i < 10; i++) {
                if (
                    gameList[uint64(_gameId)].playerList[i].playerAddress !=
                    address(0)
                )
                    payable(
                        gameList[uint64(_gameId)].playerList[i].playerAddress
                    ).transfer(gameList[uint64(_gameId)].joinAmount);
            }
        }
    }

    function giveBet(uint _gameId) internal {
        //베팅금액 배분
        //게임의 winner값(1 or 2)를 검사
        //해당 winner 팀에 해당하는 team 값을 가진 bettor들을
        //betList에서 찾아서 각각의 betAmount(베팅한 양)에
        //(양팀 총 베팅 값) / (이긴 팀의 총 베팅 값) = dividend(배율) 만큼 곱한값을
        //bettor들에게 지급
        //winner가 0일 경우(cancelGame)
        //betAmoun만큼 도로 반환

        uint amountofWinner = 0;
        uint dividend;
        uint _totalBet = gameList[uint64(_gameId)].totalBet;

        if (gameList[uint64(_gameId)].winner > 0) {
            for (
                uint i = 0;
                i < gameList[uint64(_gameId)].betList.length;
                i++
            ) {
                if (
                    gameList[uint64(_gameId)].betList[i].team ==
                    gameList[uint64(_gameId)].winner
                ) {
                    amountofWinner += gameList[uint64(_gameId)]
                        .betList[i]
                        .betAmount;
                }
            }

            dividend = _totalBet / amountofWinner;

            for (
                uint i = 0;
                i < gameList[uint64(_gameId)].betList.length;
                i++
            ) {
                if (
                    gameList[uint64(_gameId)].betList[i].team ==
                    gameList[uint64(_gameId)].winner
                ) {
                    payable(gameList[uint64(_gameId)].betList[i].userAddress)
                        .transfer(
                            gameList[uint64(_gameId)].betList[i].betAmount *
                                dividend
                        );
                    _totalBet -=
                        gameList[uint64(_gameId)].betList[i].betAmount *
                        dividend;
                }
            }
        } else {
            gameList[uint64(_gameId)].totalBet = 0;

            for (
                uint i = 0;
                i < gameList[uint64(_gameId)].betList.length;
                i++
            ) {
                payable(gameList[uint64(_gameId)].betList[i].userAddress)
                    .transfer(gameList[uint64(_gameId)].betList[i].betAmount);
            }
        }
    }

    function refreshGame(uint _gameId) internal {
        //다른 함수들에서 Game 정보를 바꿀 때
        //매핑을 통해서 우선 접근하므로
        //Game[] 배열의 값은 바뀌지가 않음
        //배열에 있는 값도 직접 바꿔주는 함수

        for (uint i = 0; i < games.length; i++) {
            if (games[i].gameId == _gameId) {
                games[i] = gameList[uint64(_gameId)];
            }
        }
    }

    function removeGame(uint _gameId, Game storage _game) internal {
        //Game[] 배열에 있는 값 삭제하는데
        //그냥 delete해버리면 중간중간에 빈 곳이 생기니깐
        //1. 배열 맨 끝에 저장된 Game과 지우려는 Game 위치를 바꿔줌
        //2. 배열.pop()
        //해주는 함수

        Game storage _removeGame;
        for (uint i = 0; i < games.length; i++) {
            if (games[i].gameId == _game.gameId) {
                _removeGame = games[i];
                games[i] = games[games.length - 1];
                games[games.length - 1] = _removeGame;
            }
        }

        games.pop();
        delete gameList[uint64(_gameId)];
    }

    function whoIsWinner(uint256 _gameId) internal {
        uint requestId = winnerCreateRequest(_gameId);
        string memory result = getWinnerRequestResult(requestId);

        gameList[uint64(_gameId)].winner = uint8(result[0]);
    }

    function getAuthId(string memory userId) internal {
        uint requiestId = authCreateRequest(userId);
        return getAuthRequestResult(requiestId);
    }

    /////////////////////////
    //      테스트용        //
    /////////////////////////
    function gameData(uint _gameId) public view returns (Game memory) {
        //gameId -> 게임 정보 불러옴

        return gameList[uint64(_gameId)];
    }

    function getUser() public view returns (User[] memory) {
        User[] memory _user = users;

        return _user;
    }

    function testWinner(uint256 _gameId, uint8 _team) public {
        //임의로 승팀 설정하는 함수

        gameList[uint64(_gameId)].winner = _team;
    }
}
