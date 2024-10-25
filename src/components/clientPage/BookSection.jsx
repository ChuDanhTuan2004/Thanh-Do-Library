import React from 'react';
import { FiBook } from 'react-icons/fi';
import BookCard from './BookCard';
import AxiosSupport from '../../services/axiosSupport';
import { useUser } from '../../services/UserContext';

const axiosSupport = new AxiosSupport();

export default function BookSection({ title, books }) {
  const { currentUser } = useUser();
  const visibleBooks = books.slice(0, 6);

  const handleAddToWishlist = async (bookId) => {
    if (!currentUser) {
      console.error('Người dùng chưa đăng nhập');
      return;
    }

    try {
      // Tạo một bản sao của danh sách yêu thích hiện tại
      const updatedWishlist = [...(currentUser.wishlist || [])];
      
      // Thêm sách mới vào danh sách
      updatedWishlist.push({ id: bookId });

      // Cập nhật danh sách yêu thích
      await axiosSupport.updateWishlist(currentUser.id, updatedWishlist);
      
      // Có thể thêm logic cập nhật UI ở đây nếu cần
      console.log('Sách đã được thêm vào danh sách yêu thích');
    } catch (error) {
      console.error('Lỗi khi thêm sách vào danh sách yêu thích:', error);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold flex items-center text-gray-900 mb-4">
        <FiBook className="mr-2" /> {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {visibleBooks.map((book) => (
          <BookCard key={book.id} book={book} onAddToWishlist={handleAddToWishlist} />
        ))}
      </div>
    </div>
  );
}
