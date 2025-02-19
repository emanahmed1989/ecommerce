import React from 'react'

export default function OrderDetails() {

    let order = JSON.parse(localStorage.getItem('order'))
    console.log(order)
  return (
    <>
    
    <div className='w-9/12 mx-auto my-10 bg-gray-50 rounded-lg shadow-lg'>

    <div className='flex justify-between p-4 '>
        <div className='w-4/12'>
          <h2>orderId: <span  className=' text-main'>{order?.id}</span></h2>
          <h2>total Payment Price: <span  className=' text-main'>{order?.totalOrderPrice}</span></h2>
          <h2>Payment Method: <span className='border bg-main text-white rounded-lg   px-1'>{order?.paymentMethodType}</span></h2>
          <h2> <span className='text-gray-700'>{order?.createdAt}</span></h2>
        </div>
        <div className='w-4/12'>
          <h2 className='text-2xl text-main'>Adress Info</h2>
          <h2>Details: <span  className=' text-main'>{order?.shippingAddress.details}</span></h2>
          <h2>City: <span  className=' text-main'>{order?.shippingAddress.city}</span></h2>
          <h2>Phone <span  className=' text-main'>{order?.shippingAddress.phone}</span></h2>
        </div>
        <div className='w-4/12'>
          <h2 className='text-2xl text-main'>Customer Info :</h2>
          <h2>Name: <span  className=' text-main'>{order?.user.name}</span></h2>
          <h2>Email: <span  className=' text-main'>{order?.user.email}</span></h2>
          <h2>Phone: <span  className=' text-main'>{order?.user.phone}</span></h2>
        </div>
    </div>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-9/12 mx-auto text-sm text-center  text-gray-500 dark:text-gray-400 my-5" >
        <thead className="text-xs text-white uppercase bg-main dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Quantity
                </th>
            </tr>
        </thead>
        <tbody>
          {order?.cartItems.map((item)=>{
     return<>
     <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className='flex justify-between'>
                        <div className='w-2/12'><img src={item.product.imageCover} alt="{item.product.title}" className='w-10' /></div>
                        <div className='w-9/12'><span> {item.product.title}</span></div>
                    </div>
               
                </th>
                <td className="px-6 py-4">
                    {item.price}
                </td>
                <td className="px-6 py-4 ">
                 {item.count}
                </td>   
            </tr>
     </>
          })}
            
        </tbody>
    </table>
</div>
    
    </div>
    </>
  )
}
