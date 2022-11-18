import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import ReactLoading from 'react-loading';
import { useGlobalContext } from "../context";
import {  FaLongArrowAltLeft,FaLongArrowAltRight } from "react-icons/fa";
const img_path='https://image.tmdb.org/t/p/w1280'

const People = () => {
    const {fetchData}=useGlobalContext()
    const [page,setPage]=useState(1)
    const {data,isLoading,isError,error,refetch}=useQuery(['people'],()=>fetchData(`https://api.themoviedb.org/3/person/popular?api_key=${env.process.TMDB_API_KEY}&language=en-US&page=${page}`),{onSuccess:()=>  window.scrollTo(0, 0)})
    useEffect(() => {
      refetch()
    }, [page])
    if(isLoading){
      return <ReactLoading className='loader' type='spinningBubbles' color={'#273b55'} height={'300px'} width={'300px'}/>
    }
    if(isError){
      return <div>{error}</div>
  }

  
  return (
    <div className="peopleCont">
      {data?.results?.map((person)=>{
        const {id,name,profile_path}=person
        return <div key={id} className="profile">
          <Link to={`/person/${id}`}><img src={`${img_path}${profile_path}`}/></Link>
          <h3>{name}</h3>
        </div> 
      })}
      <div className="panagBtns">{page>1 && <div onClick={()=>setPage(pre=>pre-1)}><FaLongArrowAltLeft/></div>}<h3>{page}</h3>{page<data?.total_pages && <div onClick={()=>setPage(pre=>pre+1)}><FaLongArrowAltRight/></div>}</div>
    </div>
  )
}

export default People