import React from 'react'
import sublinks from '../../menuData'
import {FaTimes} from 'react-icons/fa/'
import {FiMenu} from 'react-icons/fi/'
import Submenu from './Submenu'
import {Link} from 'react-router-dom'
import SearchBar from './SearchBar'
import { useGlobalContext } from '../../context'

const Navbar = () => {
    const {showMenu,setShowMenu}=useGlobalContext()
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
                        return <li key={i} className='list'><Link onClick={()=>setShowMenu(false)} to={x.link}>{x.page}</Link></li>
                    }
                    return <Submenu key={i} {...x}/>
                })}
            </ul>
        </div>
       <SearchBar/>
    </nav>
  )
}

export default Navbar