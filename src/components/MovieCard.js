import React from 'react';

const MovieCard = ({ movie }) => (
  <div className=''>
    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
    <h3>{movie.title}</h3>
  </div>
);

export default MovieCard;
