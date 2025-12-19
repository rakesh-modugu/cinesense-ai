import model from "../utils/gemini";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);

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
      console.error("TMDB API Fail:", error);
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    // 1. Input Check
    if (!searchText.current.value) {
      alert("Please enter a movie name or feeling!");
      return;
    }

    setLoading(true);
    console.log("Search started for:", searchText.current.value);

    // 2. Query Setup
    const gptQuery =
      "Act as a Movie Recommendation system. The user wants to watch: " +
      searchText.current.value +
      ". First, give a short, fun 2-sentence explanation of why these movies fit the mood. Then insert the symbol '|||'. Then list 5 comma-separated movie names. Example: These movies are perfect for a rainy day because of their dark tone ||| Batman, Prisoners, Zodiac, Se7en, Joker. Do not use bold text or markdown.";

    try {
      // 3. Gemini API Call
      const result = await model.generateContent(gptQuery);
      const response = await result.response;
      const text = response.text();

      console.log("Gemini Response:", text); // Debugging kosam

      // 4. Processing Logic
      const searchResults = text.split("|||"); 
      
      const explanation = searchResults[0]?.trim();
      const moviesString = searchResults[1]?.trim();

      if (!moviesString) {
          console.error("Gemini format error. Got:", text);
          alert("AI didn't give movie names. Try searching again!");
          setLoading(false);
          return;
      }

      const gptMovies = moviesString.split(",").map((movie) => movie.trim());

      // 5. Fetch TMDB Data
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      // 6. Update Redux
      dispatch(
        addGptMovieResult({ 
            movieNames: gptMovies, 
            movieResults: tmdbResults,
            movieStories: explanation 
        })
      );
      
    } catch (error) {
        // *** ERROR CATCHING ***
        console.error("Detailed Error:", error);
        alert("Search Failed! Check Console. Mostly API Key Issue or Limit Exceeded.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center">
      <form
        className="w-[95%] md:w-1/2 bg-black/90 grid grid-cols-12 rounded-xl border border-gray-700 shadow-[0_0_15px_rgba(168,85,247,0.5)] overflow-hidden"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-0 col-span-9 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          // Type button ani pettu, lekapothe form submit ayyi page refresh avthundi
          type="button" 
          className="col-span-3 py-2 px-4 bg-red-700 text-white hover:bg-red-800 transition-colors font-bold text-lg flex justify-center items-center"
          onClick={handleGptSearchClick}
          disabled={loading}
        >
          {loading ? (
             <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
             lang[langKey].search
          )}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;