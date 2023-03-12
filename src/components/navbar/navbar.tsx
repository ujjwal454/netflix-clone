import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { authenticated, signOutUser } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [scrollY, setScrollY] = React.useState<number>(0);
  const removeLoading = () => {
    setLoading(false);
  };
  const handleSignout = () => {
    setLoading(true);
    signOutUser(removeLoading);
  };
  React.useEffect(() => {
    const updatePosition = () => {
      setScrollY(window.scrollY);
    };
    document.addEventListener("scroll", updatePosition);
    return () => {
      document.removeEventListener("scroll", updatePosition);
    };
  }, []);
  return (
    <div
      className={`transition-all duration-500 flex items-center justify-between p-7 fixed w-full top-0 h-15 z-10 ${
        scrollY > 51 ? "bg-black/90" : "bg-transparent"
      }`}
    >
      <h1
        className="text-4xl text-red-700 font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        NETFLIX
      </h1>
      <div>
        {authenticated ? (
          <>
            <button
              className="cursor-pointer font-bold"
              onClick={() => navigate("/account")}
            >
              Account
            </button>
            <button
              className="bg-red-600 p-2 ml-4 cursor-pointer font-bold"
              onClick={() => handleSignout()}
              disabled={loading}
            >
              {loading ? "Signing out ..." : "logout"}
            </button>
          </>
        ) : (
          <>
            <button
              className="cursor-pointer font-bold"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
            <button
              className="bg-red-600 p-2 ml-4 cursor-pointer font-bold"
              onClick={() => navigate("/signUp")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
