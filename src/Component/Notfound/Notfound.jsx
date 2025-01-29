import React from 'react'
import errImg from '../../assets/images/error.svg'
import { Link } from 'react-router-dom'
export default function Notfound() {
  return (
    <>
      <div className='container w-3/5 m-auto my-6  text-center'>
        <img src={errImg} alt="" className='w-11/12' />
        < Link to="" className='text-3xl text-active '> go home</Link>
      </div>

    </>
  )
}
