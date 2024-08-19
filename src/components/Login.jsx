import React, { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { IoMdLock } from 'react-icons/io';

export default function Login() {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
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
                    {/* <div className="mb-6">
                        <label htmlFor="verificationCode" className="block text-sm font-semibold text-[#0b328f] mb-2">Mã Xác Nhận</label>
                        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                            <IoMdLock size={20} className="text-gray-500 mx-3" />
                            <input
                                id="verificationCode"
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="flex-1 p-2 border-none rounded-lg bg-gray-50 focus:outline-none"
                                placeholder="Nhập mã xác nhận"
                                required
                            />
                        </div>
                    </div> */}
                    <button
                        type="submit"
                        className="w-full bg-[#0b328f] text-white px-4 py-2 rounded-lg hover:bg-[#08367b] focus:outline-none transition duration-300"
                    >
                        Đăng Nhập
                    </button>
                </form>
            </div>
        </div>
    );
}
