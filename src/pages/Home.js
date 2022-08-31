import SearchBar from "../components/Home/SearchBar"

const Home = () => {
  const img='https://images.unsplash.com/photo-1488866022504-f2584929ca5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmlnaHR8ZW58MHx8MHx8&w=1000&q=80'
  return (
    <div className="homePage">
        <div className="imgHomeCont">
          <img className="imgHome" src={img}/>
          <h1 className="homeTitle">Welcome To The MovieDB</h1>
          <SearchBar/>
          
        </div>  
      </div>
  )
  //https://images.unsplash.com/photo-1488866022504-f2584929ca5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmlnaHR8ZW58MHx8MHx8&w=1000&q=80
  //https://api.themoviedb.org/3/movie/now_playing?api_key=72de8895bb64376912ef844faac64a10&page=
}

export default Home