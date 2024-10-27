import React from 'react'
import { Book, ChevronRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom';
import { FaBackward } from 'react-icons/fa';

const bookCategories = [
  {
    name: "Khoa học Công nghệ",
    description: "Sách về công nghệ thông tin, kỹ thuật, và các lĩnh vực khoa học ứng dụng.",
    icon: "🖥️",
    books: [
      { title: "Trí tuệ Nhân tạo: Từ lý thuyết đến ứng dụng", author: "Nguyễn Văn A", rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
      { title: "Blockchain và Tương lai của Công nghệ", author: "Trần Thị B", rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
      { title: "Internet vạn vật (IoT) trong Đời sống", author: "Lê Văn C", rating: 4.7, imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    ]
  },
  {
    name: "Kinh tế & Quản lý",
    description: "Sách về kinh tế học, quản trị kinh doanh, tài chính và marketing.",
    icon: "📊",
    books: [
      { title: "Khởi nghiệp 4.0", author: "Phạm Văn D", rating: 4.8, imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
      { title: "Quản trị Nhân sự Hiện đại", author: "Hoàng Thị E", rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
      { title: "Kinh tế học Vi mô: Lý thuyết và Bài tập", author: "Đỗ Văn F", rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    ]
  },
  {
    name: "Văn học & Ngôn ngữ",
    description: "Tác phẩm văn học Việt Nam và thế giới, sách học ngoại ngữ.",
    icon: "📚",
    books: [
      { title: "Truyện Kiều - Bản dịch song ngữ", author: "Nguyễn Du", rating: 4.9, imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
      { title: "Tiếng Anh Học thuật cho Sinh viên", author: "Trần Thị G", rating: 4.4, imageUrl: "https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
      { title: "100 Bài Thơ Hay Nhất Thế kỷ 20", author: "Nhiều tác giả", rating: 4.7, imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    ]
  },
  {
    name: "Y học & Sức khỏe",
    description: "Sách về y khoa, dược học, dinh dưỡng và chăm sóc sức khỏe.",
    icon: "🩺",
    books: [
      { title: "Giải phẫu Người - Atlas Màu", author: "PGS.TS. Nguyễn Văn H", rating: 4.8, imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
      { title: "Dược lý học Cơ bản và Lâm sàng", author: "GS.TS. Trần Thị I", rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
      { title: "Dinh dưỡng cho Người bệnh Đái tháo đường", author: "TS. Lê Văn K", rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    ]
  },
]

export default function FeaturedCategories() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0b328f] to-[#f2a429] py-12 px-4 sm:px-6 lg:px-8">
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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Danh mục Sách Nổi bật</h1>
        <p className="text-xl text-white mb-12 text-center">
          Khám phá bộ sưu tập đa dạng của Thư viện Đại học Thành Đô với các danh mục sách phong phú
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bookCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <span className="mr-2 text-3xl">{category.icon}</span>
                    {category.name}
                  </h2>
                  <Link to="/library/client" className="text-blue-600 hover:text-blue-800 flex items-center">
                    Xem tất cả
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Link>
                </div>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <div className="space-y-4">
                  {category.books.map((book, bookIndex) => (
                    <div key={bookIndex} className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <img
                          src={book.imageUrl}
                          alt={book.title}
                          className="w-20 h-30 object-cover rounded"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                        <p className="text-gray-600">{book.author}</p>
                        <div className="flex items-center mt-1">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="ml-1 text-gray-600">{book.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <Link to="/library/client" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center justify-center">
                  Khám phá thêm sách {category.name}
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Khám phá Thêm</h2>
          <p className="text-xl text-white mb-8">
            Thư viện Đại học Thành Đô có nhiều danh mục sách khác đang chờ bạn khám phá
          </p>
          <Link
            to="/library/client"
            className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Xem Tất cả Danh mục
          </Link>
        </div>

        <div className="mt-16 bg-blue-100 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bạn không tìm thấy sách mình cần?</h2>
          <p className="text-gray-600 mb-6">
            Thư viện chúng tôi luôn sẵn sàng lắng nghe và đáp ứng nhu cầu của bạn. Hãy để lại đề xuất của bạn!
          </p>
            <Link to="/library/bookSuggestion" className="inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300">Đề xuất Sách Mới</Link>
        </div>
      </div>
    </div>
  )
}
