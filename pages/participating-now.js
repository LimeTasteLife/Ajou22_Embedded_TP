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

  async function participate(gameId) {
    router.replace({
      pathname: '/participating-info',
      query: { gameId: gameId },
    });
  }

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
              onClick={() => participate(game.gameId)}
            >
              {/* 링크 넘어가면서 정보 전달해주면 됨 - Link의 경우, 다른 props전달 못하니 a태그나 router 이용 */}
              <div className={Mainbarstyles.mainbarwrap}>
                <div className={`${Mainbarstyles.bar} ${'w-full px-10 py-4'}`}>
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
