import model from "../utils/gemini";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // Search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      return json.results;
    } catch (error) {
      console.error("TMDB API Error:", error);
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    // 1. Empty Check
    if (!searchText.current.value) return; 

    try {
      // 2. Strict Prompt (Idhi nee patha code lo ledhu - UPDATE CHEYI)
      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query : " +
        searchText.current.value +
        ". Only give me names of 5 movies, comma seperated. Example: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya. Do not give any other text.";

      const result = await model.generateContent(gptQuery);
      const response = await result.response;
      const text = response.text();

      console.log("Gemini Output:", text); // Debugging

      // 3. Data Cleaning (Safe Split)
      const gptMovies = text.split(",").map((movie) => movie.trim());

      // 4. Fetch Data from TMDB
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      // 5. Push to Redux
      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("Gemini/Search Error:", error);
      alert("AI Service is busy. Please try again in 10 seconds.");
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 rounded-lg"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;