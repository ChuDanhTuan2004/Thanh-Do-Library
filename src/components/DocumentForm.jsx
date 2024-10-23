import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Thay đổi từ useHistory sang useNavigate
import { toast } from 'react-toastify'; // Thêm toastify để hiển thị thông báo

export default function DocumentForm({ document, onChange, onSubmit, onCancel, isEditing }) {
    const [imageFile, setImageFile] = useState(null); // Trạng thái để lưu trữ hình ảnh
    const navigate = useNavigate(); // Khởi tạo useNavigate

    useEffect(() => {
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
        if (!imageFile) {
            toast.error('Vui lòng chọn tệp hình ảnh để tải lên!'); // Thông báo nếu không có tệp hình ảnh
            return;
        }
        await onSubmit(imageFile); // Gọi hàm onSubmit với tệp hình ảnh
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-2/5">
                <h2 className="text-xl font-bold mb-4">{isEditing ? 'Chỉnh sửa tài liệu' : 'Thêm tài liệu mới'}</h2>
                <div className="flex">
                    <div className="w-1/3 pr-4">
                        <img
                            src={document.imageUrl || 'http://localhost:8080/bookImages/defaultBookImage.png'} // Hiển thị hình ảnh cuốn sách
                            alt="Book Cover"
                            className="w-full h-auto rounded"
                        />
                    </div>
                    <form onSubmit={handleSubmit} className="w-2/3 space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-gray-700">Tiêu đề:</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={document.title}
                                onChange={onChange}
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-gray-700">Mô tả:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={document.description}
                                onChange={onChange}
                                className="w-full border border-gray-300 rounded p-2"
                                rows="4"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="author" className="block text-gray-700">Tác giả:</label>
                            <input
                                id="author"
                                name="author"
                                type="text"
                                value={document.author}
                                onChange={onChange}
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="publisher" className="block text-gray-700">Nhà xuất bản:</label>
                            <input
                                id="publisher"
                                name="publisher"
                                type="text"
                                value={document.publisher}
                                onChange={onChange}
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="publishYear" className="block text-gray-700">Năm xuất bản:</label>
                            <input
                                id="publishYear"
                                name="publishYear"
                                type="number"
                                value={document.publishYear}
                                onChange={onChange}
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block text-gray-700">Số lượng:</label>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                value={document.quantity}
                                onChange={onChange}
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-gray-700">Hình ảnh:</label>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full border border-gray-300 rounded p-2"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                {isEditing ? 'Lưu' : 'Thêm'}
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
