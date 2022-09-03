import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../context'
import ReactLoading from 'react-loading';

const img_path='https://image.tmdb.org/t/p/w1280'

const Favorite = () => {
  const {favorites,remove}=useGlobalContext()

  return (
    <div className='favoriteCont'>
      <h1>Favorite</h1>      
      <div className='favorites'>
        {favorites?.map((favorite)=>{
          const {id,title,img,media}=favorite
          console.log(favorite)
          return <div key={id} className='favorite'>
                   <Link to={`/singleItem/${media}/${id}/`}><img src={`${img_path}${img}`}/>
                    <h2>{title}</h2></Link>
                    <button name='favorite' className='rmvFav' onClick={(e)=>remove(id,e.currentTarget.attributes.name.value)}><FaTimes/></button>
                </div> 
        })}
      </div>
    </div>
  )
}

export default Favorite