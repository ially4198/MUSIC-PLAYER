import React, { useContext, useState, useEffect } from "react";
import { PlayerContext } from "../CONTEXT/PlayerContext";

import { CiHeart } from "react-icons/ci";
import { VscHeartFilled } from "react-icons/vsc";
import { FaShuffle } from "react-icons/fa6";
import { IoPlaySkipBack } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";
import { IoPlay } from "react-icons/io5";
import { CgPlayPause } from "react-icons/cg";
import { FaRepeat } from "react-icons/fa6";
import { MdLibraryMusic } from "react-icons/md";
import { MdOutlineLibraryMusic } from "react-icons/md";

const PlayerBar = ({ songs, library, setLibrary, likes, setLikes }) => {
  const { togglePlay, playNext, playPrev, playing, currentSong } = useContext(PlayerContext);


  const addToLibrary = () => {
    if (!currentSong) return;
    const exists = library.some((song) => song.id === currentSong.id);
    let updatedLibrary;
    if (exists) {
      updatedLibrary = library.filter((song) => song.id !== currentSong.id);
    } else {
      updatedLibrary = [currentSong, ...library];
    }
    setLibrary(updatedLibrary);

    // save to localStorage
    localStorage.setItem("library", JSON.stringify(updatedLibrary));
  };

  const handleLikedSongs = () => {
    if (!currentSong) return;

    // check if already exists using id
    const exists = likes.some((song) => song.id === currentSong.id);

    let updatedLikes;

    if (exists) {
      // remove if already liked (toggle behavior)
      updatedLikes = likes.filter((song) => song.id !== currentSong.id);
    } else {
      // add to top
      updatedLikes = [currentSong, ...likes];
    }

    setLikes(updatedLikes);
    localStorage.setItem("likes", JSON.stringify(updatedLikes));
  };

  const isInLibrary = library.some((song) => song.id === currentSong?.id);

  const isLiked = likes.some((song) => song.id === currentSong?.id);
  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-[310px] md:translate-x-0 md:w-[calc(100%-330px)] w-[95%] bg-black z-60 border-4 border-red-300/25 text-white rounded-2xl flex justify-between items-center px-3 shadow-lg"
    >
      <div className="flex items-center gap-2 md:gap-3 ml-2">
        {currentSong ? (
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className="w-[45px] h-[45px] md:w-[60px] md:h-[60px]  rounded-lg object-cover"
          />
        ) : (
          <div></div>
        )}

        <div>
          <p className="font-bold text-xs md:text-lg text-white">
            {currentSong?.title || ""}
          </p>

          <p className="text-xs text-gray-300">{currentSong?.artist || ""}</p>
        </div>
      </div>

      <div className="mx-auto  rounded-2xl w-[190px] md:w-[400px] h-20 flex flex-col items-center justify-center gap-3">
        <div className="text-white text-xs md:text-2xl flex gap-3 md:gap-5">
          <button onClick={playPrev}>
            <IoPlaySkipBack />
          </button>
          <button
            onClick={togglePlay}
            className="bg-red-500 p-1.5 rounded-full"
          >
            {!playing ? <IoPlay /> : <CgPlayPause />}
          </button>
          <button onClick={playNext}>
            <IoPlaySkipForward />
          </button>
          <button>
            <FaRepeat />
          </button>
        </div>
      </div>
      <div className=" flex gap-2 mr-2">
        {currentSong ? (
          <button onClick={addToLibrary} className=" text-white">
            {isInLibrary ? (
              <MdOutlineLibraryMusic className="text-xl text-red-500" />
            ) : (
              <MdLibraryMusic className="text-xl" />
            )}
          </button>
        ) : (
          <div></div>
        )}

        
        {currentSong ? (
          <button
            onClick={handleLikedSongs}
            className="text-xl text-white"
          >
            {isLiked ? (
              <VscHeartFilled className="text-xl text-red-500" />
            ) : (
              <CiHeart />
            )}
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default PlayerBar;
