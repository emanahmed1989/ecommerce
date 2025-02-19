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
import ProductDetails from './Component/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/production';
import CartContextProvider from './Context/CartContextProvider';
import ShippingDetails from './Component/ShippingDetails/ShippingDetails';
import AllOrders from './Component/AllOrders/AllOrders';
import WishContextProvider from './Context/WishContextProvider';
import WishList from './Component/WishList/WishList';
import OrderDetails from './Component/OrderDetails/OrderDetails';





export default function App() {
  let client = new QueryClient();
  let router = createBrowserRouter([{path:'',element:<Layout/>,errorElement:<Notfound/>,children:[
    {index:true ,element:<ProtectedRouting><Home/></ProtectedRouting>},
    {path:'product' ,element:<ProtectedRouting><Product/></ProtectedRouting>},
    {path:'cart' ,element:<ProtectedRouting><Cart/></ProtectedRouting>},
    {path:'wishList' ,element:<ProtectedRouting><WishList/></ProtectedRouting>},
    {path:'login' ,element:<Login/>},
    {path:'register' ,element:<Signup/>},
    {path:'brand' ,element:<ProtectedRouting><Brand/></ProtectedRouting>},
    {path:'category' ,element:<ProtectedRouting><Category/></ProtectedRouting>},
    {path:'ProductDetails/:id' ,element:<ProtectedRouting><ProductDetails/></ProtectedRouting>},
    {path:'ShippingDetails/:id' ,element:<ProtectedRouting><ShippingDetails/></ProtectedRouting>},
    {path:'allorders' ,element:<ProtectedRouting><AllOrders/></ProtectedRouting>},
    {path:'OrderDetails/:id' ,element:<ProtectedRouting><OrderDetails/></ProtectedRouting>},
    {path:'ForgitPassword',element:<ForgitPassword/>} ,
    {path:'UpdatePassword',element:<UpdatePassword/>},
  ]}])
  return (
    <>
    <QueryClientProvider client={client}>
      <ReactQueryDevtools></ReactQueryDevtools>
    <AuthContextProvider>
      <CartContextProvider
      ><WishContextProvider>
      <RouterProvider router={router} ></RouterProvider>
      </WishContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
    </QueryClientProvider>
    
    
    </>
  )
}
