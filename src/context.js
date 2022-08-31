import axios from 'axios'
import { useState, useContext, useReducer, useEffect,createContext } from 'react'
const AppContext = createContext()


const AppProvider = ({ children }) => {
    const fetchData=async(url)=>{
        const data=await axios.get(url)
    }
    

    return <AppContext.Provider value=''>{children}</AppContext.Provider>
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

  export { AppContext, AppProvider }