import React from 'react'
import { useGlobalContext } from '../../context';
import { useQuery } from "@tanstack/react-query";
import ReactLoading from 'react-loading';
import SingleMovieNP from './SingleMovieNP';

const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=72de8895bb64376912ef844faac64a10&page='

const NowPlaying = () => {
    const {fetchData}=useGlobalContext()
    const {data:moviesNP,isFetching,isLoading}=useQuery(['moviesNP'],()=>fetchData(url))
if(isFetching && isLoading){
    return <ReactLoading className='loader' type='spinningBubbles' color={'#273b55'} height={'300px'} width={'300px'}/>
}
  return (
    <div className='nowPlayingMovies'>
        {moviesNP?.results?.map((movie)=>{
            return <SingleMovieNP key={movie.id} {...movie}/>
        })}
    </div>
  )
}

export default NowPlaying