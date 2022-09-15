import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./pages/Home";
import About from "./pages/About";
import PopularMovies from "./pages/PopularMovies";
import TopRatedMovies from "./pages/TopRatedMovies";
import PopularTVShows from "./pages/PopularTVShows";
import TopRatedTVShows from "./pages/TopRatedTVShows";
import People from "./pages/People";
import Favorite from "./pages/Favorite";
import Watchlist from "./pages/Watchlist";
import SearchPage from "./pages/SearchPage";
import SingleItem from "./pages/SingleItem";
import Person from "./pages/Person";
import Cast from "./pages/Cast";
import {FaArrowUp} from 'react-icons/fa'
import { useState } from "react";
import Quiz from "./pages/Quiz";


function App() {
  const [showToTop,setShowToTop]=useState(false)
window.onscroll=(()=>{
  if(document.documentElement.scrollTop>100){
    setShowToTop(true)
  }
  else{
    setShowToTop(false)
  }
})


  return (
    <div className="App">
      <Router>
        {showToTop && <div onClick={()=>window.scrollTo(0, 0)} className="ToTop"><FaArrowUp/></div>}
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/about/" element={<About/>}/>
          <Route path="/searchPage/:query" element={<SearchPage/>}/>
          <Route path="/singleItem/:type/:id" element={<SingleItem/>}/>
          <Route path='/singleItem/:type/:id/cast' element={<Cast/>}/>
          <Route path="/popularMovies/" element={<PopularMovies/>}/>
          <Route path="/topRatedMovies/" element={<TopRatedMovies/>}/>
          <Route path="/popularTV/" element={<PopularTVShows/>}/>
          <Route path="/topRatedTV/" element={<TopRatedTVShows/>}/>
          <Route path="/people/" element={<People/>}/>
          <Route path="/person/:id" element={<Person/>}/>
          <Route path="/favorite/" element={<Favorite/>}/>
          <Route path="/quiz/" element={<Quiz/>}/>
          <Route path="/watchlist/" element={<Watchlist/>}/>
        </Routes>
      </Router>
    </div>
  );
  }
export default App;
