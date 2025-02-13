import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-56 object-cover"
        alt={movie.title}
      />
      <div className="px-4 py-2">
        <h2 className="font-bold text-xl text-gray-800">{movie.title}</h2>
        <p className="text-gray-700 text-base">{movie.description}</p>
      </div>
      <div className="px-4 py-2">
        <span className="text-gray-500 text-sm">Release Year: {movie.releaseYear}</span>
      </div>
    </div>
  );
};

export default MovieCard;
