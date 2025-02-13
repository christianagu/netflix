const MovieCard = ({ movie }) => {
    return (
      <div className="border p-4 rounded-lg">
        <h3 className="font-bold text-lg">{movie.title}</h3>
        <p>{movie.description}</p>
      </div>
    );
  };
  
  export default MovieCard;
  