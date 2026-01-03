import React, { useEffect } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./PAGES/HomePage";
import Search from "./PAGES/Search";
import Library from "./PAGES/Library";
import SideBar from "./COMPONENTS/SideBar";
import NavBar from "./COMPONENTS/NavBar";
import PlayerBar from "./COMPONENTS/PlayerBar";
import LikedSongs from "./PAGES/LikedSongs";
import Recent from "./PAGES/Recent";

const App = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [songs, setSongs] = useState([]);
  const [likes, setLikes] = useState([]);
  const [library, setLibrary] = useState([]);
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likes") || "[]");
    setLikes(storedLikes);
  }, []);
  useEffect(() => {
    const storedLibrary = JSON.parse(localStorage.getItem("library") || "[]");
    setLibrary(storedLibrary);
  }, []);
  return (
    <div className=" bg-black/30">
      <NavBar open={open} setopen={setOpen} />
      <div className="absolute md:relative top-12 md:top-0 z-50 md:z-0 md:p-2">
        <SideBar open={open} setopen={setOpen} />
      </div>
      <div className=" ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/Search"
            element={
              <Search
                query={query}
                setQuery={setQuery}
                searchType={searchType}
                setSearchType={setSearchType}
                songs={songs}
                setSongs={setSongs}
              />
            }
          />
          <Route
            path="/Library"
            element={<Library library={library} setLibrary={setLibrary} />}
          />
          <Route path="/LikedSongs" element={<LikedSongs likes={likes} />} />
          <Route path="/Recent" element={<Recent />} />
        </Routes>
      </div>
       <div className=" ml-[2.5%] ">
          <PlayerBar
            songs={songs}
            library={library}
            setLibrary={setLibrary}
            likes={likes}
            setLikes={setLikes}
          />
        </div>
    </div>
  );
};

export default App;
