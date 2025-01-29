import React, { useContext } from 'react'
import { Link ,NavLink, useNavigate} from 'react-router-dom'
import logoImg from '../../assets/images/freshcart-logo.svg'
import { AuthContext } from '../../Context/AuthContextProvider'

export default function Navbar() {
  let navg = useNavigate();
  let {token,setToken} =useContext(AuthContext)
  function logout(){
    localStorage.removeItem("userData");
    setToken(null);
    navg('/login')
  }
  return (
    <>
    

<nav className="bg-white border-gray-200 dark:bg-gray-900 shadow">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between  mx-auto p-2">
    
    <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logoImg}className="h-8" alt="" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
    </Link>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:flex md:w-4/5  " id="navbar-default">
    {token?(   <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <NavLink to="/" className={(x)=>x.isActive?'block py-2 px-3 text-active':'block py-2 px-3 '} aria-current="page">Home</NavLink>
        </li>
        <li>
          <NavLink to="/product" className={(x)=>x.isActive?'block py-2 px-3 text-active':'block py-2 px-3 '} aria-current="page">Products</NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={(x)=>x.isActive?'block py-2 px-3 text-active':'block py-2 px-3 '} aria-current="page">Cart</NavLink>
        </li>
        <li>
          <NavLink to="/brand" className={(x)=>x.isActive?'block py-2 px-3 text-active':'block py-2 px-3 '} aria-current="page">brands</NavLink>
        </li>
        <li>
          <NavLink to="/category" className={(x)=>x.isActive?'block py-2 px-3 text-active':'block py-2 px-3 '}aria-current="page">Category</NavLink>
        </li>
        
      </ul>):('')}
   
      <ul className="font-medium ms-auto space-x-3 flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li className='py-2 px-2'>
          <a href='#' ><i className="fa fa-brands fa-facebook"></i></a>
        </li>
        <li className='py-2 px-2'>   
        <a href='#' ><i className="fa fa-brands fa-twitter"></i></a>
        </li>
        <li className='py-2 px-2'>
        <a href='#'><i className="fa fa-brands fa-instagram"></i></a>
        </li>
        <li className='py-2 px-2'>
        <a href='#'><i className="fa fa-brands fa-youtube"></i></a>
        </li>
      </ul>
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {token?(<li onClick={logout}>
        <Link className='block py-2 px-3 '>Logout</Link>
        </li>):(<><li>
          <NavLink to="/register" className={(x)=>x.isActive?'block py-2 px-3 text-active':'block py-2 px-3 '} aria-current="page">SignUp</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={(x)=>x.isActive?'block py-2 px-3 text-active':'block py-2 px-3 '} aria-current="page">Login</NavLink>
        </li></> )}
       
        
       
        
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}
