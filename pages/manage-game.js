import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { gameManagerAddress } from '../config';
import GameManager from '../artifacts/contracts/GameManager.sol/GameManager.json';

export default function ManageGame({}) {
  //함수 자체를 그 함수 내 const로 반환해서 사용 가능
  const [mygames, setMygames] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    loadMyGames();
  }, [mygames]);
  const router = useRouter();

  async function loadMyGames() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      gameManagerAddress,
      GameManager.abi,
      signer
    );

    const data = await contract.viewMyMakingGames();
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
    setMygames(items);
    setLoadingState('loaded');
  }

  async function manageGame(gameId) {
    router.replace({
      pathname: '/game-info',
      query: { gameId: gameId },
    });
  }

  if (loadingState === 'not-loaded' || !mygames.length)
    return <h1 className="px-20 py-10 text-3xl">No game to manage</h1>;
  return (
    <div className="w-full overflow: auto">
      {mygames.map((game, i) => (
        <div key={i} className="" onClick={(e) => manageGame(game.gameId)}>
          <div>game.title</div>
          <div>game.gameId</div>
          <div>game.startAt</div>
          <div>game.finishAt</div>
          <div>game.prize</div>
          <div>game.joinAmount</div>
          <div>game.betAmount</div>
          <div>game.gameStatus</div>
          <br />
        </div>
      ))}
    </div>
  );
}
