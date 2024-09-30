// UserManagement.js
import React, { useRef, useState, useEffect } from 'react';
import { FiMenu, FiEdit, FiTrash, FiChevronLeft, FiChevronRight, FiPlus, FiSearch } from 'react-icons/fi';
import Sidebar from './Sidebar';
import Modal from './Modal';
import UserForm from './UserForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
    { id: 5, name: 'Michael White', email: 'michael@example.com', role: 'Admin' },
    { id: 6, name: 'Jennifer Blue', email: 'jennifer@example.com', role: 'Editor' },
    { id: 7, name: 'Paul Green', email: 'paul@example.com', role: 'User' },
    { id: 8, name: 'Laura Red', email: 'laura@example.com', role: 'User' },
    { id: 9, name: 'Mark Black', email: 'mark@example.com', role: 'User' },
    { id: 10, name: 'Susan Yellow', email: 'susan@example.com', role: 'User' },
    // Add more mock users as needed
];

export default function UserManagement() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [users, setUsers] = useState(mockUsers);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    const sidebarRef = useRef();

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handleChange = (field, value) => {
        setNewUser({ ...newUser, [field]: value });
    };

    const addUser = () => {
        if (newUser.name && newUser.email && newUser.role) {
            setUsers([...users, { ...newUser, id: users.length + 1 }]);
            setNewUser({ name: '', email: '', role: '' });
            setIsModalOpen(false);
            toast.success('Người dùng đã được thêm thành công!');
        } else {
            toast.error('Vui lòng điền đầy đủ thông tin người dùng!');
        }
    };

    const editUser = (user) => {
        setEditingUser(user);
        setIsEditing(true);
        setNewUser({ name: user.name, email: user.email, role: user.role });
        setIsModalOpen(true);
    };

    const saveEdit = () => {
        setUsers(users.map(user => user.id === editingUser.id ? { ...user, ...newUser } : user));
        setIsEditing(false);
        setNewUser({ name: '', email: '', role: '' });
        setIsModalOpen(false);
        toast.success('Người dùng đã được chỉnh sửa thành công!');
    };

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
        toast.success('Người dùng đã được xóa thành công!');
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar isOpen={isSidebarOpen} sidebarRef={sidebarRef} />
            {/* Menu button for mobile */}
            <div className="md:hidden">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="m-2 p-2 rounded bg-gray-800 text-white focus:outline-none">
                    <FiMenu size={24} />
                </button>
            </div>

            <div className="flex-1 p-10 space-y-6">
                <h1 className="text-2xl font-bold">Quản lý người dùng</h1>

                {/* Thanh tìm kiếm */}
                <div className="bg-white shadow-md rounded p-6 mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4"
                        />
                        <FiSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                <div className="bg-white shadow-md rounded p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl">Danh sách người dùng</h2>
                        <button
                            onClick={() => { setIsEditing(false); setIsModalOpen(true); }}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                        >
                            <FiPlus size={20} className="mr-1" /> Thêm người dùng
                        </button>
                    </div>
                    <ul className="grid grid-cols-1 gap-4">
                        {currentUsers.map(user => (
                            <li key={user.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                                <div>
                                    <p className="text-lg font-semibold">{user.name}</p>
                                    <p className="text-gray-600">{user.role}</p>
                                </div>
                                <div className="flex space-x-4">
                                    <button onClick={() => editUser(user)} className="text-blue-600 hover:text-blue-800">
                                        <FiEdit size={20} />
                                    </button>
                                    <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-800">
                                        <FiTrash size={20} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={`p-2 rounded ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700 hover:text-gray-900'}`}
                        >
                            <FiChevronLeft size={20} />
                        </button>
                        <span>Trang {currentPage} / {totalPages}</span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700 hover:text-gray-900'}`}
                        >
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <Modal isOpen={isModalOpen} onClose={() => { setIsEditing(false); setNewUser({ name: '', email: '', role: '' }); setIsModalOpen(false); }}>
                    <UserForm
                        user={newUser}
                        onChange={handleChange}
                        onSubmit={isEditing ? saveEdit : addUser}
                        onCancel={() => { setIsEditing(false); setNewUser({ name: '', email: '', role: '' }); setIsModalOpen(false); }}
                        isEditing={isEditing}
                    />
                </Modal>

                {/* Add ToastContainer here */}
                <ToastContainer />
            </div>
        </div>
    );
}
