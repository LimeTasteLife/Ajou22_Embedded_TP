import Image from 'next/image';
import Link from 'next/link';
import ParticipateStyle from '../styles/participate.module.css';
import Buttonstyle from '../styles/button.module.css';
import InfobarStyle from '../styles/mainbar.module.css';
import Mainbarstyles from '../styles/mainbar.module.css';

export default function participatinginfor() {
  const ptpgame = [
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
  ];

  return (
    <div
      id="Participating Container"
      className={`${ParticipateStyle.participatebox} ${'w-4/5 mx-10'}`}
    >
      <div id="시간 container" className={ParticipateStyle.time}>
        <span className="w-1/2">시작 시간:(startAt) </span>
        <span className="w-1/2 float-right">종료 시간:(finishAt)</span>
      </div>
      <div
        id="1팀 2팀 경쟁 화면"
        className={`${
          ParticipateStyle.beatscreen
        } ${'fixed w-300 justify-center'}`}
      >
        {/* m-auto 는 수평의 중앙으로 정렬하는 역할 */}
        <div
          id="1팀 2팀 명단"
          className={`${
            ParticipateStyle.betting
          } ${'fixed w-3/5 h-96 absolute m-auto'}`}
        >
          <Image
            src="/../public/images/3002220_93027_1044.png"
            alt=""
            layout="fill"
          />
        </div>

        <div id="1팀 2팀 명단 화면" className="w-full h-96 pt-10 ">
          <div className="w-full h-10 text-center">
            <div className="w-1/2 h-10 text-center float-left pt-4">
              1팀 명단
            </div>
            <div className="w-1/2 h-10 text-center float-left pt-4">
              2팀 명단
            </div>
          </div>
          <div
            id="1팀 명단"
            className="bg-indigo-600 w-2/5 h-64 absolute rounded-3xl overflow-y-auto mx-16"
          >
            <div className="bg-gray-600 h-20 mx-10 my-3 rounded-2xl">
              {ptpgame[0].gameId}
            </div>
            <div className="bg-gray-600 h-20 mx-10 my-3 rounded-2xl">
              {ptpgame[1].gameId}
            </div>
            <div className="bg-gray-600 h-20 mx-10 my-3 rounded-2xl">
              {ptpgame[2].gameId}
            </div>
            <div className="bg-gray-600 h-20 mx-10 my-3 rounded-2xl">
              {ptpgame[3].gameId}
            </div>
            <div className="bg-gray-600 h-20 mx-10 my-3 rounded-2xl">
              {ptpgame[4].gameId}
            </div>
          </div>
          <div
            id="2팀 명단"
            className="bg-pink-600 w-2/5 h-64 float-right rounded-3xl overflow-y-auto mx-16"
          >
            <div className="bg-gray-600 h-20 mx-10 my-3 rounded-2xl">
              {ptpgame[5].gameId}
            </div>
            <div className="bg-gray-600 h-20 mx-10 my-3 rounded-2xl">
              {ptpgame[6].gameId}
            </div>
            <div className="bg-gray-600 h-20 mx-10 my-3 rounded-2xl">
              {ptpgame[7].gameId}
            </div>
            <div className="bg-gray-600 h-20 mx-10 my-3 rounded-2xl">
              {ptpgame[8].gameId}
            </div>
            <div className="bg-gray-600 h-20 mx-10 my-3 rounded-2xl">
              {ptpgame[9].gameId}
            </div>
          </div>
        </div>

        <div
          id="상금 및 베팅 정보, 확인 및 나가기 버튼 container"
          className="h-320"
        >
          <div id="상금 정보" className="h-full mx-16">
            <div type="bar" className={Mainbarstyles.bar}>
              <div type="bar" className={InfobarStyle.bar}>
                <div>상금: (prize)</div>
              </div>
            </div>
          </div>

          <div id="베팅 정보" className=" mx-16 py-3">
            <div className="bg-black w-2/5 h-12 float-left rounded-2xl pl-4 items-center flex">
              1팀 베팅액: (betting1)
              <button className="bg-blue-300 items-center flex rounded-full ml-48">
                1팀 베팅취소
              </button>
            </div>
            <div className="bg-black w-2/5 h-12 float-right rounded-2xl pl-4 items-center flex">
              2팀 베팅액: (betting2)
              <button className="bg-pink-300 items-center flex rounded-full ml-48">
                2팀 베팅취소
              </button>
            </div>
          </div>

          {/* 확인 누르면 원래 homepage(임시로, temphome)으로 이동하도록 설정 */}
          <div className="w-1/2 h-20 float-left">
            <div className="p-10 h-full">
              <div className="w-full text-center">
                <Link href={'./partificpaing-now'}>
                  <div className={`${Buttonstyle.btncyan} ${'w-1/3'}`}>
                    확인
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-1/2 h-20 float-left">
            <div className="p-10 h-full">
              <div className="w-full text-center">
                {/* delete 기능 구현 */}
                <Link href={'./participating-now'}>
                  <div className={`${Buttonstyle.btnred} ${'w-1/3'}`}>
                    게임나가기
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
