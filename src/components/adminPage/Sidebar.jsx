import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FolderKanban, FileText, Users, HelpCircle, X } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { to: '/dashboard/home', label: 'Trang chủ', icon: Home },
    { to: '/dashboard/categories', label: 'Danh mục', icon: FolderKanban },
    { to: '/dashboard/documents', label: 'Tài liệu', icon: FileText },
    { to: '/dashboard/users', label: 'Người dùng', icon: Users },
  ];

  const renderNavItem = (item) => {
    const Icon = item.icon;
    return (
      <Link
        key={item.to}
        to={item.to}
        className={`flex items-center py-2 px-4 rounded-md transition-colors duration-200 ${
          path === item.to ? 'bg-[#0b328f] text-white' : 'text-gray-500 hover:text-[#0b328f] hover:bg-blue-100'
        }`}
        onClick={onClose}
      >
        <Icon className="h-5 w-5" />
        <span className="ml-3 text-sm font-medium">{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        ></div>
      )}
      <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex justify-end items-center p-5 bg-[#0b328f] text-white">
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navItems.map(renderNavItem)}
        </nav>
      </div>
    </>
  );
}
