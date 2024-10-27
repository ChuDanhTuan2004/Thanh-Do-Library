import React, { useEffect, useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { FaPlus } from 'react-icons/fa';
import { FiSearch, FiTrash } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosSupport from '../../../services/axiosSupport';
import ConfirmDialog from '../../ConfirmDialog';
import Modal from '../../Modal';
import CategoryForm from './CategoryForm';
import { FaFolderPlus } from "react-icons/fa";

const axiosInstance = new AxiosSupport();

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const fetchCategories = async (query = '') => {
        try {
            let data;
            if (query) {
                data = await axiosInstance.searchCategoriesByName(query);
            } else {
                data = await axiosInstance.fetchWithAuth('getAllCategories');
            }
            setCategories(data);
            setTotalPages(Math.ceil(data.length / itemsPerPage));
        } catch (error) {
            console.error('Lỗi khi lấy danh mục:', error);
            toast.error('Đã xảy ra lỗi khi tải danh sách danh mục.');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        try {
            await axiosInstance.fetchWithAuth('createCategory', {
                method: 'POST',
                body: JSON.stringify(newCategory),
            });
            await fetchCategories();
            resetForm();
            toast.success('Danh mục đã được thêm thành công!');
        } catch (error) {
            console.error('Lỗi khi thêm danh mục:', error);
            toast.error('Đã xảy ra lỗi khi thêm danh mục.');
        }
    };

    const handleSaveEdit = async () => {
        try {
            const updatedCategory = { ...newCategory };
            const categoryId = editingCategory.categoryId;

            await axiosInstance.fetchWithAuth('updateCategory', {
                method: 'PUT',
                body: JSON.stringify(updatedCategory),
            }, categoryId);
            await fetchCategories();
            resetForm();
            toast.success('Danh mục đã được cập nhật thành công!');
        } catch (error) {
            console.error('Lỗi khi cập nhật danh mục:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật danh mục.');
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await axiosInstance.fetchWithAuth('deleteCategory', {
                method: 'DELETE',
            }, categoryId);
            await fetchCategories();
            setIsConfirmDialogOpen(false);
            toast.success('Danh mục đã được xóa thành công!');
        } catch (error) {
            console.error('Lỗi khi xóa danh mục:', error);
            toast.error('Đã xảy ra lỗi khi xóa danh mục.');
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setNewCategory({ name: '' });
        setIsModalOpen(false);
        setEditingCategory(null);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchCategories(searchQuery);
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-orange-50 rounded-md shadow-lg">
            <div className="flex-1 space-y-6 overflow-x-auto">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Quản lý danh mục</h1>
                
                <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm danh mục..."
                            value={searchQuery}
                            onChange={handleInputChange}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center">
                            <FiSearch className="mr-2" />
                            Tìm kiếm
                        </button>
                        <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 flex items-center">
                            <FaFolderPlus className="mr-2" />
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(category => (
                                <tr key={category.categoryId} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.categoryId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                            onClick={() => {
                                                setNewCategory({ name: category.name });
                                                setEditingCategory(category);
                                                setIsEditing(true);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            <CiEdit className="inline-block mr-1" /> Sửa
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => {
                                                setCategoryIdToDelete(category.categoryId);
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
                    <CategoryForm
                        category={newCategory}
                        onChange={(e) => setNewCategory({ ...newCategory, [e.target.name]: e.target.value })}
                        onSubmit={isEditing ? handleSaveEdit : handleAddCategory}
                        onCancel={resetForm}
                        isEditing={isEditing}
                    />
                </Modal>

                <ConfirmDialog
                    isOpen={isConfirmDialogOpen}
                    onClose={() => setIsConfirmDialogOpen(false)}
                    onConfirm={() => handleDeleteCategory(categoryIdToDelete)}
                />

                <ToastContainer />
            </div>
        </div>
    );
};

export default CategoryManagement;
