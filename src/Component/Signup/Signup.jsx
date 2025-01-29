import axios from 'axios'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"

export default function Signup() {
  const baseUrl = 'https://ecommerce.routemisr.com'
  let navg = useNavigate();
  let [errMessage, seterrorMessage] = useState("");
  let initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  };
  function registerApi(data) {
    axios.post(`${baseUrl}/api/v1/auth/signup`, data).then((req) => {
      if (req.data.message == "success") {
        navg('/login');
      }
    }).catch((err) => {
      seterrorMessage(err.response.data.message)
    });
  }
  let validationSchema = Yup.object({
    name: Yup.string().required('Name Required').min(3, 'min char 3').max(20, 'max char 20'),
    email: Yup.string().required('Email Required').email('Enter Valid Email'),
    password: Yup.string().required('Password Required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Password Invalid'),
    rePassword: Yup.string().required('rePassword Required').oneOf([Yup.ref('password')], 'repassword not match password'),
    phone: Yup.string().required('phone required').matches(/^(20)?01[1250][0-9]{8}$/, 'Invalid number'),
  })
  let registerFormik = useFormik({
    initialValues,
    onSubmit: registerApi,
    validationSchema
  });
  return (
    <div className='w-7/12 mx-auto mt-5 '>
      {errMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {errMessage}
      </div> : ""}
      <h1 className='font-extrabold mb-4 text-2xl'>Register Now :</h1>
      <form onSubmit={registerFormik.handleSubmit} className=" mx-auto">
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
          <input
            value={registerFormik.values.name}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
          {registerFormik.touched.name && registerFormik.errors.name ? <p className='text-red-500'>{registerFormik.errors.name}</p> : ''}
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email"
            value={registerFormik.values.email}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
          {registerFormik.touched.email && registerFormik.errors.email ? <p className='text-red-500'>{registerFormik.errors.email}</p> : ''}
        </div>
        <div className="mb-5">
          <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password"
            value={registerFormik.values.password}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
          {registerFormik.touched.password && registerFormik.errors.password ? <p className='text-red-500'>{registerFormik.errors.password}</p> : ''}
        </div>
        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your rePassword</label>
          <input type="password"
            value={registerFormik.values.rePassword}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            name="rePassword" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
          {registerFormik.touched.rePassword && registerFormik.errors.rePassword ? <p className='text-red-500'>{registerFormik.errors.rePassword}</p> : ''}
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
          <input type="tel"
            value={registerFormik.values.phone}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
          {registerFormik.touched.phone && registerFormik.errors.phone ? <p className='text-red-500'>{registerFormik.errors.phone}</p> : ''}
        </div>
        <button disabled={!(registerFormik.isValid && registerFormik.dirty)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-text-active disabled:bg-active disabled:bg-opacity-30">SignUp</button>
      </form>
    </div>

  )
}
