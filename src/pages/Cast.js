import { useQuery } from '@tanstack/react-query';
import { useParams,Link } from "react-router-dom";
import { useGlobalContext } from '../context';
import ReactLoading from 'react-loading';

const img_path='https://image.tmdb.org/t/p/w1280'

const Cast = () => {
    const {fetchData}=useGlobalContext()
    const {id,type}=useParams()
    const {data,isLoading,isError,error}=useQuery(['cast'],()=>fetchData(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${procces.env.TMDB_API_KEY}&language=en-US`))

    if(isLoading){
        return <ReactLoading className='loader' type='spinningBubbles' color={'#273b55'} height={'300px'} width={'300px'}/>
    }
    if(isError){
        return <div>{error}</div>
    }
    const {cast,crew}=data
    const ids =crew?.map(o => o.name)
    const filtered =crew?.filter(({name}, index) => !ids.includes(name, index + 1))

  return (
    <div className='castCont'>
        <div className='allCast'>
            <div className='castHead'><p>Cast</p><span>{cast?.length}</span></div>
            {cast?.map((cast)=>{
                const {id,name,character,profile_path}=cast
                return <div key={id} className='singleCast'>
                        <Link to={`/person/${id}`}><img src={`${img_path}${profile_path}`} alt='Image not found' onError={(e)=>{e.target.onerror=null;e.target.src=`https://images.assetsdelivery.com/compings_v2/belopoppa/belopoppa2002/belopoppa200200004.jpg`}}/></Link>
                        <div className='nameAndCharacter'>
                            <h3>{name}</h3>
                            <p>{character}</p>
                        </div>
                       </div>
            })}
        </div>
        <div className='allCast'>
        <div className='castHead'><p>Crew</p><span>{crew?.length}</span></div>
        {filtered?.map((x)=>{
                const {id,name,known_for_department,profile_path}=x
                
                return <div key={id} className='singleCast'>
                        <Link to={`/person/${id}`}><img src={`${img_path}${profile_path}`} alt='Image not found' onError={(e)=>{e.target.onerror=null;e.target.src=`https://images.assetsdelivery.com/compings_v2/belopoppa/belopoppa2002/belopoppa200200004.jpg`}}/></Link>
                        <div className='nameAndCharacter'>
                            <h3>{name}</h3>
                            <p>{known_for_department}</p>
                        </div>
                       </div>
            })}
        </div>  
    </div>
  )
}

export default Cast