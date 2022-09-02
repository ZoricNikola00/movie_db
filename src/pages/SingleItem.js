import { useParams,Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { useQuery } from "@tanstack/react-query";
import ReactLoading from 'react-loading';
import {FaImdb,FaLink,FaArrowRight,FaBookmark, FaStar} from 'react-icons/fa'
const SingleItem = () => {
    const {id,type}=useParams()
    const {fetchData,toggle,watchlist,favorites}=useGlobalContext()
    const img_path='https://image.tmdb.org/t/p/w1280'
    const {data,isError,isLoading,error}=useQuery(['movie',id],()=>fetchData(`https://api.themoviedb.org/3/${type}/${id}?api_key=72de8895bb64376912ef844faac64a10&language=en-US`))

    const {data:people,isLoading:loadPeople}=useQuery(['people'],()=>fetchData(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=72de8895bb64376912ef844faac64a10&language=en-US`))

    if(isLoading){
        return <ReactLoading className='loader' type='spinningBubbles' color={'#273b55'} height={'300px'} width={'300px'}/>
    }
    if(isError){
        return <div>{error}</div>
    }
    console.log(data)
    const {budget,revenue,title,homepage,name,status,vote_average,first_air_date,backdrop_path,last_air_date,genres,original_language,tagline,runtime,release_date,poster_path,overview,original_title}=data
    const titleCorrect=type==='tv'?name:title
    const date=release_date && type==='movie'?release_date.slice(0,4): first_air_date && first_air_date.slice(0,4)!==last_air_date.slice(0,4)?`${first_air_date.slice(0,4)}-${last_air_date.slice(0,4)}`:`${first_air_date && first_air_date.slice(0,4)}-`
    const ratingColor={
        border:vote_average>6.99?'green 4px solid':vote_average>3.99?'yellow 4px solid':'red 4px solid'
    }
    const styleStar={
        color:favorites?.some(x=>parseInt(x.id)===parseInt(id))?'rgb(196, 196, 36)':'rgb(128, 126, 126)'
       }
    const styleBookmark={
        color:watchlist?.some(x=>parseInt(x.id)===parseInt(id))?'rgb(196, 196, 36)':'rgb(128, 126, 126)'
    }
  return (
    <div className="singleItem">
        <div className="overviewCont">
            <div className="shadow" style={{backgroundImage:`url(${img_path}${backdrop_path})`,backgroundSize:'cover'}}></div>
            <div className="posterSingle">
                <img src={`${img_path}${poster_path}`}/>
                <div name='watchlist' className="bookmark" onClick={(e)=>toggle(id,title,poster_path,type,e.currentTarget.attributes.name.value)}><FaBookmark style={styleBookmark} className="star"/></div>
            </div>
            <div className="overview">
                <div className="title"><h1>{titleCorrect}</h1><small>({date})</small><a className="homepage" href={homepage}><FaLink/></a></div>
                <div className="infoItem">
                    <div className="genres">
                        {genres.map(x=><p key={x.id}>{x.name}</p>)}
                    </div>
                    {type==='movie' && <div className="dot"></div>}
                    {type==='movie' && <p>{runtime}min</p>}
                </div>
                <div className="ratings">
                    <div style={ratingColor} className='voteScore single'>{(vote_average*10).toFixed()}</div>
                    <p>Rating</p>
                    <div name='favorite' onClick={(e)=>toggle(id,title,poster_path,type,e.currentTarget.attributes.name.value)}><FaStar style={styleStar} className="star"/></div>
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
                        <Link to={`/person/${id}`}><img src={`${img_path}${profile_path}`}/></Link>
                        <p className="castName">{name}</p>
                        <p className="castCharacter">{character}</p>
                    </div>
                })}
                <Link className="viewAllCast" to={`cast`}><div>View More<FaArrowRight/></div></Link>
            </div>
            <div className="additionalInfo">
                <div >
                    <FaImdb className="imdbSingle"/>
                </div>
                {original_title &&<div>
                    <p>Original Title</p>
                    <p>{original_title}</p>
                </div>}
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
                        <p>${String(budget).split('').reverse().map((x,i)=>i!==0 && (i+3)%3===0?(x+','):x).reverse().join('')}</p>
                    </div>
                }
                {revenue>0 && <div>
                        <p>Revenue</p>
                        <p>${String(revenue).split('').reverse().map((x,i)=>i!==0 && (i+3)%3===0?(x+','):x).reverse().join('')}</p>
                    </div>
                }
                <Link to='cast'><h3>
                    View All Cast And Crew
                </h3></Link>
            </div>
        </div>
    </div>
  )
}

export default SingleItem