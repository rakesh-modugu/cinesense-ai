import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames, movieStories } = useSelector((store) => store.gpt);

  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-black/80 text-white rounded-xl backdrop-blur-sm">
      {movieStories && (
        <div className="p-6 mb-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-yellow-500"></div>
            <h2 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
                 <span>✨</span> AI Analysis
            </h2>
            <p className="text-gray-300 text-md md:text-lg leading-relaxed font-light tracking-wide">
                {movieStories}
            </p>
        </div>
      )}

      <div className="space-y-12"> 
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