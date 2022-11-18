import { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import {  Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import ReactLoading from 'react-loading';
import { FaLongArrowAltLeft, FaLongArrowAltRight,FaBookmark } from 'react-icons/fa';

const TopRatedTVShows = () => {
  const {fetchData,toggle,watchlist}=useGlobalContext()
  const [page,setPage]=useState(1)
  const {data,isLoading,isError,error,refetch}=useQuery(['top-tv'],()=>fetchData(`https://api.themoviedb.org/3/tv/top_rated?api_key=${env.process.TMDB_API_KEY}&language=en-US&page=${page}`),{onSuccess:()=>  window.scrollTo(0, 0)})
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
      <h1>Top Rated TV Shows</h1>
      <div className='categWrap'>
        {data?.results?.map((item)=>{
          const {name,vote_average,id,poster_path,first_air_date}=item
          const type='tv'
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
          console.log(item)
          return (
            <div key={id} className='item'>
              <div className='posterCont'>
                <Link to={`/singleItem/${type}/${id}`}><img src={`${img_path}${poster_path}`}/></Link>
                <div style={ratingColor} className='rating'>{vote_average}</div>
                <div className="bookmark" onClick={()=>toggle(id,name,poster_path,type,'watchlist')}><FaBookmark style={styleBookmark} className="star"/></div>
              </div>
              <div className='categInfo'>
                <Link className='categTitle' to={`/singleItem/${type}/${id}`}><h3>{name}</h3></Link>
                <p className='categDate'>{first_air_date}</p>
              </div>
            </div>
          )
        })}
      
      </div>
      <div className="panagBtns ctg">{page>1 && <div onClick={()=>setPage(pre=>pre-1)}><FaLongArrowAltLeft/></div>}<h3>{page}</h3>{page<data?.total_pages && <div onClick={()=>setPage(pre=>pre+1)}><FaLongArrowAltRight/></div>}</div>
    </div>
  )
}

export default TopRatedTVShows