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
    const [showBio,setShowBio]=useState(false)
    const{data:person,isLoading,isError:errPerson,error}=useQuery(['person',id],()=>fetchData(`https://api.themoviedb.org/3/person/${id}?api_key=72de8895bb64376912ef844faac64a10&language=en-US`))
    const{data:social,isLoading:loadSocial,isError:errSocial}=useQuery(['social'],()=>fetchData(`https://api.themoviedb.org/3/person/${id}/external_ids?api_key=72de8895bb64376912ef844faac64a10&language=en-US`))
    const{data:movieCredits,isLoading:loadMovies,isError:errCredits}=useQuery(['movie'],()=>fetchData(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=72de8895bb64376912ef844faac64a10&language=en-US`))

    console.log(person)
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
                {<a href={`https://www.imdb.com/name/${imdb_id}`}><FaImdb/></a>}
                {<a href={`https://www.facebook.com/${facebook_id}`}><FaFacebook/></a>}
                {<a href={`https://www.twitter.com/${twitter_id}`}><FaTwitter/></a>}
                {<a href={`https://www.instagram.com/${instagram_id}`}><FaInstagram/></a>}
            </div>
        </div>
        <div className='person-info-right'>
            <h1>{name}</h1>
            <h3>Biography</h3>
            <p>{showBio ? biography.slice(0, 600) : biography}
                {biography.length>600 &&<span onClick={()=>setShowBio(p=>!p)} className="readMore">
                {biography.length && showBio ? "...Read More" : " Show Less"}</span>}
            </p>
        </div>
    </div>
  )
}

export default Person