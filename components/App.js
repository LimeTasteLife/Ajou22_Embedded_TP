import React, { useRef, useState } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
//게임 정보 추가하고 등록을 누르면 해당 게임 생성해서 보여주는 것
function App() {
  const [inputs, setInputs] = useState({
    gamdId: "",
    startAt: "",
    finishAt: "",
    prize: "",
    joinFeeAmount: "",
    betFeeAmount: "",
  });
  const { gamdId, startAt, finishAt, prize, joinFeeAmount, betFeeAmount } =
    inputs;
  const onChange = (e) => {
    const { gamdId, startAt, finishAt, prize, joinFeeAmount, betFeeAmount } =
      e.target;

    // 여기부분 이해 안됨
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      gamdId: "velopert",
      startAt: "220101",
      finishAt: "220102",
      prize: "5000",
      joinFeeAmount: "1000",
      betFeeAmount: "300",
    },
    {
      id: 2,
      gamdId: "tester",
      startAt: "220820",
      finishAt: "220823",
      prize: "3000",
      joinFeeAmount: "500",
      betFeeAmount: "100",
    },
    {
      id: 3,
      gamdId: "liz",
      startAt: "221111",
      finishAt: "221115",
      prize: "7000",
      joinFeeAmount: "1200",
      betFeeAmount: "500",
    },
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      gamdId,
      startAt,
      finishAt,
      prize,
      joinFeeAmount,
      betFeeAmount,
    };
    setUsers([...users, user]);

    setInputs({
      gamdId: "",
      startAt: "",
      finishAt: "",
      prize: "",
      joinFeeAmount: "",
      betFeeAmount: "",
    });
    nextId.current += 1;
  };
  return (
    <>
      <CreateUser
        gamdId={gamdId}
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
