 import './SearchBar.css'
import { useState } from "react"


 const SearchBar = () => {
    const [movieName, setMovie] = useState("")

    const handleSubmit = (event) => {
   event.preventDefault()

   console.log(movieName)
   
   const userInput = movieName.trim()
   if(userInput === "") {
  alert("Please enter a valid search")
  return
   }

    }

    return(
    <>
    <div className="searchSection">
        <form action="" onSubmit={handleSubmit}>
   <input type="text"  id="searchMovie" value={movieName} placeholder="Search Movie" onChange={(e) => setMovie(e.target.value)}/>
    <button id="btn">Search Movie</button>

        </form>
    </div>
    </>
    )
 }
 export default SearchBar