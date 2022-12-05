import { useEffect, useState } from "react";
import Seo from "../components/Seo";

export default function Home({ results }) {
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie, index) => (
        <div className="movie" key={index}>
          <h4>{movie.name}</h4>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const { results } = await (
    await fetch(`"https://jsonplaceholder.typicode.com/users/1"`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
