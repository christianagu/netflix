import React from "react";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../graphql/queries";
import MoviesList from "../components/MoviesList";
import MoviesByGenre from "../components/MoviesByGenre";

const Movies = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data.movies);
  return (
    <div className="p-4">
      <MoviesList movies={data.movies} />
      <MoviesByGenre movies={data.movies} />
    </div>
  );
};

export default Movies;
