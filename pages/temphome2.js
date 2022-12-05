import GameList from "../components/gameList";
import Usrgame from "../components/ctedgame";
import React, { useEffect, useState } from "react";

function Post({ items }) {
  return (
    <>
      <div className="Home">
        <button onClick={() => Post()}>버튼 1</button>
        <>
          <div>
            {items.map((data, index) => (
              <li key={index}>
                <ul>{data.name}</ul>
                <ul>{data.startAt}</ul>
                <ul>{data.finishAt}</ul>
                <ul>{data.prize}</ul>
              </li>
            ))}
          </div>
        </>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  //const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  // const res = fetch(
  //   "https://jsonplaceholder.typicode.com/users/1"
  // );
  // .then((response) => response.json())
  // .then((data) => console.log(data))
  // .catch((error) => console.log(error));
  const config = {
    method: "get",
  };
  // const item = (await res).json();

  // const { res } = await (
  //   await fetch("https://jsonplaceholder.typicode.com/users/1", config)
  // ).json();
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users/1",
    config
  );
  // const item = JSON.parse(JSON.stringify(res));
  const items = await JSON.parse(JSON.stringify(res));
  // const data = await context.json();

  return { props: { items } };
}

export default Post;
