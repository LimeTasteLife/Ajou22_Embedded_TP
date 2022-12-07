import Link from "next/link";
import React, { useEffect } from "react";

function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log("game 값이 설정됨");
    console.log(user);
    return () => {
      console.log("gamelist 가 바뀌기 전..");
      console.log(user);
    };
  }, [user]);
  return (
    <div>
      <Link href="../game-info">
        <a>
          <b
            style={{
              cursor: "pointer",
              color: user.active ? "green" : "black",
            }}
            // gameid 클릭 이벤트 보류
            // onClick={() => onToggle(user.gameId)}
          >
            {/* 사실 접속한 유저의 gameId로 고정해야함 */}
            {user.gameId}
          </b>
          &nbsp;
          {/* <span>({user.email})</span> */}
          <div> (생성시간 : {user.startAt})</div>
          <div> (종료시간 : {user.finishAt})</div>
          {/* <span> (상금 : {user.prize})</span>
      <span>(참가비 : {user.joinFeeAmount})</span>
      <span> (베팅액 : {user.betFeeAmount})</span> */}
          {/* 삭제 기능 아직 구현 안해놓음 */}
          {/* <button onClick={() => onRemove(user.gameId)}>삭제</button> */}
        </a>
      </Link>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div className="w-full overflow: auto">
      {users.map((user) => (
        <User
          user={user}
          key={user.startAt}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default UserList;
