import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fireDb } from "../firebase";
import { setAuth, setUser } from "../redux/actions/actions";

const NavBar = ({ hide, setHide, mapControl }) => {
  const [ham, setHam] = useState(false);
  const { user, shop } = useSelector((state) => state);
  const dispatch = useDispatch();

  const signInEvent = () => {
    const provider = new GoogleAuthProvider(fireDb);
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken
        const user = result.user;
        dispatch(setUser(user));
        dispatch(setAuth(true));
        // ...
      })
      .catch(console.error);
  };

  const signOutEvent = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
        dispatch(setAuth(false));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="w-screen bg-blue-800 px-4 py-3 flex justify-between items-center">
      <Link
        to="/"
        className="text-white hover:text-white text-4xl font-bold h-full flex items-center"
      >
        SHOP<span className="font-light">town</span>
      </Link>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setHide(!hide);
          }}
          className={`text-white bg-blue-900 p-1 px-4 rounded-full hover:bg-blue-700 cursor-pointer select-none shadow-xl flex items-center text-xs md:text-sm ${
            mapControl + "" === "false" ? "hidden" : "flex"
          }`}
        >
          {hide ? "Show Map" : "Hide Map"}
        </button>
        {!user ? (
          <button
            onClick={signInEvent}
            className="text-white text-xs md:text-sm bg-blue-900 p-1 px-4 rounded-full hover:bg-blue-700 cursor-pointer select-none shadow-xl"
          >
            Login with google
          </button>
        ) : (
          <>
            <Link
              to={`/shop/${shop ? "myShop" : "edit-your-shop"}`}
              className="text-white text-xs md:text-sm hover:text-white bg-blue-900 p-1 px-4 rounded-full hover:bg-blue-700 cursor-pointer select-none shadow-xl hidden items-center md:flex"
            >
              My Shop
            </Link>
            <div className="relative">
              <div
                onClick={() => {
                  setHam(!ham);
                }}
                className="flex gap-2 bg-blue-900 p-1 px-2 rounded-full hover:bg-blue-700 cursor-pointer select-none shadow-xl"
              >
                <span className="w-6 h-6 rounded-full bg-black">
                  <img
                    className="w-full h-full rounded-full"
                    src={user.photoURL}
                    alt="googleAvatar"
                  />
                </span>
                <div className="text-white text-sm md:flex hidden items-center">
                  {user.displayName}
                </div>
              </div>
              <div
                style={{
                  zIndex: 100,
                }}
                className={`origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 gap-4 ring-black ring-opacity-5 focus:outline-none ${
                  !ham ? "hidden" : ""
                }`}
                role="menu"
              >
                <Link to={`/shop/${shop ? "myShop" : "edit-your-shop"}`}>
                  <button className="px-4 py-2 border text-xs text-left text-gray-700 hover:bg-gray-100 w-full rounded-t-md">
                    My Shop
                  </button>
                </Link>
                <button
                  onClick={signOutEvent}
                  className="px-4 py-2 text-xs font-bold text-left text-red-700 hover:bg-gray-100 w-full rounded-b-md"
                >
                  Sign out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
