import React, { useState } from 'react'
import {FaSearch} from 'react-icons/fa/'
import { useNavigate } from 'react-router'

const SearchBar = () => {
    const [query,setQuery]=useState('')
    const nav=useNavigate()
    const submitSearch=(e)=>{
        e.preventDefault()
        nav(`/searchPage/${query}`)
    }
    const changeQuery=(e)=>{
        setQuery(e.target.value)
    }
  return (
    <form className='formSrchNav' onSubmit={submitSearch}>
        <input type='text' value={query} onChange={changeQuery} placeholder='Search MovieDB'/>
        <button className='srchBtn' type='submit'><FaSearch/></button>
    </form>
  )
}

export default SearchBar