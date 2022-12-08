import App from "../components/App";
import UserList from "../components/UserList";

export default function ManageGame() {
  //함수 자체를 그 함수 내 const로 반환해서 사용 가능
  const list = App();
  console.log(list);

  if (list.length === 1) {
    return (
      <div className="flex h-full flex-col justify-center items-center">
        <h1 className="text-4xl mb-5 font-bold">게임 관리</h1>
        <span className="text-7xl">💬</span>;
      </div>
    );
  } else {
    return (
      // 이거 출력 부분 기본 bar로 덮어놓기
      <div className="w-full overflow: auto">
        {list.map((gameId, index) => (
          <div key={index} className="">
            {list[index].gameId}
            <br />
            {list[index].startAt}
            <br />
            {list[index].finishAt}
            <br />
          </div>
        ))}
      </div>
    );
  }
}
