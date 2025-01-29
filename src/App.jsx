import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Component/Home/Home';
import Layout from './Component/Layout/Layout';
import Product from './Component/Product/Product';
import Cart from './Component/Cart/Cart';
import Login from './Component/Login/Login';
import Signup from './Component/Signup/Signup';
import Notfound from './Component/Notfound/Notfound';
import Brand from './Component/Brand/Brand';
import Category from './Component/Category/Category';
import ForgitPassword from './Component/ForgitPassword/ForgitPassword';
import AuthContextProvider from './Context/AuthContextProvider';
import ProtectedRouting from './Component/ProtectedRouting/ProtectedRouting';
import UpdatePassword from './Component/UpdatePassword/UpdatePassword';


export default function App() {
  let router = createBrowserRouter([{path:'',element:<Layout/>,errorElement:<Notfound/>,children:[
    {index:true ,element:<ProtectedRouting><Home/></ProtectedRouting>},
    {path:'product' ,element:<ProtectedRouting><Product/></ProtectedRouting>},
    {path:'cart' ,element:<ProtectedRouting><Cart/></ProtectedRouting>},
    {path:'login' ,element:<Login/>},
    {path:'register' ,element:<Signup/>},
    {path:'brand' ,element:<ProtectedRouting><Brand/></ProtectedRouting>},
    {path:'category' ,element:<ProtectedRouting><Category/></ProtectedRouting>},
    {path:'ForgitPassword',element:<ForgitPassword/>} ,
    {path:'UpdatePassword',element:<UpdatePassword/>},
  ]}])
  return (
    <>
    <AuthContextProvider>
    <RouterProvider router={router} ></RouterProvider>
    </AuthContextProvider>
    
    </>
  )
}
