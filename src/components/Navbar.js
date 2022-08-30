import React, { useState } from 'react'
import sublinks from '../menuData'
import {FaSearch,FaTimes} from 'react-icons/fa/'
import {FiMenu} from 'react-icons/fi/'
import Submenu from './Submenu'
import { useGlobalContext } from '../context'

const Navbar = () => {
    const [showMenu,setShowMenu]=useState(false)
    const {query,changeQuery,submitSearch}=useGlobalContext()
  return (
    <nav className='nav'>
        <h1 className='logo'>
            MovieDB
        </h1>
        <div onClick={()=>setShowMenu(true)} className='menuNav'><FiMenu/></div>
        <div className={showMenu?'active menuContainer':'menuContainer'}>
            <ul className={showMenu?'active nav-list':'nav-list'}>
                {showMenu && <div className='closeMenu' onClick={()=>setShowMenu(false)}><FaTimes/></div>}
                {sublinks.map((x,i)=>{
                    if(!x.links){
                        return <li key={i} className='list'>{x.page}</li>
                    }
                    return <Submenu  key={i} {...x}/>
                })}
            </ul>
        </div>
        <form className='formSrchNav' onSubmit={submitSearch}>
            <input type='text' value={query} onChange={changeQuery}/>
            <button className='srchBtn' type='submit'><FaSearch/></button>
        </form>
    </nav>
  )
}

export default Navbar