import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies } from "../redux/moviesSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.popular);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  return (
    <div className="popular-movies">
      <h2 className="page-title">Popular Movies</h2>
      <div className="movies-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`} className="movie-card-link">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="movie-card-img"
              />
            </Link>
            <div className="movie-card-content">
              <h3 className="movie-card-title">{movie.title}</h3>
              <p className="movie-card-description">{movie.overview}</p>
              <div className="movie-rating">
                <span className="rating-text">Rating:</span>
                <span className="rating-value">{movie.vote_average}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
