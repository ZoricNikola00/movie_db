import { useParams,Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { useQuery } from "@tanstack/react-query";
import ReactLoading from 'react-loading';
import {FaImdb} from 'react-icons/fa'
const SingleItem = () => {
    const {id,type}=useParams()
    const {fetchData}=useGlobalContext()
    const img_path='https://image.tmdb.org/t/p/w1280'
    const {data,isError,isFetching,isLoading,error}=useQuery(['movie',id],()=>fetchData(`https://api.themoviedb.org/3/${type}/${id}?api_key=72de8895bb64376912ef844faac64a10&language=en-US`))

    const {data:people,isLoading:loadPeople}=useQuery(['people'],()=>fetchData(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=72de8895bb64376912ef844faac64a10&language=en-US`))

    console.log(data)
    if(isLoading){
        return <ReactLoading className='loader' type='spinningBubbles' color={'#273b55'} height={'300px'} width={'300px'}/>
    }
    if(isError){
        return <div>{error}</div>
    }

    const {budget,revenue,title,homepage,status,vote_average,backdrop_path,genres,original_language,tagline,runtime,release_date,poster_path,overview,original_title}=data
    const ratingColor={
        border:vote_average>6.99?'green 4px solid':vote_average>3.99?'yellow 4px solid':'red 4px solid'
    }
  return (
    <div className="singleItem">
        <div className="overviewCont">
            <div className="shadow" style={{backgroundImage:`url(${img_path}${backdrop_path})`,backgroundSize:'cover'}}></div>
            <div className="posterSingle">
                <img src={`${img_path}${poster_path}`}/>
            </div>
            <div className="overview">
                <div className="title"><h1>{title}</h1><small>({release_date.slice(0,4)})</small></div>
                <div className="infoItem">
                    <div className="genres">
                        {genres.map(x=><p key={x.id}>{x.name}</p>)}
                    </div>
                    <div className="dot"></div>
                    <p>{runtime}min</p>
                </div>
                <div className="ratings">
                    <div style={ratingColor} className='voteScore single'>{(vote_average*10).toFixed()}</div>
                    <p>Rating</p>
                </div>
                <p className="tag">{tagline}</p>
                <div className="desc">
                    <p className="headDesc">Overview</p>
                    <p className="mainDesc">{overview}</p>
                </div>
            </div>
        </div>
        <div className="castAndInfo">
            <div className="castBelow">
                {people?.cast?.slice(0,8).map(person=>{
                    const {id,character,name,profile_path}=person
                    return <div key={id} className='castPerson'>
                        <img src={`${img_path}${profile_path}`}/>
                        <p className="castName">{name}</p>
                        <p className="castCharacter">{character}</p>
                    </div>
                })}
            </div>
            <div className="additionalInfo">
                <div >
                    <FaImdb/>
                </div>
                <div>
                    <p>Original Title</p>
                    <p>{original_title}</p>
                </div>
                <div>
                    <p>Status</p>
                    <p>{status}</p>
                </div>
                <div>
                    <p>Original Language</p>
                    <p>{original_language}</p>
                </div>
                {budget>0 && <div>
                        <p>Budget</p>
                        <p>{budget}</p>
                    </div>
                }
                {revenue>0 && <div>
                        <p>Revenue</p>
                        <p>{revenue}</p>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default SingleItem