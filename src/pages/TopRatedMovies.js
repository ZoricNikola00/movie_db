import { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import {  Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import ReactLoading from 'react-loading';
import { FaLongArrowAltLeft, FaLongArrowAltRight,FaBookmark } from 'react-icons/fa';

const TopRatedMovies = () => {
  const {fetchData,toggle,watchlist}=useGlobalContext()
  const [page,setPage]=useState(1)
  const {data,isLoading,isError,error,refetch}=useQuery(['top-movies'],()=>fetchData(`https://api.themoviedb.org/3/movie/top_rated?api_key=${procces.env.TMDB_API_KEY}&language=en-US&page=${page}`),{onSuccess:()=>  window.scrollTo(0, 0)})
  const img_path='https://image.tmdb.org/t/p/w1280'

  useEffect(()=>{
    refetch()
  },[page])

  if(isLoading){
    return <ReactLoading className='loader' type='spinningBubbles' color={'#273b55'} height={'300px'} width={'300px'}/>
  }

  if(isError){
    return <div >{error}</div>
  }
  return (
    <div className='categoryCont'>
      <h1>Top Rated Movies</h1>
      <div className='categWrap'>
        {data?.results?.map((item)=>{
          const {title,vote_average,id,poster_path,release_date}=item
          const type='movie'
          const ratingColor={
            border:vote_average>6.99?'green 3px solid':vote_average>3.99?'yellow 3px solid':'red 3px solid'
          }
          const styleBookmark={
            color:watchlist?.some(x=>parseInt(x.id)===parseInt(id))?'rgb(196, 196, 36)':'rgb(128, 126, 126)',
            position:'absolute',
            left:'-10px',
            fontSize:'28px',
            opacity:'0.6'
         }
          return (
            <div key={id} className='item'>
              <div className='posterCont'>
                <Link to={`/singleItem/${type}/${id}`}><img src={`${img_path}${poster_path}`}/></Link>
                <div style={ratingColor} className='rating'>{vote_average}</div>
                <div className="bookmark" onClick={(e)=>toggle(id,title,poster_path,type,'watchlist')}><FaBookmark style={styleBookmark} className="star"/></div>
              </div>
              <div className='categInfo'>
                <Link className='categTitle' to={`/singleItem/${type}/${id}`}><h3>{title}</h3></Link>
                <p className='categDate'>{release_date}</p>
              </div>
            </div>
          )
        })}
      
      </div>
      <div className="panagBtns ctg">{page>1 && <div onClick={()=>setPage(pre=>pre-1)}><FaLongArrowAltLeft/></div>}<h3>{page}</h3>{page<data?.total_pages && <div onClick={()=>setPage(pre=>pre+1)}><FaLongArrowAltRight/></div>}</div>
    </div>
  )
}

export default TopRatedMovies