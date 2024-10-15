import React, { useState, useRef, useEffect } from 'react';
import { FiMenu, FiPlus, FiEdit, FiTrash, FiSearch, FiChevronLeft, FiChevronRight, FiFileText, FiMoreVertical } from 'react-icons/fi';
import Sidebar from './Sidebar';
import Modal from './Modal';
import DocumentForm from './DocumentForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockDocuments = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Tài liệu ${i + 1}`,
    description: `Mô tả cho tài liệu ${i + 1}`,
    link: `https://drive.google.com/file/d/15fiGYz5PIq3Sq37RRksoZRLx9L8kJKet/view?usp=sharing`
}));

export default function Document() {
    const [documents, setDocuments] = useState(mockDocuments);
    const [searchQuery, setSearchQuery] = useState('');
    const [newDocument, setNewDocument] = useState({ title: '', description: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingDocument, setEditingDocument] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDocuments, setSelectedDocuments] = useState({});

    const itemsPerPage = 5;

    // Đặt filteredDocuments trước khi sử dụng
    const filteredDocuments = documents.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

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

    const handleAddDocument = () => {
        const newDoc = { ...newDocument, id: documents.length + 1 };
        setDocuments([...documents, newDoc]);
        resetForm();
        toast.success('Tài liệu đã được thêm thành công!');
    };

    const handleEditDocument = (document) => {
        setEditingDocument(document);
        setIsEditing(true);
        setNewDocument({ title: document.title, description: document.description });
        setIsModalOpen(true);
    };

    const handleSaveEdit = () => {
        setDocuments(documents.map(doc => doc.id === editingDocument.id ? { ...doc, ...newDocument } : doc));
        resetForm();
        toast.success('Tài liệu đã được chỉnh sửa thành công!');
    };

    const handleDeleteDocument = (id) => {
        setDocuments(documents.filter(doc => doc.id !== id));
    };

    const resetForm = () => {
        setIsEditing(false);
        setNewDocument({ title: '', description: '' });
        setIsModalOpen(false);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const paginatedDocuments = filteredDocuments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleEditClick = (doc) => {
        setEditingDocument(doc);
        setIsEditing(true);
        setNewDocument({ title: doc.title, description: doc.description });
        setIsModalOpen(true);
    };

    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        const newSelectedDocuments = { ...selectedDocuments };
        paginatedDocuments.forEach(doc => {
            newSelectedDocuments[doc.id] = isChecked;
        });
        setSelectedDocuments(newSelectedDocuments);
    };

    const handleSelectDocument = (id) => {
        setSelectedDocuments(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const isAllSelected = paginatedDocuments.every(doc => selectedDocuments[doc.id]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen rounded-md">
            {/* Nội dung chính */}
            <div className="flex-1 lg:p-6 space-y-4 lg:space-y-6 overflow-x-auto">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Quản lý tài liệu</h1>

                {/* Thanh tìm kiếm */}
                <div className="mb-4 lg:mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm tài liệu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 text-gray-700 placeholder-gray-500"
                        />
                        <FiSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Danh sách tài liệu */}
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
                                <th className="p-4">Mã tài liệu</th>
                                <th className="p-4">Tên tài liệu</th>
                                <th className="p-4 hidden sm:table-cell">Loại</th>
                                <th className="p-4 hidden md:table-cell">Trạng thái</th>
                                <th className="p-4">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedDocuments.map(doc => (
                                <tr key={doc.id} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-blue-600"
                                            checked={selectedDocuments[doc.id] || false}
                                            onChange={() => handleSelectDocument(doc.id)}
                                        />
                                    </td>
                                    <td className="p-4 text-gray-500">TASK-{doc.id.toString().padStart(4, '0')}</td>
                                    <td className="p-4">{doc.title}</td>
                                    <td className="p-4 hidden sm:table-cell">
                                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">Tài liệu</span>
                                    </td>
                                    <td className="p-4 hidden md:table-cell">
                                        <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">Đang thực hiện</span>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            className="text-gray-400 hover:text-gray-600"
                                            onClick={() => handleEditClick(doc)}
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
                    <span className="text-sm">{Object.values(selectedDocuments).filter(Boolean).length} trên {filteredDocuments.length} hàng được chọn.</span>
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

                {/* Modal thêm/chỉnh sửa tài liệu */}
                <Modal isOpen={isModalOpen} onClose={resetForm}>
                    <DocumentForm
                        document={newDocument}
                        onChange={(e) => setNewDocument({ ...newDocument, [e.target.name]: e.target.value })}
                        onSubmit={isEditing ? handleSaveEdit : handleAddDocument}
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