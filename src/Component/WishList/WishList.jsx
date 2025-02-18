import React, { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { wishContext } from '../../Context/WishContextProvider';
import { cartContext } from '../../Context/CartContextProvider';

export default function WishList() {
  let { getWishItems,removeWishItems,setwishItemsNumber } = useContext(wishContext)
  let{addUserCart,setCartNumber}=useContext(cartContext)
  let [wishList, setWishList] = useState(null);
  let [loader, setloader] = useState(true)
  
  useEffect((() => {
    getUserWishItems();
  }), [])
  function getUserWishItems() {
    setloader(true);
    getWishItems().then((req) => {
      setWishList(req.data.data)
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setloader(false)
    });
  }
  function addCartProduct(id){
    addUserCart(id).then((req)=>{
      setCartNumber(req.data.numOfCartItems);
      toast.success(req.data.message);
      removeUserWishItems(id);
    }).catch((err)=>{
      toast.error(err.response.data.message);
    })
   }
  function removeUserWishItems(id){
    removeWishItems(id).then((req)=>{
      setwishItemsNumber(req.data.data.length);
      getUserWishItems();
      //toast.success(req.data.message);
    }).catch((err)=>{
    toast.error(err.response.data.message)
    })

  }
  if (loader) {
    return <div className='h-screen bg-slate-200 flex justify-center items-center'><span className="loader"></span></div>
  }
  return (
    <>
      <Toaster />
      {wishList?.length > 0 ?
        <div className='w-9/12 mx-auto  my-5'>
          <div className='bg-gray-200 p-4'>
            <h1 className='text-2xl'>WishList:</h1>
            <div className='divide-y-2  divide-gray-300'>

              {wishList?.map((product) => {
                return (<div key={product.id} className='flex  items-center py-3 '>
                  <div className='w-10/12'>
                    <div className='flex justify-between items-center'>
                      <div className='w-1/12 '>
                        <img src={product.imageCover} alt={product.title} className='w-full' />
                      </div>
                      <div className='w-10/12 '>
                        <h2>{product.title}</h2>
                        <h2 className='text-main my-2'>price:{product.price}</h2>
                        <button onClick={()=>removeUserWishItems(product.id)} className='border border-red-500 px-2 py-1 rounded text-red-500 hover:bg-red-500 hover:text-white'>
                          <i className='fa-solid fa-trash-can mr-2'></i>
                          remove
                        </button>

                      </div>

                    </div>
                  </div>
                  <div className='w-2/12'>
                  <button className='btn ' onClick={()=>addCartProduct(product.id)}>Add To Cart</button>
                  </div>
                </div>
                )
              })}
            </div>

          </div>
        </div>

        : <div className='text-center bg-red-500'>No Data</div>}
    </>
  )
}
