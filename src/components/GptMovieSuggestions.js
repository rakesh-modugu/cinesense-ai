import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames, movieStories } = useSelector((store) => store.gpt);

  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      {/* AI Explanation Section */}
      {movieStories && (
        <div className="p-4 mb-4 bg-gray-800 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold text-yellow-500 mb-2">✨ AI Analysis & Ratings</h2>
          <p className="whitespace-pre-line text-gray-300 leading-relaxed">
            {movieStories}
          </p>
        </div>
      )}

      {/* Movie Lists */}
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};
export default GptMovieSuggestions;