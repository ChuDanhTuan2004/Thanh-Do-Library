"use client"

import React, { useState } from 'react'
import { Book, Clock, Star, ChevronRight, RefreshCw, AlertCircle } from 'lucide-react'

const borrowedBooks = [
  { id: 1, title: "Lập trình Python cho người mới bắt đầu", author: "Nguyễn Văn A", dueDate: "2024-05-15", coverUrl: "/placeholder.svg?height=200&width=150&text=Python" },
  { id: 2, title: "Kinh tế học vĩ mô", author: "Trần Thị B", dueDate: "2024-05-20", coverUrl: "/placeholder.svg?height=200&width=150&text=Kinh+tế" },
  { id: 3, title: "Lịch sử Việt Nam", author: "Lê Văn C", dueDate: "2024-05-18", coverUrl: "/placeholder.svg?height=200&width=150&text=Lịch+sử" },
]

const readingHistory = [
  { id: 4, title: "Cơ sở dữ liệu", author: "Phạm Thị D", returnDate: "2024-04-01", rating: 4 },
  { id: 5, title: "Marketing căn bản", author: "Hoàng Văn E", returnDate: "2024-03-15", rating: 5 },
  { id: 6, title: "Tiếng Anh học thuật", author: "Đỗ Thị F", returnDate: "2024-02-28", rating: 3 },
]

const recommendations = [
  { id: 7, title: "Machine Learning cơ bản", author: "Ngô Văn G", coverUrl: "/placeholder.svg?height=200&width=150&text=ML" },
  { id: 8, title: "Quản trị doanh nghiệp", author: "Trịnh Thị H", coverUrl: "/placeholder.svg?height=200&width=150&text=Quản+trị" },
  { id: 9, title: "Văn học Việt Nam hiện đại", author: "Lý Văn I", coverUrl: "/placeholder.svg?height=200&width=150&text=Văn+học" },
]

export default function MyBookshelf() {
  const [activeTab, setActiveTab] = useState('borrowed')

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tủ sách của tôi</h1>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('borrowed')}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'borrowed'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Sách đang mượn
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Lịch sử đọc sách
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'recommendations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Đề xuất cho bạn
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {activeTab === 'borrowed' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Sách đang mượn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {borrowedBooks.map((book) => (
                    <div key={book.id} className="bg-gray-50 rounded-lg p-4 flex">
                      <img src={book.coverUrl} alt={book.title} className="w-20 h-30 object-cover rounded mr-4" />
                      <div>
                        <h3 className="font-semibold text-lg">{book.title}</h3>
                        <p className="text-gray-600">{book.author}</p>
                        <p className="text-sm text-gray-500 mt-2 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Hạn trả: {book.dueDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Lịch sử đọc sách</h2>
                <div className="space-y-4">
                  {readingHistory.map((book) => (
                    <div key={book.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{book.title}</h3>
                        <p className="text-gray-600">{book.author}</p>
                        <p className="text-sm text-gray-500 mt-1">Đã trả ngày: {book.returnDate}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="ml-1 text-gray-600">{book.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'recommendations' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Đề xuất cho bạn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((book) => (
                    <div key={book.id} className="bg-gray-50 rounded-lg p-4">
                      <img src={book.coverUrl} alt={book.title} className="w-full h-48 object-cover rounded mb-4" />
                      <h3 className="font-semibold">{book.title}</h3>
                      <p className="text-gray-600">{book.author}</p>
                      <button className="mt-2 text-blue-600 hover:text-blue-800 flex items-center text-sm">
                        Xem chi tiết
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button className="flex items-center text-blue-600 hover:text-blue-800">
            <RefreshCw className="w-5 h-5 mr-2" />
            Cập nhật tủ sách
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
            Mượn sách mới
          </button>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Lưu ý</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Vui lòng trả sách đúng hạn để tránh phí phạt và đảm bảo quyền lợi mượn sách của bạn.
                  Nếu cần gia hạn, hãy liên hệ với thủ thư ít nhất 2 ngày trước ngày đến hạn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}