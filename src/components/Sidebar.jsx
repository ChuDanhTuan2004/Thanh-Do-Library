import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiFolder, FiFileText, FiUsers, FiLogOut, FiHelpCircle } from 'react-icons/fi';

export default function Sidebar({ isOpen, sidebarRef, currentUser, onLogout }) {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { to: '/dashboard/home', label: 'Trang chủ', icon: <FiHome size={20} /> },
    { to: '/dashboard/categories', label: 'Danh mục', icon: <FiFolder size={20} /> },
    { to: '/dashboard/documents', label: 'Tài liệu', icon: <FiFileText size={20} /> },
    { to: '/dashboard/users', label: 'Người dùng', icon: <FiUsers size={20} /> },
  ];

  const renderNavItem = (item) => (
    <Link
      key={item.to}
      to={item.to}
      className={`flex items-center py-2.5 px-4 rounded transition duration-200 ${
        path === item.to ? 'bg-[#faa21a] text-white' : 'hover:bg-gray-700 hover:text-white'
      }`}
    >
      {item.icon}
      <span className="ml-3">{item.label}</span>
    </Link>
  );

  return (
    <div
      ref={sidebarRef}
      className={`bg-[#0b328f] text-white w-72 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
    >
      {/* Logo */}
      <div className="text-2xl font-bold text-center mb-6">
        Thanh Do University
      </div>

      {/* Navigation */}
      <nav>
        {navItems.map(renderNavItem)}
      </nav>

      {/* Account Information */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-[#0b328f] text-gray-300 flex flex-col items-start">
        <div className="flex items-center mb-4 pr-4">
          <div className="w-10 h-10 border-2 border-[#faa21a] rounded-full flex items-center justify-center text-white text-xl ml-2">
            A
          </div>
          <div className="ml-3">
            <p className="font-semibold">{currentUser?.name || 'Admin Name'}</p>
            <p className="text-sm text-gray-200">{currentUser?.email || 'admin@example.com'}</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center py-2 px-4 rounded w-full bg-black text-white hover:bg-[#f8a020] transition duration-200"
        >
          <FiLogOut className="mr-3" size={20} />
          Đăng xuất
        </button>

        <Link
          to="/help"
          className="flex items-center py-2 px-4 rounded w-full mt-2 bg-black text-white hover:bg-[#f8a020] transition duration-200"
        >
          <FiHelpCircle className="mr-3" size={20} />
          Trợ giúp
        </Link>
      </div>
    </div>
  );
}
