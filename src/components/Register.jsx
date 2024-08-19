import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { IoMdLock } from 'react-icons/io';

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        // Handle registration logic here
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#0b328f]">Đăng Ký</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-semibold text-[#0b328f] mb-2">Email</label>
                        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                            <FaEnvelope size={20} className="text-gray-500 mx-3" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 p-2 border-none rounded-lg bg-gray-50 focus:outline-none"
                                placeholder="Nhập email"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="username" className="block text-sm font-semibold text-[#0b328f] mb-2">Tên Người Dùng</label>
                        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                            <FaUser size={20} className="text-gray-500 mx-3" />
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="flex-1 p-2 border-none rounded-lg bg-gray-50 focus:outline-none"
                                placeholder="Nhập tên người dùng"
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
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#0b328f] mb-2">Xác Nhận Mật Khẩu</label>
                        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                            <IoMdLock size={20} className="text-gray-500 mx-3" />
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="flex-1 p-2 border-none rounded-lg bg-gray-50 focus:outline-none"
                                placeholder="Nhập lại mật khẩu"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#0b328f] text-white px-4 py-2 rounded-lg hover:bg-[#08367b] focus:outline-none transition duration-300"
                    >
                        Đăng Ký
                    </button>
                </form>
            </div>
        </div>
    );
}
