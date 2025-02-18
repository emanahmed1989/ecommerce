import React from 'react'
import {   useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function ShippingDetails() {
    let { id } = useParams();
   
    const headerConf =  {
        headers:{
            token:localStorage.getItem('userData'),
        },
    };
    let initialValues={
        details: "",
        phone: "",
        city: ""
    }
    let validationSchema=Yup.object({
        details:Yup.string().required('details is required'),
        phone:Yup.string().required('phone number is required').matches(/^(20)?01[1250][0-9]{8}$/,'Invalid Number'),
        city:Yup.string().required('City is required'),
    });
    let shippingFormik =useFormik({
        initialValues,
        onSubmit:checkOutSession,
        validationSchema,
    })
    function checkOutSession(values){
       let data ={
        shippingAddress:values
    }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:5173`,data,headerConf)
        .then((req)=>{
            console.log(req.data.session.url)
            console.log(req.data.status=='success')
            if(req.data.status=='success'){
              window.open(req.data.session.url,'_self')
            }

        })
        .catch((err)=>{
            toast.error(err.response.data.message)
        })
    }

    return (
        <>
        <Toaster/>
            <div className='w-7/12 mx-auto'>
                <h1 className='text-main my-3'>ShippingDetails</h1>
                <form onSubmit={shippingFormik.handleSubmit} className='mx-auto mt-3'>
                    <div className='mb-5'>
                        <label htmlFor="details" className='text-sm font-medium text-gray-900 dark:text-white'>Details:</label>
                        <input 
                        value={shippingFormik.values.details}
                        onChange={shippingFormik.handleChange}
                        onBlur={shippingFormik.handleBlur}
                        type="text" name="details" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
                    {shippingFormik.touched.details && shippingFormik.errors.details ? <p className='text-red-500'>{shippingFormik.errors.details}</p> : ''}
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="city" className='text-sm font-medium text-gray-900 dark:text-white'>City:</label>
                        <input
                        value={shippingFormik.values.city}
                        onChange={shippingFormik.handleChange}
                        onBlur={shippingFormik.handleBlur}
                        type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
                    {shippingFormik.touched.city && shippingFormik.errors.city ? <p className='text-red-500'>{shippingFormik.errors.city}</p> : ''}
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="phone" className='text-sm font-medium text-gray-900 dark:text-white'>Phone:</label>
                        <input
                        value={shippingFormik.values.phone}
                        onChange={shippingFormik.handleChange}
                        onBlur={shippingFormik.handleBlur}
                        type="tel" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
                    {shippingFormik.touched.phone && shippingFormik.errors.phone ? <p className='text-red-500'>{shippingFormik.errors.phone}</p> : ''}
                    </div>
                    <button disabled={!(shippingFormik.isValid&&shippingFormik.dirty)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled:bg-opacity-30">Submit</button>
                </form>
            </div>

        </>
    )

}
