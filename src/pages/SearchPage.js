import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useGlobalContext } from '../context'
import { useQuery } from '@tanstack/react-query';
import ReactLoading from 'react-loading';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

const img_path='https://image.tmdb.org/t/p/w1280'

const SearchPage = () => {
  const {query}=useParams()
  const {fetchData}=useGlobalContext()
  const [page,setPage]=useState(1)
  const [searchType,setSearchType]=useState('movie')
  const {data,isLoading,isError,error,refetch}=useQuery(['data'],()=>fetchData(`https://api.themoviedb.org/3/search/${searchType}?api_key=72de8895bb64376912ef844faac64a10&language=en-US&query=${query}&page=${page}`))
  const navigate=useNavigate()
  const redirect=(id,type)=>{
    if(searchType==='person'){
        navigate(`/person/${id}`)
    }
    else{
        navigate(`/SingleItem/${type}/${id}`)
    }
}
useEffect(()=>{
  window.scrollTo(0, 0);
  refetch()
},[query,page,searchType])
  if(isLoading){
    return <ReactLoading className='loader' type='spinningBubbles' color={'#273b55'} height={'300px'} width={'300px'}/>
  }
  if(isError){
    return <div>{error}</div>
  }
  return (
    <div className='searchPage'>
      <div className='searchSide'>
            <h3>Search Results : {data?.total_results}</h3>
            <h3>Number Of Pages : {data?.total_pages}</h3>
            <form>
                <div className="radio">
                  <label>
                    <input type="radio" checked={searchType==='movie'} value="movie" onChange={e=>{setSearchType(e.target.value);setPage(1)}} />
                    Movie
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" checked={searchType==='tv'} value="tv" onChange={e=>{setSearchType(e.target.value);setPage(1)}} />
                    TV Shows
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" checked={searchType==='person'} value="person" onChange={e=>{setSearchType(e.target.value);setPage(1)}} />
                    People
                  </label>
                </div>
            </form>
        </div>
        <div className='searchItems'>
            {data?.results.map((x)=>{
                    const genders={1:'Female',2:'Male'}
                    const {id,gender,poster_path,original_title,name,profile_path,first_air_date,overview,release_date}=x
                    const title=searchType==='movie'?original_title:name
                    const date=searchType==='movie'?release_date:first_air_date
                return <div key={id} className='searchItem'>
                    <img src={`${img_path}${poster_path?poster_path:profile_path}`} onClick={()=>redirect(id,searchType)} alt='Image not found' onError={(e)=>{e.target.onerror=null;e.target.src=`${searchType==='person'?'https://images.assetsdelivery.com/compings_v2/belopoppa/belopoppa2002/belopoppa200200004.jpg':'https://archive.org/download/no-photo-available/no-photo-available.png'}`}}/>
                    <div className='searchInfo'>
                        <h3 onClick={()=>redirect(id,searchType)}>{title}</h3>
                        <small>{date?date:genders[gender]}</small>
                        {overview && <p>{overview}</p>}
                    </div>
                    
                    </div>
            })}
          <div className="panagBtns">{page>1 && <div onClick={()=>setPage(pre=>pre-1)}><FaLongArrowAltLeft/></div>}<h3>{page}</h3>{page<data?.total_pages && <div onClick={()=>setPage(pre=>pre+1)}><FaLongArrowAltRight/></div>}</div>
        </div>
    </div>
  )
}

export default SearchPage