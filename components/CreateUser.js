import React from "react";

function CreateUser({ username, email, onChange, onCreate }) {
  return (
    <div>
      <input
        name="username"
        placeholder="gameId"
        onChange={onChange}
        value={username}
      />
      <br />
      <input
        name="staring"
        placeholder="startAt"
        onChange={onChange}
        value={email}
      />
      <br />
      <input
        name="finishing"
        placeholder="finishAt"
        onChange={onChange}
        value={email}
      />
      <br />
      <input
        name="prize"
        placeholder="prize"
        onChange={onChange}
        value={email}
      />
      <br />
      <input
        name="EntryFee"
        placeholder="joinFeeAmount"
        onChange={onChange}
        value={email}
      />
      <br />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default CreateUser;

// gameId: "",
// startAt: "",
// finishAt: "",
// prize: "",
// joinFeeAmount: "",
// betFeeAmount: "",
