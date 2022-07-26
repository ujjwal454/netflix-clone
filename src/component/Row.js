import React, { useEffect, useState } from "react";
import axios from "../Axios/axios";
const Row = ({ title, isLargeRow, fetchUrl }) => {
  console.log(title);
  const [Movie, setMovie] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovie(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row-poster">
        {Movie.map((movie) => {
          return (
            <img
              src={`${baseUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt="Banner"
              className={` ${isLargeRow ? "large-image" : "row-image"}`}
              key={movie.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Row;
