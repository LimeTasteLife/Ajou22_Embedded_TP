import React from "react";
import Link from "next/link";

function CreateUser({
  gameId,
  startAt,
  finishAt,
  prize,
  joinFeeAmount,
  betFeeAmount,
  onChange,
  onCreate,
}) {
  return (
    <div>
      <input
        name="gameId"
        value={gameId}
        placeholder="gameId"
        onChange={onChange}
      />
      <br />
      <input
        name="startAt"
        value={startAt}
        placeholder="startAt"
        onChange={onChange}
      />
      <br />
      <input
        name="finishAt"
        value={finishAt}
        placeholder="finishAt"
        onChange={onChange}
      />
      <br />
      <input
        name="prize"
        value={prize}
        placeholder="prize"
        onChange={onChange}
      />
      <br />
      <input
        name="joinFeeAmount"
        value={joinFeeAmount}
        placeholder="joinFeeAmount"
        onChange={onChange}
      />
      <br />
      <input
        name="betFeeAmount"
        value={betFeeAmount}
        placeholder="betFeeAmount"
        onChange={onChange}
      />
      <br />
      <button onClick={onCreate}>
        {/* <Link href="../pages/manage-game" /> */}
        등록
      </button>
    </div>
  );
}

export default CreateUser;
