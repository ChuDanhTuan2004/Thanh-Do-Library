import React, { useRef, useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash, FiSearch, FiMenu, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import Modal from './Modal';
import CategoryForm from './CategoryForm';
import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockCategories = [
    { id: 1, name: 'Khoa học máy tính' },
    { id: 2, name: 'Kỹ thuật phần mềm' },
    { id: 3, name: 'Toán học' },
    { id: 4, name: 'Vật lý' },
    { id: 5, name: 'Hóa học' },
    { id: 6, name: 'Sinh học' },
    { id: 7, name: 'Kinh tế' },
    { id: 8, name: 'Quản trị kinh doanh' },
    { id: 9, name: 'Xã hội học' },
    { id: 10, name: 'Tâm lý học' },
    { id: 11, name: 'Lịch sử' },
    { id: 12, name: 'Ngôn ngữ học' },
    { id: 13, name: 'Triết học' },
    { id: 14, name: 'Khoa học chính trị' },
    { id: 15, name: 'Nhân học' },
    // Thêm các danh mục học thuật khác nếu cần
];

export default function Category() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [categories, setCategories] = useState(mockCategories);
    const [searchQuery, setSearchQuery] = useState('');
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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

    // Lọc danh mục theo từ khóa tìm kiếm
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Logic phân trang
    const indexOfLastCategory = currentPage * itemsPerPage;
    const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    const addCategory = () => {
        if (newCategory.name) {
            setCategories([...categories, { ...newCategory, id: categories.length + 1 }]);
            setNewCategory({ name: '' });
            setIsModalOpen(false);
            toast.success('Danh mục đã được thêm thành công!');
        } else {
            toast.error('Vui lòng nhập tên danh mục!');
        }
    };

    const editCategory = (category) => {
        setEditingCategory(category);
        setIsEditing(true);
        setNewCategory({ name: category.name });
        setIsModalOpen(true);
    };

    const saveEdit = () => {
        if (newCategory.name) {
            setCategories(categories.map(category =>
                category.id === editingCategory.id ? { ...category, ...newCategory } : category
            ));
            setIsEditing(false);
            setNewCategory({ name: '' });
            setIsModalOpen(false);
            toast.success('Danh mục đã được chỉnh sửa thành công!');
        } else {
            toast.error('Vui lòng nhập tên danh mục!');
        }
    };

    const deleteCategory = (id) => {
        setCategories(categories.filter(category => category.id !== id));
        toast.success('Danh mục đã được xóa thành công!');
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar isOpen={isSidebarOpen} sidebarRef={sidebarRef} />
            {/* Nút menu cho mobile */}
            <div className="md:hidden">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="m-2 p-2 rounded bg-gray-800 text-white focus:outline-none">
                    <FiMenu size={24} />
                </button>
            </div>
            <div className="flex-1 p-10 space-y-6">
                <h1 className="text-2xl font-bold mb-4">Quản lý danh mục</h1>

                {/* Tìm kiếm */}
                <div className="bg-white shadow-md rounded p-6 mb-6 flex items-center space-x-4">
                    <FiSearch size={20} className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm danh mục..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 ml-2"
                    />
                </div>

                {/* Danh sách danh mục */}
                <div className="bg-white shadow-md rounded p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl">Danh sách danh mục</h2>
                        <button
                            onClick={() => { setIsEditing(false); setIsModalOpen(true); }}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                        >
                            <FiPlus size={20} /> Thêm danh mục
                        </button>
                    </div>
                    <ul>
                        {currentCategories.map(category => (
                            <li key={category.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                                <p className="text-lg font-semibold">{category.name}</p>
                                <div className="flex space-x-4">
                                    <button onClick={() => editCategory(category)} className="text-blue-600 hover:text-blue-800">
                                        <FiEdit size={20} />
                                    </button>
                                    <button onClick={() => deleteCategory(category.id)} className="text-red-600 hover:text-red-800">
                                        <FiTrash size={20} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Điều khiển phân trang */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded disabled:opacity-50"
                        >
                            <FiChevronLeft size={20} />
                        </button>
                        <span>Trang {currentPage} của {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded disabled:opacity-50"
                        >
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Hộp thoại thêm / chỉnh sửa danh mục */}
                <Modal isOpen={isModalOpen} onClose={() => { setIsEditing(false); setNewCategory({ name: '' }); setIsModalOpen(false); }}>
                    <CategoryForm
                        category={newCategory}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        onSubmit={isEditing ? saveEdit : addCategory}
                        onCancel={() => { setIsEditing(false); setNewCategory({ name: '' }); setIsModalOpen(false); }}
                        isEditing={isEditing}
                    />
                </Modal>
            </div>

            {/* Thêm ToastContainer ở đây */}
            <ToastContainer />
        </div>
    );
}
