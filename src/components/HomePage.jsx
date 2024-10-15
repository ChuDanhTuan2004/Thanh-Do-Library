import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaUniversity, FaInfoCircle, FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import { FaFacebookF, FaYoutube, FaGoogle } from 'react-icons/fa';
import { AiOutlineAppstore } from 'react-icons/ai';
import { IoLibrary } from 'react-icons/io5';
import { Link as ScrollLink } from 'react-scroll';
import ThanhDoImage from '../assets/images/logo_thanh_do.png'
import ThanhDoBackgroundImage from '../assets/images/DaiHocThanhDoHeader.png'
import BooksImage from '../assets/images/books.png'
import MagazineImage from '../assets/images/magazines.png'
import OnlineDocumentImage from '../assets/images/onlineDocuments.png'
import BorrowBooksImage from '../assets/images/borrowBooks.png'
import SupportStudyImage from '../assets/images/supportStudy.png'
import LibraryConsultationImage from '../assets/images/libraryConsultation.png'
import ReactDOM from 'react-dom';

function DialogMenu({ onClose }) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">
          ✕
        </button>
        <nav className="space-y-4 pt-7">
          <ScrollLink
            to="services"
            smooth={true}
            duration={500}
            offset={-70}
            className="flex items-center justify-start h-10 px-14 py-2 border-2 border-[#faa21a] rounded-full text-[#faa21a] hover:bg-[#faa21a] hover:text-white transition-colors"
          >
            <AiOutlineAppstore size={20} className='mr-2' />
            Dịch Vụ
          </ScrollLink>
          <ScrollLink
            to="resources"
            smooth={true}
            duration={500}
            offset={-70}
            className="flex items-center justify-start h-10 px-14 py-2 border-2 border-[#faa21a] rounded-full text-[#faa21a] hover:bg-[#faa21a] hover:text-white transition-colors"
          >
            <FaBook size={20} className='mr-2' />
            Tài Nguyên
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            offset={-70}
            className="flex items-center justify-start h-10 px-14 py-2 border-2 border-[#faa21a] rounded-full text-[#faa21a] hover:bg-[#faa21a] hover:text-white transition-colors"
          >
            <FaEnvelope size={20} className='mr-2' />
            Liên Hệ
          </ScrollLink>
          <Link
            to="/library/login"
            className="flex items-center justify-start h-10 px-14 py-2 border-2 border-[#faa21a] rounded-full text-[#faa21a] hover:bg-[#faa21a] hover:text-white transition-colors"
          >
            <FaSignInAlt size={20} className='mr-2' />
            Đăng Nhập
          </Link>
        </nav>
      </div>
    </div>,
    document.body
  );
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white text-[#faa21a] py-2 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex flex-col justify-between md:flex-row items-center px-4 relative">
          <img
            src={ThanhDoImage}
            alt="Thư viện Thành Đô Logo"
            className="w-32 md:w-40"
          />
          {/* Nút toggle menu chỉ hiển thị trên mobile */}
          <button
            className="md:hidden absolute top-4 right-4 text-[#faa21a] focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>

          {/* Menu hiển thị mặc định trên desktop */}
          <nav className="hidden md:flex space-x-4">
            <ScrollLink
              to="services"
              smooth={true}
              duration={500}
              offset={-70}
              className="flex items-center justify-center h-10 px-4 py-2 border-2 border-[#faa21a] rounded-full text-[#faa21a] hover:bg-[#faa21a] hover:text-white transition-colors"
            >
              <AiOutlineAppstore size={20} className='mr-2' />
              Dịch Vụ
            </ScrollLink>
            <ScrollLink
              to="resources"
              smooth={true}
              duration={500}
              offset={-70}
              className="flex items-center justify-center h-10 px-4 py-2 border-2 border-[#faa21a] rounded-full text-[#faa21a] hover:bg-[#faa21a] hover:text-white transition-colors"
            >
              <FaBook size={20} className='mr-2' />
              Tài Nguyên
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              offset={-70}
              className="flex items-center justify-center h-10 px-4 py-2 border-2 border-[#faa21a] rounded-full text-[#faa21a] hover:bg-[#faa21a] hover:text-white transition-colors"
            >
              <FaEnvelope size={20} className='mr-2' />
              Liên Hệ
            </ScrollLink>
            <Link
              to="/library/login"
              className="flex items-center justify-center h-10 px-4 py-2 border-2 border-[#faa21a] rounded-full text-[#faa21a] hover:bg-[#faa21a] hover:text-white transition-colors"
            >
              <FaSignInAlt size={20} className='mr-2' />
              Đăng Nhập
            </Link>
          </nav>
        </div>
      </header>

      {/* Hiển thị dialog menu nếu isMenuOpen là true */}
      {isMenuOpen && <DialogMenu onClose={toggleMenu} />}

      <div className="w-full h-[300px] md:h-[400px] lg:h-[650px] overflow-hidden">
        <img
          src={ThanhDoBackgroundImage}
          alt="Trường Đại học Thành Đô"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* Hero Section */}
      <section className="bg-[#0b328f] text-white py-12 md:py-20">
        <div className="container mx-auto flex flex-col items-center text-center">
          <IoLibrary size={50} className="text-[#faa21a] mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Thư viện Thành Đô</h2>
          <p className="text-base md:text-lg mb-6">Khám phá kho tài nguyên phong phú và các dịch vụ hữu ích của Trường Đại học Thành Đô.</p>
          <ScrollLink to="contact" smooth={true} duration={500} offset={-70} className="bg-[#faa21a] text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-[#f8a020] text-base md:text-lg transition-transform transform hover:scale-105">
            Liên Hệ Ngay
          </ScrollLink>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Dịch Vụ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

            <div className="bg-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 duration-300">
              <FaBook size={40} className="text-[#0b328f] mb-4 mx-auto" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Mượn Sách</h3>
              <p className="mb-3 text-sm md:text-base">Dịch vụ mượn sách tiện lợi cho sinh viên và giảng viên.</p>
              <img
                src={BorrowBooksImage}
                alt="Mượn Sách"
                className="mb-4 rounded-[5px] shadow-md w-full h-[150px] object-cover mx-auto"
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 duration-300">
              <FaUniversity size={40} className="text-[#0b328f] mb-4 mx-auto" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Hỗ Trợ Học Tập</h3>
              <p className="mb-3 text-sm md:text-base">Các tài liệu và dịch vụ hỗ trợ học tập cho tất cả sinh viên.</p>
              <img
                src={SupportStudyImage}
                alt="Hỗ Trợ Học Tập"
                className="mb-4 rounded-[5px] shadow-md w-full h-[150px] object-cover mx-auto"
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 duration-300">
              <FaInfoCircle size={40} className="text-[#0b328f] mb-4 mx-auto" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Tư Vấn Thư Viện</h3>
              <p className="mb-3 text-sm md:text-base">Nhận tư vấn từ đội ngũ chuyên gia để tìm kiếm tài liệu nhanh chóng.</p>
              <img
                src={LibraryConsultationImage}
                alt="Tư Vấn Thư Viện"
                className="mb-4 rounded-[5px] shadow-md w-full h-[150px] object-cover mx-auto"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="bg-gray-200 py-12 md:py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Tài Nguyên</h2>
          <p className="text-base md:text-lg mb-6">Khám phá các tài nguyên phong phú mà thư viện cung cấp:</p>
          <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 duration-300">
              <h3 className="text-lg md:text-xl font-semibold mb-2">Sách</h3>
              <p className="mb-4 text-sm md:text-base leading-relaxed">Các loại sách đa dạng từ các lĩnh vực khác nhau.</p>
              <img
                src={BooksImage}
                alt="Sách"
                className="mb-4 rounded-[5px] shadow-md w-full h-[200px] object-cover mx-auto"
              />
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
                Tìm Hiểu Thêm
              </button>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 duration-300">
              <h3 className="text-lg md:text-xl font-semibold mb-2">Tạp Chí</h3>
              <p className="mb-4 text-sm md:text-base leading-relaxed">Hơn 100 tạp chí chuyên ngành cập nhật mới nhất.</p>
              <img
                src={MagazineImage}
                alt="Tạp Chí"
                className="mb-4 rounded-[5px] shadow-md w-full h-[200px] object-cover mx-auto"
              />
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
                Tìm Hiểu Thêm
              </button>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 duration-300">
              <h3 className="text-lg md:text-xl font-semibold mb-2">Tài Liệu Điện Tử</h3>
              <p className="mb-4 text-sm md:text-base leading-relaxed">Các tài liệu điện tử dễ dàng truy cập trực tuyến.</p>
              <img
                src={OnlineDocumentImage}
                alt="Tài Liệu Điện Tử"
                className="mb-4 rounded-[5px] shadow-md w-full h-[200px] object-cover mx-auto"
              />
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
                Tìm Hiểu Thêm
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Thông tin liên hệ</h2>
          <a href="mailto:library@university.edu" className="bg-[#0b328f] text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-[#08367b] text-base md:text-lg transition-transform transform hover:scale-105">
            <FaEnvelope size={20} className="inline mr-2" /> Gửi Email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b328f] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

            {/* Thông tin liên hệ */}
            <div className="space-y-2">
              <p className="font-semibold text-lg">Bản quyền thuộc về Thư viện Trường Đại học Thành Đô</p>
              <p>Địa chỉ: Kim Chung, Hoài Đức, Hà Nội, Việt Nam</p>
              <p>Email: lib@thanhdo.edu.vn</p>
              <p>Điện thoại: (84-24)33861016</p>
              <p>Hotline: 0936.146838</p>
              <p>IP Address: 59.153.238.8</p>
              <div className="flex justify-center md:justify-start space-x-4 mt-3">
                <a href="#" className="text-white hover:text-gray-300">
                  <FaFacebookF className="fa-lg" />
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <FaYoutube className="fa-lg" />
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <FaGoogle className="fa-lg" />
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <i className="fab fa-zalo fa-lg"></i>
                </a>
              </div>
            </div>

            {/* Bản đồ Google */}
            <div className="flex justify-center">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5109.788412740747!2d105.71876907641048!3d21.062219980595497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134544dba522d4b%3A0x5db1a51aaf3dd805!2zxJDhuqFpIEjhu41jIFRow6BuaCDEkMO0IC0gUXXhu5FjIEzhu5kgMzI!5e1!3m2!1svi!2sus!4v1727497587612!5m2!1svi!2sus"
                width="250"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy">
              </iframe>
            </div>

            {/* Thông tin dữ liệu */}
            <div className="space-y-2">
              <ul>
                <li><strong>Hôm nay:</strong> 28 Tháng Chín 2024</li>
                <li><strong>Người dùng online:</strong> 1062</li>
                <li><strong>Ngày hôm nay:</strong> 93299</li>
                <li><strong>Tuần qua:</strong> 980335</li>
                <li><strong>Tháng này:</strong> 6695651</li>
                <li><strong>Tổng lượt truy cập:</strong> 80241167</li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="text-center mt-8">
            <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} Thư viện Thành Đô. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
