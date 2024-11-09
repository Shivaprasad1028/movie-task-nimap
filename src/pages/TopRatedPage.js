import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRatedMovies } from "../redux/moviesSlice";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

const TopRatedPage = () => {
  const dispatch = useDispatch();
  const { topRated, loading, error } = useSelector((state) => state.movies);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTopRatedMovies(page));
  }, [dispatch, page]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

 
  if (!Array.isArray(topRated)) {
    return <div>No movies available</div>;
  }

  return (
    <div className="top-rated-page">
      <h2 className="page-title">Top Rated Movies</h2>
      <div className="movies-container">
        {topRated.length > 0 ? (
          topRated.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="movie-card-link"
            >
            
              <div className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-card-img"
                />
                <div className="movie-card-content">
                  <h3 className="movie-card-title">{movie.title}</h3>
                  <p className="movie-card-description">{movie.overview}</p>
                  <div className="movie-rating">
                    <span className="rating-text">Rating: </span>
                    <span className="rating-value">{movie.vote_average}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-movies-message">No top-rated movies found.</div>
        )}
      </div>
      <Pagination currentPage={page} onPageChange={setPage} />
    </div>
  );
};

export default TopRatedPage;
