import React, { useCallback, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from '../../services/UserContext';
import BookDetail from './BookDetail';

const BookCard = ({ book, onAddToWishlist }) => {
  const { currentUser } = useUser();
  const [showBookDetail, setShowBookDetail] = useState(false);

  const handleWishlistClick = useCallback(async () => {
    console.log('Đã nhấp vào nút wishlist');
    if (!currentUser) {
      toast.error('Vui lòng đăng nhập để thêm sách vào danh sách yêu thích');
      return;
    }

    try {
      await onAddToWishlist(book.id);
      toast.success('Đã thêm sách vào danh sách yêu thích');
    } catch (error) {
      toast.error('Không thể thêm sách vào danh sách yêu thích');
    }
  }, [currentUser, onAddToWishlist, book.id]);

  const handleBookClick = () => {
    setShowBookDetail(true);
  };

  const handleCloseBookDetail = () => {
    setShowBookDetail(false);
  };

  if (currentUser.loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden relative h-80">
        <div onClick={handleBookClick} className="cursor-pointer block w-56">
          <img src={book.imageUrl} alt={book.title} className="w-full h-56 object-cover" />
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 truncate">{book.title}</h3>
            <p className="text-sm text-gray-600 truncate">{book.author}</p>
          </div>
        </div>
        <button
          onClick={handleWishlistClick}
          className="absolute bottom-2 right-2 p-1 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200 group"
          title="Thêm vào sách yêu thích"
        >
          <FaHeart className="h-4 w-4 text-red-500" />
          <span className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
            Thêm vào sách yêu thích
          </span>
        </button>
        <ToastContainer />
      </div>
      {showBookDetail && (
        <BookDetail bookId={book.id} onClose={handleCloseBookDetail} />
      )}
    </>
  );
};

export default BookCard;
