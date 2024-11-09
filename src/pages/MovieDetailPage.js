import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetailPage = () => {
  const { id } = useParams(); // Get movie ID from URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const detailsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743`
        );
        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743`
        );

        setMovieDetails(detailsResponse.data);
        setMovieCast(castResponse.data.cast.slice(0, 10)); // Get top 10 cast members
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movieDetails) {
    return <p>Movie details not available.</p>;
  }

  // Convert runtime into hours and minutes
  const runtimeHours = Math.floor(movieDetails.runtime / 60);
  const runtimeMinutes = movieDetails.runtime % 60;

  // Format release date
  const formattedDate = new Date(movieDetails.release_date).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div className="detail-main" id="detail">
      <div
        className="movie-detail-page"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`,
        }}
      >
        <div className="movie-detail-overlay">
          <div className="movie-detail-container">
            <div className="movie-top">
              <div className="bg-img">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                  className="movie-detail-poster"
                />
              </div>
              <div className="movie-info">
                <h2>{movieDetails.title}</h2>
                <p>
                  <strong>Release Date:</strong> {formattedDate}
                </p>
                <p>
                  <strong>Rating:</strong> {movieDetails.vote_average}
                </p>
                <div className="runtime">
                  <p>
                    {" "}
                    {runtimeHours}h {runtimeMinutes}min
                  </p>
                  <p>
                    {movieDetails.genres.map((genre) => genre.name).join(", ")}
                  </p>
                </div>
              </div>
            </div>
            <p className="overview">
              <strong>Overview:</strong> {movieDetails.overview}
            </p>

            <div className="movie-detail-content">
              <h3>Cast</h3>
              <ul className="movie-cast-list">
                {movieCast.map((actor) => (
                  <li key={actor.cast_id} className="cast-member">
                    {actor.profile_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                        alt={actor.name}
                        className="cast-member-photo"
                      />
                    )}
                    <p>
                      <strong>{actor.name}</strong> as {actor.character}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
