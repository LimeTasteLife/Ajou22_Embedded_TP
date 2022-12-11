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
  const [games, setGames] = useState([
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
