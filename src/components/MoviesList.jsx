import React from "react";
import MovieCard from "./MovieCard";

const MoviesList = ({ movies }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
