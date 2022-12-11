import Link from "next/link";
// import Inforbar from "../components/infobar";
import Buttonstyle from "../styles/button.module.css";
import InfobarStyle from "../styles/mainbar.module.css";
import Mainbarstyles from "../styles/mainbar.module.css";

// 게임바(mainbar)를 클릭했을 때, 게임 정보를 받아와 표시해주는 페이지 - 게임참가/확인 기능 구현
export default function Gameinformation({ props }) {
  //const로 처리하든 다른 곳에서 import해서 매개변수(props)에 넣든 처리해야함

  return (
    <div className="flex w-5/6 h-full float-right flex-col justify-center items-center pl-6">
      <h1 className="text-4xl mb-5 font-bold">Setting Game</h1>
      <div className="w-full px-10">주최자: 받아올 정보</div>
      <div className="w-full px-10">
        <div type="bar" className={Mainbarstyles.bar}>
          <div type="bar" className={InfobarStyle.bar}>
            <div>
              {/* 여기서 정보 어떻게 끌어올지는 이해 못함 */}
              <div>받아올 정보 ..(props.startAt) (props.finishAt)</div>
              <div>(props.참가자)</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-10">
        상금
        <div type="bar" className={Mainbarstyles.bar}>
          <div type="bar" className={InfobarStyle.bar}>
            <div>
              {/* 여기서 정보 어떻게 끌어올지는 이해 못함 */}
              <div>받아올 정보 ..(props.startAt) (props.finishAt)</div>
              <div>(props.참가자)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full" id="명단 큰 상자">
        <div className="w-full h-auto" id="명단 큰 상자 윗 부분">
          <div className="w-1/2 h-5 text-center float-left pt-8">
            1팀 명단 내용
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
                    {/* 여기서 정보 어떻게 끌어올지는 이해 못함 */}
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
                    {/* 여기서 정보 어떻게 끌어올지는 이해 못함 */}
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
                      {/* 여기서 정보 어떻게 끌어올지는 이해 못함 */}
                      <div>받아올 정보 ..(props.startAt) (props.finishAt)</div>
                      <div>(props.참가자)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 마감버튼 마다 onclick 이벤트 추가 */}
        <div className="flex w-full" id="Game list Upper(옵션 - 역삼각형 클릭)">
          <button
            className="rounded-full bg-yellow-500 w-1/3 float-left p-3 text-center text-lg mx-10 mt-6 text-white font-semibold"
            //onclick 이벤트 추가
          >
            참가 마감
          </button>
          <button className="rounded-full bg-green-500 w-1/3 float-left p-3 text-center text-lg mx-10 mt-6 text-white font-semibold">
            중간 마감
          </button>
          <button className="rounded-full bg-blue-500 w-1/3 float-left p-3 text-center text-lg mx-10 mt-6 text-white font-semibold">
            베팅 마감
          </button>
        </div>

        <div>
          <div className="w-1/2  float-left p-10 h-full">
            <div className="w-auto text-center">
              <Link href={"./manage-game"}>
                <div className={`${Buttonstyle.btnred} ${"w-1/3"}`}>
                  삭제하기
                  {/* (관리 리스트에서 해당 게임 제거 설정할지 생각 X) */}
                </div>
              </Link>
            </div>
          </div>

          <div className="w-1/2  float-left p-10 h-full">
            <div className="w-auto text-center">
              <Link href={"/manage-game"}>
                <div className={`${Buttonstyle.btncyan} ${"w-1/3"}`}>
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
