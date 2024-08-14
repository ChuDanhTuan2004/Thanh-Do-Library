import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiFolder, FiFileText, FiUsers, FiLogOut, FiHelpCircle } from 'react-icons/fi';

export default function Sidebar({ isOpen, sidebarRef, currentUser, onLogout }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div
      ref={sidebarRef}
      className={`bg-[#0b328f] text-white w-72 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}
    >
      {/* Logo */}
      <div className="text-2xl font-bold text-center mb-6">
        Thanh Do University
      </div>

      {/* Navigation */}
      <nav>
        <Link
          to="/dashboard/home"
          className={`flex items-center py-2.5 px-4 rounded transition duration-200 ${path === '/dashboard/home' ? 'bg-[#faa21a] text-white' : 'hover:bg-gray-700 hover:text-white'}`}
        >
          <FiHome className="mr-3" size={20} />
          Trang chủ
        </Link>
        <Link
          to="/dashboard/categories"
          className={`flex items-center py-2.5 px-4 rounded transition duration-200 ${path === '/dashboard/categories' ? 'bg-[#faa21a] text-white' : 'hover:bg-gray-700 hover:text-white'}`}
        >
          <FiFolder className="mr-3" size={20} />
          Danh mục
        </Link>
        <Link
          to="/dashboard/documents"
          className={`flex items-center py-2.5 px-4 rounded transition duration-200 ${path === '/dashboard/documents' ? 'bg-[#faa21a] text-white' : 'hover:bg-gray-700 hover:text-white'}`}
        >
          <FiFileText className="mr-3" size={20} />
          Tài liệu
        </Link>
        <Link
          to="/dashboard/users"
          className={`flex items-center py-2.5 px-4 rounded transition duration-200 ${path === '/dashboard/users' ? 'bg-[#faa21a] text-white' : 'hover:bg-gray-700 hover:text-white'}`}
        >
          <FiUsers className="mr-3" size={20} />
          Người dùng
        </Link>
      </nav>

      {/* Account Information */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-[#0b328f] text-gray-300 flex flex-col items-center">
        <div className="flex items-center mb-4 pr-4">
          <div className="w-10 h-10 border-2 border-[#faa21a] rounded-full flex items-center justify-center text-white text-xl">
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
