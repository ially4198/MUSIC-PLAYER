// import express from "express";
// import cors from "cors";

// const app = express();
// app.use(cors());

// // Proxy Route
// app.get("/api/search", async (req, res) => {
//   try {
//     // const query = req.query.q;

//     // if (!query || query.trim() === "") {
//     //   return res.status(400).json({ error: "Query cannot be empty" });
//     // }

//     // // Call Deezer API
//     // const response = await fetch(`https://api.deezer.com/search?q=${query}`);

//     // if (!response.ok) {
//     //   throw new Error("Failed to fetch from Deezer API");
//     // }

//     // const data = await response.json();

//     // return res.json(data);
//     const { q, type } = req.query;

//   let url = "https://api.deezer.com/search";

//   if (type === "artist") url = "https://api.deezer.com/search/artist";
//   if (type === "album") url = "https://api.deezer.com/search/album";
//   if (type === "playlist") url = "https://api.deezer.com/search/playlist";
//   if (type === "song") url = "https://api.deezer.com/search/track";

//   const response = await fetch(`${url}?q=${q}`);
//   const data = await response.json();
//   res.json(data);

//   } catch (error) {
//     console.error("Backend Error:", error.message);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Start Server
// app.listen(5000, () => {
//   console.log("Proxy server running on http://localhost:5000");
// });

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/search", async (req, res) => {
  try {
    const { q, type } = req.query;

    let url = "https://api.deezer.com/search";

    if (type === "artist") url = "https://api.deezer.com/search/artist";
    if (type === "album") url = "https://api.deezer.com/search/album";
    if (type === "playlist") url = "https://api.deezer.com/search/playlist";
    if (type === "song") url = "https://api.deezer.com/search/track";
    console.log("➡️ BACKEND → Deezer:", `${url}?q=${q}`);
    const response = await fetch(`${url}?q=${q}`);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Backend Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Proxy server running on http://localhost:5000");
});
