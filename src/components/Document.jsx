import React, { useState, useRef, useEffect } from 'react';
import { FiMenu, FiPlus, FiEdit, FiTrash, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Sidebar from './Sidebar';
import Modal from './Modal';
import DocumentForm from './DocumentForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockDocuments = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Tài liệu ${i + 1}`,
    description: `Mô tả cho tài liệu ${i + 1}`
}));

export default function Document() {
    const [documents, setDocuments] = useState(mockDocuments);
    const [searchQuery, setSearchQuery] = useState('');
    const [newDocument, setNewDocument] = useState({ title: '', description: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingDocument, setEditingDocument] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(documents.length / itemsPerPage);
    const pagesVisited = currentPage * itemsPerPage;

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

    const filteredDocuments = documents.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected !== undefined ? selectedPage.selected : selectedPage);
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

            {/* Nội dung chính */}
            <div className="flex-1 p-10 space-y-6">
                <h1 className="text-2xl font-bold mb-4">Quản lý tài liệu</h1>

                {/* Thanh tìm kiếm */}
                <div className="bg-white shadow-md rounded p-6 mb-6 flex items-center space-x-4">
                    <FiSearch size={20} className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm tài liệu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 ml-2"
                    />
                </div>

                {/* Danh sách tài liệu */}
                <div className="bg-white shadow-md rounded p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl">Danh sách tài liệu</h2>
                        <button
                            onClick={() => { setIsEditing(false); setIsModalOpen(true); }}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                        >
                            <FiPlus size={20} /> Thêm tài liệu
                        </button>
                    </div>
                    <ul>
                        {filteredDocuments.slice(pagesVisited, pagesVisited + itemsPerPage).map(doc => (
                            <li key={doc.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                                <div>
                                    <p className="text-lg font-semibold">{doc.title}</p>
                                    <p className="text-gray-600">{doc.description}</p>
                                </div>
                                <div className="flex space-x-4">
                                    <button onClick={() => handleEditDocument(doc)} className="text-blue-600 hover:text-blue-800">
                                        <FiEdit size={20} />
                                    </button>
                                    <button onClick={() => handleDeleteDocument(doc.id)} className="text-red-600 hover:text-red-800">
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
                            disabled={currentPage === 0}
                            className="px-4 py-2 rounded disabled:opacity-50"
                        >
                            <FiChevronLeft size={20} />
                        </button>
                        <span>Trang {currentPage + 1} của {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage + 1 >= totalPages}
                            className="px-4 py-2 rounded disabled:opacity-50"
                        >
                            <FiChevronRight size={20} />
                        </button>
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
