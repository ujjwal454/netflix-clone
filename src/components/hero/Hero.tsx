import React from "react";
import { trumpcate } from "../../Helpers";
interface props {
  BrandMovies: any[];
}
const Hero: React.FC<props> = ({ BrandMovies }) => {
  const randomMovie =
    BrandMovies[Math.floor(Math.random() * BrandMovies.length)];
  return (
    <div className="w-full h-[500px] relative">
      <div className=" absolute top-0 w-full h-[500px] bg-gradient-to-r from-black opacity-1"></div>
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-white absolute top-[25%] p-5 ">
          {/* Movie Name */}
          <h1 className="text-3xl mb-5  md:text-5xl font-bold">
            {randomMovie?.name ||
              randomMovie?.original_name ||
              randomMovie.original_title}
          </h1>
          {/* btn container */}
          <div>
            <button className="border py-2 px-5 bg-gray-50 text-black p-2 mr-2 cursor-pointer font-bold">
              Play
            </button>
            <button className="border-gray-50 border-solid border py-2 px-5 font-bold">
              Watch Later
            </button>
          </div>
          {/* content contianer */}
          <div>
            <p className="mt-2 text-gray-400">
              Released:{" "}
              {randomMovie?.first_air_date || randomMovie?.release_date}
            </p>
            <p className="mt-2 md:text-2xl text-base">
              {trumpcate(randomMovie?.overview, 400)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
