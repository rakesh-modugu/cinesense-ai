import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black w-full">
        {/* Laptop lo paiki, Mobile lo normal ga undela logic */}
        <div className="mt-0 md:-mt-52 pl-2 md:pl-10 relative z-20 pb-10">
          
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          
          <MovieList title={"Top Rated Gems"} movies={movies.topRatedMovies} />
          
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          
          <MovieList title={"Upcoming Releases"} movies={movies.upcomingMovies} />
          
          <MovieList title={"Scary Horror"} movies={movies.horrorMovies} />
        </div>
      </div>
    )
  );
};
export default SecondaryContainer;