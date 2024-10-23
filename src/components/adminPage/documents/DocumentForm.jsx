import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Thay đổi từ useHistory sang useNavigate
import { toast } from 'react-toastify'; // Thêm toastify để hiển thị thông báo
import AxiosSupport from '../../../services/axiosSupport';

const axios = new AxiosSupport(); // Khởi tạo AxiosSupport
export default function DocumentForm({ document, onChange, onSubmit, onCancel, isEditing, category }) {
    const [imageFile, setImageFile] = useState(null); // Trạng thái để lưu trữ hình ảnh
    const navigate = useNavigate(); // Khởi tạo useNavigate

    useEffect(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Nếu không có token, chuyển hướng đến trang đăng nhập
            navigate('/library/login'); // Thay đổi từ history.push sang navigate
        }
    }, [navigate]);

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]); // Lưu trữ tệp hình ảnh
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(imageFile); // Gọi hàm onSubmit với tệp hình ảnh
    };

    useEffect(() => {
        const handleSomeEvent = () => {
            // Xử lý sự kiện
        };

        window.addEventListener('someevent', handleSomeEvent);

        return () => {
            window.removeEventListener('someevent', handleSomeEvent);
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col">
                <div className="p-6 overflow-y-auto flex-grow">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">{isEditing ? 'Chỉnh sửa tài liệu' : 'Thêm tài liệu mới'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium text-gray-700">Tiêu đề:</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={document.title}
                                onChange={onChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                           focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="categoryId" className="text-sm font-medium text-gray-700">Loại sách:</label>
                            <select
                                id="categoryId"
                                name="categoryId"
                                value={document.category}
                                onChange={onChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                           focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                required
                            >
                                <option value="">Chọn loại sách</option>
                                {category.map((category) => (
                                    <option key={category.categoryId} value={category.categoryId}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium text-gray-700">Mô tả:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={document.description}
                                onChange={onChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                           focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                rows="3"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="author" className="text-sm font-medium text-gray-700">Tác giả:</label>
                            <input
                                id="author"
                                name="author"
                                type="text"
                                value={document.author}
                                onChange={onChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                           focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="publisher" className="text-sm font-medium text-gray-700">Nhà xuất bản:</label>
                            <input
                                id="publisher"
                                name="publisher"
                                type="text"
                                value={document.publisher}
                                onChange={onChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                           focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="publishYear" className="text-sm font-medium text-gray-700">Năm xuất bản:</label>
                            <input
                                id="publishYear"
                                name="publishYear"
                                type="number"
                                value={document.publishYear}
                                onChange={onChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                           focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Số lượng:</label>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                value={document.quantity}
                                onChange={onChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                           focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="image" className="text-sm font-medium text-gray-700">Hình ảnh:</label>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm
                                           file:mr-4 file:py-2 file:px-4
                                           file:rounded-md file:border-0
                                           file:text-sm file:font-semibold
                                           file:bg-sky-50 file:text-sky-700
                                           hover:file:bg-sky-100"
                            />
                        </div>
                    </form>
                </div>
                <div className="p-6 bg-gray-50 rounded-b-lg border-t border-gray-200">
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 
                                       hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-sky-600 
                                       hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        >
                            {isEditing ? 'Lưu' : 'Thêm'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
