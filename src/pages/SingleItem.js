import { useParams,Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { useQuery } from "@tanstack/react-query";
import ReactLoading from 'react-loading';

const SingleItem = () => {
    const {id,type}=useParams()
    const {fetchData}=useGlobalContext()
    const img_path='https://image.tmdb.org/t/p/w1280'
    const {data,isError,isFetching,isLoading,error}=useQuery(['movie',id],()=>fetchData(`https://api.themoviedb.org/3/${type}/${id}?api_key=72de8895bb64376912ef844faac64a10&language=en-US`))
    if(isLoading){
        return <ReactLoading className='loader' type='spinningBubbles' color={'#273b55'} height={'300px'} width={'300px'}/>
    }
    if(isError){
        return <div>{error}</div>
    }

    const {title,homepage,backdrop_path,genres,original_language,tagline,runtime,release_date,poster_path,overview,original_title}=data
  return (
    <div className="singleItem">
        <div className="overviewCont">
            <img className="backImg" src={`${img_path}${backdrop_path}`}/>
            <div className="posterSingle">
                <img src={`${img_path}${poster_path}`}/>
            </div>
            <div className="overview">
                <div className="title"><h1>{title}</h1><small>({release_date})</small></div>
            </div>
        </div>
    </div>
  )
}

export default SingleItem