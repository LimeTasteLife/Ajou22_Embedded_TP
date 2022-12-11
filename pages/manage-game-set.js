import Link from 'next/link';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Buttonstyle from '../styles/button.module.css';
import InfobarStyle from '../styles/mainbar.module.css';
import Mainbarstyles from '../styles/mainbar.module.css';

import { gameManagerAddress } from '../config';
import GameManager from '../artifacts/contracts/GameManager.sol/GameManager.json';

// 게임바(mainbar)를 클릭했을 때, 게임 정보를 받아와 표시해주는 페이지 - 게임참가/확인 기능 구현
export default function Gameinformation({ props }) {
  const [game, setGame] = useState([]);
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
      startAt: data.startAt,
      finishAt: data.finishAt,
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
      totalBet: ethers.utils.formatUnits(data.totalBet.toString(), 'ether'),
    };
    console.log(data);

    setGame(item);
    setLoadingState('loaded');
  }

  return (
    <div className="flex w-5/6 h-full flex-col justify-center items-center pl-6">
      <h1 className="text-4xl mb-5 font-bold">게임 관리</h1>
      <div className="w-full px-10">주최자: 받아올 정보</div>
      <div className="w-full px-10">
        <div type="bar" className={Mainbarstyles.bar}>
          <div type="bar" className={InfobarStyle.bar}>
            <div>
              <div>제목 : {game.title}</div>
              <div>시작 시간 : {game.startAt}</div>
              <div>종료 시간 : {game.finishAt}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-10 pt-5">
        상금
        <div type="bar" className={Mainbarstyles.bar}>
          <div type="bar" className={InfobarStyle.bar}>
            <div>
              <div>{game.prize} ETH</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full" id="명단 큰 상자">
        <div className="w-full h-auto" id="명단 큰 상자 윗 부분">
          <div className="w-1/2 h-5 text-center float-left pt-8">1팀 명단</div>
          <div className="w-1/2 h-5 text-center float-left pt-8">2팀 명단</div>
        </div>
        <div className="w-full h-auto" id="명단 큰 상자 아랫 부분">
          <div className="w-1/2 float-left px-10 pt-6 h-full">
            <div className="w-full h-full">
              <div type="bar" className={Mainbarstyles.bar}>
                <div type="bar" className={InfobarStyle.bar}>
                  <div>
                    <div>받아올 정보 ..(props.startAt) (props.finishAt)</div>
                    <div>(props.참가자)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 float-left px-10 pt-6 h-full">
            <div className="w-full h-full">
              <div type="bar" className={Mainbarstyles.bar}>
                <div type="bar" className={InfobarStyle.bar}>
                  <div>
                    <div>받아올 정보 ..(props.startAt) (props.finishAt)</div>
                    <div>(props.참가자)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full float-left px-4 pt-6 h-full">
            <div className="text-center">베팅 정보</div>
            <div
              className="w-full  px-6 float-left"
              id="1팀 베팅 비율/2팀 베팅 비율"
            >
              <div className="w-full h-full">
                <div type="bar" className={Mainbarstyles.bar}>
                  <div type="bar" className={InfobarStyle.bar}>
                    <div>
                      <div>베팅 참여 금액 : {game.betFeeAmount} ETH</div>
                      <div>총 베팅 금액 : {game.totalBet} ETH</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-20">
          <div className="w-1/2  float-left p-10 h-full">
            <div className="w-auto text-center">
              <Link href={'./manage-game'}>
                <div className={`${Buttonstyle.btnred} ${'w-1/3'}`}>
                  삭제하기
                  {/* (관리 리스트에서 해당 게임 제거 설정할지 생각 X) */}
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full h-20">
          <div className="w-1/2  float-left p-10 h-full">
            <div className="w-auto text-center">
              <Link href={'/manage-game'}>
                <div className={`${Buttonstyle.btncyan} ${'w-1/3'}`}>
                  돌아가기
                  {/* (어디로 돌아가며, 어떻게 설정할지 생각 X) */}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
