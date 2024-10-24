import React, { useState, useEffect } from 'react';
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
import TDlogo from '../assets/images/TDLOGO.png'
import { FaBookOpen, FaClock, FaCalendar, FaSearch, FaBars, FaChevronRight, FaUsers, FaBookmark, FaGraduationCap, FaGlobe } from 'react-icons/fa';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-[#0b328f] text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-2 sm:py-4">
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center space-x-2">
              <img src={TDlogo} alt="Logo" className="h-8 w-auto sm:h-12" />
              <span className="text-base sm:text-lg md:text-2xl">Thư viện Thành Đô</span>
            </a>
            <nav className="hidden md:block">
              <ul className="flex space-x-2 lg:space-x-6">
                <li><a href="#" className="hover:text-[#f2a429] transition-colors text-xs lg:text-base">Danh mục</a></li>
                <li><a href="#" className="hover:text-[#f2a429] transition-colors text-xs lg:text-base">Dịch vụ</a></li>
                <li><a href="#" className="hover:text-[#f2a429] transition-colors text-xs lg:text-base">Nghiên cứu</a></li>
                <li><a href="#" className="hover:text-[#f2a429] transition-colors text-xs lg:text-base">Giới thiệu</a></li>
                <li>
                  <Link to="/library/login" className="border-2 border-[#ffce46] bg-[#f2a429] hover:bg-[#ffce46] hover:text-white transition-colors text-xs lg:text-base rounded-full px-2 py-1 lg:px-4 lg:py-2">
                    Đăng Nhập
                  </Link>
                </li>
              </ul>
            </nav>
            <button className="md:hidden bg-transparent border-none text-white" onClick={toggleMenu}>
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu (Persistent Drawer) */}
      <div className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} w-64 bg-[#0b328f] text-white transition duration-300 ease-in-out z-50 md:hidden`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <ul className="flex flex-col items-start py-4 px-6">
          <li><a href="#" className="block py-2 hover:text-[#f2a429]">Trang chủ</a></li>
          <li><a href="#" className="block py-2 hover:text-[#f2a429]">Danh mục</a></li>
          <li><a href="#" className="block py-2 hover:text-[#f2a429]">Dịch vụ</a></li>
          <li><a href="#" className="block py-2 hover:text-[#f2a429]">Nghiên cứu</a></li>
          <li><a href="#" className="block py-2 hover:text-[#f2a429]">Giới thiệu</a></li>
          <li className="mt-4 w-full">
            <Link to="/library/login" className="block w-full text-center py-2 border-2 border-[#ffce46] bg-[#f2a429] hover:bg-[#ffce46] hover:text-white transition-colors rounded-full">
              Đăng Nhập
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMenu}></div>
      )}

      <main className="flex-grow">
        <div className="bg-gradient-to-r from-[#0b328f] to-[#e09321] py-8 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-white">Thư viện Thành Đô</h1>
            <p className="text-base sm:text-lg md:text-xl text-white mb-5">Chào mừng bạn đến với thư viện của chúng tôi. Hãy khám phá và tận hưởng những tài liệu hữu ích!</p>
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row">
              <input
                type="text"
                placeholder="Tìm kiếm sách, tạp chí, tài liệu..."
                className="w-full px-4 py-2 sm:py-3 rounded-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-[#0b328f] mb-2 sm:mb-0 text-base sm:text-lg"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#f2a429] hover:bg-[#e09321] text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-l-none transition-colors flex items-center justify-center text-base sm:text-lg font-semibold"
              >
                <FaSearch className="h-4 w-4 sm:h-5 sm:w-5 inline-block mr-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-[#0b328f]">Khám phá thư viện tài liệu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { title: "Sách điện tử", desc: "Truy cập hàng nghìn sách điện tử" },
                { title: "Tạp chí học thuật", desc: "Truy cập các tạp chí hàng đầu" },
                { title: "Giáo trình", desc: "Giáo trình các bộ môn chuyên ngành" },
                { title: "Tài liệu đa phương tiện", desc: "Khám phá âm thanh và video" }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow" >
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#0b328f]">{item.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">{item.desc}</p>
                  <div style={{ backgroundImage: `url(${TDlogo})`, backgroundSize: 'cover' }} alt={item.title} className="w-full h-24 sm:h-32 rounded-md mb-4" />
                  <button className="w-full bg-[#0b328f] text-white py-2 rounded hover:bg-[#092569] transition-colors text-sm sm:text-base">
                    Khám phá
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-12 sm:py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-[#0b328f]">Dịch vụ Thư viện</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  title: "Mượn và Trả sách",
                  desc: "Quản lý tài khoản thư viện của bạn",
                  items: ["Mượn sách trực tuyến", "Gia hạn sách", "Kiểm tra hạn trả", "Đặt trước sách"]
                },
                {
                  title: "Hỗ trợ Nghiên cứu",
                  desc: "Nhận hỗ trợ từ các chuyên gia",
                  items: ["Tư vấn nghiên cứu", "Hướng dẫn tìm kiếm tài liệu", "Hỗ trợ trích dẫn", "Hội thảo kỹ năng nghiên cứu"]
                },
                {
                  title: "Không gian Học tập",
                  desc: "Đặt phòng và không gian học tập",
                  items: ["Phòng học nhóm", "Khu vực học tập yên tĩnh", "Phòng máy tính", "Không gian sáng tạo"]
                }
              ].map((service, index) => (
                <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#0b328f]">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">{service.desc}</p>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                  <button className="mt-4 w-full bg-[#f2a429] text-white py-2 rounded hover:bg-[#e09321] transition-colors text-sm sm:text-base">
                    Tìm hiểu thêm
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-[#0b328f]">Tin tức và Sự kiện</h2>
            <div className="max-w-3xl mx-auto">
              <div className="mb-4 flex">
                <button className="flex-1 bg-[#0b328f] text-white px-4 py-2 rounded-l hover:bg-[#092569] transition-colors text-sm sm:text-base">Tin tức</button>
                <button className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-r hover:bg-gray-300 transition-colors text-sm sm:text-base">Sự kiện</button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-4 shadow-md">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#0b328f]">Mở cửa kéo dài trong tuần thi</h3>
                <p className="text-gray-600 mb-2 text-sm sm:text-base">
                  <FaClock className="inline-block mr-2 text-[#f2a429]" />
                  Đăng ngày 1 tháng 5, 2024
                </p>
                <p className="text-gray-700 text-sm sm:text-base">Thư viện sẽ mở cửa 24/7 trong tuần thi để hỗ trợ nhu cầu học tập của sinh viên. Chúng tôi cung cấp không gian học tập yên tĩnh, dịch vụ hỗ trợ nghiên cứu, và các tiện ích cần thiết để giúp bạn đạt được kết quả tốt nhất trong kỳ thi.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6 shadow-md">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#0b328f]">Bộ sưu tập mới: Văn học Đương đại Trung Quốc</h3>
                <p className="text-gray-600 mb-2 text-sm sm:text-base">
                  <FaClock className="inline-block mr-2 text-[#f2a429]" />
                  Đăng ngày 15 tháng 4, 2024
                </p>
                <p className="text-gray-700 text-sm sm:text-base">Thư viện vừa bổ sung một bộ sưu tập đặc biệt về Văn học Đương đại Trung Quốc. Bộ sưu tập bao gồm hơn 1000 tác phẩm từ các tác giả nổi tiếng và mới nổi, phản ánh sự phong phú và đa dạng của văn học Trung Quốc hiện đại.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-12 sm:py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-[#0b328f]">Hướng dẫn Nghiên cứu</h2>
            <div className="max-w-3xl mx-auto">
              {[
                {
                  title: "Cách tìm kiếm tài liệu hiệu quả",
                  content: (
                    <>
                      <p className="text-sm sm:text-base">Để tìm kiếm tài liệu hiệu quả, hãy làm theo các bước sau:</p>
                      <ol className="list-decimal list-inside mt-2 space-y-1 sm:space-y-2 text-sm sm:text-base">
                        <li>Xác định từ khóa chính cho chủ đề của bạn</li>
                        <li>Sử dụng các toán tử Boolean (AND, OR, NOT) để tinh chỉnh tìm kiếm</li>
                        <li>Tận dụng các bộ lọc như năm xuất bản, loại tài liệu, ngôn  ngữ</li>
                        <li>Kiểm tra danh sách tham khảo của các bài báo liên quan</li>
                        <li>Sử dụng các cơ sở dữ liệu chuyên ngành cho lĩnh vực của bạn</li>
                      </ol>
                    </>
                  )
                },
                {
                  title: "Cách trích dẫn nguồn tài liệu",
                  content: (
                    <>
                      <p className="text-sm sm:text-base">Trích dẫn đúng cách là rất quan trọng trong nghiên cứu học thuật. Dưới đây là một số hướng dẫn cơ bản:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1 sm:space-y-2 text-sm sm:text-base">
                        <li>Luôn ghi nhận nguồn gốc của thông tin và ý tưởng</li>
                        <li>Sử dụng phong cách trích dẫn phù hợp với lĩnh vực của bạn (ví dụ: APA, MLA, Chicago)</li>
                        <li>Đảm bảo thông tin trích dẫn đầy đủ và chính xác</li>
                        <li>Sử dụng công cụ quản lý trích dẫn để tổ chức và tạo trích dẫn tự động</li>
                      </ul>
                      <p className="mt-2 text-sm sm:text-base">Thư viện cung cấp hướng dẫn chi tiết và hội thảo về cách trích dẫn. Hãy liên hệ với chúng tôi để biết thêm thông tin.</p>
                    </>
                  )
                },
                {
                  title: "Sử dụng cơ sở dữ liệu chuyên ngành",
                  content: (
                    <>
                      <p className="text-sm sm:text-base">Cơ sở dữ liệu chuyên ngành cung cấp truy cập vào các tài liệu học thuật chất lượng cao. Dưới đây là một số mẹo để sử dụng hiệu quả:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1 sm:space-y-2 text-sm sm:text-base">
                        <li>Xác định cơ sở dữ liệu phù hợp nhất cho lĩnh vực của bạn</li>
                        <li>Tìm hiểu về các tính năng tìm kiếm nâng cao của từng cơ sở dữ liệu</li>
                        <li>Sử dụng bộ lọc để thu hẹp kết quả tìm kiếm</li>
                        <li>Lưu các tìm kiếm và thiết lập thông báo cho các bài báo mới</li>
                        <li>Tận dụng tính năng xuất trích dẫn của cơ sở dữ liệu</li>
                      </ul>
                      <p className="mt-2 text-sm sm:text-base">Thư viện cung cấp hướng dẫn sử dụng cho từng cơ sở dữ liệu. Đừng ngần ngại liên hệ với chúng tôi để được hỗ trợ.</p>
                    </>
                  )
                }
              ].map((item, index) => (
                <div key={index} className="mb-4">
                  <button className="flex justify-between items-center w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <span className="text-base sm:text-lg font-semibold text-[#0b328f]">{item.title}</span>
                    <FaChevronRight className="h-5 w-5 text-[#f2a429]" />
                  </button>
                  <div className="bg-white mt-2 p-4 rounded-lg shadow-md">
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-[#0b328f]">Đội ngũ Thư viện</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { name: "Nguyễn Văn A", role: "Giám đốc Thư viện", desc: "Chuyên gia về quản lý thư viện số và phát triển bộ sưu tập" },
                { name: "Trần Thị B", role: "Trưởng phòng Dịch vụ Độc giả", desc: "Chuyên gia về dịch vụ tham khảo và hỗ trợ nghiên cứu" },
                { name: "Lê Văn C", role: "Quản lý Công nghệ Thông tin", desc: "Chuyên gia về hệ thống thư viện số và cơ sở dữ liệu" },
                { name: "Phạm Thị D", role: "Chuyên viên Đào tạo", desc: "Chuyên gia về đào tạo kỹ năng thông tin và hướng dẫn sử dụng thư viện" }
              ].map((member, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 sm:p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div style={{ backgroundImage: `url(${ThanhDoBackgroundImage})` }} alt={member.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-[#0b328f]">{member.name}</h3>
                  <p className="text-[#f2a429] mb-2 text-sm sm:text-base">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-12 sm:py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-[#0b328f]">Thống kê Thư viện</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {[
                { icon: FaBookOpen, number: "1,000,000+", desc: "Sách in và điện tử" },
                { icon: FaBookmark, number: "50,000+", desc: "Tạp chí và ấn phẩm định kỳ" },
                { icon: FaUsers, number: "30,000+", desc: "Độc giả đăng ký" },
                { icon: FaGraduationCap, number: "500+", desc: "Hội thảo và đào tạo mỗi năm" }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-lg p-4 sm:p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <stat.icon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 text-[#f2a429]" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-[#0b328f]">{stat.number}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-[#0b328f]">Đối tác của Chúng tôi</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8" >
              {[...Array(6)].map((_, index) => (
                <img key={index} src={ThanhDoImage} alt={`Đối tác ${index + 1}`} className="mx-auto filter grayscale hover:filter-none transition-all duration-300" />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Contact div */}
      <div id="contact" className="py-12 md:py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Thông tin liên hệ</h2>
          <a href="mailto:library@university.edu" className="bg-[#0b328f] text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-[#08367b] text-base md:text-lg transition-transform transform hover:scale-105">
            <FaEnvelope size={20} className="inline mr-2" /> Gửi Email
          </a>
        </div>
      </div>

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
