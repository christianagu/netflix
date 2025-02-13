const MovieCard = ({ movie }) => (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white">
        <img src={movie.poster} alt={movie.title} className="w-full h-60 object-cover rounded"/>
        <h2 className="mt-2 text-lg font-semibold">{movie.title}</h2>
        <p className="text-sm opacity-75">{movie.release_date}</p>
    </div>
);

export default MovieCard;