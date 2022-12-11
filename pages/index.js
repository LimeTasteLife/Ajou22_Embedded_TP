import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { testAddress } from "../config";
import Test from "../artifacts/contracts/test.sol/test.json";

import Link from "next/link";
import Mainbarstyles from "../styles/mainbar.module.css";

import Image from "next/image";

export default function Home() {
  //조건부 스타일링 적용 변수
  const state = "onair";

  //   const [count, setCount] = useState(0);
  // const [변수, 변수를 관리하는 함수] = useState(초기값);

  // 위에 녀석들은 아래와 같은 효과를 낼 수 있습니다.
  // const countControl= useState(0); // 두 개의 아이템이 있는 쌍을 반환
  // const count = countControl[0]; // 첫 번째 아이템
  // const setCount = countControl[1]; // 두 번째 아이템
  const [games, setGames] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    // loadGames(); 이 부분을 주석 처리해서 더미 데이터를 넣어준다.
    setGames([
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
  }, [games]);
  const router = useRouter();

  async function loadGames() {
    /** provider 연결 없이 그냥 contract call 했더니 동작 안 했음. */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(testAddress, Test.abi, signer);
    const data = await contract.joinableGame();
    const items = await Promise.all(
      data.map(async (i) => {
        let prize = ethers.utils.formatUnits(i.prize.toString(), "ether");
        let joinFeeAmount = ethers.utils.formatUnits(
          i.joinFeeAmount.toString(),
          "ether"
        );
        let betFeeAmount = ethers.utils.formatUnits(
          i.betFeeAmount.toString(),
          "ether"
        );
        let item = {
          gameId: i.gameId.toNumber(),
          startAt: i.startAt.toNumber(),
          finishAt: i.finishAt.toNumber(),
          prize: prize,
          joinFeeAmount: joinFeeAmount,
          betFeeAmount: betFeeAmount,
          gameStatus: i.gameStatus,
        };
        return item;
      })
    );
    setGames(items);
    setLoadingState("loaded");
  }

  /*
  async function updateTracker(string) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      planToNFTAddress,
      PlanToNFT.abi,
      signer
    );

    const tokenId = string.split(':')[1].slice(0, 1);
    //console.log(tokenId);
    const transaction = await contract.updateTracker(parseInt(tokenId));
    await transaction.wait();
    router.push('/');
  }
  */

  if (loadingState === "loaded" && !games.length)
    return <h1 className="px-20 py-10 text-3xl">No games in home</h1>;
  return (
    //요 부분을 디자인을 수정하고
    // <div className="flex justify-center">
    //   <div className="px-4" style={{ maxWidth: "1600px" }}>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
    <div className="w-5/6 float-right">
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
                  //여기 부분 조정 필요함
                  <div
                    key={i}
                    // className="border shadow rounded-xl overflow-hidden"
                  >
                    {/* 링크 넘어가면서 정보 전달해주면 됨 - Link의 경우, 다른 props전달 못하니 a태그나 router 이용 */}
                    <Link href="../game-info">
                      <div className={Mainbarstyles.mainbarwrap}>
                        <div
                          className={`${Mainbarstyles.mainbarwrap} ${
                            state === "onair" ? "bg-blue-300 rounded-3xl" : ""
                          }
                          ${state === "end" ? "bg-pink-500 rounded-3xl" : ""}
                          ${
                            state === "settled"
                              ? "bg-indigo-700 rounded-3xl "
                              : ""
                          }
                          ${
                            state === "hello" ? "bg-purple-700 rounded-3xl" : ""
                          }`}
                        >
                          <div
                            style={{ height: "32px" }}
                            className="text-l font-semibold"
                          >
                            주최자 : {game.gameId}
                          </div>
                          <div
                            style={{ height: "32px" }}
                            className="text-l font-semibold"
                          >
                            게임 시작 : {game.startAt}
                          </div>
                          <div
                            style={{ height: "32px" }}
                            className="text-l font-semibold"
                          >
                            게임 종료 : {game.finishAt}
                          </div>
                          <div
                            style={{ height: "32px" }}
                            className="text-l font-semibold"
                          >
                            상금 : {game.prize}
                          </div>
                          <div
                            style={{ height: "32px" }}
                            className="text-l font-semibold"
                          >
                            참가비 : {game.joinFeeAmount}
                          </div>
                          <div
                            style={{ height: "32px" }}
                            className="text-l font-semibold"
                          >
                            베팅비 : {game.betFeeAmount}
                          </div>
                          {/*                         
                <p style={{ height: '32px' }} className="text-l font-semibold">
                  {game.gameStatus}
                </p>
          */}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    //     </div>
    //   </div>
    // </div>
  );
}
