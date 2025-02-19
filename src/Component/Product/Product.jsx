import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { cartContext } from '../../Context/CartContextProvider';
import toast, { Toaster } from 'react-hot-toast';
import { wishContext } from '../../Context/WishContextProvider';

export default function Product() {
  let [Page,setPage]=useState('1');
  let {addUserCart,setCartNumber} = useContext(cartContext)
   let{addWishItems,wishItemsNumber, setwishItemsNumber, getWishItems}=useContext(wishContext)
    let [wishItems,setWishItems]=useState(null);
  //  useEffect(()=>{
  //   let wishlistitems = JSON.parse(localStorage.getItem("wishList"));
  //   if(wishlistitems){
  //     setWishItems(wishlistitems)
  //     console.log(wishItems)
  //   }
  //       },[])
  function getAllProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${Page}`)
  }
 let{data,isLoading,isError,error}= useQuery({
  queryKey:['ProductsData',Page],
  queryFn:getAllProducts,
  });
  
 function addCartProduct(id){
  addUserCart(id).then((req)=>{
    setCartNumber(req.data.numOfCartItems)
    toast.success(req.data.message);
  }).catch((err)=>{
    toast.error(err.response.data.message);
  })
 }
 function getPageNumber(e){

  let page=e.target.getAttribute('page')
  setPage(page);
  }
  function addtoWishItems(id){
    addWishItems(id).then((req)=>{
    toast.success(req.data.message)
    setwishItemsNumber(req.data.data.length)
    setWishItems(req.data.data);
    localStorage.setItem('wishList',JSON.stringify(req.data.data))
    }).catch((err)=>{
   toast.error(err.response.data.message)
    })
  }
  if(isError){
    return <h2 className='text-red-600'>{error.response.data.message}</h2>
  }
  return (
    <>
      <Toaster />
    {isLoading?    
    <div className='h-screen bg-slate-200 flex justify-center items-center'><span className="loader"></span></div>:<div className='w-10/12 mx-auto my-3'>
     <div className='flex flex-wrap '>
      {data?.data?.data?.map((product)=>{
       let {_id,title,price,imageCover,category,ratingsAverage}=product
       let{name}=category
      return(<div className='lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 mb-3'>
  <div key={_id} className="item group overflow-hidden hover:border hover:border-main p-2">
  <Link to={`/ProductDetails/${_id}`}>
   <img src={imageCover} alt={title} className='w-full'/>
   <h5 className='text-main'>{name}</h5>
   <h2 className=''>{title.split(" ").slice(0,2).join(" ")}</h2>
   <div className='flex justify-between'>
    <span>{price} LE</span>
    <span><i className=' fa-solid fa-star text-yellow-300'></i>{ratingsAverage}</span>
   </div>
  </Link>
  <div className='text-end'> <i onClick={()=>addtoWishItems(_id)} className="fa-solid fa-heart text-2xl"></i></div>
  <button className='btn mt-3 translate-y-24 group-hover:translate-y-0 duration-500' onClick={()=>addCartProduct(_id)}>Add To Cart</button>
  </div>
  </div>)
      })}
     
     </div>
     

<nav aria-label="Page navigation example " >
  <ul className="flex items-center -space-x-px h-8 text-sm justify-center">
    <li>
      <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span className="sr-only">Previous</span>
        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
        </svg>
      </a>
    </li>
    {new Array(data?.data?.metadata?.numberOfPages)?.fill("").map((elem,i)=>{
return(<li key={i+1} onClick={getPageNumber} >
  <a  page={i+1} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{i+1}</a>
</li>)
    })}
    
    
    <li>
      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span className="sr-only">Next</span>
        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
        </svg>
      </a>
    </li>
  </ul>
</nav>



    </div>}

     
    </>
   
  )
}
