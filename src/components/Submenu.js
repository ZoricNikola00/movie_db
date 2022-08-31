import { useState } from "react"
import {Link} from 'react-router-dom'

const Submenu = ({page,links}) => {
    const [showSub,setShowSub]=useState(false)
    const width = window.innerWidth>1080;
    const show=()=>{
        setShowSub(true)
    }
    const close=()=>{
        setShowSub(false)
    }
    console.log(width)
  return (
    <>
    {width &&
    <li onMouseOver={show} onMouseLeave={close} className="list">{page}
        {showSub && <ul className="sub">{
            links.map((x,i)=>{
                return <Link key={i} to={x.url}><li  className="subList">{x.label}</li></Link>
            })
        }</ul>}
    </li>}
    {!width && <li onClick={()=>setShowSub(p=>!p)} className="list">{page}
        {showSub && <ul className="sub">{
            links.map((x,i)=>{
                return <Link key={i} to={x.url}><li  className="subList">{x.label}</li></Link>
            })
        }</ul>}
    </li>}
    </>
  )
}

export default Submenu