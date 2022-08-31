import Navbar from "./components/Navbar";
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


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/about/" element={<About/>}/>
          <Route path="/searchPage/:query" element={<SearchPage/>}/>
          <Route path="/popularMovies/" element={<PopularMovies/>}/>
          <Route path="/topRatedMovies/" element={<TopRatedMovies/>}/>
          <Route path="/popularTV/" element={<PopularTVShows/>}/>
          <Route path="/topRatedTV/" element={<TopRatedTVShows/>}/>
          <Route path="/people/" element={<People/>}/>
          <Route path="/favorite/" element={<Favorite/>}/>
          <Route path="/watchlist/" element={<Watchlist/>}/>
        </Routes>
      </Router>
    </div>
  );
  }
export default App;
