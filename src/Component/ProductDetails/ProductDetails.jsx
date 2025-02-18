import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContextProvider';

export default function ProductDetails() {
  let {addUserCart,setCartNumber}=useContext(cartContext)
  let { id } = useParams();
  function getproductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  
  let {data,isLoading,error,isError}=useQuery({
    queryKey:["productDetailsOf",id],
    queryFn:getproductDetails,
  })
  function addProducttoCart(id){
    addUserCart(id).then((req)=>{
      setCartNumber(req.data.numOfCartItems);
      toast.success(req.data.message);
    }).catch((err)=>{
     toast.error(err.response.data.message)
    });
  }
  
function changeimage(e){
  let image= document.getElementById('myImg');
  image.setAttribute('src',e.target.getAttribute('src'))
}

if(isError){
  return <h1>{error.response.data.Message}</h1>
}
  return (
    <>
    <Toaster/>
    {isLoading?<div className='h-screen bg-slate-200 flex justify-center items-center'><span className="loader"></span></div>:<div className=' w-10/12 mx-auto my-5'>
      <div className='flex justify-between items-center'>
        <div className='w-3/12'>
          <img id='myImg'src={data?.data?.data?.imageCover} alt={data?.data?.data?.title} className='w-full' />
          <div className='flex'>
            {data?.data?.data?.images.map((img,i)=>{
             return  (<div key={i}><img  onClick={changeimage} src={img} alt={data?.data?.data?.title} className='w-full'  /></div>)
            })}
          </div>
        </div>
        <div className='w-8/12'>
          <h2 className=''>{data?.data?.data?.title}</h2>
          <p className='text-gray-500 my-5'>{data?.data?.data?.description}</p>
          <p>{data?.data?.data?.category.name}</p>
          <div className='flex justify-between'>
            <span>{data?.data?.data?.price} LE</span>
            <span><i className=' fa-solid fa-star text-yellow-300'></i>{data?.data?.data?.ratingsAverage}</span>
          </div>
          <button className='btn mt-5 ' onClick={()=>addProducttoCart(id)}>Add To Cart</button>
        </div>
      </div>
    </div>
}
    </>
    
    
  )
}
