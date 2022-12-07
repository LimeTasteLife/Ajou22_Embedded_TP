// import { Axios } from "axios";
import dummy from "./dummy.json";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Ctedgame() {
  const [gameList, setgameList] = useState([
    {
      name: "Hello",
      startAt: "HI",
      finishAt: "OOO",
      prize: "HUU",
      joinFeeAmount: "A",
      betFeeAmount: "B",
    },
  ]);

  // const usrid = "juhong";
  // const gameList = dummy.data.filter((data) => data.gameId === usrid);

  const [isLoading, setLoading] = useState(true);
  //처음 렌더링될 때 호출되고, gameList라는 변수가 변화할 시에 해당 useEffect 내 함수 다시 적용하도록 함
  useEffect(() => {
    // if (!mounted.current) {
    //   mounted.current = true;
    // } else {
    console.log("컴포넌트 나타남");
    // console.log(gameList);
    // }
  }, [gameList]);

  //button 클릭 시 특정 DB에서 데이터를 가져와 gameList에 추가하는 함수
  async function Getgame() {
    setLoading(false);
    const config = {
      method: "get",
    };
    //dummy data fetch
    fetch("https://jsonplaceholder.typicode.com/users/1", config)
      // const data = JSON.parse(JSON.stringify(res));
      .then((response) => response.json())
      .then((data) => gameList.push(data))
      .catch((error) => console.log(error));
    // console.log(data);
    // gameList.push(data);
    // console.log(gameList);
  }

  return (
    <div className="Home">
      {/* <GameList /> */}
      {/* <Usrgame /> */}
      <button
        className="bg-yellow-500 h-20 w-40 justify-center items-center box-border m-10"
        onClick={() => {
          Getgame();
          console.log(gameList);
          let array = gameList;
          setgameList([...array]);
        }}
      >
        버튼 1
      </button>
      <>
        {isLoading ? (
          <div style={{ padding: "300px 0" }}>
            <div>💬</div>
          </div>
        ) : (
          <div>
            {gameList.map((item, index) => (
              <li key={index}>
                <ul>{item.name}</ul>
                <ul>{item.startAt}</ul>
                <ul>{item.finishAt}</ul>
                <ul>{item.prize}</ul>
              </li>
            ))}
          </div>
        )}
      </>
    </div>
  );
}
