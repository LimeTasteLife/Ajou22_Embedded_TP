import Image from 'next/image';
import Link from 'next/link';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ParticipateStyle from '../styles/participate.module.css';
import Buttonstyle from '../styles/button.module.css';
import InfobarStyle from '../styles/mainbar.module.css';
import Mainbarstyles from '../styles/mainbar.module.css';

import { gameManagerAddress } from '../config';
import GameManager from '../artifacts/contracts/GameManager.sol/GameManager.json';

export default function participatinginfor() {
  const [game, setGame] = useState([]);
  const [userList, setUserList] = useState({
    team1: [],
    team2: [],
  });
  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    loadGame();
  }, [game]);
  const router = useRouter();

  async function loadGame() {
    const query = router.query;
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      gameManagerAddress,
      GameManager.abi,
      signer
    );
    const data = await contract.viewGameInfo(query.gameId);
    const item = {
      gameId: data.gameId,
      title: data.gameName,
      startAt: data.startAt.toString(),
      finishAt: data.finishAt.toString(),
      prize: ethers.utils.formatUnits(data.prize.toString(), 'ether'),
      joinFeeAmount: ethers.utils.formatUnits(
        data.joinAmount.toString(),
        'ether'
      ),
      betFeeAmount: ethers.utils.formatUnits(
        data.betAmount.toString(),
        'ether'
      ),
      gameStatus: data.gameStatus,
      playerList: data.playerList,
      betList: data.betList,
    };
    setGame(item);
    console.log(data);

    /*
    const users = Promise.all(
      item.playerList.map(async(i) => {
        const item = await contract.viewUserNick(i.playerAddress);
      })
    )
    */
    setLoadingState('loaded');
  }

  if (loadingState === 'not-loaded')
    return <h1 className="px-20 py-10 text-3xl">No game info</h1>;
  return (
    <div
      id="Participating Container"
      className={`${ParticipateStyle.participatebox} ${''}`}
    >
      <div id="시간 container" className={ParticipateStyle.time}>
        <span className="w-1/2"> 시작 시간: {game.startAt} </span>
        <span className="w-1/2 float-right">종료 시간: {game.finishAt}</span>
      </div>
      <div
        id="1팀 2팀 경쟁 화면"
        className={`${
          ParticipateStyle.beatscreen
        } ${'fixed w-300 justify-center'}`}
      >
        {/* m-auto 는 수평의 중앙으로 정렬하는 역할 */}
        <div
          id="1팀 2팀 명단"
          className={`${
            ParticipateStyle.betting
          } ${'fixed w-3/5 h-96 absolute m-auto'}`}
        >
          <Image
            src="/../public/images/3002220_93027_1044.png"
            alt=""
            layout="fill"
          />
        </div>
        <div id="1팀 2팀 명단 화면" className="w-full h-80 pt-4">
          <div className="w-full h-10 text-center">
            <div className="w-1/2 h-10 text-center float-left pt-4">
              1팀 명단
            </div>
            <div className="w-1/2 h-10 text-center float-left pt-4">
              2팀 명단
            </div>
          </div>
          <div>
            <div
              id="1팀 명단"
              className="bg-blue-400 w-2/5 h-64 float-left rounded-3xl overflow-y-auto mx-16"
            >
              <div className="bg-gray-600 h-12 mx-10 rounded-2xl px-2 pt-4 my-1 overflow-hidden">
                {game.playerList[0].playerAddress}
              </div>
              <div className="bg-gray-600 h-12 mx-10 rounded-2xl px-2 pt-4 my-1 overflow-hidden">
                {game.playerList[1].playerAddress}
              </div>
              <div className="bg-gray-600 h-12 mx-10 rounded-2xl px-2 pt-4 my-1 overflow-hidden">
                {game.playerList[2].playerAddress}
              </div>
              <div className="bg-gray-600 h-12 mx-10 rounded-2xl px-2 pt-4 my-1 overflow-hidden">
                {game.playerList[3].playerAddress}
              </div>
              <div className="bg-gray-600 h-12 mx-10 rounded-2xl px-2 pt-4 my-1 overflow-hidden">
                {game.playerList[4].playerAddress}
              </div>
            </div>
            <div
              id="2팀 명단"
              className="bg-red-500 w-2/5 h-64 float-right rounded-3xl overflow-y-auto mx-16"
            >
              <div className="bg-gray-600 h-12 mx-10 rounded-2xl px-2 pt-4 my-1 overflow-hidden">
                {game.playerList[5].playerAddress}
              </div>
              <div className="bg-gray-600 h-12 mx-10 rounded-2xl px-2 pt-4 my-1 overflow-hidden">
                {game.playerList[6].playerAddress}
              </div>
              <div className="bg-gray-600 h-12 mx-10 rounded-2xl px-2 pt-4 my-1 overflow-hidden">
                {game.playerList[7].playerAddress}
              </div>
              <div className="bg-gray-600 h-12 mx-10 rounded-2xl px-2 pt-4 my-1 overflow-hidden">
                {game.playerList[8].playerAddress}
              </div>
              <div className="bg-gray-600 h-12 mx-10 rounded-2xl px-2 pt-4 my-1 overflow-hidden">
                {game.playerList[9].playerAddress}
              </div>
            </div>
          </div>
        </div>

        <div id="상금 및 베팅 정보, 확인 및 나가기 버튼 container flex-col">
          <div id="상금 정보" className=" mx-16 pt-4">
            <div type="bar" className={Mainbarstyles.bar}>
              <div type="bar" className={InfobarStyle.bar}>
                <div>상금: {game.prize} ETH</div>
                <div>베팅 단위: {game.betFeeAmount} ETH</div>
              </div>
            </div>
          </div>

          {/* 베팅 이벤트 - 버튼 클릭 시 작동하도록 */}
          <div id="베팅 정보" className=" mx-16 py-3">
            <div className="flex flex-col">
              <div className="flex flex-row item-center">
                <div className="bg-black w-2/5 h-12 rounded-2xl pl-4 items-center flex">
                  <p>1팀 베팅 총액: (betting1) ETH</p>
                </div>
                <div className="w-1/5"></div>
                <div className="bg-black w-2/5 h-12 rounded-2xl pl-4 items-center flex">
                  <p>2팀 베팅 총액: (betting2) ETH</p>
                </div>
              </div>
              <div id="베팅 정보" className=" mx-16 py-3 flex flex-row">
                <div className="bg-black w-2/5 h-12 rounded-2xl pl-4 items-center flex">
                  1팀 베팅액: (betting1)
                  <button className="bg-blue-400 items-center p-2 flex rounded-full">
                    1팀 베팅취소
                  </button>
                </div>
                <div className="w-1/4"></div>
                <div className="bg-black w-2/5 h-12 rounded-2xl pl-4 items-center flex">
                  2팀 베팅액: (betting2)
                  <button className="bg-blue-400 items-center p-2 flex rounded-full">
                    2팀 베팅취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 확인 누르면 원래 homepage(임시로, temphome)으로 이동하도록 설정 */}
        <div className="w-full h-18 float-left">
          <div className="p-4 h-2/3">
            <div className="w-full text-center">
              <Link href={'/'}>
                <div className={`${Buttonstyle.btncyan} ${'w-1/5'}`}>확인</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
