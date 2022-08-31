import axios from 'axios'
import { useState, useContext, useReducer, useEffect,createContext } from 'react'
const AppContext = createContext()


const AppProvider = ({ children }) => {
    const fetchData=async(url)=>{
        return await axios(url).then(res=>{return res.data}).catch(err=>console.log(err))
            
    }
    console.log(fetchData('https://api.themoviedb.org/3/movie/now_playing?api_key=72de8895bb64376912ef844faac64a10&page='))

    return <AppContext.Provider value={{fetchData}}>{children}</AppContext.Provider>
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

  export { AppContext, AppProvider }