import React from "react";
import Loading from "../Loading/Loading";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import SingleMovie from "./SingleMovie";
import "../../App.css";
import { useAuth } from "../../context/auth/AuthContext";
import { db } from "../../firebase/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
interface props {}
const SavedShows: React.FC<props> = () => {
  const [fetchRowData, setfetchRowData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { user } = useAuth();
  React.useEffect(() => {
    setLoading(true);
    let email;
    user.email ? (email = user.email) : (email = user.user.email);
    const movieRef = doc(db, "users", email);
    getDoc(movieRef).then((data) => {
      setfetchRowData(data.data()?.savedShows);
      setLoading(false);
    });
  }, []);
  const slideLeft = () => {
    const slider = document.getElementById("slider");
    if (slider) {
      slider.scrollLeft = slider.scrollLeft - 500;
    }
  };
  const slideRight = () => {
    const slider = document.getElementById("slider");
    if (slider) {
      slider.scrollLeft = slider.scrollLeft + 500;
    }
  };
  const handleRemove = (id: number) => {
    const newShows = fetchRowData.filter((item: any) => item.id !== id);
    setfetchRowData(newShows);
    let email;
    user.email ? (email = user.email) : (email = user.user.email);
    setDoc(doc(db, "users", email), {
      savedShows: newShows,
    }).catch((err) => {
      alert("there was some error occured while removing a saved show");
      console.log(err);
    });
  };
  return (
    <div className="container relative group">
      {loading ? (
        <Loading />
      ) : (
        <div className=" text-4xl p-2 ">
          <h1 className="text-gray-300">Saved Shows</h1>
          <MdChevronLeft
            className="absolute left-0 top-[40%] z-20 cursor-pointer bg-white rounded-full opacity-50 hover:opacity-100 hidden group-hover:block"
            color="#000"
            onClick={() => slideLeft()}
          />
          <div
            id={"slider"}
            className="w-full h-full overflow-x-scroll whitespace-nowrap min-h-[160px]  scroll-smooth scrollbar-hide"
          >
            {fetchRowData.map((item: any, id: any) => (
              <SingleMovie
                handleRemove={handleRemove}
                key={item.id}
                movie={item}
              />
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

export default SavedShows;
