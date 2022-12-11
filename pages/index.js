import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { gameManagerAddress } from '../config';
import GameManager from '../artifacts/contracts/GameManager.sol/GameManager.json';

export default function Home() {
  const [games, setGames] = useState([]);
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

  if (loadingState === 'loaded' && !games.length)
    return <h1 className="px-20 py-10 text-3xl">No games in home</h1>;
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {games.map((game, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <div
                className="p-4"
                onClick={(e) => {
                  gameInfo(game.gameId);
                }}
              >
                <p
                  style={{ height: '32px' }}
                  className="text-l font-semibold"
                ></p>
                <p style={{ height: '32px' }} className="text-l font-semibold">
                  게임 시작 : {game.startAt}
                </p>
                <p style={{ height: '32px' }} className="text-l font-semibold">
                  게임 종료 : {game.finishAt}
                </p>
                <p style={{ height: '32px' }} className="text-l font-semibold">
                  상금 : {game.prize}
                </p>
                <p style={{ height: '32px' }} className="text-l font-semibold">
                  참가비 : {game.joinFeeAmount}
                </p>
                <p style={{ height: '32px' }} className="text-l font-semibold">
                  베팅비 : {game.betFeeAmount}
                </p>
                {/*
                <p style={{ height: '32px' }} className="text-l font-semibold">
                  {game.gameStatus}
                </p>
          */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
