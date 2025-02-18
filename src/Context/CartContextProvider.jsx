import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
export let cartContext=createContext();
export default function CartContextProvider({children}) {
    let [cartProducsNumber,setCartNumber]=useState(null);
    const apiUrl ='https://ecommerce.routemisr.com/api/v1/cart'
    let headerconfig={
        headers:{
            token:localStorage.getItem('userData'),
        },
    };

    useEffect(()=>{
        if(localStorage.getItem('userData')){
            getCartData().then((req)=>{
                setCartNumber(req.data.numOfCartItems)
            }).catch((err)=>{
                console.log(err)
            })
        }
       
    },[])
    function getCartData(){
        return axios.get(apiUrl,headerconfig);   
    }
    function addUserCart(id){
        let data ={
            productId:id
        }
        return axios.post(apiUrl,data,headerconfig)
    }
    function deleteUserCartItem(id){
        return axios.delete(`${apiUrl}/${id}`,headerconfig)
    }
    function clearUserCart(){
        return axios.delete(apiUrl,headerconfig) 
    }
    function updateCartItem(id,countNumber){
        let data ={
            count:countNumber
        }
        return axios.put(`${apiUrl}/${id}`,data,headerconfig)
    }
  return <cartContext.Provider value={{getCartData,cartProducsNumber,setCartNumber,addUserCart,deleteUserCartItem,clearUserCart,updateCartItem}}>{children}</cartContext.Provider>

}
