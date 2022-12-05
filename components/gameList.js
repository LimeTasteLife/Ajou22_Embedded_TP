//Dummy 데이터로부터 json 객체 받아옴
import dummy from "../dummy.json";

export default function GameList() {
  return (
    <ul className="list_game">
      {dummy.data.map((data, startAt) => (
        <li key={startAt}>
          {data.gameid}
          <br />
          {data.startAt}
          <br />
          {data.finishAt}
          <br />
          {data.prize}
          <br />
          {data.joinFeeAmount}
          <br />
          {data.betFeeAmount}
        </li>
      ))}
    </ul>
  );
}
