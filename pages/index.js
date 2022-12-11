import Link from 'next/link';
import Image from 'next/image';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Mainbarstyles from '../styles/mainbar.module.css';

import { gameManagerAddress } from '../config';
import GameManager from '../artifacts/contracts/GameManager.sol/GameManager.json';

export default function Home() {
  const [games, setGames] = useState([]);
  const [gameState, setGameState] = useState('end');
  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    loadGames();
  }, [games]);
  const router = useRouter();

  async function loadGames() {
    /** provider 연결 없이 그냥 contract call 했더니 동작 안 했음. */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      gameManagerAddress,
      GameManager.abi,
      signer
    );
    const data = await contract.joinableGame();
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
    setGames(items);
    setLoadingState('loaded');
  }

  function gameInfo(gameId) {
    router.push({
      pathname: '/game-info',
      query: { gameId: gameId },
    });
  }

  return (
    <div className="w-3/4\">
      <div
        className="flex h-full flex-col items-center px-10"
        id="Game Management Container"
      >
        <div
          className="flex w-full flex-col items-center pt-3 px-5"
          id="Game Management Upper"
        >
          {/* 해당 페이지 제목 */}
          <div className="rounded-3xl bg-gray-400 w-full text-5xl font-bold py-3 px-5 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-xbox float-left"
              viewBox="0 0 16 16"
            >
              <path d="M7.202 15.967a7.987 7.987 0 0 1-3.552-1.26c-.898-.585-1.101-.826-1.101-1.306 0-.965 1.062-2.656 2.879-4.583C6.459 7.723 7.897 6.44 8.052 6.475c.302.068 2.718 2.423 3.622 3.531 1.43 1.753 2.088 3.189 1.754 3.829-.254.486-1.83 1.437-2.987 1.802-.954.301-2.207.429-3.239.33Zm-5.866-3.57C.589 11.253.212 10.127.03 8.497c-.06-.539-.038-.846.137-1.95.218-1.377 1.002-2.97 1.945-3.95.401-.417.437-.427.926-.263.595.2 1.23.638 2.213 1.528l.574.519-.313.385C4.056 6.553 2.52 9.086 1.94 10.653c-.315.852-.442 1.707-.306 2.063.091.24.007.15-.3-.319Zm13.101.195c.074-.36-.019-1.02-.238-1.687-.473-1.443-2.055-4.128-3.508-5.953l-.457-.575.494-.454c.646-.593 1.095-.948 1.58-1.25.381-.237.927-.448 1.161-.448.145 0 .654.528 1.065 1.104a8.372 8.372 0 0 1 1.343 3.102c.153.728.166 2.286.024 3.012a9.495 9.495 0 0 1-.6 1.893c-.179.393-.624 1.156-.82 1.404-.1.128-.1.127-.043-.148ZM7.335 1.952c-.67-.34-1.704-.705-2.276-.803a4.171 4.171 0 0 0-.759-.043c-.471.024-.45 0 .306-.358A7.778 7.778 0 0 1 6.47.128c.8-.169 2.306-.17 3.094-.005.85.18 1.853.552 2.418.9l.168.103-.385-.02c-.766-.038-1.88.27-3.078.853-.361.176-.676.316-.699.312a12.246 12.246 0 0 1-.654-.319Z" />
            </svg>
            <span className="font-sans font-semibold">Our Home Page</span>
          </div>
        </div>

        <div className="w-full" id="Game Management Lower">
          <div
            className="flex w-full"
            id="Game list Upper(옵션 - 역삼각형 클릭)"
          >
            <button
              className="rounded-full bg-gray-300 w-1/3 float-left p-3 text-center text-lg m-5 text-white font-semibold"
              //onclick 이벤트 추가
            >
              최근 순
            </button>
            <button className="rounded-full bg-gray-700 w-1/3 float-left p-3 text-center text-lg m-5 text-white font-semibold">
              상금 순
            </button>
            <button className="rounded-full bg-gray-900 w-1/3 float-left p-3 text-center text-lg m-5 text-white font-semibold">
              베팅금액 순
            </button>
          </div>

          <div
            className="rounded-xl bg-gray-200 w-3/4 h-4/6 p-5 m-5 overflow-y-auto absolute"
            id="Game list Lower(스크롤 포함)"
          >
            <div className={Mainbarstyles.mainbarwrap}>
              <div>
                {games.map((game, i) => (
                  <div
                    key={i}
                    // className="border shadow rounded-xl overflow-hidden"
                    onClick={() => gameInfo(game.gameId)}
                  >
                    <div className={Mainbarstyles.mainbarwrap}>
                      <div
                        className={`${Mainbarstyles.mainbarwrap} ${
                          game.gameStatus === 0 ? 'bg-blue-300 rounded-3xl' : ''
                        }
                          ${
                            game.gameStatus === 1
                              ? 'bg-pink-500 rounded-3xl'
                              : ''
                          }
                          ${
                            game.gameStatus === 2
                              ? 'bg-indigo-700 rounded-3xl '
                              : ''
                          }
                          ${
                            game.gameStatus === 3
                              ? 'bg-purple-700 rounded-3xl'
                              : ''
                          }`}
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
                          상금 : {game.prize}
                        </div>
                        <div
                          style={{ height: '32px' }}
                          className="text-l font-semibold"
                        >
                          참가비 : {game.joinFeeAmount}
                        </div>
                        <div
                          style={{ height: '32px' }}
                          className="text-l font-semibold"
                        >
                          베팅비 : {game.betFeeAmount}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
