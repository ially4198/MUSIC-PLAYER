import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../CONTEXT/PlayerContext";
const RecentlyPlayed = () => {
  const { recentlyPlayed } = useContext(PlayerContext);
  const { playSong } = useContext(PlayerContext);

  return (
    <>
      <div className=" mt-[30px] w-[90%] md:w-full mx-auto">
        <h1 className="mb-2 text-white">Recently Played</h1>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2    ">
          {recentlyPlayed.length === 0 ? (
            <div className=" mx-auto mt-20  md:col-start-1 md:col-end-3 text-2xl md:text-4xl text-white">
              NO RECENTS!
            </div>
          ) : (
            recentlyPlayed.slice(0, 6).map((song, index) => (
              <div
                key={index}
                className="sec-card p-3 cursor-pointer hover:bg-gray-800 rounded"
                onClick={() => playSong(song)}
              >
                <div>
                  <img src={song.cover} className="rounded w-[80px] h-[80px]" />
                </div>
                <div>
                  <h1 className="text-white font-bold">{song.title}</h1>
                  <p className="text-gray-400 text-sm">{song.artist}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default RecentlyPlayed;
