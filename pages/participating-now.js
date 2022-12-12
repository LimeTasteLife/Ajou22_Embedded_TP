import Link from 'next/link';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Mainbarstyles from '../styles/mainbar.module.css';
import Buttonstyle from '../styles/button.module.css';
// import InfobarStyle from "../styles/mainbar.module.css";

import { gameManagerAddress } from '../config';
import GameManager from '../artifacts/contracts/GameManager.sol/GameManager.json';

//생성한 게임 중에 gameId가 동일한 것들을 보여주고 그 게임들의 설정을 바꿀 수 있어야 함
export default function Participatingnow({ props }) {
<<<<<<< HEAD
  const [games, setGames] = useState([]);
  useEffect(() => {
    loadGames();
  }, [games]);
  const router = useRouter();

  async function loadGames() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      gameManagerAddress,
      GameManager.abi,
      signer
    );
    const data = await contract.viewMyParticipatingGames();
    console.log(data);
    const items = await Promise.all(
      data.map(async (i) => {
        let prize = ethers.utils.formatUnits(i.prize.toString(), 'ether');
        let joinAmount = ethers.utils.formatUnits(
          i.joinAmount.toString(),
          'ether'
        );
        let betAmount = ethers.utils.formatUnits(
          i.betAmount.toString(),
          'ether'
        );
        let item = {
          title: i.gameName,
          gameId: i.gameId,
          startAt: i.startAt,
          finishAt: i.finishAt,
          prize: prize,
          joinFeeAmount: joinAmount,
          betFeeAmount: betAmount,
          gameStatus: i.gameStatus,
        };
        return item;
      })
    );
    if (items[0].prize == 0) {
      setGames([]);
    } else {
      setGames(items);
    }
  }
=======
  //함수 자체를 그 함수 내 const로 반환해서 사용 가능
  // const list = App();
  // console.log(list);

  //모든 게임 list받아와서 gameId 체크하여 선별적으로 다시 usrgames라는 list에 재 저장한 후 출력해주기
  // const usrgames = ();

  // useEffect( ()=> {

  // }, [usrgames])

  ///임시로 설정
  const [games, setGames] = useState([
    {
      gameId: "dolor",
      startAt: 20245664,
      finishAt: 20240207,
      prize: 5402,
      joinFeeAmount: 563,
      betFeeAmount: 353,
    },
    {
      gameId: "libero",
      startAt: 20222348,
      finishAt: 20241048,
      prize: 4555,
      joinFeeAmount: 681,
      betFeeAmount: 301,
    },
    {
      gameId: "curabitur",
      startAt: 20221002,
      finishAt: 20244849,
      prize: 4611,
      joinFeeAmount: 611,
      betFeeAmount: 334,
    },
    {
      gameId: "adipiscing",
      startAt: 20230503,
      finishAt: 20231667,
      prize: 7847,
      joinFeeAmount: 977,
      betFeeAmount: 368,
    },
    {
      gameId: "curabitur",
      startAt: 20221523,
      finishAt: 20226040,
      prize: 2411,
      joinFeeAmount: 578,
      betFeeAmount: 319,
    },
    {
      gameId: "turpis",
      startAt: 20233506,
      finishAt: 20226659,
      prize: 4588,
      joinFeeAmount: 953,
      betFeeAmount: 318,
    },
    {
      gameId: "pede",
      startAt: 20244991,
      finishAt: 20223622,
      prize: 3057,
      joinFeeAmount: 504,
      betFeeAmount: 395,
    },
    {
      gameId: "donec",
      startAt: 20221038,
      finishAt: 20222078,
      prize: 6687,
      joinFeeAmount: 716,
      betFeeAmount: 302,
    },
    {
      gameId: "risus",
      startAt: 20234988,
      finishAt: 20235937,
      prize: 5129,
      joinFeeAmount: 608,
      betFeeAmount: 436,
    },
    {
      gameId: "vitae",
      startAt: 20237872,
      finishAt: 20246296,
      prize: 6473,
      joinFeeAmount: 583,
      betFeeAmount: 426,
    },
    {
      gameId: "aliquam",
      startAt: 20222496,
      finishAt: 20226160,
      prize: 2565,
      joinFeeAmount: 793,
      betFeeAmount: 428,
    },
    {
      gameId: "in",
      startAt: 20234844,
      finishAt: 20245116,
      prize: 2662,
      joinFeeAmount: 890,
      betFeeAmount: 339,
    },
    {
      gameId: "mauris",
      startAt: 20250111,
      finishAt: 20222029,
      prize: 5571,
      joinFeeAmount: 669,
      betFeeAmount: 488,
    },
    {
      gameId: "sem",
      startAt: 20244767,
      finishAt: 20221120,
      prize: 1332,
      joinFeeAmount: 899,
      betFeeAmount: 447,
    },
    {
      gameId: "a",
      startAt: 20249734,
      finishAt: 20248090,
      prize: 5605,
      joinFeeAmount: 773,
      betFeeAmount: 321,
    },
  ]);
