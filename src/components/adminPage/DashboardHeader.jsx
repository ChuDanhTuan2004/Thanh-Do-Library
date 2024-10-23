import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, LogOut, Menu } from 'lucide-react';

export default function DashboardHeader({ currentUser, onLogout, onMenuClick }) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [userMenuRef]);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8080/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.log('Đăng xuất thành công');
            localStorage.removeItem('token');
            navigate('/library/home');
            onLogout();
        } else {
            console.error('Đăng xuất thất bại');
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-[#0b328f] px-6 py-4 flex items-center justify-between z-30 shadow-md">
            <div className="flex items-center">
                <button onClick={onMenuClick} className="mr-4 text-white hover:text-[#f2a429]">
                    <Menu className="h-7 w-7" />
                </button>
                <Link to="/dashboard/home" className="text-2xl font-bold text-white hover:text-[#f2a429] mr-8">Thư viện Thành Đô</Link>
            </div>
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="bg-white bg-opacity-20 text-white placeholder-gray-300 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f2a429] w-64"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
                </div>
                <button className="text-white hover:text-[#f2a429]" title="Thông báo">
                    <Bell className="h-6 w-6" />
                </button>
                <div className="relative" ref={userMenuRef}>
                    <button
                        onClick={toggleUserMenu}
                        className="flex items-center space-x-2 text-white hover:text-[#f2a429]"
                        title="Menu người dùng"
                    >
                        <User className="h-6 w-6" />
                    </button>
                    {isUserMenuOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-white rounded-md shadow-lg py-1 z-10">
                            <p className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">{currentUser?.email || 'admin@example.com'}</p>
                            <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hồ sơ</Link>
                            <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cài đặt</Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
