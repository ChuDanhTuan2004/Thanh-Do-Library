import React, { useState, useRef, useEffect } from 'react';
import { FiMenu, FiPlus, FiEdit, FiTrash, FiSearch, FiChevronLeft, FiChevronRight, FiFolder, FiMoreVertical } from 'react-icons/fi';
import Sidebar from './Sidebar';
import Modal from './Modal';
import CategoryForm from './CategoryForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockCategories = [
    { id: 1, name: 'Khoa học máy tính' },
    { id: 2, name: 'Kỹ thuật phần mềm' },
    { id: 3, name: 'Toán học' },
    // ... thêm các danh mục khác
];

export default function Category() {
    const [categories, setCategories] = useState(mockCategories);
    const [searchQuery, setSearchQuery] = useState('');
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState({});

    const itemsPerPage = 5;

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

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

    const handleAddCategory = () => {
        const newCat = { ...newCategory, id: categories.length + 1 };
        setCategories([...categories, newCat]);
        resetForm();
        toast.success('Danh mục đã được thêm thành công!');
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setIsEditing(true);
        setNewCategory({ name: category.name });
        setIsModalOpen(true);
    };

    const handleSaveEdit = () => {
        setCategories(categories.map(cat => cat.id === editingCategory.id ? { ...cat, ...newCategory } : cat));
        resetForm();
        toast.success('Danh mục đã được chỉnh sửa thành công!');
    };

    const handleDeleteCategory = (id) => {
        setCategories(categories.filter(cat => cat.id !== id));
        toast.success('Danh mục đã được xóa thành công!');
    };

    const resetForm = () => {
        setIsEditing(false);
        setNewCategory({ name: '' });
        setIsModalOpen(false);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        const newSelectedCategories = { ...selectedCategories };
        paginatedCategories.forEach(cat => {
            newSelectedCategories[cat.id] = isChecked;
        });
        setSelectedCategories(newSelectedCategories);
    };

    const handleSelectCategory = (id) => {
        setSelectedCategories(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const isAllSelected = paginatedCategories.every(cat => selectedCategories[cat.id]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen rounded-md">
            {/* Nội dung chính */}
            <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-x-auto">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Quản lý danh mục</h1>

                {/* Thanh tìm kiếm */}
                <div className="mb-4 lg:mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm danh mục..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 text-gray-700 placeholder-gray-500"
                        />
                        <FiSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Danh sách danh mục */}
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
                                <th className="p-4">Mã danh mục</th>
                                <th className="p-4">Tên danh mục</th>
                                <th className="p-4">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedCategories.map(category => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        <input 
                                            type="checkbox" 
                                            className="rounded border-gray-300 text-blue-600"
                                            checked={selectedCategories[category.id] || false}
                                            onChange={() => handleSelectCategory(category.id)}
                                        />
                                    </td>
                                    <td className="p-4 text-gray-500">CAT-{category.id.toString().padStart(4, '0')}</td>
                                    <td className="p-4">{category.name}</td>
                                    <td className="p-4">
                                        <button
                                            className="text-gray-400 hover:text-gray-600"
                                            onClick={() => handleEditCategory(category)}
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
                    <span className="text-sm">{Object.values(selectedCategories).filter(Boolean).length} trên {filteredCategories.length} hàng được chọn.</span>
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

                {/* Modal thêm/chỉnh sửa danh mục */}
                <Modal isOpen={isModalOpen} onClose={resetForm}>
                    <CategoryForm
                        category={newCategory}
                        onChange={(e) => setNewCategory({ ...newCategory, [e.target.name]: e.target.value })}
                        onSubmit={isEditing ? handleSaveEdit : handleAddCategory}
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