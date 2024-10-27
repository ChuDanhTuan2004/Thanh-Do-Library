import React, { useEffect, useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { FaUserPlus } from 'react-icons/fa';
import { FiSearch, FiTrash } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosSupport from '../../../services/axiosSupport';
import ConfirmDialog from '../../ConfirmDialog';
import Modal from '../../Modal';
import UserForm from './UserForm';

const axiosInstance = new AxiosSupport();

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newUser, setNewUser] = useState({ username: '', email: '', roles: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        try {
            const data = await axiosInstance.fetchWithAuth('getAllUsers');
            setUsers(data);
            setTotalPages(Math.ceil(data.length / itemsPerPage));
        } catch (error) {
            console.error('Lỗi khi lấy người dùng:', error);
            toast.error('Đã xảy ra lỗi khi tải danh sách người dùng.');
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery) {
            fetchUsers();
            return;
        }

        try {
            const data = await axiosInstance.searchUsersByName(searchQuery);
            setUsers(data);
            setTotalPages(Math.ceil(data.length / itemsPerPage));
        } catch (error) {
            console.error('Lỗi khi tìm kiếm người dùng:', error);
            toast.error('Đã xảy ra lỗi khi tìm kiếm người dùng.');
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await axiosInstance.fetchWithAuth('register', {
                method: 'POST',
                body: JSON.stringify({
                    ...newUser,
                    confirmPassword: newUser.password
                }),
            });

            setUsers([...users, response]);
            resetForm();
            toast.success('Người dùng đã được thêm thành công!');
        } catch (error) {
            console.error('Lỗi khi thêm người dùng:', error);
            toast.error('Đã xảy ra lỗi khi thêm người dùng.');
        }
    };

    const handleSaveEdit = async () => {
        try {
            const updatedUser = { ...newUser };
            const userId = editingUser.id;

            const response = await axiosInstance.fetchWithAuth('updateUser', {
                method: 'PUT',
                body: JSON.stringify(updatedUser),
            }, userId);

            setUsers(users.map(user => (user.id === userId ? response : user)));
            toast.success('Người dùng đã được cập nhật thành công!');
            resetForm();
        } catch (error) {
            console.error('Lỗi khi cập nhật người dùng:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật người dùng.');
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axiosInstance.fetchWithAuth('deleteUser', {
                method: 'DELETE',
            }, id);
            setUsers(users.filter(user => user.id !== id));
            toast.success('Người dùng đã được xóa thành công!');
        } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error);
            toast.error('Đã xảy ra lỗi khi xóa người dùng.');
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setNewUser({ username: '', email: '', roles: '' });
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-orange-50 rounded-md shadow-lg">
            <div className="flex-1 space-y-6 overflow-x-auto">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Quản lý người dùng</h1>

                <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm người dùng..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center">
                            <FiSearch className="mr-2" />
                            Tìm kiếm
                        </button>
                        <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 flex items-center">
                            <FaUserPlus className="mr-2" />
                            Thêm mới
                        </button>
                    </div>
                </form>

                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(user => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">USER-{user.id.toString().padStart(4, '0')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                                            {user.roles[0].name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                            onClick={() => {
                                                setNewUser({ username: user.username, email: user.email });
                                                setEditingUser(user);
                                                setIsEditing(true);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            <CiEdit className="inline-block mr-1" /> Sửa
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => {
                                                setUserIdToDelete(user.id);
                                                setIsConfirmDialogOpen(true);
                                            }}
                                        >
                                            <FiTrash className="inline-block mr-1" /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4 bg-white p-4 rounded-lg shadow-md">
                    <span className="text-sm text-gray-700">
                        Trang <span className="font-medium">{currentPage}</span> trên <span className="font-medium">{totalPages}</span>
                    </span>
                    <div className="flex items-center space-x-2 text-sm">
                        <button
                            onClick={() => handlePageChange(1)}
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            &lt;&lt;
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            disabled={currentPage === totalPages}
                        >
                            &gt;&gt;
                        </button>
                    </div>
                </div>

                <Modal isOpen={isModalOpen} onClose={resetForm}>
                    <UserForm
                        user={newUser}
                        onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })}
                        onSubmit={isEditing ? handleSaveEdit : handleAddUser}
                        onCancel={resetForm}
                        isEditing={isEditing}
                    />
                </Modal>

                <ConfirmDialog
                    isOpen={isConfirmDialogOpen}
                    onClose={() => setIsConfirmDialogOpen(false)}
                    onConfirm={() => {
                        handleDeleteUser(userIdToDelete);
                        setIsConfirmDialogOpen(false);
                    }}
                />

                <ToastContainer />
            </div>
        </div>
    );
};

export default UserManagement;
