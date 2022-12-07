import { useEffect, useState } from "react";
import Ctedgame from "../components/ctedgame";

export default function Home({ results }) {
  return (
    <div className="container">
      <Ctedgame />
      {results?.map((movie, index) => (
        <div className="movie" key={index}>
          <h4>{movie.name}</h4>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const config = {
    method: "get",
  };

  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users/1",
    config
  );

  const results = await JSON.parse(JSON.stringify(res));

  return { props: { results } };
}
