import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../context'

const img_path='https://image.tmdb.org/t/p/w1280'

const Rated = () => {
  const {rated,remove}=useGlobalContext()
console.log(rated)
  return (
    <div className='favoriteCont'>
      <h1>Rated Movies</h1>      
      <div className='favorites'>
        {rated?.map((x)=>{
          const {id,title,img,media,rating}=x
          return <div key={id} className='favorite'>
                   <Link to={`/singleItem/${media}/${id}/`}><img src={`${img_path}${img}`}/>
                    <h3>{title}</h3></Link>
                    <div className='myRating'>{rating}</div>
                    <button className='rmvFav' onClick={(e)=>remove(id,'rated')}><FaTimes/></button>
                </div> 
        })}
      </div>
    </div>
  )
}


export default Rated