import React from "react";
import MovieCard from "./MovieCard";

const MoviesByGenre = ({ movies }) => {
  const moviesByGenre = movies.reduce((acc, movie) => {
    const genre = movie.genre?.trim().toLowerCase() || "Unknown"; // Handle missing genres
    if (!acc[genre]) {
      acc[genre] = [];
    }
    acc[genre].push(movie);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Movies by Genre</h1>
      {Object.entries(moviesByGenre).map(([genre, movies]) => (
        <div key={genre} className="mb-8">
          <h2 className="text-xl font-semibold mb-2 capitalize">{genre.charAt(0).toUpperCase() + genre.slice(1)}</h2> {/* capitalize first letter */}
          <div className="grid grid-flow-col grid-rows-4 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviesByGenre;
