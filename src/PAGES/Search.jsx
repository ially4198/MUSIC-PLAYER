import React, { useContext, useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { PlayerContext } from "../CONTEXT/PlayerContext";
import SearchSection from "../COMPONENTS/SearchSection";

const Search = ({
  query,
  setQuery,
  searchType,
  setSearchType,
  songs,
  setSongs,
}) => {
  const { fetchSearch } = useContext(PlayerContext);
  const [text, setText] = useState(""); // input field control
  const [appliedType, setAppliedType] = useState("all");
  const [recent, setRecent] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearches") || "[]");
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const handleSearch = async () => {
    if (!text.trim()) return;
    const updated = [text, ...recent.filter((r) => r !== text)].slice(0, 8);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setAppliedType(searchType);
    const results = await fetchSearch(text, searchType);
    setSongs(results || []);
    setQuery(text);
  };
  useEffect(() => {
    console.log("searchType changed:", searchType);
  }, [searchType]);
  const types = [
    { label: "All", value: "all" },
    { label: "Artist", value: "artist" },
    { label: "Song", value: "song" },
    { label: "Album", value: "album" },
  ];

  const recentSearchs = () => {
    <div></div>;
  };
  return (
    <div className="h-142.5  text-white bg-black  md:ml-[310px] flex flex-col items-center">
      {/* Search bar */}
      <div className="mt-14  md:mt-5 flex">
        <input
          type="text"
          placeholder="Search"
          className="bg-red-300/8 w-70 h-10 rounded-2xl p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setTimeout(() => setShowTooltip(false), 150)}
        />
        {showTooltip && recent.length > 0 && (
          <div className="absolute bg-black text-white p-3 mt-12 w-72 rounded-xl shadow-xl backdrop-blur-lg z-20">
            <h3 className="text-sm text-gray-300 mb-2">Recent Searches</h3>

            {recent.map((item) => (
              <div
                key={item}
                className="p-2 hover:bg-red-300/5 rounded cursor-pointer"
                onClick={async () => {
                  setText(item);
                  setShowTooltip(false);

                  // run search again
                  setAppliedType(searchType);
                  const results = await fetchSearch(item, searchType);
                  setSongs(results || []);
                  setQuery(item);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch;
            }
          }}
          className="-ml-8"
        >
          <IoSearchOutline className="text-xl" />
        </button>
      </div>

      {/* Category buttons */}
      <div className="w-[90%] bg-black mt-5  border-4 border-red-300/5 h-20 items-center rounded-2xl rounded-b-none ">
        <div className="flex justify-between w-[95%] mx-auto">
          {types.map((t, i) => (
            <button
              key={i}
              onClick={() => setSearchType(t.value)}
              className={`
          s-btn
          transition-all duration-300
          ${
            searchType === t.value
              ? "bg-red-800 text-white scale-105 shadow-md"
              : "bg-transparent text-gray-300 hover:bg-red-600/20"
          }
        `}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results box */}
      <div className=" bg-red-300/5 w-[90%] h-80 overflow-y-auto custom-scrollbar rounded-2xl rounded-t-none flex flex-col p-3">
        {/* Render Section here */}
        <SearchSection
          query={query}
          searchType={appliedType}
          songs={songs}
          setSongs={setSongs}
        />
      </div>
    </div>
  );
};

export default Search;
