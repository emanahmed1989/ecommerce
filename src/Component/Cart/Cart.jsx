import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContextProvider'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  let { getCartData, deleteUserCartItem, setCartNumber, clearUserCart, updateCartItem } = useContext(cartContext);
  let [cartDataList, setCartData] = useState(null);
  let [loader, setloader] = useState(true)
  useEffect(() => {
    getUserCartData();
  }, [])
  function getUserCartData() {
    setloader(true);
    getCartData().then((req) => {
      setCartData(req.data.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setloader(false)
    })
  }
  function deleteCartItem(id) {
    deleteUserCartItem(id).then((req) => {
      setCartNumber(req.data.numOfCartItems);
      setCartData(req.data.data)
      toast.success('product Deleted Successfully')
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
  }
  function clearCart() {
    clearUserCart().then((req) => {
      if (req.data.message == 'success') {
        toast.success('cart deleted successfully')
        setCartData(null)
        setCartNumber(null)
      }
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
  }
  function updateProductCount(id, count) {
    document.getElementById(id).innerHTML='<i class="fa-solid fa-spinner fa-spin text-main"></i>'
    updateCartItem(id, count).then((req) => {
      setCartNumber(req.data.numOfCartItems);
      setCartData(req.data.data)
      document.getElementById(id).innerHTML=count
      toast.success('product Updated Successfully')
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
  }
  if (loader) {
    return <div className='h-screen bg-slate-200 flex justify-center items-center'><span className="loader"></span></div>
  }
  return (
    <>
      <Toaster />
      {cartDataList?.products.length > 0 ?
        <div className='w-9/12 mx-auto  my-5'>
          <div className='bg-gray-200 p-4'>
            <h1 className='text-2xl'>Shop Cart:</h1>
            <div className='flex justify-between'>
              <h2 className='text-2xl text-main'>Total Cart Price :{cartDataList?.totalCartPrice} EGP</h2>
              <button onClick={clearCart} className='border hover:border-red-500 px-2 py-1 rounded hover:bg-white hover:text-red-500 bg-red-500 text-white '> Clear Cart</button>
            </div>

            <div className='divide-y-2  divide-gray-300'>

              {cartDataList.products.map((product) => {
                return (<div key={product._id} className='flex  items-center py-3 '>
                  <div className='w-10/12'>
                    <div className='flex justify-between items-center'>
                      <div className='w-1/12 '>
                        <img src={product.product.imageCover} alt={product.product.title} className='w-full' />
                      </div>
                      <div className='w-10/12 '>
                        <h2>{product.product.title}</h2>
                        <h2 className='text-main my-2'>price:{product.price}</h2>
                        <button onClick={() => deleteCartItem(product.product._id)} className='border border-red-500 px-2 py-1 rounded text-red-500 hover:bg-red-500 hover:text-white'>
                          <i className='fa-solid fa-trash-can mr-2'></i>
                          remove
                        </button>

                      </div>

                    </div>
                  </div>
                  <div className='w-2/12'>
                    <i onClick={() => updateProductCount(product.product._id, product.count + 1)} className='fa-solid fa-plus border cursor-pointer border-main rounded  p-2'></i>
                    <span id={product.product._id} className='mx-2'>{product.count}</span>
                    <i onClick={() => updateProductCount(product.product._id, product.count - 1)} className='fa-solid fa-minus border cursor-pointer border-main rounded  p-2'></i>
                  </div>
                </div>
                )
              })}
            </div>

          </div>
          <Link className='mt-2 block btn text-center' to={'/ShippingDetails/'+cartDataList._id}>pay</Link>
        </div>

        : <div className='text-center bg-red-500'>No Data</div>}
    </>
  )
}
