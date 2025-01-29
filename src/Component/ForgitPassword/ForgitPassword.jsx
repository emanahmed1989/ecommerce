import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'


export default function ForgitPassword() {
    let navg = useNavigate();
    const baseUrl = "https://ecommerce.routemisr.com"
    let [showForgetform, setshowForgetform] = useState(true);
    let [errMessage, seterrMsg] = useState("");
    let [verifyerrMessage, setverifyerrMessage] = useState("");
    let [message, setmessage] = useState("")
    let validationSchema = Yup.object({
        email: Yup.string().required("Email Required").email("Enter Valid Email"),
    });
    let verifyvalidationSchema = Yup.object({
        resetCode: Yup.string().required("ResetCode Required"),
    });
    let forgitPasswordFormik = useFormik({
        initialValues: {

            email: "",
        },
        onSubmit: forgitPasswordApi,
        validationSchema
    });
    let verifyResetCodeFormik = useFormik({
        initialValues: {

            resetCode: "",
        },
        onSubmit: verifyResetCodeApi,
        validationSchema: verifyvalidationSchema,
    });
    function forgitPasswordApi(data) {
        axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`, data).then((req) => {
            if (req.data.statusMsg == 'success') {
                setshowForgetform(false)
            }
            setmessage(req.data.message)
        }).catch((err) => {
            seterrMsg(err.response.data.message)
        })
    }
    function verifyResetCodeApi(data) {
        axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, data).then((req) => {
            if (req.data.status == "Success") {
                navg('/UpdatePassword');
            }
        }).catch((err) => {
            setverifyerrMessage(err.response.data.message);
            setmessage("");

        })
    }
    return (
        <>

            {showForgetform ? (<div className='w-7/12 mx-auto mt-5 '>
                {errMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {errMessage}
                </div> : ""}
                <h1 className='font-extrabold mb-4 text-2xl'>ForgetPassword :</h1>
                <form
                    onSubmit={forgitPasswordFormik.handleSubmit}
                    className=" mx-auto mt-2">
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                        <input
                            value={forgitPasswordFormik.values.email}
                            onChange={forgitPasswordFormik.handleChange}
                            onBlur={forgitPasswordFormik.handleBlur}
                            type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
                        {forgitPasswordFormik.errors.email && forgitPasswordFormik.touched.email ? (<p className='text-red-500'>{forgitPasswordFormik.errors.email}</p>) : ("")}

                    </div>
                    <button disabled={!(forgitPasswordFormik.dirty && forgitPasswordFormik.isValid)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled:bg-opacity-30">send</button>

                </form>
            </div>) : (<div className='w-7/12 mx-auto mt-5 '>
                {message ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {message}
                </div> : ""}
                {verifyerrMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {verifyerrMessage}
                </div> : ""}
                <h1 className='font-extrabold mb-4 text-2xl'>sendcode :</h1>
                <form
                    onSubmit={verifyResetCodeFormik.handleSubmit}
                    className=" mx-auto mt-2">
                    <div className="mb-5">
                        <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your code</label>
                        <input
                            value={verifyResetCodeFormik.values.resetCode}
                            onChange={verifyResetCodeFormik.handleChange}
                            onBlur={verifyResetCodeFormik.handleBlur}
                            type="text" name="resetCode" id="resetCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
                    </div>
                    <button disabled={!(verifyResetCodeFormik.dirty && verifyResetCodeFormik.isValid)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled:bg-opacity-30">Verify Code</button>

                </form>
            </div>)}
        </>



    )
}
