
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/movies", async (req, res) => {
  try {
    const query = req.query.query;

    let url;

    if (query) {
      url = new URL("https://api.themoviedb.org/3/search/movie");
      url.searchParams.set("query", query);
    } else {
      url = new URL("https://api.themoviedb.org/3/movie/popular");
    }

    url.searchParams.set("api_key", process.env.TMDB_API_KEY);

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        message: "TMDB could not provide movie data.",
      });
    }

    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    console.error("Movie request failed:", error.message);

    res.status(500).json({
      message: "Unable to load movies. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`ReelScout backend running on http://localhost:${PORT}`);
});
