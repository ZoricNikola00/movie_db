import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../context'

const img_path='https://image.tmdb.org/t/p/w1280'

const Watchlist = () => {
  const {watchlist,remove}=useGlobalContext()

  return (
    <div className='favoriteCont'>
      <h1>Watchlist</h1>      
      <div className='favorites'>
        {watchlist?.map((favorite)=>{
          const {id,title,img,media}=favorite
          return <div key={id} className='favorite'>
                   <Link to={`/singleItem/${media}/${id}/`}><img src={`${img_path}${img}`}/>
                    <h3>{title}</h3></Link>
                    <button className='rmvFav' onClick={(e)=>remove(id,'watchlist')}><FaTimes/></button>
                </div> 
        })}
      </div>
    </div>
  )
}

export default Watchlist