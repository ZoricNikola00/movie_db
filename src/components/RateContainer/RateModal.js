import React, { useState } from 'react'
import {FaTimes,FaStar} from 'react-icons/fa'
import { useGlobalContext } from '../../context'

const RateModal = ({rating,setRatingModal,id,poster_path,titleCorrect,type}) => {
    const [stars,setStars]=useState(rating || 0)
    const arr=[1,2,3,4,5,6,7,8,9,10]
    const{rate,remove}=useGlobalContext()
    const rateThis=(i)=>{
        setStars(p=>p=i+1)
    }
    const confirm=()=>{
        rate(id,titleCorrect,poster_path,type,stars)
        setRatingModal(false)
    }
    const removeRating=()=>{
        remove(id,'rated')
        setRatingModal(false)

    }
  return (
    <div className='rateContainer'>
        <div className='rateContent'>
            <FaTimes className='closeRateModal' onClick={()=>setRatingModal(false)}/>
            <h3>Rate This Show!</h3>
            <div className='rateStars'>
                {arr.map((x,i)=>{
                    let style={
                        color:i>=stars?'rgb(128, 126, 126)':'rgb(196, 196, 36)'
                    }
                    return <div style={style} key={i} onClick={()=>rateThis(i)}><FaStar/></div>
                })}
                
            </div>
            <button className='confirmRating' onClick={confirm}>Confirm Rating</button>
            <button className='confirmRating remove' onClick={removeRating}>Remove Rating</button>
        </div>
    </div>
  )
}

export default RateModal 