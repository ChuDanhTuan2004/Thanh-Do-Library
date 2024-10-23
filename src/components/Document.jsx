import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash, FiSearch } from 'react-icons/fi';
import Modal from './Modal';
import DocumentForm from './DocumentForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosSupport from '../services/axiosSupport'; // Import AxiosSupport

const axios = new AxiosSupport(); // Khởi tạo AxiosSupport

export default function Document() {
    const [documents, setDocuments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newDocument, setNewDocument] = useState({ title: '', description: '', author: '', publisher: '', publishYear: '', quantity: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingDocument, setEditingDocument] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = await axios.getAllBooks({ page: currentPage - 1, size: itemsPerPage });
            setDocuments(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            toast.error('Không thể tải danh sách sách!');
        }
    };

    const handleAddDocument = async (imageFile) => {
        try {
            const response = await axios.createBook(newDocument); // Tạo sách mới
            if (imageFile) {
                await uploadImage(imageFile, response.bookId); // Gọi API để tải lên hình ảnh
            }
            fetchDocuments(); // Tải lại danh sách sách
            resetForm();
            toast.success('Sách đã được thêm thành công!');
        } catch (error) {
            toast.error('Không thể thêm sách!');
        }
    };

    const handleSaveEdit = async (imageFile) => {
        try {
            // Cập nhật thông tin sách
            await axios.updateBook(editingDocument.bookId, newDocument); // Cập nhật sách

            // Nếu có tệp hình ảnh, gửi yêu cầu tải lên
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile); // Thêm tệp hình ảnh
                formData.append('bookId', editingDocument.bookId);
            // Thêm ID của sách

                await axios.uploadImage(formData); // Gọi API để tải lên hình ảnh
            }

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
            formData.append('file', imageFile); // Thêm tệp hình ảnh
            formData.append('bookId', bookId); // Thêm ID của sách

            await axios.uploadImage(formData); // Gọi API để tải lên hình ảnh
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

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            fetchDocuments();
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen rounded-md">
            <div className="flex-1 lg:p-6 space-y-4 lg:space-y-6 overflow-x-auto">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Quản lý sách</h1>

                <div className="mb-4 lg:mb-6 flex justify-center items-center p-1">
                    <div className="relative flex items-center w-4/5">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sách..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-4 text-gray-700 placeholder-gray-500"
                        />
                        <FiSearch size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="flex justify-center items-start bg-white py-3 px-3 rounded-md text-black border border-gray-300 ml-4 w-1/5">
                        <FiPlus />
                    </button>
                </div>

                <div className="bg-white rounded-md shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <th className="p-4">Mã sách</th>
                                <th className="p-4">Tên sách</th>
                                <th className="p-4">Tác giả</th>
                                <th className="p-4">Nhà xuất bản</th>
                                <th className="p-4">Năm xuất bản</th>
                                <th className="p-4">Số lượng</th>
                                <th className="p-4">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {documents.map(doc => (
                                <tr key={doc.bookId} className="hover:bg-gray-50">
                                    <td className="p-4 text-gray-500">{doc.bookId}</td>
                                    <td className="p-4">{doc.title}</td>
                                    <td className="p-4">{doc.author}</td>
                                    <td className="p-4">{doc.publisher}</td>
                                    <td className="p-4">{doc.publishYear}</td>
                                    <td className="p-4">{doc.quantity}</td>
                                    <td className="p-4">
                                        <button className="text-blue-400 hover:text-gray-600 mr-2" onClick={() => {
                                            setNewDocument(doc);
                                            setEditingDocument(doc);
                                            setIsEditing(true);
                                            setIsModalOpen(true);
                                        }}>
                                            <FiEdit />
                                        </button>
                                        <button className="text-red-400 hover:text-gray-600" onClick={() => handleDeleteDocument(doc.bookId)}>
                                            <FiTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-gray-600 space-y-2 sm:space-y-0">
                    <span className="text-sm">Trang {currentPage} trên {totalPages}</span>
                    <div className="flex items-center space-x-2 text-sm">
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

                {/* Modal thêm/chỉnh sửa sách */}
                <Modal isOpen={isModalOpen} onClose={resetForm}>
                    <DocumentForm
                        document={newDocument}
                        onChange={(e) => setNewDocument({ ...newDocument, [e.target.name]: e.target.value })}
                        onSubmit={isEditing ? handleSaveEdit : handleAddDocument}
                        onCancel={resetForm}
                        isEditing={isEditing}
                    />
                </Modal>

                <ToastContainer />
            </div>
        </div>
    );
}
