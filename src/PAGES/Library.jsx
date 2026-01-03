import React, { useContext } from "react";
import { PlayerContext } from "../CONTEXT/PlayerContext";

const Library = ({ library }) => {
  const { playSong } = useContext(PlayerContext);

  return (
    <div className="h-screen text-white bg-black md:ml-[310px] flex flex-col gap-7 items-center pb-24">
      <div className="mt-14 md:mt-6">
        <h1 className="text-3xl font-bold">Your Library</h1>
      </div>

      {/* SAVED SONGS */}
      <div className="bg-red-300/5 w-[90%] h-50 overflow-y-auto custom-scrollbar rounded-2xl p-4">
        <h2 className="text-xl mb-3">Saved Songs</h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {library.length === 0 ? (
            <div className="mx-auto col-start-1 col-end-2 md:col-end-3 mt-10 text-2xl md:text-3xl text-gray-300">
              Library Is Empty!
            </div>
          ) : (
            library.map((song) => (
              <div
                key={song.id}
                className="sec-card p-3 cursor-pointer hover:bg-gray-800 rounded flex gap-3 items-center"
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

      {/* PLAYLISTS SECTION */}
      <div className="bg-red-300/5 w-[90%] h-45 overflow-y-auto custom-scrollbar rounded-2xl p-4">
        <h2 className="text-xl">Playlists</h2>
        <p className="text-gray-400 mt-4">Coming soon...</p>
      </div>
    </div>
  );
};

export default Library;
