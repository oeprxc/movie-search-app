import "./SearchBar.css";
import { useEffect, useState } from "react";

const SearchBar = () => {
  // Remove suggested list when users click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".suggestions") &&
        !event.target.closest("#searchMovie")
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // UserMovie Input search state.
  const [movieName, setMovie] = useState("");

  // Searching state
  const [searching, setSearching] = useState("");

  //  Movie state
  const [movies, setMovies] = useState([]);

  // AutoSuggestion state
  const [suggestions, setSuggestions] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(false);
  // Handle suggestion
  const handleSuggestion = async (value) => {
    // Validate auto suggestion search
    if (value === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${value}`,
      );
      const data = await response.json();
      setSuggestions(data.results.slice(0, 5));
      setShowSuggestions(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Added click event to the suggested movies.
  const handleSuggestionClick = (movie) => {
    setMovie(movie.title);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userInput = movieName.trim();

    //  Handle error for empty search from users.
    if (userInput === "") {
      alert("Please enter a valid search");
      return;
    }
    try {
      setSearching("Searching...");

      const url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${movieName}`;

      const response = await fetch(url);

      // Handle failed API request
      if (!response.ok) {
        throw new Error("Movie not found");
      }
      const movieData = await response.json();

      if (movieData.results.length === 0) {
        setSearching("No movies found.");
        return;
      }
      setMovies(movieData.results);

      setMovie("");
      setSearching("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearching("Failed to fetch movies. Please try again later.");
      setMovies([]);
    }
  };
  return (
    <>
      <div className="searchSection">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            id="searchMovie"
            value={movieName}
            placeholder="Search for a movie..."
            onChange={(event) => {
              setMovie(event.target.value);

              handleSuggestion(event.target.value);
            }}
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((movie) => (
                // Clicks event to movie suggestion result.
                <div
                  key={movie.id}
                  className="suggestion"
                  onClick={() => handleSuggestionClick(movie)}
                >
                  {movie.title}
                </div>
              ))}
            </div>
          )}

          <button id="btn">Search Movie</button>
          <p>{searching}</p>
        </form>
      </div>

      <div className="movieContainer">
        {movies.map((movie) => (
          <div className="movieCard" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
            <p id="releaseDate">{movie.release_date}</p>
            <p id="rating">{movie.vote_average.toFixed(1)} / 10 </p>
          </div>
        ))}
      </div>
    </>
  );
};
export default SearchBar;
