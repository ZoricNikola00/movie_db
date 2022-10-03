import axios from 'axios'
import { useState, useContext, useReducer, useEffect,createContext } from 'react'
import { reducer } from './reducer'
const AppContext = createContext()

const initialState={
    'favorites':[],
    'watchlist':[],
    'rated':[]
  }


const AppProvider = ({ children }) => {
  const [showMenu,setShowMenu]=useState(false)

    const [movies,dispatch]=useReducer(reducer,[],()=>{
        const localData=localStorage.getItem('movies')
        return localData?.length>0?JSON.parse(localData):initialState
      })
      useEffect(()=>{
        localStorage.setItem('movies', JSON.stringify(movies))
        },[movies])
        
      const toggle=(id,title,img,media,which)=>{
        dispatch({type:'TOGGLE',movie:{
          id,title,img,media
        },which:which})
      }
      const rate=(id,title,img,media,rating)=>{
        dispatch({type:'RATE',ratedShow:{
          id,title,img,media,rating
        }})
      }
      const remove=(id,which)=>{
        dispatch({type:'REMOVE',id:id,which:which})
      }
    const fetchData=async(url)=>{
        return await axios(url).then(res=>{return res.data}).catch(err=>console.log(err))
            
    }
    console.log(fetchData('https://api.themoviedb.org/3/movie/now_playing?api_key=72de8895bb64376912ef844faac64a10&page='))

    return <AppContext.Provider value={{showMenu,setShowMenu,rate,fetchData,remove,toggle,...movies}}>{children}</AppContext.Provider>
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

  export { AppContext, AppProvider }