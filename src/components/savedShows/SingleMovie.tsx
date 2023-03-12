import { FaHeart } from "react-icons/fa";
import React from "react";
interface props {
  movie: any;
  handleRemove: (id: number) => void;
}
const SingleMovie: React.FC<props> = ({ movie, handleRemove }) => {
  return (
    <div className="w-[160px] sm:w-[200px]  md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie?.img}`}
        alt="posters"
        loading="lazy"
        className="block  object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p
          className="text-xs md:text-sm absolute top-4 left-4"
          onClick={() => handleRemove(movie.id)}
        >
          <FaHeart />
        </p>
        <p className="whitespace-normal flex justify-center items-center text-white text-xs md:text-sm font-bold h-full ">
          {movie?.title}
        </p>
      </div>
    </div>
  );
};

export default SingleMovie;
