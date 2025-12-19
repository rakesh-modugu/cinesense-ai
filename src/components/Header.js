import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth).catch(() => navigate("/error"));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between items-center">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      
      {user && (
        <div className="flex p-2 items-center gap-2">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-900 text-white rounded-lg"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          
          <button
            className="py-2 px-4 bg-purple-800 text-white rounded-lg text-sm md:text-base"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          
          <img
            className="hidden md:block w-10 h-10 rounded-full"
            alt="usericon"
            src={user?.photoURL}
          />
          
          <button onClick={handleSignOut} className="font-bold text-white text-sm md:text-base">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;