const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black via-black/40 to-transparent z-10 flex flex-col justify-end md:justify-center h-full">
      <h1 className="text-2xl md:text-6xl font-black drop-shadow-lg tracking-tight mb-2 md:mb-4 w-2/3 md:w-1/2 leading-none">
        {title}
      </h1>
      <p className="hidden md:block py-4 text-lg w-1/3 text-gray-200 drop-shadow-md leading-relaxed line-clamp-3">
        {overview}
      </p>
      <div className="flex gap-3 my-4 md:m-0 pb-10 md:pb-0">
        <button className="bg-white text-black py-2 md:py-3 px-6 md:px-12 text-lg md:text-xl font-bold rounded flex items-center gap-2 hover:bg-opacity-80 transition-all">
          <span>▶️</span> Play
        </button>
        <button className="hidden md:flex bg-gray-500/70 text-white py-3 px-10 text-xl font-semibold rounded items-center gap-2 hover:bg-gray-500/50 transition-all backdrop-blur-sm">
          ℹ️ More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;