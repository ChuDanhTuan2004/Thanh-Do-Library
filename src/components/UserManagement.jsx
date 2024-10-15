// UserManagement.js
import React, { useState, useRef, useEffect } from 'react';
import { FiMenu, FiPlus, FiEdit, FiTrash, FiSearch, FiChevronLeft, FiChevronRight, FiUser, FiMoreVertical } from 'react-icons/fi';
import Sidebar from './Sidebar';
import Modal from './Modal';
import UserForm from './UserForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    // ... thêm các người dùng khác
];

export default function UserManagement() {
    const [users, setUsers] = useState(mockUsers);
    const [searchQuery, setSearchQuery] = useState('');
    const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState({});

    const itemsPerPage = 5;

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const sidebarRef = useRef();

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

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    };

    const handleAddUser = () => {
        const newUserWithId = { ...newUser, id: users.length + 1 };
        setUsers([...users, newUserWithId]);
        resetForm();
        toast.success('Người dùng đã được thêm thành công!');
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setIsEditing(true);
        setNewUser({ name: user.name, email: user.email, role: user.role });
        setIsModalOpen(true);
    };

    const handleSaveEdit = () => {
        setUsers(users.map(user => user.id === editingUser.id ? { ...user, ...newUser } : user));
        resetForm();
        toast.success('Người dùng đã được chỉnh sửa thành công!');
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
        toast.success('Người dùng đã được xóa thành công!');
    };

    const resetForm = () => {
        setIsEditing(false);
        setNewUser({ name: '', email: '', role: '' });
        setIsModalOpen(false);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        const newSelectedUsers = { ...selectedUsers };
        paginatedUsers.forEach(user => {
            newSelectedUsers[user.id] = isChecked;
        });
        setSelectedUsers(newSelectedUsers);
    };

    const handleSelectUser = (id) => {
        setSelectedUsers(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const isAllSelected = paginatedUsers.every(user => selectedUsers[user.id]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen rounded-md">
            {/* Nội dung chính */}
            <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-x-auto">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Quản lý người dùng</h1>

                {/* Thanh tìm kiếm */}
                <div className="mb-4 lg:mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm người dùng..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 text-gray-700 placeholder-gray-500"
                        />
                        <FiSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Danh sách người dùng */}
                <div className="bg-white rounded-md shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <th className="p-4">
                                    <input 
                                        type="checkbox" 
                                        className="rounded border-gray-300 text-blue-600"
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className="p-4">ID</th>
                                <th className="p-4">Tên</th>
                                <th className="p-4 hidden sm:table-cell">Email</th>
                                <th className="p-4 hidden md:table-cell">Vai trò</th>
                                <th className="p-4">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedUsers.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        <input 
                                            type="checkbox" 
                                            className="rounded border-gray-300 text-blue-600"
                                            checked={selectedUsers[user.id] || false}
                                            onChange={() => handleSelectUser(user.id)}
                                        />
                                    </td>
                                    <td className="p-4 text-gray-500">USER-{user.id.toString().padStart(4, '0')}</td>
                                    <td className="p-4">{user.name}</td>
                                    <td className="p-4 hidden sm:table-cell">{user.email}</td>
                                    <td className="p-4 hidden md:table-cell">
                                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">{user.role}</span>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            className="text-gray-400 hover:text-gray-600"
                                            onClick={() => handleEditUser(user)}
                                        >
                                            <FiMoreVertical />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Điều khiển phân trang */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-gray-600 space-y-2 sm:space-y-0">
                    <span className="text-sm">{Object.values(selectedUsers).filter(Boolean).length} trên {filteredUsers.length} hàng được chọn.</span>
                    <div className="flex items-center space-x-2 text-sm">
                        <span className="hidden sm:inline">Số hàng mỗi trang: {itemsPerPage}</span>
                        <span>Trang {currentPage} trên {totalPages}</span>
                        <div className="flex space-x-1">
                            <button 
                                onClick={() => handlePageChange(1)} 
                                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                                disabled={currentPage === 1}
                            >
                                &lt;&lt;
                            </button>
                            <button 
                                onClick={() => handlePageChange(currentPage - 1)} 
                                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                                disabled={currentPage === 1}
                            >
                                &lt;
                            </button>
                            <button 
                                onClick={() => handlePageChange(currentPage + 1)} 
                                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                                disabled={currentPage === totalPages}
                            >
                                &gt;
                            </button>
                            <button 
                                onClick={() => handlePageChange(totalPages)} 
                                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                                disabled={currentPage === totalPages}
                            >
                                &gt;&gt;
                            </button>
                        </div>
                    </div>
                </div>

                {/* Modal thêm/chỉnh sửa người dùng */}
                <Modal isOpen={isModalOpen} onClose={resetForm}>
                    <UserForm
                        user={newUser}
                        onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })}
                        onSubmit={isEditing ? handleSaveEdit : handleAddUser}
                        onCancel={resetForm}
                        isEditing={isEditing}
                    />
                </Modal>

                {/* Toast Container */}
                <ToastContainer />
            </div>
        </div>
    );
}