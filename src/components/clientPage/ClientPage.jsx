import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function ClientPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

  const generateSampleBooks = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      title: `Sách mẫu ${i + 1}`,
      author: `Tác giả ${String.fromCharCode(65 + i)}`,
      imageUrl: demoBookCover,
      canReadNow: Math.random() > 0.5
    }));
  };

  const sampleBooks = generateSampleBooks(20);

  const carouselItems = [
    { imageUrl: demoBookCover, title: "Sách nổi bật 1", description: "Mô tả ngắn về sách 1" },
    { imageUrl: demoBookCover, title: "Sách nổi bật 2", description: "Mô tả ngắn về sách 2" },
    { imageUrl: demoBookCover, title: "Sách nổi bật 3", description: "Mô tả ngắn về sách 3" },
  ];

  const featuredCategories = [
    { title: "Văn học", description: "Khám phá thế giới qua ngòi bút", imageUrl: demoBookCover },
    { title: "Khoa học", description: "Hiểu biết sâu sắc về vũ trụ", imageUrl: demoBookCover },
    { title: "Lịch sử", description: "Hành trình qua thời gian", imageUrl: demoBookCover },
    { title: "Tâm lý học", description: "Khám phá tâm trí con người", imageUrl: demoBookCover },
  ];

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
                <BookSection title="Đọc ngay" books={sampleBooks.slice(0, 10)} />
              </div>
              <div className="bg-white bg-opacity-80 rounded-lg p-6">
                <BookSection title="Dành cho bạn" books={sampleBooks.slice(5, 15)} />
              </div>
              <div className="bg-white bg-opacity-80 rounded-lg p-6">
                <BookSection title="Sách mới" books={sampleBooks.slice(10)} />
              </div>
            </div>
          </div>
          <ClientPageFooter />
        </main>
      </div>
    </div>
  );
}
