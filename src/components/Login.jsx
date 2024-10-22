import React, { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AxiosSupport from '../services/axiosSupport';

const axiosInstance = new AxiosSupport();

export default function Login() {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(axiosInstance.getFullURL('login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: studentId,
                password: password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('role', data.roles[0].authority);

            if (data.roles.some(role => role.authority === 'ROLE_ADMIN')) {
                navigate('/dashboard/home');
            } else {
                navigate('/library/client');
            }
        } else {
            console.error('Đăng nhập thất bại');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center" >
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#0b328f]">Đăng Nhập</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label htmlFor="studentId" className="block text-sm font-semibold text-[#0b328f] mb-2">Mã Sinh Viên / Mã Giảng Viên</label>
                        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                            <FaUser size={20} className="text-gray-500 mx-3" />
                            <input
                                id="studentId"
                                type="text"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                className="flex-1 p-2 border-none rounded-lg bg-gray-50 focus:outline-none"
                                placeholder="Nhập mã sinh viên hoặc mã giảng viên"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-semibold text-[#0b328f] mb-2">Mật Khẩu</label>
                        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                            <FaLock size={20} className="text-gray-500 mx-3" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="flex-1 p-2 border-none rounded-lg bg-gray-50 focus:outline-none"
                                placeholder="Nhập mật khẩu"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#0b328f] text-white px-4 py-2 rounded-lg hover:bg-[#08367b] focus:outline-none transition duration-300"
                    >
                        Đăng Nhập
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Chưa có tài khoản?{' '}
                        <Link to="/library/register" className="text-[#0b328f] hover:underline">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
