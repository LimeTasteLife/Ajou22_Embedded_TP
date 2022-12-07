import App from "../components/App";
import CreateUser from "../components/CreateUser";

export default function Temphome2() {
  let gamelist = App.inputs;
  console.log(gamelist);

  return (
    <div className="w-2/3 p-20">
      <div className="overflow: auto">{gamelist}</div>
      <App />
    </div>
  );
}
