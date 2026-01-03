import React from "react";
import HeroBanner from "../COMPONENTS/HeroBanner";
import RecentlyPlayed from "../COMPONENTS/RecentlyPlayed";

const HomePage = () => {
  return (
    <>
      <div className="relative md:ml-[270px]  bg-black p-3 w-full md:w-[80%] flex flex-col items-center">
        <HeroBanner />
        <div className=" overflow-y-auto custom-scrollbar bg-black h-80 mt-2 w-full">
          <RecentlyPlayed />
        </div>
      </div>
    </>
  );
};

export default HomePage;
