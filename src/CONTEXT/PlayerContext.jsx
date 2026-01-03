import { createContext, useState, useRef, useEffect } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentList, setCurrentList] = useState([]);
  // Load recently played from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentlyPlayed") || "[]");
    setRecentlyPlayed(stored);
  }, []);

  // Get API base URL from environment variable or use relative path for production
  const getApiUrl = () => {
    // In production (Vercel), use relative path to hit serverless functions
    // In development, use localhost:5000 if VITE_API_URL is not set
    if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
    }
    // Check if we're in development mode
    if (import.meta.env.DEV) {
      return 'http://localhost:5000';
    }
    // In production, use relative path (Vercel serverless functions)
    return '';
  };

  // ⭐ Clean, correct, backend-matching search function
  const fetchSearch = async (query, type = "all") => {
    if (!query || query.trim() === "") return [];

    const params = new URLSearchParams();
    params.append("q", query);

    // only add type if searching a specific category
    if (type !== "all") params.append("type", type);
    
    const apiBase = getApiUrl();
    const finalURL = `${apiBase}/api/search?${params.toString()}`;
    console.log("🔵 FRONTEND → BACKEND:", finalURL);

    try {
      const res = await fetch(finalURL);
      if (!res.ok) {
        throw new Error(`Search request failed: ${res.status}`);
      }
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      // avoid unhandled rejections on network errors
      console.error("❌ search fetch failed", err);
      return [];
    }
  };

  // ⭐ Playlist API (keep same)
  const fetchPlaylist = async (playlistId) => {
    const apiBase = getApiUrl();
    const res = await fetch(`${apiBase}/api/playlist/${playlistId}`);
    const data = await res.json();
    return data;
  };

  // ⭐ Play a song
  const playSong = (song, index, list) => {
    if (!song || !song.src) return;

    setCurrentSong(song);
    setCurrentIndex(index);
    setCurrentList(list);
    // Update recently played
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((item) => item.src !== song.src);
      const updated = [song, ...filtered].slice(0, 20);
      localStorage.setItem("recentlyPlayed", JSON.stringify(updated));
      return updated;
    });

    audioRef.current.src = song.src;
    audioRef.current.play();
    setPlaying(true);
  };
  const playNext = () => {
    if (!currentList || currentList.length === 0) return;

    const nextIndex =
      currentIndex === currentList.length - 1 ? 0 : currentIndex + 1;

    playSong(currentList[nextIndex], nextIndex, currentList);
  };

  const playPrev = () => {
    if (!currentList || currentList.length === 0) return;

    const prevIndex =
      currentIndex === 0 ? currentList.length - 1 : currentIndex - 1;

    playSong(currentList[prevIndex], prevIndex, currentList);
  };

  // ⭐ Toggle play / pause
  const togglePlay = () => {
    if (!currentSong) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        playing,
        playSong,
        togglePlay,
        audioRef,
        recentlyPlayed,
        playNext,
        playPrev,
        // APIs
        fetchSearch,
        fetchPlaylist,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
