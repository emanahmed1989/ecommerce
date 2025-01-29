import React, { useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContextProvider';

export default function Login() {
  let { setToken } = useContext(AuthContext);
  const baseUrl = 'https://ecommerce.routemisr.com'
  let navg = useNavigate()
  let [errMessage, setErr] = useState("")
  let initialValues = {
    email: "",
    password: ""
  };
  let validationSchema = Yup.object({
    email: Yup.string().required("Email Required").email("Enter Valid Email"),
    password: Yup.string().required("password Rrquired").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password Invalid"),
  });

  let loginFormik = useFormik({
    initialValues,
    onSubmit: loginApi,
    validationSchema,
  });

  function loginApi(data) {
    axios.post(`${baseUrl}/api/v1/auth/signin`, data).then((req) => {
      if (req.data.message == "success") {
        setToken(req.data.token);
        localStorage.setItem("userData", req.data.token)

        navg('/')
      }
    })
      .catch((err) => {
        setErr(err.response.data.message)
      });
  }


  return (
    <div className='w-7/12 mx-auto mt-5 '>
      {errMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {errMessage}
      </div> : ""}

      <h1 className='font-extrabold mb-4 text-2xl'>Login Now :</h1>
      <form onSubmit={loginFormik.handleSubmit}
        className=" mx-auto mt-2">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input
            value={loginFormik.values.email}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
          {loginFormik.touched.email && loginFormik.errors.email ? (<p className='text-red-500'>{loginFormik.errors.email}</p>) : ("")}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" value={loginFormik.values.password}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
          {loginFormik.touched.password && loginFormik.errors.password ? (<p className='text-red-500'>{loginFormik.errors.password}</p>) : ("")}
        </div>

        <Link to='/ForgitPassword'>forgetPassword?</Link><br />
        <button disabled={!(loginFormik.isValid && loginFormik.dirty)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled:bg-opacity-30">Login</button>

      </form>


    </div>
  )
}
