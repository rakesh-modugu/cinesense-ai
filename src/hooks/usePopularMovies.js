import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  // Memoization: Already movies unte malli API call cheyoddu (Saves Internet)
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  const getPopularMovies = async () => {
    // OLD ERROR: Nuvvu ikkada 'now_playing' ani petti untav.
    // FIX: 'popular' ani marchali.
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1", 
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };

 useEffect(() => {
    !popularMovies && getPopularMovies();
    
    
  }, []);
};

export default usePopularMovies;