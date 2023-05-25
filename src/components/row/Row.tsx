import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import instance from "../../api/apiClient";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Movie from "../movie/Movie";
import "../../App.css";
import { useAuth } from "../../context/auth/AuthContext";
import { db } from "../../firebase/firebase";
import { getDoc, doc, DocumentReference } from "firebase/firestore";
interface props {
  endPoint: string;
  heading: string;
  rowId: string;
  savedShows: any;
}
const Row: React.FC<props> = ({ endPoint, heading, rowId, savedShows }) => {
  const fetchRowData = useQuery(endPoint, () => instance.get(endPoint), {
    refetchOnWindowFocus: false,
  });
  const rowsMovies = fetchRowData.data?.data?.results;
  const slideLeft = () => {
    const slider = document.getElementById("slider" + rowId);
    if (slider) {
      slider.scrollLeft = slider.scrollLeft - 500;
    }
  };
  const slideRight = () => {
    const slider = document.getElementById("slider" + rowId);
    if (slider) {
      slider.scrollLeft = slider.scrollLeft + 500;
    }
  };
  return (
    <div className="relative group">
      {fetchRowData.isLoading ? (
        <Loading />
      ) : (
        <div className=" text-4xl ">
          <h2>{heading}</h2>
          <MdChevronLeft
            className="absolute left-0 top-[40%] z-20 cursor-pointer bg-white rounded-full opacity-50 hover:opacity-100 hidden group-hover:block"
            color="#000"
            onClick={() => slideLeft()}
          />
          <div
            id={"slider" + rowId}
            className="w-full h-full overflow-x-scroll whitespace-nowrap min-h-[160px]  scroll-smooth scrollbar-hide"
          >
            {rowsMovies.map((item: any, id: any) => (
              <Movie movie={item} key={id} savedMovies={savedShows} />
            ))}
          </div>
          <div>
            <MdChevronRight
              className="absolute right-0 top-[40%] z-20 cursor-pointer bg-white rounded-full opacity-50  hover:opacity-100 hidden group-hover:block "
              color="#000"
              onClick={() => slideRight()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Row;
