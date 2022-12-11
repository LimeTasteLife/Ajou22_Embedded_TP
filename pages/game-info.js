import Link from 'next/link';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import Inforbar from "../components/infobar";

import Buttonstyle from '../styles/button.module.css';
import InfobarStyle from '../styles/mainbar.module.css';
import Mainbarstyles from '../styles/mainbar.module.css';

import { gameManagerAddress } from '../config';
import GameManager from '../artifacts/contracts/GameManager.sol/GameManager.json';
import Web3Modal from 'web3modal';

export default function Gameinformation({ props }) {
  const [game, setGame] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    loadGame();
  }, [game]);
  const router = useRouter();
  //const로 처리하든 다른 곳에서 import해서 매개변수(props)에 넣든 처리해야함

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
    };
    console.log(data);

    setGame(item);
    setLoadingState('loaded');
  }

  async function participate1(e) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      gameManagerAddress,
      GameManager.abi,
      signer
    );

    const joinFee = ethers.utils.parseUnits(game.joinFeeAmount, 'ether');
    const joinGame = await contract.joinGame(game.gameId, 1, {
      value: joinFee,
    });
    await joinGame.wait();

    router.replace('/participating-now');
  }

  async function participate2(e) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      gameManagerAddress,
      GameManager.abi,
      signer
    );

    const joinFee = ethers.utils.parseUnits(game.joinFeeAmount, 'ether');
    const joinGame = await contract.joinGame(game.gameId, 2, {
      value: joinFee,
    });
    await joinGame.wait();

    router.replace('/participating-now');
  }

  if (loadingState === 'not-loaded')
    return <h1 className="px-20 py-10 text-3xl">No game info</h1>;
  return (
    <div className="flex h-full flex-col justify-center items-center">
      <h1 className="text-4xl mb-5 font-bold">게임 정보</h1>
      <div className="w-full px-10">{game.title}</div>
      <div className="w-full px-10">
        게임 시간
        <div type="bar" className={Mainbarstyles.bar}>
          <div type="bar" className={InfobarStyle.bar}>
            <div>
              <div>{game.startAt}</div>
              <div>{game.finishAt}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-10">
        상금
        <div type="bar" className={Mainbarstyles.bar}>
          <div type="bar" className={InfobarStyle.bar}>
            <div>
              <div>{game.prize}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full" id="명단 큰 상자">
        <div className="w-full h-auto" id="명단 큰 상자 윗 부분">
          <div className="w-1/2 h-5 text-center float-left pt-8">
            {game.playerList[0].playerAddress}
            {game.playerList[0].team}
          </div>
          <div className="w-1/2 h-5 text-center float-left pt-8">
            2팀 명단 내용
          </div>
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
                      <div>받아올 정보 ..(props.startAt) (props.finishAt)</div>
                      <div>(props.참가자)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-20">
          <div className="w-1/2 float-left p-10 h-full">
            <div className="w-full text-center">
              <div
                className={`${Buttonstyle.btnred} ${'w-1/3'}`}
                onClick={participate1}
              >
                게임참가 1팀
              </div>
              <div
                className={`${Buttonstyle.btnred} ${'w-1/3'}`}
                onClick={participate2}
              >
                게임참가 2팀
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-20">
          <div className="w-1/2 float-left p-10 h-full">
            <div className="w-full text-center">
              <Link href={'./'}>
                <div className={`${Buttonstyle.btncyan} ${'w-1/3'}`}>확인</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
