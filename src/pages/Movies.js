import React from "react";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../graphql/queries";
import MovieCard from "../components/MovieCard";

const Movies = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
