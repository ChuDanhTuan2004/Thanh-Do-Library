import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import AxiosSupport from '../../services/axiosSupport';
import { useUser } from '../../services/UserContext';
import ClientSidebar from './ClientSidebar';
import ClientHeader from './ClientHeader';
import BookSection from './BookSection';
import Carousel from './Carousel';
import ClientPageFooter from './ClientPageFooter';
import demoBookCover from '../../assets/images/demoBook.png';

const FeaturedCategory = ({ title, description, imageUrl }) => (
  <div className="relative overflow-hidden rounded-lg shadow-md h-40">
    <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-[#0b328f] bg-opacity-70 flex flex-col justify-end p-4">
      <h3 className="text-white text-xl font-bold">{title}</h3>
      <p className="text-[#f2a429] text-sm">{description}</p>
    </div>
  </div>
);

const axiosSupport = new AxiosSupport();

export default function ClientPage() {
  const { currentUser } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/library/client' || location.pathname === '/library/client/';

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axiosSupport.getAllBooks();
      if (response && response.content) {
        setBooks(response.content.map(book => ({
          id: book.bookId,
          title: book.title,
          author: book.author,
          imageUrl: book.imageUrl || demoBookCover,
          url: book.url,
          canReadNow: true
        })));
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sách:', error);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:8080/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log('Đăng xuất thành công');
      localStorage.removeItem('token');
      navigate('/library/home');
    } else {
      console.error('Đăng xuất thất bại');
    }
  };

  const getBooks = (count) => {
    return books.slice(0, count).map(book => ({
      ...book,
      onClick: () => handleBookClick(book.id)
    }));
  };

  const carouselItems = [
    { imageUrl: demoBookCover, title: "Sách nổi bật 1", description: "Mô tả ngắn về sách 1" },
    { imageUrl: demoBookCover, title: "Sách nổi bật 2", description: "Mô tả ngắn về sách 2" },
    { imageUrl: demoBookCover, title: "Sách nổi bật 3", description: "Mô tả ngắn về sách 3" },
  ];

  const featuredCategories = [
    { title: "Văn học Việt Nam", description: "Khám phá tinh hoa văn chương dân tộc", imageUrl: "https://images.unsplash.com/photo-1528605105345-5344ea20e269" },
    { title: "Sách nước ngoài", description: "Mở rộng tầm nhìn toàn cầu", imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8" },
    { title: "Sách thiếu nhi", description: "Nuôi dưỡng trí tưởng tượng trẻ thơ", imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794" },
    { title: "Sách học thuật", description: "Nâng cao kiến thức chuyên môn", imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6" },
  ];

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-400 to-orange-400">
      <ClientSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ClientHeader
          currentUser={currentUser}
          onLogout={handleLogout}
          onMenuClick={toggleSidebar}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto pt-16">
          {isHomePage ? (
            // Nội dung mặc định của ClientPage
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"> 
              <Carousel items={carouselItems} />
              <div className="my-8 bg-white bg-opacity-80 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#0b328f] mb-4">Danh mục nổi bật</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {featuredCategories.map((category, index) => (
                    <FeaturedCategory key={index} {...category} />
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-white bg-opacity-80 rounded-lg p-6">
                  <BookSection title="Sách đang hot" books={getBooks(10)} />
                </div>
                <div className="bg-white bg-opacity-80 rounded-lg p-6">
                  <BookSection title="Gợi ý cho bạn" books={getBooks(10)} />
                </div>
                <div className="bg-white bg-opacity-80 rounded-lg p-6">
                  <BookSection title="Sách mới về" books={getBooks(10)} />
                </div>
              </div>
            </div>
          ) : (
            // Hiển thị nội dung của các route con
            <Outlet />
          )}
          <ClientPageFooter />
        </main>
      </div>
    </div>
  );
}
