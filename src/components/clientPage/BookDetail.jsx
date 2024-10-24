import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AxiosSupport from '../../services/axiosSupport';

const axiosSupport = new AxiosSupport();

const BookDetail = () => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosSupport.getBookById(id);
                setBook(response);
                console.log('Book details:', response);
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin sách:', error);
                setError('Không thể tải thông tin sách. Vui lòng thử lại sau.');
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    const handleReadNow = () => {
        if (book && book.url) {
            console.log('Attempting to open URL:', book.url);
            window.open(book.url, '_blank', 'noopener,noreferrer');
        } else {
            console.error('URL không hợp lệ hoặc không tồn tại');
        }
    };

    const handleClose = () => {
        navigate('/library/client');
    };

    if (loading) return null;
    if (error) return null;
    if (!book) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-end p-2">
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row lg:space-x-8">
                        <div className="lg:w-1/3 mb-4 lg:mb-0">
                            <img
                                src={book.imageUrl || "/placeholder.svg?height=600&width=400"}
                                alt="Bìa sách"
                                className="w-full h-auto object-cover rounded-lg shadow-md"
                            />
                        </div>
                        <div className="lg:w-2/3">
                            <h1 className="text-2xl sm:text-3xl font-bold mb-4">{book.title}</h1>
                            <div className="space-y-2 mb-4 sm:mb-6">
                                <p><span className="font-semibold">Tác giả:</span> {book.author}</p>
                                <p><span className="font-semibold">Năm xuất bản:</span> {book.publishYear}</p>
                                <p><span className="font-semibold">Nhà xuất bản:</span> {book.publisher}</p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-gray-700 text-sm sm:text-base">{book.description}</p>
                                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                                    <button className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300">
                                        Trailer
                                    </button>
                                    <button 
                                        className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                                        onClick={handleReadNow}
                                    >
                                        Đọc ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
