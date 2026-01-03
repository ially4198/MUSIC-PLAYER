import React, { useContext } from "react";
import { PlayerContext } from "../CONTEXT/PlayerContext";

const LikedSongs = ({ likes }) => {
  const { playSong } = useContext(PlayerContext);
  return (
    <div className="h-screen text-white bg-black md:ml-[310px] flex flex-col gap-7 items-center pb-24">
      <div className="mt-14 md:mt-6">
        <h1 className="text-3xl font-bold">Favorites</h1>
      </div>

      {/* SAVED SONGS */}
      <div className="bg-red-300/5 w-[90%] h-80 overflow-y-auto custom-scrollbar rounded-2xl p-4">
        <h2 className="text-xl mb-3">Liked Songs</h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {likes.length === 0 ? (
            <div className="mx-auto mt-10 col-start-1 col-end-2 md:col-end-3 text-2xl md:text-3xl text-gray-300">
              No Liked Songs Yet
            </div>
          ) : (
            likes.map((song) => (
              <div
                key={song.id}
                className="p-3 rounded-xl cursor-pointer  bg-red-300/10 hover:border-4 border-white flex gap-3 items-center"
                onClick={() => playSong(song)}
              >
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-[80px] h-[80px] rounded object-cover"
                />

                <div>
                  <h1 className="text-white font-bold">{song.title}</h1>
                  <p className="text-gray-400 text-sm">{song.artist}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedSongs;
