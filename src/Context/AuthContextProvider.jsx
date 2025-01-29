import React, { createContext, useEffect, useState } from 'react'
export let AuthContext =createContext();
export default function AuthContextProvider({children}) {
    let [token,setToken]=useState(null);
    useEffect(()=>{
let userToken = localStorage.getItem("userData");
if(userToken){
  setToken(userToken)
}
    },[])
  return (
    <div>
        <AuthContext.Provider value={{token,setToken}} >
        {children}
        </AuthContext.Provider>
    </div>
  )
}
