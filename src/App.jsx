import React, { useEffect, useState } from "react";
import Movielist from "./Components/Movielist";
import Searchbox from "./Components/Searchbox";
import "./App.css";

const App = () => {
  const [defaultMovies, setDefaultMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getMovieRequest = async (query, page) => {
    setLoading(true);

    const url = `http://www.omdbapi.com/?s=${query}&apikey=a9410e61&page=${page}`;

    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.Search) {
        return responseJson.Search;
      } else {
        console.error("No movies found in the response.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleSearchButtonClick = async () => {
    setCurrentPage(1);
    const searchQuery = searchValue.trim();

    if (searchQuery !== "") {
      const searchResults = await getMovieRequest(searchQuery, 1);
      setSearchMovies(searchResults);
      setDefaultMovies([]); // Clear default movies when searching
    }
  };

  const handleLoadMoreButtonClick = async () => {
    const nextPage = currentPage + 1;
    const searchQuery = searchValue.trim();

    if (searchQuery !== "") {
      const searchResults = await getMovieRequest(searchQuery, nextPage);
      setSearchMovies((prevMovies) => [...prevMovies, ...searchResults]);
      setCurrentPage(nextPage);
    }
  };

  const fetchDefaultMovies = async () => {
    const defaultResults = await getMovieRequest("batman", currentPage);
    setDefaultMovies((prevMovies) => [...prevMovies, ...defaultResults]);
  };

  useEffect(() => {
    fetchDefaultMovies();
  }, [currentPage]);

  return (
    <div className="pb-20">
      <div className="md:flex justify-between  items-center md:mr-72">
        <Searchbox value={searchValue} setsearchvalue={setSearchValue} />

        <button
          className="text-white bg-red-600 w-40 p-2 sm:ml-16 md:ml-6 ml-16 rounded text-xl"
          onClick={handleSearchButtonClick}
        >
          Search
        </button>
      </div>
      {/* Display a message when no movies are found */}
      {searchMovies.length === 0 && !loading && searchValue.trim() !== "" && (
        <p>No movies found.</p>
      )}
      {/* Fluid container with Tailwind CSS classes */}
      {searchMovies.length > 0 && <Movielist movies={searchMovies} />}
      {defaultMovies.length > 0 && <Movielist movies={defaultMovies} />}
      <div className="flex justify-center items-center mt-2">
        <button
          className="text-white bg-blue-500 w-28 p-2 rounded"
          onClick={handleLoadMoreButtonClick}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default App;
