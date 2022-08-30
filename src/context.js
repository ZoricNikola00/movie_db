import axios from 'axios'
import { useState, useContext, useReducer, useEffect,createContext } from 'react'
const AppContext = createContext()


const AppProvider = ({ children }) => {
    const [query,setQuery]=useState('')

    const submitSearch=(e)=>{
        e.preventDefault()
        console.log(query)
    }
    const changeQuery=(e)=>{
        setQuery(e.target.value)
    }
    

    return <AppContext.Provider value={{query,changeQuery,submitSearch}}>{children}</AppContext.Provider>
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

  export { AppContext, AppProvider }