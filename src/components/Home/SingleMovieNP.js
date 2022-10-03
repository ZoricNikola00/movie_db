import {Link} from 'react-router-dom'
const img_path='https://image.tmdb.org/t/p/w1280'

const SingleMovieNP = ({id,poster_path,title,vote_average,release_date}) => {
    const ratingColor={
        border:vote_average>6.99?'green 3px solid':vote_average>3.99?'yellow 3px solid':'red 3px solid'
    }
  return (
    <div className='singleMovieNP'>
        <Link to={`/singleItem/movie/${id}`}><img className='sm-img' src={`${img_path}${poster_path}`}/></Link>
        <h3>{title}</h3>
        <p>{release_date}</p>
        <div style={ratingColor} className='voteScore'>{vote_average}</div>
    </div>
  )
}

export default SingleMovieNP