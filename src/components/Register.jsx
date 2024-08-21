import axios from '../api/axios';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEnvelope, FaUser } from 'react-icons/fa';
const REGISTER_URL = 'api/v1/auth/register';

export default function Register() {
    const formik = useFormik({
        initialValues: {
            email: '',
            studentId: '',
            status: 'pending',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email không hợp lệ')
                .required('Email không được để trống'),
            studentId: Yup.string()
                .matches(/^\d+$/, 'Mã sinh viên chỉ được chứa số')
                .required('Mã sinh viên không được để trống'),
        }),
        onSubmit: async (values) => {
            console.log('Form data:', values);

            try {
                const response = await axios.post(REGISTER_URL,
                    JSON.stringify({ values }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    }
                );
                console.log(response);
                
            } catch (err) {
                console.log(err);
            }
        },
    });


    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#0b328f]">Đăng Ký</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-semibold text-[#0b328f] mb-2">Email</label>
                        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                            <FaEnvelope size={20} className="text-gray-500 mx-3" />
                            <input
                                id="email"
                                type="email"
                                {...formik.getFieldProps('email')}
                                className="flex-1 p-2 border-none rounded-lg bg-gray-50 focus:outline-none"
                                placeholder="Nhập email"
                            />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                        ) : null}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="studentId" className="block text-sm font-semibold text-[#0b328f] mb-2">Mã Sinh Viên</label>
                        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                            <FaUser size={20} className="text-gray-500 mx-3" />
                            <input
                                id="studentId"
                                type="text"
                                {...formik.getFieldProps('studentId')}
                                className="flex-1 p-2 border-none rounded-lg bg-gray-50 focus:outline-none"
                                placeholder="Nhập mã sinh viên"
                            />
                        </div>
                        {formik.touched.studentId && formik.errors.studentId ? (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.studentId}</p>
                        ) : null}
                    </div>
                    <button
                        className="w-full bg-[#0b328f] text-white px-4 py-2 rounded-lg hover:bg-[#08367b] focus:outline-none transition duration-300"
                    >
                        Đăng Ký
                    </button>
                </form>
            </div>
        </div>
    );
}
