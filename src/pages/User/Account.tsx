import React from "react";
import Navbar from "../../components/navbar/navbar";
import SavedShows from "../../components/savedShows/SavedShows";
const Account: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="w-full text-white">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          className="w-full h-[450px]  object-cover"
          alt="/"
        />
        <div className="w-full h-[500px] fixed top-0 left-0 bg-black/50" />
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-4xl font-bold">My Shows</h1>
        </div>
      </div>
      <SavedShows />
    </>
  );
};

export default Account;
