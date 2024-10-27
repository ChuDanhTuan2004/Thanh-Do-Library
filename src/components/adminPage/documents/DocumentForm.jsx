import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Thay đổi từ useHistory sang useNavigate
import { toast } from 'react-toastify'; // Thêm toastify để hiển thị thông báo
import AxiosSupport from '../../../services/axiosSupport';
import { debounce } from 'lodash'; // Thêm import này

const axios = new AxiosSupport(); // Khởi tạo AxiosSupport
export default function DocumentForm({ document, onChange, onSubmit, onCancel, isEditing, category }) {
    const [imageFile, setImageFile] = useState(null); // Trạng thái để lưu trữ hình ảnh
    const navigate = useNavigate(); // Khởi tạo useNavigate
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/library/login');
        }
    }, [navigate]);

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]); // Lưu trữ tệp hình ảnh
    };

    // Sử dụng useCallback và debounce để tối ưu việc gọi API
    const debouncedSubmit = useCallback(
        debounce(async (imageFile) => {
            setIsLoading(true);
            try {
                await onSubmit(imageFile);
            } catch (error) {
                toast.error('Có lỗi xảy ra: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        }, 300),
        [onSubmit]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        debouncedSubmit(imageFile);
    };

    // Sử dụng useCallback để tối ưu việc render lại các hàm xử lý sự kiện
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        onChange({ ...document, [name]: value });
    }, [document, onChange]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col max-h-[90vh] overflow-hidden">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}
                <div className="p-3 sm:p-4 md:p-6 overflow-y-auto flex-grow">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6 text-gray-900">
                        {isEditing ? 'Chỉnh sửa tài liệu' : 'Thêm tài liệu mới'}
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
                        <div className="w-full md:w-2/5 pr-0 md:pr-4 mb-4 md:mb-0 h-[80%] flex flex-col">
                            <div className="space-y-1 sm:space-y-2 flex-grow flex flex-col">
                                <label htmlFor="image" className="text-sm font-medium text-gray-700">Hình ảnh:</label>
                                <div className="flex flex-col gap-4">
                                    <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white text-black flex-grow w-full`}>
                                        <input
                                            id="image"
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                        {!imageFile ? (
                                            <>
                                                <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-400">kéo & thả để tải lên</p>
                                                <label htmlFor="image" className="cursor-pointer px-4 py-2 bg-[#0b328f] text-white rounded-md hover:bg-[#f2a429] transition duration-300 ease-in-out">
                                                    chọn
                                                </label>
                                            </>
                                        ) : (
                                            <img
                                                src={URL.createObjectURL(imageFile)}
                                                alt="Preview"
                                                className="max-w-full h-auto rounded-lg object-contain max-h-full"
                                            />
                                        )}
                                    </div>
                                    {isEditing && document.imageUrl && (
                                        <div className="mt-4 flex flex-col items-center">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Hình ảnh hiện tại:</p>
                                            <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={document.imageUrl}
                                                    alt="Hình ảnh hiện tại"
                                                    className="max-w-full max-h-full object-contain"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={`w-full ${!isEditing ? 'md:w-3/5' : ''} space-y-3 md:space-y-4`}>
                            <div className="space-y-1 sm:space-y-2">
                                <label htmlFor="title" className="text-sm font-medium text-gray-700">Tiêu đề:</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={document.title}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                               focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                    required
                                />
                            </div>
                            <div className="space-y-1 sm:space-y-2">
                                <label htmlFor="bookUrl" className="text-sm font-medium text-gray-700">URL Sách:</label>
                                <input
                                    id="bookUrl"
                                    name="bookUrl"
                                    type="url"
                                    value={document.url}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                               focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                    placeholder="https://example.com/book"
                                />
                            </div>
                            <div className="space-y-1 sm:space-y-2">
                                <label htmlFor="categoryId" className="text-sm font-medium text-gray-700">Loại sách:</label>
                                <select
                                    id="categoryId"
                                    name="categoryId"
                                    value={document.categoryId || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                               focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                    required
                                >
                                    <option value="">Chọn loại sách</option>
                                    {category && category.length > 0 && category.map((cat) => (
                                        <option key={cat.categoryId} value={cat.categoryId}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1 sm:space-y-2">
                                <label htmlFor="description" className="text-sm font-medium text-gray-700">Mô tả:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={document.description}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                               focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div className="space-y-1 sm:space-y-2">
                                    <label htmlFor="author" className="text-sm font-medium text-gray-700">Tác giả:</label>
                                    <input
                                        id="author"
                                        name="author"
                                        type="text"
                                        value={document.author}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                                   focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                        required
                                    />
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                    <label htmlFor="publisher" className="text-sm font-medium text-gray-700">Nhà xuất bản:</label>
                                    <input
                                        id="publisher"
                                        name="publisher"
                                        type="text"
                                        value={document.publisher}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                                   focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div className="space-y-1 sm:space-y-2">
                                    <label htmlFor="publishYear" className="text-sm font-medium text-gray-700">Năm xuất bản:</label>
                                    <input
                                        id="publishYear"
                                        name="publishYear"
                                        type="number"
                                        value={document.publishYear}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                                   focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                        required
                                    />
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                    <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Số lượng:</label>
                                    <input
                                        id="quantity"
                                        name="quantity"
                                        type="number"
                                        value={document.quantity}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                                   focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="p-3 sm:p-4 md:p-6 bg-gray-50 rounded-b-lg border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 
                                       hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            disabled={isLoading}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full sm:w-auto px-3 sm:px-4 py-2 rounded-md text-sm font-medium text-white bg-sky-600 
                                       hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Đang xử lý...' : (isEditing ? 'Lưu' : 'Thêm')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
