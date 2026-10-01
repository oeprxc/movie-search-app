import "./SearchBar.css";
import { useState } from "react";

const SearchBar = () => {
  const [movieName, setMovie] = useState("");

  // Searching state
  const [searching, setSearching] = useState("");

  //  Movie state
  const [movies, setMovies] = useState([]);

  // AutoSuggestion state
  const [suggestions, setSuggestions] = useState([])

  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSuggestion = async (value) => {
    if(value === "") {
      setSuggestions([])
      setShowSuggestions(false)
      return
    } try {
     const response = await fetch(
  `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${value}`
)
      const data = await response.json()

      setSuggestions(data.results.slice(0,5))
      setShowSuggestions(true)
    } catch (error) {
      console.log(error)
    }
  }

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
            onChange={(event) => {setMovie(event.target.value) 
              
              handleSuggestion(event.target.value)
            }}
          />

          {showSuggestions && suggestions.length > 0 && (
         <div className="suggestions">
           {suggestions.map((movie) => (
            <div key={movie.id} className="suggestion">
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
