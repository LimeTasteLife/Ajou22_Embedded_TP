import { useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';

import { gameManagerAddress } from '../config';
import GameManager from '../artifacts/contracts/GameManager.sol/GameManager.json';

export default function MakeGame() {
  const [formInput, updateFormInput] = useState({
    gameId: '',
    title: '',
    startAt: '',
    finishAt: '',
    prize: '',
    joinFeeAmount: '',
    betFeeAmount: '',
  });
  const router = useRouter();

  async function makeGame() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const prize = ethers.utils.parseUnits(formInput.prize, 'ether');
    const joinFeeAmount = ethers.utils.parseUnits(
      formInput.joinFeeAmount,
      'ether'
    );

    const betFeeAmount = ethers.utils.parseUnits(
      formInput.betFeeAmount,
      'ether'
    );
    let contract = new ethers.Contract(
      gameManagerAddress,
      GameManager.abi,
      signer
    );

    //console.log(formInput);

    let transaction = await contract.makeGame(
      parseInt(formInput.gameId),
      formInput.title,
      parseInt(formInput.startAt),
      parseInt(formInput.finishAt),
      joinFeeAmount,
      betFeeAmount,
      {
        value: prize,
      }
    );
    await transaction.wait();

    router.replace('/');
  }

  return (
    <div className="flex justify-center bg-gray-400">
      <div className="w-2/5 flex flex-col pb-12 ">
        <input
          placeholder="게임 ID"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, gameId: e.target.value })
          }
        />
        <textarea
          placeholder="경기 제목"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, title: e.target.value })
          }
        />
        <textarea
          placeholder="시작 시간"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, startAt: e.target.value })
          }
        />
        <input
          placeholder="종료 시간"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, finishAt: e.target.value })
          }
        />
        <input
          placeholder="상금 (단위:ETH)"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, prize: e.target.value })
          }
        />
        <input
          placeholder="참가비"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, joinFeeAmount: e.target.value })
          }
        />
        <input
          placeholder="배팅비"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, betFeeAmount: e.target.value })
          }
        />
        <button
          onClick={makeGame}
          className="font-bold mt-4 bg-gray-500 text-white rounded p-4 shadow-lg"
        >
          게임 생성
        </button>
      </div>
    </div>
  );
}
