import App from "../components/App";
import UserList from "../components/UserList";
import Link from "next/link";
import Mainbarstyles from "../styles/mainbar.module.css";
import { useEffect, useState } from "react";
import Buttonstyle from "../styles/button.module.css";
// import InfobarStyle from "../styles/mainbar.module.css";

//생성한 게임 중에 gameId가 동일한 것들을 보여주고 그 게임들의 설정을 바꿀 수 있어야 함
export default function ManageGame({ props }) {
  //함수 자체를 그 함수 내 const로 반환해서 사용 가능
  // const list = App();
  // console.log(list);

  //모든 게임 list받아와서 gameId 체크하여 선별적으로 다시 usrgames라는 list에 재 저장한 후 출력해주기
  // const usrgames = ();

  // useEffect( ()=> {

  // }, [usrgames])

  ///임시로 설정
  const [games, setGames] = useState([]);

  // if (list.length === 0) {
  //   return (
  //     <div className="flex h-full flex-col justify-center items-center">
  //       <h1 className="text-4xl mb-5 font-bold">게임 관리</h1>
  //       <span className="text-7xl">💬</span>;
  //     </div>
  //   );
  // } else {
  return (
    // // 이거 출력 부분 기본 bar로 덮어놓기
    // <div className="w-full overflow: auto">
    //   {list.map((gameId, index) => (
    //     <div key={index} className="">
    //       {list[index].gameId}
    //       <br />
    //       {list[index].startAt}
    //       <br />
    //       {list[index].finishAt}
    //       <br />
    //     </div>
    //   ))}
    // </div>
    <div className="w-4/5 h-full float-right">
      <div className="w-full h-20">
        <h1 className="text-4xl font-bold p-6 rounded-3xl bg-gray-400 mr-16">
          User-Hosted Game List
        </h1>
      </div>
      {/* <span className="text-7xl">💬</span> */}
      {/* 게임 정보(넣어야함) */}
      <div className="w-full h-full" id="명단 큰 상자">
        <div className="table w-1/5 h-10 font-semibold rounded-xl bg-gray-200 text-left mt-6 px-10 pt-2 mr-16">
          주최 게임 목록
        </div>
        <div
          className="rounded-xl bg-gray-500 w-3/4 h-4/6 p-5 m-5 overflow-y-auto absolute"
          id="명단 큰 상자 아랫 부분"
        >
          {games.map((game, i) => (
            <div
              key={i}
              // className="border shadow rounded-xl overflow-hidden"
            >
              {/* 링크 넘어가면서 정보 전달해주면 됨 - Link의 경우, 다른 props전달 못하니 a태그나 router 이용 */}
              <Link href="../game-setting">
                <div className={Mainbarstyles.mainbarwrap}>
                  <div
                    className={`${Mainbarstyles.bar} ${"w-full px-10 py-4"}`}
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
  );
}
