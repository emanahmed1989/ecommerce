import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
export default function AllOrders() {
  let navg =useNavigate();
  const userToken =localStorage.getItem('userData');
  const decoded = jwtDecode(userToken);
  const userId=decoded.id
  
  let headerconfig = {
    headers: {
        token: userToken,
    },
};
  function getallOrders(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,headerconfig);

  }
  
  let{isError,error,isLoading,data}=useQuery({
    queryKey:['allOrders'],
    queryFn:getallOrders
    });
    function openOrder(id,order){
      localStorage.setItem('order',JSON.stringify(order))
      navg(`/OrderDetails/${id}`)
    }
    if(isError){
      return <h2 className='text-red-600'>{error.response.data.message}</h2>
      
    }
    if(isLoading){
      return   <div className='h-screen bg-slate-200 flex justify-center items-center'><span className="loader"></span></div>
    }
  return (
    <>
    
    <div className='w-9/12 mx-auto my-10'>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-center  text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Order Number
                </th>
                <th scope="col" className="px-6 py-3">
                    Order Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action 
                </th>
               
            </tr>
        </thead>
        <tbody>
          {data?.data?.map((order)=>{
     return<>
     <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                #{order.id}
                </th>
                <td className="px-6 py-4">
                    {order.totalOrderPrice}
                </td>
                <td className="px-6 py-4 ">
                  <div className='my-2'>{order.isPaid?<span className='border bg-green-600 text-white rounded-lg  py-1 px-3'>isPaid</span>:<span className='border bg-green-700 text-white rounded-lg  py-1 px-3 mb-2 '>not Paid</span>}</div>  
                    {order.isDelivered?<span className='border bg-pink-600 text-white rounded-lg  py-1 px-3'>isDelivered</span>:<span className='border bg-pink-700 text-white rounded-lg  py-1 px-3'>not Delivered</span>}
                </td>
                <td className="px-6 py-4">
                  
                <button className='btn scale-75' onClick={()=>openOrder(order.id,order)}>View</button> 
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
