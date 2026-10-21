
import { useState, useEffect } from "react";
import "./App.css";

const movies = [
  { id: 1, title: "Interstellar", year: 2014, rating: 8.7, genre: "Sci-Fi", emoji: "🚀", color: "#283b62" },
  { id: 2, title: "The Dark Knight", year: 2008, rating: 9.0, genre: "Action", emoji: "🦇", color: "#393333" },
  { id: 3, title: "Inception", year: 2010, rating: 8.8, genre: "Thriller", emoji: "🌀", color: "#344d55" },
  { id: 4, title: "La La Land", year: 2016, rating: 8.0, genre: "Romance", emoji: "🎹", color: "#673f68" },
  { id: 5, title: "Dune: Part Two", year: 2024, rating: 8.5, genre: "Sci-Fi", emoji: "🏜️", color: "#76523b" },
  { id: 6, title: "Spider-Man", year: 2002, rating: 7.4, genre: "Action", emoji: "🕷️", color: "#783c43" },
  { id: 7, title: "The Notebook", year: 2004, rating: 7.8, genre: "Romance", emoji: "💌", color: "#5a4d67" },
  { id: 8, title: "Shutter Island", year: 2010, rating: 8.2, genre: "Thriller", emoji: "🌫️", color: "#36414d" },
];

const genres = [
  { name: "All", id: null },
  { name: "Action", id: 28 },
  { name: "Sci-Fi", id: 878 },
  { name: "Thriller", id: 53 },
  { name: "Romance", id: 10749 },
];

function App() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

    
  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError("");

      try {
        const url = search.trim()
          ? `http://localhost:5000/api/movies?query=${encodeURIComponent(search)}`
          : "http://localhost:5000/api/movies";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to load movies");
        }

        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(
          "Unable to load movies. Please check your connection and try again."
        );
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [search]);


  const filteredMovies = movies.filter((movie) => {
  const matchesGenre =
    selectedGenre === "All" ||
    movie.genre_ids?.includes(
      genres.find((genre) => genre.name === selectedGenre)?.id
    );

  return matchesGenre;
  });

  function toggleWatchlist(movieId) {
    setWatchlist((previous) =>
      previous.includes(movieId)
        ? previous.filter((id) => id !== movieId)
        : [...previous, movieId]
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#">
          Reel<span>Scout</span>
        </a>
        <nav>
          <a href="#discover">Discover</a>
          <a href="#watchlist">My Watchlist ({watchlist.length})</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">YOUR NEXT MOVIE NIGHT STARTS HERE</p>
          <h1>Find a film worth <span>staying in for.</span></h1>
          <p className="hero-description">
            Explore stories, discover hidden gems, and build your next watchlist.
          </p>

          <div className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search for a movie..."
              aria-label="Search movies"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </section>

        <section className="movie-section" id="discover">
          <div className="section-heading">
            <div>
              <p className="eyebrow">HANDPICKED FOR YOUR EXPLORATION</p>
              <h2>Discover movies</h2>
            </div>
            <span className="result-count">
              {filteredMovies.length} movies
            </span>
          </div>

          <div className="genre-list" aria-label="Filter by genre">
            {genres.map((genre) => (
              <button
                key={genre.name}
                className={
                  selectedGenre === genre.name ? "genre active" : "genre"
                }
                onClick={() => setSelectedGenre(genre.name)}
                aria-pressed={selectedGenre === genre.name}
              >
                {genre.name}
              </button>
            ))}
          </div>

          {error ? (
              <p className="empty-message" role="alert">
                {error}
              </p>
            ) : loading ? (
              <p className="empty-message">Loading movies...</p>
            ) : filteredMovies.length === 0 ? (
              <p className="empty-message">
                No movies found. Try another title or genre.
              </p>
            ) : (
                <div className="movie-grid">
                  {filteredMovies.map((movie) => (
                    <article className="movie-card" key={movie.id}>
                      <div
                        className="movie-poster"
                        style={{
                          backgroundImage: movie.poster_path
                            ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                            : "none",
                        }}
                      >
                        {!movie.poster_path && <span>🎬</span>}
                      </div>

                      <div className="movie-info">
                        <h3>{movie.title}</h3>
                        <p>
                          {movie.release_date
                            ? movie.release_date.slice(0, 4)
                            : "Year unavailable"}
                        </p>
                        <p>⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}</p>

                        <button
                          onClick={() => toggleWatchlist(movie.id)}
                          className="watchlist-button"
                        >
                          {watchlist.includes(movie.id)
                            ? "Remove from Watchlist"
                            : "Add to Watchlist"}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
          )}
        </section>

        <section className="watchlist-section" id="watchlist">
          <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
          <h2>My Watchlist</h2>
          {watchlist.length === 0 ? (
            <p className="empty-message">
              Your watchlist is empty. Save a movie above to get started.
            </p>
          ) : (
            <div className="watchlist-items">
              {movies
                .filter((movie) => watchlist.includes(movie.id))
                .map((movie) => (
                  <span className="watchlist-chip" key={movie.id}>
                    {movie.title}
                    <button
                      onClick={() => toggleWatchlist(movie.id)}
                      aria-label={`Remove ${movie.title}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <a className="logo" href="#">Reel<span>Scout</span></a>
        <p>Less scrolling. Better movie nights.</p>
      </footer>
    </div>
  );
}

export default App;
