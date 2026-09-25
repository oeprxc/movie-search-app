 import './SearchBar.css'
import { useState } from "react"

 const SearchBar = () => {
    const [movieName, setMovie] = useState("")

    const [searching, setSearching] = useState("")

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

    const movie = movieData.results[0]
    console.log(movie)
    
    setSearching("")
   } catch (error) {

   setSearching("Something went wrong. Please try again later.")
   console.log(error)
   }
    }
    return(
    <>
    <div className="searchSection">
        <form action="" onSubmit={handleSubmit}>
   <input type="text"  id="searchMovie" value={movieName} placeholder="Search Movie" onChange={(e) => setMovie(e.target.value)}/>
    <button id="btn">Search Movie</button>
    <p>{searching}</p>

        </form>
    </div>
    </>
    )
 }
 export default SearchBar