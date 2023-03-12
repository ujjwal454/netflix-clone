import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../../context/auth/AuthContext";
import { db } from "../../firebase/firebase";
import { updateDoc, arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
interface props {
  movie: any;
  savedMovies: any;
}

const Movie: React.FC<props> = ({ movie, savedMovies }) => {
  const { authenticated, user } = useAuth();
  const [SavedMovies, setSavedMovies] = React.useState(savedMovies);
  const [like, setLike] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (!authenticated) {
      setLike(false);
    }
  }, [authenticated]);
  React.useEffect(() => {
    if (SavedMovies && SavedMovies.length > 0) {
      savedMovies.forEach((item: any) => {
        if (item?.id === movie?.id) {
          setLike(true);
          return;
        }
      });
    }
  }, []);
  const handleLike = async () => {
    if (!authenticated) {
      alert("to add this show in to your favorates you must login");
    } else {
      setLike(true);
      let email;
      if (user.email) {
        email = user.email;
      } else {
        email = user?.user?.email;
      }
      const movieId = doc(db, "users", email);
      await updateDoc(movieId, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title || movie.name,
          img: movie.backdrop_path || movie.poster_path,
        }),
      });
    }
  };
  const handleDislike = async (id: number) => {
    if (!authenticated) {
      alert("You must logged in first");
    } else {
      let email;
      if (user.email) {
        email = user.email;
      } else {
        email = user.user.email;
      }
      const movieId = doc(db, "users", email);
      setLike(false);
      const collection = await getDoc(movieId);
      const savedMovies = collection.data()?.savedShows;
      const newShows = savedMovies.filter((item: any) => item.id !== id);
      setDoc(movieId, {
        savedShows: newShows,
      })
        .then((data) => {
          setSavedMovies(newShows);
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    }
  };
  return (
    <div className="w-[160px] sm:w-[200px]  md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt="posters"
        loading="lazy"
        className="block  object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p
          className="text-xs md:text-sm absolute top-4 left-4"
          onClick={() => {
            if (like) {
              handleDislike(movie?.id);
            } else {
              handleLike();
            }
          }}
        >
          {like ? <FaHeart /> : <FaRegHeart />}
        </p>
        <p className="whitespace-normal flex justify-center items-center text-white text-xs md:text-sm font-bold h-full ">
          {movie?.original_name || movie?.original_title}
        </p>
      </div>
    </div>
  );
};

export default Movie;
