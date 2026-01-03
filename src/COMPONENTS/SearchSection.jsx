
import React, { useContext } from "react";
import { PlayerContext } from "../CONTEXT/PlayerContext";

const SearchSection = ({ query, searchType, songs }) => {
  const { playSong } = useContext(PlayerContext);

  // --- Normalizers ---
  const normalizeArtist = (a) => ({
    id: a.id,
    name: a.name,
    picture: a.picture_medium,
  });

  const normalizeAlbum = (a) => ({
    id: a.id,
    title: a.title,
    artist: a.artist?.name,
    cover: a.cover_medium,
  });

  const normalizeSong = (t) => ({
    id: t.id,
    title: t.title,
    artist: t.artist?.name,
    cover: t.album?.cover_medium,
    src: t.preview,
  });

  // ⭐ Normalize songs once so we can use it as the FULL LIST
  // const normalizedSongs =
  //   searchType === "artist" || searchType === "album"
  //     ? []
  //     : songs.map((t) => normalizeSong(t));

  const normalizedSongs =
  searchType === "song" || searchType === "all"
    ? songs.map((t) => normalizeSong(t))
    : [];

  // -------- UI for ARTISTS --------
  const ArtistCard = ({ a }) => (
    <div
      key={a.id}
      className="p-3 rounded-xl cursor-pointer bg-red-300/10 hover:border-4 border-white flex gap-3 items-center"
    >
      <img
        src={a.picture}
        className="w-[80px] h-[80px] rounded object-cover"
      />
      <h1 className="text-white font-bold">{a.name}</h1>
    </div>
  );

  // -------- UI for ALBUMS --------
  const AlbumCard = ({ a }) => (
    <div
      key={a.id}
      className="p-3 rounded-xl cursor-pointer bg-red-300/10 hover:border-4 border-white flex gap-3 items-center"
    >
      <img
        src={a.cover}
        className="w-[80px] h-[80px] rounded object-cover"
      />
      <div>
        <h1 className="text-white font-bold">{a.title}</h1>
        <p className="text-gray-400 text-sm">{a.artist}</p>
      </div>
    </div>
  );

  // -------- UI for SONGS --------
  const SongCard = ({ s, index, list }) => (
    <div
      key={s.id}
      className="p-3 rounded-xl cursor-pointer bg-red-300/10 hover:border-4 border-white flex gap-3 items-center"
      onClick={() => s.src && playSong(s, index, list)}  
    >
      <img
        src={s.cover}
        className="w-[80px] h-[80px] rounded object-cover"
      />
      <div>
        <h1 className="text-white font-bold">{s.title}</h1>
        <p className="text-gray-400 text-sm">{s.artist}</p>
        {!s.src && (
          <span className="text-red-400 text-xs">(No preview)</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="mt-[30px] w-[90%] md:w-full mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {songs.length === 0 ? (
          <div className="text-2xl md:text-4xl mt-20 mx-auto col-start-1 col-end-3">
            Your Search Here!
          </div>
        ) : (
          songs.map((item, index) => {
            if (searchType === "artist") {
              const artist = normalizeArtist(item);
              return <ArtistCard a={artist} key={artist.id} />;
            }

            if (searchType === "album") {
              const album = normalizeAlbum(item);
              return <AlbumCard a={album} key={album.id} />;
            }

            // Default → SONG LAYOUT
            const song = normalizeSong(item);
            return (
              <SongCard
                s={song}
                index={index}
                list={normalizedSongs}
                key={song.id}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default SearchSection;
