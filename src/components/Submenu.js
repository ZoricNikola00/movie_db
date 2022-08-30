import { useState } from "react"

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
                return <li key={i} className="subList">{x.label}</li>
            })
        }</ul>}
    </li>}
    {!width && <li onClick={()=>setShowSub(p=>!p)} className="list">{page}
        {showSub && <ul className="sub">{
            links.map((x,i)=>{
                return <li key={i} onClick={()=>console.log('AGA')} className="subList">{x.label}</li>
            })
        }</ul>}
    </li>}
    </>
  )
}

export default Submenu