>>>>>>> e3d56dd005aa429cfaf5ea2729207d120375c8c2

  return (
    <div className="w-4/5 h-full px-10">
      <div className="w-full h-20">
        <h1 className="text-4xl font-bold p-6 rounded-3xl bg-yellow-400 mr-16">
          참가중인 경기 목록
        </h1>
      </div>
      {/* <span className="text-7xl">💬</span> */}
      {/* 게임 정보(넣어야함) */}
      <div className="w-full h-full" id="명단 큰 상자">
        <div className="table w-1/5 h-10 font-semibold rounded-xl bg-yellow-600 text-left mt-6 px-10 pt-2 mr-16">
          참여 경기 목록
        </div>
        <div
          className="rounded-xl bg-yellow-900 w-3/4 h-4/6 p-5 m-5 overflow-y-auto absolute"
          id="명단 큰 상자 아랫 부분"
        >
          {games.map((game, i) => (
            <div
              key={i}
              // className="border shadow rounded-xl overflow-hidden"
            >
              {/* 링크 넘어가면서 정보 전달해주면 됨 - Link의 경우, 다른 props전달 못하니 a태그나 router 이용 */}
              <Link href="../participating-info">
                <div className={Mainbarstyles.mainbarwrap}>
                  <div
                    className={`${Mainbarstyles.bar} ${'w-full px-10 py-4'}`}
                  >
                    <div
                      style={{ height: '32px' }}
                      className="text-l font-semibold"
                    >
                      주최자 : {game.gameId}
                    </div>
                    <div
                      style={{ height: '32px' }}
                      className="text-l font-semibold"
                    >
                      게임 시작 : {game.startAt}
                    </div>
                    <div
                      style={{ height: '32px' }}
                      className="text-l font-semibold"
                    >
                      게임 종료 : {game.finishAt}
                    </div>
                    <div
                      style={{ height: '32px' }}
                      className="text-l font-semibold"
                    >
                      상금 : {game.prize} ETH
                    </div>
                    <div
                      style={{ height: '32px' }}
                      className="text-l font-semibold"
                    >
                      참가비 : {game.joinFeeAmount} ETH
                    </div>
                    <div
                      style={{ height: '32px' }}
                      className="text-l font-semibold"
                    >
                      베팅비 : {game.betFeeAmount} ETH
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// <div className="w-full h-20">
// <h1 className="text-4xl mb-5 font-bold p-6">Game Management</h1>
// </div>
// {/* <span className="text-7xl">💬</span> */}
// {/* 게임 정보(넣어야함) */}
// <div className="w-full h-full" id="명단 큰 상자">
// <div className="w-full h-full text-left py-6 px-10">주최 게임 목록</div>
// </div>

// <div className="w-full h-full" id="명단 큰 상자">
// <div className="w-full h-40 bg-gray-500" id="명단 큰 상자 아랫 부분">
//   <div className="w-full px-10 py-4 ">
//     <Inforbar className="w-full h-full">받아올 정보</Inforbar>
//   </div>

//   <div className="w-full px-10 py-4">
//     <Inforbar className="w-full h-full">받아올 정보</Inforbar>
//   </div>

//   <div className="w-full px-10 py-4 ">
//     <Inforbar className="w-full h-full">받아올 정보</Inforbar>
//   </div>

//   <div className="w-full px-10 py-4">
//     <Inforbar className="w-full h-full">받아올 정보</Inforbar>
//   </div>
// </div>

// <div className="w-full h-20">
//   <div className="w-1/2 float-left p-10 h-full">
//     <div className="w-full text-center">
//       <Link href={"./temphome"}>
//         <div className={`${Buttonstyle.btncyan} ${"w-1/3"}`}>
//           취소하기
//           {/* (어디로 돌아가며, 어떻게 설정할지 생각 X) */}
//         </div>
//       </Link>
//     </div>
//   </div>
// </div>

// <div className="w-full h-20">
//   <div className="w-1/2 float-left p-10 h-full">
//     <div className="w-full text-center">
//       <Link href={"./manage-game"}>
//         <div className={`${Buttonstyle.btnred} ${"w-1/3"}`}>
//           마감하기
//           {/* (어디로 돌아가며, 어떻게 설정할지 생각 X) */}
//         </div>
//       </Link>
//     </div>
//   </div>
// </div>
// </div>
