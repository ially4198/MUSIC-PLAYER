
import React from "react";
import { Link } from "react-router-dom";

import { AiOutlineHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { MdLibraryMusic } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { BsSoundwave } from "react-icons/bs";
import { LuHistory } from "react-icons/lu";

const SideBar = ({ open, setopen }) => {
  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={() => setopen(false)}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 md:hidden
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Sidebar */}
      <div
        className={`fixed md:translate-x-0 bg-black rounded-2xl text-white 
        w-[220px] md:w-[290px] transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-6 p-4">

          {/* Logo */}
          <div className="flex justify-center font-extrabold text-xl">
            <div className="flex gap-2 items-center">
              <BsSoundwave className="text-3xl" /> WAVEFORM
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="nav-s">
              <AiOutlineHome className="text-xl" /> Home
            </Link>

            <Link to="/search" className="nav-s">
              <IoSearchOutline className="text-xl" /> Search
            </Link>
          </div>

          {/* Library Section */}
          <div className="flex flex-col gap-3">
            <p className="text-gray-400 text-sm">LIBRARY</p>

            <Link to="/library" className="nav-s">
              <MdLibraryMusic className="text-xl" /> Your Library
            </Link>

            <Link to="/LikedSongs" className="nav-s">
              <CiHeart className="text-xl" /> Liked Songs
            </Link>

            <Link to="/Recent" className="nav-s">
              <LuHistory className="text-xl" /> Recently Played
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default SideBar;
