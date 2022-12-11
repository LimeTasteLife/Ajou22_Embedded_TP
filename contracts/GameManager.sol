// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "./ProcessBase.sol";

//import "./testGet.sol";

contract GameManager is GameProcess {
    function registration(string memory _userId) public {
        require(!searchUser(msg.sender), "Already user");

        User memory _user = User({userAddress: msg.sender, gameNick: _userId});
        users.push(_user);
        addressToUserNick[_user.userAddress] = _user;
        emit Registration(msg.sender, _user.gameNick);
    }

    function makeGame(
        uint256 _gameId,
        string memory _gameName,
        uint256 _startAt,
        uint256 _finishAt,
        uint _joinFeeAmount,
        uint _betFeeAmount
    ) public payable {
        require(searchUser(msg.sender), "Not user");
        require(_gameId == uint256(uint64(_gameId)), "GameId overflow");
        require(
            _startAt == uint256(uint64(_startAt)),
            "Start timestamp overflow"
        );
        require(
            _finishAt == uint256(uint64(_finishAt)),
            "Finish timestamp overflow"
        );
        require(!searchGame(_gameId), "No exist game");

        gameList[uint64(_gameId)].maker = msg.sender;
        gameList[uint64(_gameId)].gameId = uint32(_gameId);
        gameList[uint64(_gameId)].gameName = _gameName;
        gameList[uint64(_gameId)].startAt = uint8(_startAt);
        gameList[uint64(_gameId)].finishAt = uint8(_finishAt);
        gameList[uint64(_gameId)].prize = uint64(msg.value);
        gameList[uint64(_gameId)].joinAmount = uint64(_joinFeeAmount);
        gameList[uint64(_gameId)].betAmount = uint64(_betFeeAmount);
        gameList[uint64(_gameId)].totalJoin = 0;
        gameList[uint64(_gameId)].totalBet = 0;
        gameList[uint64(_gameId)].gameStatus = GameStatus.Open;
        gameList[uint64(_gameId)].winner = 0;
        gameList[uint64(_gameId)].betList.push(Bet(address(0), 0, 0));

        games.push(gameList[uint64(_gameId)]);

        emit MakeGame(_gameId, _startAt, _finishAt);
    }

    function cancelGame(uint256 _gameId) public {
        require(
            msg.sender == gameList[uint64(_gameId)].maker,
            "Not game maker"
        );
        require(
            gameList[uint64(_gameId)].gameStatus == GameStatus.Open,
            "Game is not open"
        );

        uint _prize = gameList[uint64(_gameId)].prize;
        gameList[uint64(_gameId)].prize = 0;

        payable(msg.sender).transfer(_prize);

        givePrize(_gameId);
        removeGame(_gameId, gameList[uint64(_gameId)]);
    }

    function closeJoin(uint256 _gameId) public {
        require(
            msg.sender == gameList[uint64(_gameId)].maker,
            "Not game maker"
        );
        require(
            gameList[uint64(_gameId)].gameStatus == GameStatus.Open,
            "Game is not open"
        );
        _closeJoin(_gameId);
    }

    function startGame(uint256 _gameId) public {
        require(
            msg.sender == gameList[uint64(_gameId)].maker,
            "Not game maker"
        );
        require(
            gameList[uint64(_gameId)].gameStatus == GameStatus.Settled,
            "Game is not settled"
        );
        _startGame(_gameId);
    }

    function finishGame(uint256 _gameId) public {
        require(
            msg.sender == gameList[uint64(_gameId)].maker,
            "Not game maker"
        );
        require(
            gameList[uint64(_gameId)].gameStatus == GameStatus.OnAir,
            "Game is not on air"
        );
        _finishGame(_gameId);
    }

    function joinGame(uint256 _gameId, uint8 _team) public payable {
        require(searchUser(msg.sender), "Not user");
        require(
            gameList[uint64(_gameId)].gameStatus == GameStatus.Open,
            "Game is not open"
        );
        require(
            searchPlayerIndex(msg.sender, _gameId) > 10,
            "Already in the game"
        );
        //중복참여 방지
        require(
            uint64(msg.value) == gameList[uint64(_gameId)].joinAmount,
            "Not enough joinamount"
        );

        bool suc = false;

        for (uint i = 0; i < 10; i++) {
            if (
                gameList[uint64(_gameId)].playerList[i].playerAddress ==
                address(0)
            ) {
                gameList[uint64(_gameId)].playerList[i].playerAddress = msg
                    .sender;
                gameList[uint64(_gameId)].playerList[i].team = _team;
                gameList[uint64(_gameId)].totalJoin += uint64(msg.value);
                suc = true;
                break;
            }
        }
        if (!suc) {
            require(false, "Game is full.");
        }
        refreshGame(_gameId);
    }

    //1 Ether = 1000000000000000000 wei 10^18

    function exitGame(uint256 _gameId) public {
        require(
            searchPlayerIndex(msg.sender, _gameId) <
                gameList[uint64(_gameId)].playerList.length,
            "Not in the game"
        );
        require(
            gameList[uint64(_gameId)].gameStatus == GameStatus.Open,
            "Game is not open"
        );

        uint playerIndex = searchPlayerIndex(msg.sender, uint64(_gameId));
        uint64 returnFee = gameList[uint64(_gameId)].joinAmount;

        payable(msg.sender).transfer(returnFee);

        gameList[uint64(_gameId)].joinAmount -= returnFee;

        delete gameList[uint64(_gameId)].playerList[playerIndex];
        refreshGame(_gameId);
    }

    function betting(uint256 _gameId, uint8 _team, uint n) public payable {
        require(searchUser(msg.sender), "Not user");
        require(
            searchPlayerIndex(msg.sender, _gameId) >
                gameList[uint64(_gameId)].playerList.length,
            "Player can't betting"
        );
        require(
            msg.sender != gameList[uint64(_gameId)].maker,
            "Maker can't betting"
        );
        require(
            gameList[uint64(_gameId)].gameStatus == GameStatus.Settled,
            "Game is not settled"
        );

        require(
            uint64(msg.value) ==
                gameList[uint64(_gameId)].betAmount * uint64(n),
            "Follow the betting unit price"
        );
        require(msg.value == uint(uint64(msg.value)), "msg.value overflow");

        uint _index = searchBettorIndex(msg.sender, _gameId);

        if (_index > gameList[uint64(_gameId)].betList.length)
            gameList[uint64(_gameId)].betList.push(
                Bet(msg.sender, _team, uint64(msg.value))
            );
        else {
            gameList[uint64(_gameId)].betList[_index].team = _team;
            gameList[uint64(_gameId)].betList[_index].betAmount += uint64(
                msg.value
            );
        }

        gameList[uint64(_gameId)].totalBet += uint64(msg.value);
        refreshGame(_gameId);
    }

    function exitBetting(uint256 _gameId) public {
        require(
            searchBettorIndex(msg.sender, _gameId) <
                gameList[uint64(_gameId)].betList.length,
            "Not bettor"
        );
        require(
            gameList[uint64(_gameId)].gameStatus == GameStatus.Settled,
            "Game is not settled"
        );

        Bet storage removeBet;

        uint _index = searchBettorIndex(msg.sender, _gameId);

        gameList[uint64(_gameId)].totalBet -= gameList[uint64(_gameId)]
            .betList[_index]
            .betAmount;
        payable(gameList[uint64(_gameId)].betList[_index].userAddress).transfer(
                gameList[uint64(_gameId)].betList[_index].betAmount
            );

        removeBet = gameList[uint64(_gameId)].betList[_index];
        gameList[uint64(_gameId)].betList[_index] = gameList[uint64(_gameId)]
            .betList[gameList[uint64(_gameId)].betList.length - 1];
        gameList[uint64(_gameId)].betList[
            gameList[uint64(_gameId)].betList.length - 1
        ] = removeBet;

        gameList[uint64(_gameId)].betList.pop();
        refreshGame(_gameId);
    }

    // join 가능한 게임 조회
    function joinableGame() public view returns (Game[] memory) {
        Game[] memory _joinable = new Game[](games.length);
        uint currentIndex = 0;

        for (uint i = 0; i < games.length; i++) {
            if (games[i].gameStatus == GameStatus.Open) {
                Game memory currentItem = games[i];
                _joinable[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return _joinable;
    }

    // betting 가능한 게임 조회
    function bettableGame() public view returns (Game[] memory) {
        Game[] memory _bettable = new Game[](games.length);
        uint currentIndex = 0;

        for (uint i = 0; i < games.length; i++) {
            if (games[i].gameStatus == GameStatus.Settled) {
                Game memory currentItem = games[i];
                _bettable[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return _bettable;
    }

    function viewGameInfo(uint64 _gameId) public view returns (Game memory) {
        return gameList[_gameId];
    }

    function viewMyMakingGames() public view returns (Game[] memory) {
        uint currentIndex = 0;
        uint myIndex = 0;

        for (uint i = 0; i < games.length; i++) {
            if (games[i].maker == msg.sender) {
                myIndex += 1;
            }
        }

        Game[] memory items = new Game[](myIndex);
        for (uint i = 0; i < games.length; i++) {
            if (games[i].maker == msg.sender) {
                Game memory currentItem = games[i];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }

        return items;
    }

    function viewMyParticipatingGames() public view returns (Game[] memory) {
        Game[] memory myParticipatingGames = new Game[](games.length);
        uint currentIndex = 0;

        for (uint i = 0; i < games.length; i++) {
            for (uint j = 0; j < 10; j++) {
                if (games[i].playerList[j].playerAddress == msg.sender) {
                    Game memory currentItem = games[i];
                    myParticipatingGames[currentIndex] = currentItem;
                    currentIndex += 1;
                    continue;
                }
            }
        }
        return myParticipatingGames;
    }

    function viewMyBettingGames()
        public
        view
        returns (Game[] memory, Bet[] memory)
    {
        Game[] memory myBettingGames = new Game[](games.length);
        Bet[] memory myBettings = new Bet[](10);
        uint currentIndex = 0;

        for (uint i = 0; i < games.length; i++) {
            for (uint j = 0; j < games[i].betList.length; j++) {
                if (games[i].betList[j].userAddress == msg.sender) {
                    Game memory currentGame = games[i];
                    Bet memory currentBet = games[i].betList[j];
                    myBettingGames[currentIndex] = currentGame;
                    myBettings[currentIndex] = currentBet;
                    currentIndex += 1;
                    continue;
                }
            }
        }
        return (myBettingGames, myBettings);
    }
}
