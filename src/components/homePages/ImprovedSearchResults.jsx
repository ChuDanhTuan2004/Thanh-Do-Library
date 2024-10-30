import React from 'react';
import { MagnifyingGlassIcon, UserIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const ImprovedSearchResults = () => {
  const sampleResults = [
    { id: 1, title: "Đắc Nhân Tâm", author: "Dale Carnegie", cover: "/placeholder.svg?height=300&width=200" },
    { id: 2, title: "Nhà Giả Kim", author: "Paulo Coelho", cover: "/placeholder.svg?height=300&width=200" },
    { id: 3, title: "Tuổi Trẻ Đáng Giá Bao Nhiêu", author: "Rosie Nguyễn", cover: "/placeholder.svg?height=300&width=200" },
    { id: 4, title: "Cây Cam Ngọt Của Tôi", author: "José Mauro de Vasconcelos", cover: "/placeholder.svg?height=300&width=200" },
    { id: 5, title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh", author: "Nguyễn Nhật Ánh", cover: "/placeholder.svg?height=300&width=200" },
    { id: 6, title: "Số Đỏ", author: "Vũ Trọng Phụng", cover: "/placeholder.svg?height=300&width=200" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Kết quả tìm kiếm</h1>
            <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
              <UserIcon className="h-5 w-5 mr-2" />
              Đăng nhập
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="mb-8">
            <form className="flex items-center">
              <div className="relative flex-grow">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  placeholder="Tìm kiếm sách..."
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Tìm kiếm
              </button>
            </form>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Đăng nhập để xem kết quả đầy đủ</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Bạn cần đăng nhập để xem tất cả kết quả tìm kiếm và truy cập các tính năng bổ sung.
                </p>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-4">Kết quả tìm kiếm giới hạn:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {sampleResults.map((book) => (
                  <div key={book.id} className="flex flex-col items-center">
                    <div className="relative w-32 h-48 mb-2 overflow-hidden rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                      <img 
                        src={book.cover} 
                        alt={book.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 text-center">{book.title}</h4>
                    <p className="text-xs text-gray-500 text-center">{book.author}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Trước
                </a>
                <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Tiếp
                </a>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">6</span> trong số <span className="font-medium">20</span> kết quả
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Trang trước</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      1
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      2
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      3
                    </a>
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Trang tiếp</span>
                      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImprovedSearchResults;