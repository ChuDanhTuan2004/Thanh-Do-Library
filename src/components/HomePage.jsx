import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaUniversity, FaInfoCircle, FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import { AiOutlineAppstore } from 'react-icons/ai';
import { IoLibrary } from 'react-icons/io5';
import { Link as ScrollLink } from 'react-scroll';  // Import the Link component from react-scroll
import ThanhDoImage from '../assets/images/logo_thanh_do.png'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white text-[#faa21a] py-2">
        <div className="container mx-auto flex flex-col justify-between md:flex-row items-center px-4 relative">
          <img
            src={ThanhDoImage} // Replace with the actual path to your logo image
            alt="Thư viện Thành Đô Logo"
            className="w-32 md:w-40"
          />
          <button
            className="md:hidden absolute top-4 right-4 text-[#faa21a] focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
          <nav
            className={`${isMenuOpen ? 'block' : 'hidden'
              } md:flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 md:mt-0 mt-4`}
          >
            <ScrollLink to="services" smooth={true} duration={500} offset={-70} className="flex items-center space-x-2 hover:underline">
              <AiOutlineAppstore size={20} className="text-[#faa21a]" />
              <span>Dịch Vụ</span>
            </ScrollLink>
            <ScrollLink to="resources" smooth={true} duration={500} offset={-70} className="flex items-center space-x-2 hover:underline">
              <FaBook size={20} className="text-[#faa21a]" />
              <span>Tài Nguyên</span>
            </ScrollLink>
            <ScrollLink to="contact" smooth={true} duration={500} offset={-70} className="flex items-center space-x-2 hover:underline">
              <FaEnvelope size={20} className="text-[#faa21a]" />
              <span>Liên Hệ</span>
            </ScrollLink>
            <Link to="/library/login" className="flex items-center space-x-2 text-[#faa21a] hover:underline">
              <FaSignInAlt size={20} />
              <span>Đăng Nhập</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#0b328f] text-white py-12 md:py-20">
        <div className="container mx-auto flex flex-col items-center text-center">
          <IoLibrary size={50} className="text-[#faa21a] mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Chào mừng bạn đến với Thư viện Thành Đô</h2>
          <p className="text-base md:text-lg mb-6">Khám phá kho tài nguyên phong phú và các dịch vụ hữu ích của chúng tôi.</p>
          <ScrollLink to="contact" smooth={true} duration={500} offset={-70} className="bg-[#faa21a] text-white px-4 py-2 md:px-6 md:py-3 rounded hover:bg-[#f8a020] text-base md:text-lg">
            Liên Hệ Ngay
          </ScrollLink>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Dịch Vụ Của Chúng Tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaBook size={40} className="text-[#0b328f] mb-4 mx-auto" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Mượn Sách</h3>
              <p>Thư viện cung cấp dịch vụ mượn sách tiện lợi cho sinh viên và giảng viên.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaUniversity size={40} className="text-[#0b328f] mb-4 mx-auto" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Hỗ Trợ Học Tập</h3>
              <p>Chúng tôi cung cấp các tài liệu và dịch vụ hỗ trợ học tập cho tất cả sinh viên.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaInfoCircle size={40} className="text-[#0b328f] mb-4 mx-auto" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Tư Vấn Thư Viện</h3>
              <p>Nhận tư vấn từ đội ngũ chuyên gia để tìm kiếm tài liệu và sử dụng các dịch vụ thư viện hiệu quả.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="bg-gray-200 py-12 md:py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Tài Nguyên Của Chúng Tôi</h2>
          <p className="text-base md:text-lg mb-6">Khám phá các tài nguyên phong phú mà thư viện cung cấp:</p>
          <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg md:text-xl font-semibold mb-2">Sách</h3>
              <p>Các loại sách đa dạng từ các lĩnh vực khác nhau.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg md:text-xl font-semibold mb-2">Tạp Chí</h3>
              <p>Hơn 100 tạp chí chuyên ngành cập nhật mới nhất.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg md:text-xl font-semibold mb-2">Tài Liệu Điện Tử</h3>
              <p>Các cơ sở dữ liệu và tài liệu điện tử dễ dàng truy cập trực tuyến.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Liên Hệ Với Chúng Tôi</h2>
          <p className="text-base md:text-lg mb-6">Chúng tôi luôn sẵn sàng hỗ trợ bạn!</p>
          <a href="mailto:library@university.edu" className="bg-[#0b328f] text-white px-4 py-2 md:px-6 md:py-3 rounded hover:bg-[#08367b] text-base md:text-lg">
            <FaEnvelope size={20} className="inline mr-2" /> Gửi Email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b328f] text-white py-4 md:py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} Thư viện Thành Đô. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
