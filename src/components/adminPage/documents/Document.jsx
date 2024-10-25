import React, { useEffect, useState } from 'react';
import { FiEdit, FiPlus, FiSearch, FiTrash } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosSupport from '../../../services/axiosSupport';
import Modal from '../../Modal';
import DocumentForm from './DocumentForm';
import { BiSolidBookAdd } from "react-icons/bi";

const axios = new AxiosSupport();

export default function Document() {
    const [documents, setDocuments] = useState([]);
    const [searchParams, setSearchParams] = useState({
        title: '',
        author: '',
        publisher: '',
        publishYear: '',
        categoryId: '',
    });
    const [newDocument, setNewDocument] = useState({ title: '', description: '', author: '', publisher: '', publishYear: '', quantity: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingDocument, setEditingDocument] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchDocuments();
    }, [currentPage]) // Chỉ gọi fetchDocuments khi currentPage thay đổi

    const fetchCategories = async () => {
        try {
            const data = await axios.getAllCategories();
            setCategory(data);
        } catch (error) {
            console.error('Lỗi khi lấy danh mục:', error);
            toast.error('Đã xảy ra lỗi khi tải danh sách danh mục.');
        }
    };

    const fetchDocuments = async () => {
        try {
            const response = await axios.getAllBooks({
                ...searchParams,
                page: currentPage - 1,
                size: itemsPerPage
            });
            setDocuments(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            toast.error('Không thể tải danh sách sách!');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
        fetchDocuments(); // Gọi API khi người dùng nhấn nút tìm kiếm
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleAddDocument = async (imageFile) => {
        try {
            let image = null;
            if (imageFile) {
                image = await uploadImage(imageFile);
            }
            if (image) {
                newDocument.imageUrl = image;
            }
            const response = await axios.createBook(newDocument);
            fetchDocuments();
            resetForm();
            toast.success('Sách đã được thêm thành công!');
        } catch (error) {
            toast.error('Không thể thêm sách!');
        }
    };


    const handleSaveEdit = async (imageFile) => {
        try {
            let image = null;
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile); // Thêm tệp hình ảnh// Thêm ID của sách

                image = await axios.uploadImage(formData); // Gọi API để tải lên hình ảnh
            }
            if (image) {
                newDocument.imageUrl = image; // Cập nhật URL hình ảnh cho sách mới
            }
            await axios.updateBook(editingDocument.bookId, newDocument); // Cập nhật sách
            fetchDocuments(); // Tải lại danh sách sách
            resetForm();
            toast.success('Sách đã được chỉnh sửa thành công!');
        } catch (error) {
            console.error(error); // In ra lỗi để kiểm tra
            toast.error('Không thể tải lên hình ảnh!'); // Thông báo lỗi
        }
    };

    const uploadImage = async (imageFile, bookId) => {
        try {
            const formData = new FormData();
            formData.append('file', imageFile);
            formData.append('bookId', bookId);
            return await axios.uploadImage(formData);
        } catch (error) {
            toast.error('Không thể tải lên hình ảnh!');
        }
    };

    const handleDeleteDocument = async (id) => {
        try {
            await axios.deleteBook(id);
            fetchDocuments();
            toast.success('Sách đã được xóa thành công!');
        } catch (error) {
            toast.error('Không thể xóa sách!');
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setNewDocument({ title: '', description: '', author: '', publisher: '', publishYear: '', quantity: '' });
        setIsModalOpen(false);
    };

    return (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-orange-50 rounded-md shadow-lg">
            <div className="flex-1 space-y-6 overflow-x-auto">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Quản lý sách</h1>

                <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Tiêu đề"
                            name="title"
                            value={searchParams.title}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Tác giả"
                            name="author"
                            value={searchParams.author}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Nhà xuất bản"
                            name="publisher"
                            value={searchParams.publisher}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            placeholder="Năm xuất bản"
                            name="publishYear"
                            value={searchParams.publishYear}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            name="categoryId"
                            value={searchParams.categoryId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Tất cả danh mục</option>
                            {category && category.map((cat) => (
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 flex items-center">
                            <BiSolidBookAdd className="mr-2" />
                            Thêm sách mới
                        </button>
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center">
                            <FiSearch className="mr-2" />
                            Tìm kiếm
                        </button>
                    </div>
                </form>

                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã sách</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sách</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tác giả</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nhà xuất bản</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Năm xuất bản</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {documents.map(doc => (
                                <tr key={doc.bookId} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.bookId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.author}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.publisher}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.publishYear}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-3" onClick={() => {
                                            setNewDocument(doc);
                                            setEditingDocument(doc);
                                            setIsEditing(true);
                                            setIsModalOpen(true);
                                        }}>
                                            <FiEdit className="inline-block mr-1" /> Sửa
                                        </button>
                                        <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteDocument(doc.bookId)}>
                                            <FiTrash className="inline-block mr-1" /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang */}
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

                {/* Modal thêm/chỉnh sửa sách */}
                <Modal isOpen={isModalOpen} onClose={resetForm}>
                    <DocumentForm
                        document={newDocument}
                        onChange={(updatedDocument) => setNewDocument(updatedDocument)}
                        onSubmit={isEditing ? handleSaveEdit : handleAddDocument}
                        onCancel={resetForm}
                        isEditing={isEditing}
                        category={category}
                    />
                </Modal>

                <ToastContainer />
            </div>
        </div>
    );
}
