import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div 
      className="w-28 md:w-44 flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30 relative rounded-md overflow-hidden group"
    >
      <img 
        alt="Movie Card" 
        src={IMG_CDN_URL + posterPath} 
        className="w-full h-full object-cover rounded-md group-hover:brightness-110"
      />
    </div>
  );
};
export default MovieCard;