import axios from 'axios'
import { useState, useContext, useReducer, useEffect,createContext } from 'react'
import { useNavigate } from 'react-router-dom'
const AppContext = createContext()


const AppProvider = ({ children }) => {
    
    

    return <AppContext.Provider value=''>{children}</AppContext.Provider>
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

  export { AppContext, AppProvider }