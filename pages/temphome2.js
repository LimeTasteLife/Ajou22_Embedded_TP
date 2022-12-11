import App from "../components/App";
import Createdbar from "../components/createdbar";

export default function Temphome2() {
  // let gamelist = App.inputs;
  // console.log(gamelist);

  return (
    <div className=" w-5/6 float-right">
      <div
        className="flex  h-full flex-col items-center absolute px-10"
        id="Game Management Container"
      >
        <div
          className="flex w-full flex-col items-center pt-3 px-5"
          id="Game Management Upper"
        >
          {/* 해당 페이지 제목 */}
          <div className="rounded-3xl bg-gray-700 w-full text-5xl text-center font-bold py-3 px-5">
            (image추가)This is Home
          </div>
        </div>
        {/* 해당 페이지에서 게임 생성을 통해 추가된 게임바(mainbar)들을 정렬 하는 옵션들 */}
        <div className="w-full" id="Game Management Lower">
          <div
            className="flex w-full"
            id="Game list Upper(옵션 - 역삼각형 클릭)"
          >
            <button className="rounded-full bg-gray-200 w-1/3 float-left p-3 text-center text-lg m-5">
              최근 순
            </button>
            <button className="rounded-full bg-gray-400 w-1/3 float-left p-3 text-center text-lg m-5">
              베팅 금액 순
            </button>
            <button className="rounded-full bg-gray-600 w-1/3 float-left p-3 text-center text-lg m-5">
              마감 일자 순
            </button>
          </div>

          {/*사용자가 생성한 게임바들이 나열되는 곳 - 정보 받아와서 여기 scroll바 있는 상자 내 추가해야 함 */}
          <div
            className="rounded-xl bg-gray-200 w-full h-4/6 p-5 m-5 overflow-y-auto"
            id="Game list Lower(스크롤 포함)"
          >
            <Createdbar></Createdbar>
            <Createdbar></Createdbar>
            <Createdbar></Createdbar>
            <Createdbar></Createdbar>
            <Createdbar></Createdbar>
            <Createdbar></Createdbar>
            <Createdbar></Createdbar>
            <Createdbar></Createdbar>
            <Createdbar></Createdbar>
            <Createdbar></Createdbar>
            <Createdbar></Createdbar>
            <Createdbar></Createdbar>
            <Createdbar></Createdbar>
            <Createdbar></Createdbar>
            <Createdbar></Createdbar>
            <Createdbar></Createdbar>
            <Createdbar></Createdbar>
          </div>
        </div>
      </div>
    </div>
  );
}
