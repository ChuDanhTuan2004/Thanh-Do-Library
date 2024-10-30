import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AxiosSupport from '../../services/axiosSupport';
import { useUser } from '../../services/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookAccessRequestDialog from './BookAccessRequestDialog';

const axiosSupport = new AxiosSupport();

const BookDetail = ({ bookId, onClose }) => {
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const [showAccessDialog, setShowAccessDialog] = useState(false);
    const { currentUser } = useUser();
    const [isCheckingAccess, setIsCheckingAccess] = useState(false);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axiosSupport.getBookById(bookId);
                setBook(response);
                console.log('Book details:', response);
            } catch (error) {
                setError('Không thể tải thông tin sách. Vui lòng thử lại sau.');
                toast.error('Không thể tải thông tin sách. Vui lòng thử lại sau.');
            }
        };

        fetchBookDetails();
    }, [bookId]);

    const handleReadNow = async () => {
        if (!currentUser) {
            toast.error('Vui lòng đăng nhập để tiếp tục');
            return;
        }

        try {
            setIsCheckingAccess(true);
            const hasAccess = await axiosSupport.checkAccess(currentUser.id, bookId);
            if (hasAccess) {
                if (book?.url) {
                    window.open(book.url, '_blank', 'noopener,noreferrer');
                } else {
                    toast.error('Không tìm thấy đường dẫn đến sách');
                }
            } else {
                setShowAccessDialog(true);
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra quyền truy cập:', error);
            toast.error('Có lỗi xảy ra khi kiểm tra quyền truy cập');
        } finally {
            setIsCheckingAccess(false);
        }
    };

    const handleClose = () => {
        onClose();
    };

    if (error) return null;
    if (!book) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 py-8 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl relative animate-fadeIn">
                    {/* Nút đóng */}
                    <button 
                        onClick={handleClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Đóng"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Nội dung chính */}
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col lg:flex-row gap-8 pt-4">
                            {/* Phần hình ảnh */}
                            <div className="lg:w-1/3 flex-shrink-0">
                                <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-lg">
                                    <img
                                        src={book.imageUrl || "/placeholder.svg"}
                                        alt={`Bìa sách ${book.title}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </div>

                            {/* Phần thông tin */}
                            <div className="lg:w-2/3 flex flex-col">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                    {book.title}
                                </h1>

                                {/* Thông tin chi tiết */}
                                <div className="space-y-3 mb-6">
                                    <p className="flex items-center gap-2">
                                        <span className="font-semibold min-w-[120px]">Tác giả:</span>
                                        <span>{book.author}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="font-semibold min-w-[120px]">Năm xuất bản:</span>
                                        <span>{book.publishYear}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="font-semibold min-w-[120px]">Nhà xuất bản:</span>
                                        <span>{book.publisher}</span>
                                    </p>
                                </div>

                                {/* Mô tả */}
                                <div className="mb-6">
                                    <h2 className="font-semibold text-lg mb-2">Mô tả</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        {book.description}
                                    </p>
                                </div>

                                {/* Các nút tương tác */}
                                <div className="mt-auto flex flex-wrap gap-3">
                                    <button 
                                        className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition duration-200 flex-1 md:flex-none"
                                        onClick={() => {/* Xử lý xem trailer */}}
                                    >
                                        Trailer
                                    </button>
                                    <button 
                                        className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200 flex-1 md:flex-none disabled:opacity-50"
                                        onClick={handleReadNow}
                                        disabled={isCheckingAccess}
                                    >
                                        {isCheckingAccess ? 'Đang kiểm tra...' : 'Đọc ngay'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialog yêu cầu truy cập */}
            <BookAccessRequestDialog 
                bookId={bookId}
                userId={currentUser?.id}
                isOpen={showAccessDialog}
                onOpenChange={setShowAccessDialog}
                onRequestSubmitted={() => {
                    toast.success('Yêu cầu truy cập đã được gửi thành công');
                }}
            />
            
            <ToastContainer />
        </div>
    );
};

export default BookDetail;
