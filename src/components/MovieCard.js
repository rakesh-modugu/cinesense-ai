import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div 
      className="w-36 md:w-48 pr-4 cursor-pointer hover:scale-110 transition-transform duration-200"
      onClick={() => console.log("Movie Clicked! Feature Coming Soon...")}
    >
      <img 
        alt="Movie Card" 
        src={IMG_CDN_URL + posterPath} 
        className="rounded-md"
      />
    </div>
  );
};
export default MovieCard;