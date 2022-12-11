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
  const [users, setUsers] = useState([]);

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
  // return users;
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
