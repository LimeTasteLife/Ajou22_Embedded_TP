import GameList from "../components/gameList";
import Ctedgame from "../components/ctedgame";
import React, { useEffect, useState } from "react";
import dummy from "../dummy1.json";

export default function Temphome4() {
  return (
    <div className="Home">
      {/* <GameList /> */}
      <Ctedgame />
      <div>안녕하세요 반갑습니다</div>
    </div>
  );
}
