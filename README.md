# 🎬 ReelScout — Discover Your Next Favourite Movie

ReelScout is a movie-discovery web application that helps users explore popular movies, search for specific titles, filter movies by genre, and maintain a personal watchlist.

Built with React and Express, the project integrates with The Movie Database (TMDB) API to retrieve real movie data while keeping the API key on the backend.

## ✨ Features

- **Browse Popular Movies:** Discover movies using live TMDB data.
- **Movie Search:** Search for movies by title.
- **Genre Filtering:** Filter displayed movies by genre.
- **Watchlist:** Add movies to your watchlist or remove them when you're done.
- **Movie Details:** View movie posters, release years, and ratings.
- **Loading and Error States:** Display feedback while data loads or when a request fails.
- **Responsive Interface:** A dark-themed interface designed for a clean movie-browsing experience.

## 🛠️ Tech Stack

**Frontend**
- React
- JavaScript
- Vite
- CSS

**Backend**
- Node.js
- Express.js
- CORS
- dotenv

**API**
- [The Movie Database (TMDB)](https://www.themoviedb.org/)

**Deployment**
- Frontend: Vercel
- Backend: Render
- Version Control: Git and GitHub

## 🏗️ Project Structure

```text
ReelScout/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .gitignore
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── .gitignore
└── README.md
```

## ⚙️ Run Locally

### Prerequisites

- Node.js and npm
- A TMDB API key

### 1. Clone the repository

```bash
git clone https://github.com/asmi-1728/ReelScout.git
cd ReelScout
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
TMDB_API_KEY=your_tmdb_api_key
```

Start the backend:

```bash
node server.js
```

The backend runs locally at `http://localhost:5000`.

### 3. Configure the frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

Ensure the frontend API URL points to your local backend when running locally. For the deployed website, it should point to your hosted backend.

## 🔌 API Endpoint

The Express backend exposes an endpoint for retrieving movie data.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/movies` | Fetch popular movies |
| GET | `/api/movies?query=batman` | Search movies by title |

The backend communicates with TMDB and returns movie results to the frontend.

## 🔐 Environment Variables

The backend requires the following environment variable:

| Variable | Description |
|---|---|
| `TMDB_API_KEY` | API key used to access TMDB |

**Security:** Keep your `.env` file private. It should never be committed to GitHub. Configure the same variable securely in your backend hosting provider.

## 🚀 Live Demo

- **Website:** https://reelscout-sooty.vercel.app/
- **Source Code:** [ReelScout on GitHub](https://github.com/asmi-1728/ReelScout)

## 📚 What I Learned

Through this project, I practised:

- Building a user interface with React components and state.
- Fetching API data using JavaScript's `fetch`, promises, and `async/await`.
- Managing loading, error, and empty states.
- Building backend API routes using Express.
- Using environment variables to protect API credentials.
- Connecting a frontend to a backend service.
- Using Git and GitHub for version control.
- Deploying a full-stack application using Vercel and Render.

## 🙌 Acknowledgements

Movie data and posters are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

This project uses the TMDB API but is not endorsed or certified by TMDB.
