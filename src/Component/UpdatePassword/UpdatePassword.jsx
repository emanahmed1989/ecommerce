import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
export default function UpdatePassword() {
    let navg = useNavigate();
    let [errMessage, seterrorMessage] = useState('');
    const baseUrl = "https://ecommerce.routemisr.com";
    let validationSchema = Yup.object({
        email: Yup.string().required('Email Required').email('Email Invalid'),
        newPassword: Yup.string().required('New Password Required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Invalid Password'),
    });
    function updatePasswordApi(data) {

        axios.put(`${baseUrl}/api/v1/auth/resetPassword`, data).then((req) => {
            if (req.data.token) {
                navg('/login')
            }
        }).catch((err) => {
            seterrorMessage(err.response.data.message);
        });
    }
    let updatePasswordFormik = useFormik({
        initialValues: {
            email: "",
            newPassword: ""
        },
        onSubmit: updatePasswordApi,
        validationSchema,
    });
    return (
        <div className='w-7/12 mx-auto mt-5 '>
            {errMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {errMessage}
            </div> : ""}
            <h1 className='font-extrabold mb-4 text-2xl'>Reset Password :</h1>
            <form
                onSubmit={updatePasswordFormik.handleSubmit}
                className=" mx-auto mt-2">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input
                        value={updatePasswordFormik.values.email}
                        onChange={updatePasswordFormik.handleChange}
                        onBlur={updatePasswordFormik.handleBlur}
                        type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
                    {updatePasswordFormik.errors.email && updatePasswordFormik.touched.email ? (<p className='text-red-500'>{updatePasswordFormik.errors.email}</p>) : ('')}
                </div>
                <div className="mb-5">
                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input
                        value={updatePasswordFormik.values.newPassword}
                        onChange={updatePasswordFormik.handleChange}
                        onBlur={updatePasswordFormik.handleBlur}
                        type="password"
                        name="newPassword" id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
                    {updatePasswordFormik.errors.newPassword && updatePasswordFormik.touched.newPassword ? (<p className='text-red-500'>{updatePasswordFormik.errors.newPassword}</p>) : ('')}
                </div>
                <button disabled={!(updatePasswordFormik.isValid && updatePasswordFormik.dirty)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled:bg-opacity-30">Update Password</button>

            </form>


        </div>
    )
}
