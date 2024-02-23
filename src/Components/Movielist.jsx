// Movielist.js
import React from 'react';
import './Movielist.css'; // Import the CSS file

const MovieList = (props) => {
  return (
    <div className="flex flex-wrap justify-center ">
      {props.movies.map((movie, index) => (
        <a key={index} href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.Title + ' ' + movie.Year)}`} target="_blank" rel="noopener noreferrer" className="m-4 w-64 movie-container">
          <div className="relative">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover movie-image" />
            <div className="absolute bottom-0 left-0 w-full h-32 movie-details">
              <div className="p-2">
                <h2 className="text-white text-lg font-bold movie-title">title : {movie.Title}</h2>
                <p className="text-white text-sm movie-info">year : {movie.Year}</p>
                <p className="text-white text-sm movie-info"> type : {movie.Type}</p>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default MovieList;
