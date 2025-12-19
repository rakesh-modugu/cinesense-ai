import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // Movies loading avvakapothe empty return chey
  if (!movies) return null;

  return (
    <div className="px-4 md:px-6 text-white">
      <h1 className="text-lg md:text-3xl py-4 font-bold">{title}</h1>
      <div className="flex overflow-x-scroll no-scrollbar scroll-smooth">
        <div className="flex gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;