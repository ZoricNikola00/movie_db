import React, { useState } from 'react'
import { useParams,Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { useGlobalContext } from '../context';
import ReactLoading from 'react-loading';
import { FaImdb,FaTwitter,FaInstagram,FaFacebook } from 'react-icons/fa';

const img_path='https://image.tmdb.org/t/p/w1280'
const genders={
    1:'Female',
    2:'Male'
}
const Person = () => {
    const {id}=useParams()
    const {fetchData}=useGlobalContext()
    const [showBio,setShowBio]=useState(true)
    const{data:person,isLoading,isError:errPerson,error}=useQuery(['person',id],()=>fetchData(`https://api.themoviedb.org/3/person/${id}?api_key=72de8895bb64376912ef844faac64a10&language=en-US`))
    const{data:social,isLoading:loadSocial,isError:errSocial}=useQuery(['social'],()=>fetchData(`https://api.themoviedb.org/3/person/${id}/external_ids?api_key=72de8895bb64376912ef844faac64a10&language=en-US`))
    const{data:movieCredits,isLoading:loadMovies,isError:errCredits}=useQuery(['movie'],()=>fetchData(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=72de8895bb64376912ef844faac64a10&language=en-US`))

    if(isLoading || loadSocial || loadMovies){
        return <ReactLoading className='loader' type='spinningBubbles' color={'#273b55'} height={'300px'} width={'300px'}/>
    }
    if(errCredits || errPerson || errSocial){
        return <div>{error}</div>
    }

    const {known_for_department,gender,biography, birthday,name,place_of_birth,profile_path}=person
    const {imdb_id,facebook_id,twitter_id,instagram_id}=social

    const movieKnown=movieCredits?.cast.sort((a,b)=>b.popularity-a.popularity)
  return (
    <div className='person-container'>
         <div className='person-info-left'>
            <img src={`${img_path}${profile_path}`}/>
            <h2>Personal Info</h2>
            <h4>Known For</h4>
            <p>{known_for_department}</p>
            <h4>Gender</h4>
            <p>{genders[gender]}</p>
            <h4>Birthday</h4>
            <p>{birthday}</p>
            <h4>Place of Birth</h4>
            <p>{place_of_birth}</p>
            <div className='socials'>
                {imdb_id && <a href={`https://www.imdb.com/name/${imdb_id}`}><FaImdb/></a>}
                {facebook_id && <a href={`https://www.facebook.com/${facebook_id}`}><FaFacebook/></a>}
                {twitter_id && <a href={`https://www.twitter.com/${twitter_id}`}><FaTwitter/></a>}
                {instagram_id && <a href={`https://www.instagram.com/${instagram_id}`}><FaInstagram/></a>}
            </div>
        </div>
        <div className='person-info-right'>
            <h1>{name}</h1>
            <h3>Biography</h3>
            <p>{showBio ? biography.slice(0, 600) : biography}
                {biography.length>600 &&<span onClick={()=>setShowBio(p=>!p)} className="readMore">
                {biography.length && showBio ? "...Read More" : " Show Less"}</span>}
            </p>
            <h2>Known for...</h2>
            <div className='knownFor'>
                {(movieKnown.length>10?movieKnown.slice(0,10):movieKnown).filter((x,i,a)=>x?.id!==a[i+1]?.id).map((movie)=>{
                    const {name,media_type,title,poster_path,id}=movie
                    const titleCorrect=media_type==='tv'?name:title

                    
                    return <div key={id} className='movieKnownFor'>
                        <Link to={`/singleItem/${media_type}/${id}`}><img src={`${img_path}${poster_path}`}/></Link>
                        <p>{titleCorrect}</p>
                        </div>
                })}
            </div>
            <div className='allMovies'>
                <h3>Acting</h3>
                {movieCredits?.cast?.sort((a,b)=>{
        const dateA = a.release_date ? a.release_date.slice(0,4): a.first_air_date && a.first_air_date.slice(0,4)
        const dateB= b.release_date ? b.release_date.slice(0,4) : b.first_air_date && b.first_air_date.slice(0,4)
        return dateB-dateA
    }).map(movie=>{
                    const {title,character,media_type,id,name,release_date,first_air_date}=movie
                    const date = release_date ? release_date.slice(0,4): first_air_date && first_air_date.slice(0,4)   
                    const titleCorrect=media_type==='tv'?name:title
                    return <div key={id} className='allMovie'>
                        <p>{date}</p>
                        <p className='allTitle'>{titleCorrect}</p>
                        <p>as</p>
                        <p>{character}</p>
                    </div>
                })}
            </div>
        </div>
    </div>
  )
}

export default Person