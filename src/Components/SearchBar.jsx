 import './SearchBar.css'
import { useState } from "react"


 const SearchBar = () => {
    const [movieName, setMovie] = useState ()
    const handleSubmit = (event) => {
   event.preventDefault()
    }

    return(
    <>
    <div className="searchSection">
        <form action="" onSubmit={handleSubmit}>
   <input type="text"  id="searchMovie" value={movieName} placeholder="Search Movie" />
    <button id="btn">Search Movie</button>

        </form>
    </div>
    </>
    )
 }
 export default SearchBar