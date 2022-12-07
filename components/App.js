import React, { useRef, useState } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
//게임 정보 추가하고 등록을 누르면 해당 게임 생성해서 보여주는 것
function App() {
  const [inputs, setInputs] = useState({
    gameId: "",
    startAt: "",
    finishAt: "",
    prize: "",
    joinFeeAmount: "",
    betFeeAmount: "",
  });
  const { gameId, startAt, finishAt, prize, joinFeeAmount, betFeeAmount } =
    inputs;
  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [users, setUsers] = useState([
    {
      // id: 1,
      gameId: "velopert",
      startAt: "220101",
      finishAt: "220102",
      prize: "5000",
      joinFeeAmount: "1000",
      betFeeAmount: "300",
    },
    {
      // id: 2,
      gameId: "tester",
      startAt: "220820",
      finishAt: "220823",
      prize: "3000",
      joinFeeAmount: "500",
      betFeeAmount: "100",
    },
    {
      // id: 3,
      gameId: "liz",
      startAt: "221111",
      finishAt: "221115",
      prize: "7000",
      joinFeeAmount: "1200",
      betFeeAmount: "500",
    },
  ]);

  // const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      // id: nextId.current,
      gameId,
      startAt,
      finishAt,
      prize,
      joinFeeAmount,
      betFeeAmount,
    };
    setUsers([...users, user]);

    setInputs({
      gameId: "",
      startAt: "",
      finishAt: "",
      prize: "",
      joinFeeAmount: "",
      betFeeAmount: "",
    });
    // nextId.current += 1;
  };
  return (
    <>
      <CreateUser
        gameId={gameId}
        startAt={startAt}
        finishAt={finishAt}
        prize={prize}
        joinFeeAmount={joinFeeAmount}
        betFeeAmount={betFeeAmount}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
    </>
  );
}

export default App;
