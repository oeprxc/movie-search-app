 import './SearchBar.css'
import { useState } from "react"

 const SearchBar = () => {
    const [movieName, setMovie] = useState("")

    const [searching, setSearching] = useState("")


    const [movies, setMovies] = useState([])

    const handleSubmit = async (event) => {
   event.preventDefault()

   console.log(movieName)
   
   const userInput = movieName.trim()

   if(userInput === "") {
  alert("Please enter a valid search")
  return

   } try{

   setSearching("Searching...")

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${movieName}`

    const response = await fetch(url)
    if(!response.ok) {
        throw new Error("Movie not found")
    }
    const movieData = await response.json()

    if(movieData.results.length === 0) {
  setSearching("No movies found.")
  return
    }
    setMovies(movieData.results)

    setMovie("")
    setSearching("")

   } catch (error) {
   
   console.log(error)
   }
    }
    return(
    <>
    <div className="searchSection">
        <form action="" onSubmit={handleSubmit}>
   <input type="text"  id="searchMovie" value={movieName} placeholder="Search for a movie..." onChange={(e) => setMovie(e.target.value)}/>
    <button id="btn">Search Movie</button>
    <p>{searching}</p>

        </form>
    </div>

    <div className="movieContainer">
    {movies.map((movie) => (
      <div className="movieCard" key={movie.id} >
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
    )
 }
 export default SearchBar