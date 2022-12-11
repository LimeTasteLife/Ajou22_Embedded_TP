// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract StructBase {
    User[] users;
    //유저 정보 배열

    Game[] games;
    //게임 정보 배열, 실질적인 Game 정보가 저장됨

    mapping(uint64 => Game) gameList;
    //Game 정보 바꿀 때 편하게 할라고
    //gameId => Game
    mapping(address => User) addressToUserNick;

    struct User {
        address userAddress;
        //유저 주소

        string gameNick;
        //유저 Id, 그냥 진짜 로그인용 id
    }

    struct Game {
        address maker;
        //게임 주최자 주소
        uint32 gameId;
        //게임 식별용 고유 Id
        string gameName;
        //게임 제목
        uint8 startAt;
        //시작 시간(공지용), 게임을 시작할 때 새로 갱신
        uint8 finishAt;
        //종료 시간(공지용), 게임을 종료할 때 새로 갱신
        uint64 prize;
        //주최자가 직접 넣는 상금
        uint64 totalJoin;
        //총 참가비 합산
        uint64 joinAmount;
        //1인당 참가비
        uint64 totalBet;
        //총 베팅금액
        uint64 betAmount;
        //최소 베팅금액
        GameStatus gameStatus;
        //게임 상태 enum(Open, Settled, onAir, Close)
        uint8 winner;
        //승팀 초기값: 0
        Bet[] betList;
        //해당 게임 Bettor들의 list
        Player[10] playerList;
        //해당 게임 Player들의 list
    }

    struct Bet {
        address userAddress;
        //베팅한 사람들의 주소

        uint8 team;
        //베팅한 팀

        uint64 betAmount;
        //베팅한 금액
    }

    struct Player {
        address playerAddress;
        //player의 주소

        uint8 team;
        //소속 팀
    }

    enum GameStatus {
        Open,
        //참가 가능, 베팅 불가

        Settled,
        //참가 불가, 베팅 가능

        OnAir,
        //게임 시작 이후, 종료 전

        Closed
        //게임 종료 이후
    }
}
