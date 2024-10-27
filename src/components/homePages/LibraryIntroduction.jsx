import React from 'react'
import { Book, Search, Calendar, Laptop, Clock, Users, BookOpen, Bookmark, GraduationCap, Globe, Coffee, Bell } from 'lucide-react'
import { FaFacebookF, FaYoutube, FaGoogle, FaZalo, FaHome, FaBackward } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function LibraryIntroduction() {
  const features = [
    { icon: <Book className="w-6 h-6" />, title: 'Bộ sưu tập đa dạng', description: 'Hơn 500,000 đầu sách, tạp chí, và tài liệu học thuật trong nhiều lĩnh vực' },
    { icon: <Search className="w-6 h-6" />, title: 'Tìm kiếm nâng cao', description: 'Công cụ tìm kiếm thông minh với bộ lọc chi tiết và gợi ý tương tự' },
    { icon: <Calendar className="w-6 h-6" />, title: 'Đặt chỗ trực tuyến', description: 'Hệ thống đặt phòng học nhóm và khu vực học tập cá nhân linh hoạt' },
    { icon: <Laptop className="w-6 h-6" />, title: 'Tài nguyên điện tử', description: 'Truy cập hàng triệu sách điện tử, tạp chí và cơ sở dữ liệu học thuật trực tuyến' },
    { icon: <Clock className="w-6 h-6" />, title: 'Giờ mở cửa linh hoạt', description: 'Mở cửa 24/7 trong mùa thi, với khu vực học tập qua đêm' },
    { icon: <Users className="w-6 h-6" />, title: 'Hỗ trợ chuyên nghiệp', description: 'Đội ngũ thủ thư và chuyên gia thông tin luôn sẵn sàng hỗ trợ trực tiếp và trực tuyến' },
  ]

  const collections = [
    { title: 'Sách giáo trình', count: '50,000+' },
    { title: 'Sách tham khảo', count: '100,000+' },
    { title: 'Tạp chí học thuật', count: '5,000+' },
    { title: 'Luận văn và luận án', count: '20,000+' },
    { title: 'Tài liệu đa phương tiện', count: '10,000+' },
    { title: 'Cơ sở dữ liệu trực tuyến', count: '100+' },
  ]

  const events = [
    { title: 'Hội thảo Kỹ năng Nghiên cứu', date: '15/05/2024', time: '14:00 - 16:00' },
    { title: 'Triển lãm Sách Mới', date: '01/06/2024 - 07/06/2024', time: 'Cả ngày' },
    { title: 'Workshop Sử dụng Cơ sở Dữ liệu', date: '20/06/2024', time: '09:00 - 11:00' },
    { title: 'Gặp gỡ Tác giả: GS. Nguyễn Văn A', date: '10/07/2024', time: '19:00 - 21:00' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-[#0b328f] text-white">
        <div className="container mx-auto px-4 py-2 fixed top-0 left-0 z-50">
          <div className="flex justify-start items-center">
            <Link 
              to="/library/home" 
              className="bg-orange-400 hover:bg-orange-500 text-white rounded-full p-2 border-2 border-yellow-300 transition duration-300 ease-in-out"
            >
              <FaBackward className="text-xl" />
            </Link>
          </div>
        </div>
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">Thư viện Đại học Thành Đô</h1>
              <p className="text-xl mb-8">Khám phá tri thức, nuôi dưỡng ước mơ, và định hình tương lai</p>
              <div className="space-x-4">
                <a href="#" className="bg-white text-[#0b328f] font-bold py-2 px-4 rounded-full hover:bg-blue-100 transition duration-300">
                  Khám phá ngay
                </a>
                <a href="#" className="bg-transparent border-2 border-white text-white font-bold py-2 px-4 rounded-full hover:bg-white hover:text-[#0b328f] transition duration-300">
                  Đăng ký tài khoản
                </a>
              </div>
            </div>
            <div className="mt-8 md:mt-0">
              <img src="https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Thư viện Đại học Thành Đô" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Chào mừng đến với Thư viện Đại học Thành Đô</h2>
            <p className="text-lg text-gray-600 mb-8">
              Thư viện Đại học Thành Đô là trung tâm học thuật hiện đại, cung cấp không gian học tập đa dạng và nguồn tài nguyên phong phú. 
              Chúng tôi cam kết hỗ trợ sinh viên, giảng viên và nhà nghiên cứu trong hành trình khám phá tri thức và sáng tạo học thuật.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <BookOpen className="w-8 h-8 text-[#0b328f] mx-auto mb-2" />
                <p className="font-semibold">500,000+</p>
                <p className="text-sm">Đầu sách</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <Users className="w-8 h-8 text-[#0b328f] mx-auto mb-2" />
                <p className="font-semibold">10,000+</p>
                <p className="text-sm">Độc giả</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <Laptop className="w-8 h-8 text-[#0b328f] mx-auto mb-2" />
                <p className="font-semibold">100+</p>
                <p className="text-sm">Máy tính</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <Coffee className="w-8 h-8 text-[#0b328f] mx-auto mb-2" />
                <p className="font-semibold">5</p>
                <p className="text-sm">Khu vực thư giãn</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Dịch vụ và Tiện ích</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <div className="text-[#0b328f] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Bộ sưu tập đa dạng</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {collections.map((collection, index) => (
              <div key={index} className="text-center">
                <div className="bg-[#0b328f] text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold">{collection.count}</span>
                </div>
                <h3 className="font-semibold">{collection.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Sự kiện sắp diễn ra</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">
                  <Calendar className="inline-block w-5 h-5 mr-2" />
                  {event.date}
                </p>
                <p className="text-gray-600">
                  <Clock className="inline-block w-5 h-5 mr-2" />
                  {event.time}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#" className="text-[#0b328f] font-semibold hover:underline">Xem tất cả sự kiện</a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#0b328f] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Ý kiến độc giả</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
              <p className="mb-4">"Thư viện Đại học Thành Đô là ngôi nhà thứ hai của tôi. Không gian học tập tuyệt vời và nguồn tài liệu phong phú đã giúp tôi rất nhiều trong quá trình học tập."</p>
              <p className="font-semibold">Nguyễn Văn A - Sinh viên năm 3</p>
            </div>
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
              <p className="mb-4">"Tôi rất ấn tượng với sự chuyên nghiệp của đội ngũ thủ thư. Họ luôn sẵn sàng hỗ trợ và tư vấn tận tình mỗi khi tôi cần giúp đỡ."</p>
              <p className="font-semibold">Trần Thị B - Giảng viên</p>
            </div>
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
              <p className="mb-4">"Cơ sở dữ liệu trực tuyến của thư viện là một kho tàng vô giá cho nghiên cứu của tôi. Tôi có thể truy cập mọi lúc, mọi nơi, thật tiện lợi."</p>
              <p className="font-semibold">Lê Văn C - Nghiên cứu sinh</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Sẵn sàng để bắt đầu hành trình khám phá tri thức?</h2>
          <p className="text-xl text-gray-600 mb-8">Đăng ký tài khoản thư viện ngay hôm nay và tận hưởng vô vàn lợi ích!</p>
          <a href="#" className="bg-[#0b328f] text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300">
            Đăng ký ngay
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
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8638558814236!2d105.74459841541348!3d21.03827279283066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b32ca5086d%3A0xa3c62e29d8ab37e4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBUaMOgbmggxJDDtA!5e0!3m2!1svi!2s!4v1632913978197!5m2!1svi!2s"
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
  )
}
