import React, { useState } from 'react'
import sublinks from '../menuData'
import {FaTimes} from 'react-icons/fa/'
import {FiMenu} from 'react-icons/fi/'
import Submenu from './Submenu'
import { useGlobalContext } from '../context'
import {Link} from 'react-router-dom'
import SearchBar from './SearchBar'

const Navbar = () => {
    const [showMenu,setShowMenu]=useState(false)
    const {query,changeQuery,submitSearch}=useGlobalContext()
  return (
    <nav className='nav'>
        <h1 className='logo'>
            <Link to='/'>MovieDB</Link>
        </h1>
        <div onClick={()=>setShowMenu(true)} className='menuNav'><FiMenu/></div>
        <div className={showMenu?'active menuContainer':'menuContainer'}>
            <ul className={showMenu?'active nav-list':'nav-list'}>
                {showMenu && <div className='closeMenu' onClick={()=>setShowMenu(false)}><FaTimes/></div>}
                {sublinks.map((x,i)=>{
                    if(!x.links){
                        return <li key={i} className='list'><Link to={x.link}>{x.page}</Link></li>
                    }
                    return <Submenu  key={i} {...x}/>
                })}
            </ul>
        </div>
       <SearchBar/>
    </nav>
  )
}

export default Navbar