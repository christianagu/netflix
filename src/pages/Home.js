import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../graphql/queries";
import MovieCard from "../components/MovieCard";


const Home = () => {
    const { loading, error, data } = useQuery(GET_MOVIES);

    if (loading) return <p>Loading movies...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Featured Movies</h1>
            <div className="grid grid-cols-4 gap-4">
                {data.movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
        </div>
    );
};

export default Home;