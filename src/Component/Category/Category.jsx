import React from 'react'
import UseApi from '../../Hooks/UseApi'

export default function Category() {

  let {data,isLoading,isError,error}=UseApi('categories');
  if(isError){
    return <h2>{error}</h2>
  }
  return (
    <>
    {isLoading?<div className='h-screen bg-slate-200 flex justify-center items-center'><span className="loader"></span></div>:<div className='w-10/12 mx-auto my-3'><div className=" flex flex-wrap ">
      {data?.data?.data?.map((element) => {
        
        let { _id, image,name } = element
        return (<div className='w-1/4 ' key={_id}>
          <div className="item mt-2 me-4">
            <img src={image} alt="" className="w-full h-48 object-cover object-top" />
          <h5 className='mt-2'>{name}</h5>
          </div>
          
        </div>)
      })}


   
 

</div></div>}
    
</>)
}
