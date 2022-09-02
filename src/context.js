import axios from 'axios'
import { useState, useContext, useReducer, useEffect,createContext } from 'react'
import { reducer } from './reducer'
const AppContext = createContext()

const initialState={
    'favorites':[],
    'watchlist':[]
  }


const AppProvider = ({ children }) => {
    const [movies,dispatch]=useReducer(reducer,[],()=>{
        const localData=localStorage.getItem('movies')
        return localData && localData.length>0?JSON.parse(localData):initialState
      })

      const toggle=(id,title,img,media,which)=>{
        dispatch({type:'TOGGLE',movie:{
          id,title,img,media
        },which:which})
      }
      console.log(movies)
      const remove=(id,which)=>{
        dispatch({type:'REMOVE',id:id,which:which})
      }
    const fetchData=async(url)=>{
        return await axios(url).then(res=>{return res.data}).catch(err=>console.log(err))
            
    }
    console.log(fetchData('https://api.themoviedb.org/3/movie/now_playing?api_key=72de8895bb64376912ef844faac64a10&page='))

    return <AppContext.Provider value={{fetchData,toggle,...movies}}>{children}</AppContext.Provider>
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

  export { AppContext, AppProvider }