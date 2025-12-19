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
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    if (!searchText.current.value) return;

    const gptQuery =
      "Act as a Movie Recommendation system. The user wants to watch: " +
      searchText.current.value +
      ". First, give a short, fun 2-sentence explanation of why these movies fit the mood. Then insert the symbol '|||'. Then list 5 comma-separated movie names. Example: These movies are perfect for a rainy day because of their dark tone ||| Batman, Prisoners, Zodiac, Se7en, Joker. Do not use bold text or markdown.";

    try {
      const result = await model.generateContent(gptQuery);
      const response = await result.response;
      const text = response.text();

      const searchResults = text.split("|||");
      
      const explanation = searchResults[0]?.trim();
      const moviesString = searchResults[1]?.trim();

      if (!moviesString) return;

      const gptMovies = moviesString.split(",").map((movie) => movie.trim());

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({ 
            movieNames: gptMovies, 
            movieResults: tmdbResults,
            movieStories: explanation 
        })
      );
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center">
      <form
        className="w-[95%] md:w-1/2 bg-black grid grid-cols-12 rounded-xl shadow-lg shadow-purple-900/50"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-3 col-span-9 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-3 py-2 px-2 bg-gradient-to-r from-red-700 to-purple-800 text-white rounded-lg hover:opacity-90 font-semibold text-sm md:text-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;