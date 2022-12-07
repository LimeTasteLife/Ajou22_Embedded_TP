import React from "react";

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
        placeholder="gameId"
        onChange={onChange}
        value={gameId}
      />
      <br />
      <input
        name="startAt"
        placeholder="startAt"
        onChange={onChange}
        value={startAt}
      />
      <br />
      <input
        name="finishAt"
        placeholder="finishAt"
        onChange={onChange}
        value={finishAt}
      />
      <br />
      <input
        name="prize"
        placeholder="prize"
        onChange={onChange}
        value={prize}
      />
      <br />
      <input
        name="joinFeeAmount"
        placeholder="joinFeeAmount"
        onChange={onChange}
        value={joinFeeAmount}
      />
      <br />
      <input
        name="betFeeAmount"
        placeholder="betFeeAmount"
        onChange={onChange}
        value={betFeeAmount}
      />
      <br />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default CreateUser;
