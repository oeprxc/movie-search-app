import { useState } from 'react'
import './App.css'
import './index.css'
import Header from './Components/Header'
import SearchBar from './Components/SearchBar'

const App = () => {

return (
  <>
  <div className="container">

     <div className="card">

      <header>
       <Header/>
      </header>

      <main>
      <SearchBar/>
      </main>


     
     </div>
  </div>
  </>
)
}

export default App
