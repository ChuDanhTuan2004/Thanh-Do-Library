import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaBackward } from 'react-icons/fa';
import AxiosSupport from '../services/axiosSupport';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const navigate = useNavigate();
    const axiosSupport = new AxiosSupport();

    const formik = useFormik({
        initialValues: {
            email: '',
            studentId: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email không hợp lệ')
                .required('Email không được để trống'),
            studentId: Yup.string()
                .matches(/^\d+$/, 'Mã sinh viên chỉ được chứa số')
                .required('Mã sinh viên không được để trống'),
        }),
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                const userData = {
                    username: values.studentId,
                    email: values.email,
                    password: "Password123!",
                    confirmPassword: "Password123!"
                };

                const response = await axiosSupport.fetchWithAuth('register', {
                    method: 'POST',
                    body: JSON.stringify(userData)
                });

                if (response === "Username existed") {
                    toast.error("Mã sinh viên đã tồn tại trong hệ thống");
                    setStatus("Mã sinh viên đã tồn tại trong hệ thống");
                } else {
                    toast.success("Đăng ký thành công! Vui lòng chờ admin phê duyệt tài khoản.");
                }
            } catch (error) {
                console.error('Lỗi đăng ký:', error);
                toast.error("Đã có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.");
                setStatus("Đã có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0b328f] to-[#f2a429]">
            <div className="container mx-auto px-4 py-2 fixed top-0 left-0 z-50">
                <div className="flex justify-start items-center">
                    <Link
                        to="/library/home"
                        className="bg-orange-400 hover:bg-orange-500 text-white rounded-full p-2 border-2 border-yellow-300 transition duration-300 ease-in-out"
                    >
                        <FaBackward className="text-xl" />
                    </Link>
                </div>
            </div>
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
                                required
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
                                required
                            />
                        </div>
                        {formik.touched.studentId && formik.errors.studentId ? (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.studentId}</p>
                        ) : null}
                    </div>
                    {formik.status && (
                        <div className="text-red-500 text-sm mt-4 text-center">
                            {formik.status}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="w-full bg-[#0b328f] text-white px-4 py-2 rounded-lg hover:bg-[#08367b] focus:outline-none transition duration-300 disabled:opacity-50"
                    >
                        {formik.isSubmitting ? 'Đang xử lý...' : 'Đăng Ký'}
                    </button>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}
