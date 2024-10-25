"use client"

import React, { useState, useEffect } from 'react'
import { Book, Clock, Star, ChevronRight, RefreshCw, AlertCircle, ChevronLeft } from 'lucide-react'
import AxiosSupport from '../../services/axiosSupport'
import { Link } from 'react-router-dom'
import BookDetail from './BookDetail'

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

const favoriteBooks = [
  { id: 7, title: "Machine Learning cơ bản", author: "Ngô Văn G", coverUrl: "/placeholder.svg?height=200&width=150&text=ML" },
  { id: 8, title: "Quản trị doanh nghiệp", author: "Trịnh Thị H", coverUrl: "/placeholder.svg?height=200&width=150&text=Quản+trị" },
  { id: 9, title: "Văn học Việt Nam hiện đại", author: "Lý Văn I", coverUrl: "/placeholder.svg?height=200&width=150&text=Văn+học" },
]

export default function MyBookshelf() {
  const [activeTab, setActiveTab] = useState('favorites')
  const [favoriteBooks, setFavoriteBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const booksPerPage = 6 // Số sách hiển thị trên mỗi trang
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const axiosSupport = new AxiosSupport()

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  useEffect(() => {
    if (userId) {
      fetchWishlist()
    }
  }, [userId, currentPage])

  const fetchCurrentUser = async () => {
    try {
      const user = await axiosSupport.getCurrentUser()
      setUserId(user.id)
    } catch (err) {
      console.error('Lỗi khi lấy thông tin người dùng:', err)
      setError('Không thể lấy thông tin người dùng. Vui lòng thử lại sau.')
    }
  }

  const fetchWishlist = async () => {
    setIsLoading(true)
    try {
      const response = await axiosSupport.getWishlistById(userId, currentPage, booksPerPage)

      if (response && response.books) {
        setFavoriteBooks(response.books)
        
        const totalBooks = response.totalBooks || response.books.length;
        setTotalPages(Math.max(1, Math.ceil(totalBooks / booksPerPage)))
      } else {
        setFavoriteBooks([])
        setTotalPages(1)
      }
    } catch (err) {
      console.error('Lỗi khi lấy danh sách yêu thích:', err)
      setError('Không thể tải danh sách yêu thích. Vui lòng thử lại sau.')
      setFavoriteBooks([])
      setTotalPages(1)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleOpenModal = (bookId) => {
    setSelectedBookId(bookId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedBookId(null)
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tủ sách của tôi</h1>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('favorites')}
                className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'favorites'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Sách yêu thích
              </button>
              <button
                onClick={() => setActiveTab('borrowed')}
                className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'borrowed'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Sách đang mượn
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Sách yêu thích</h2>
                {isLoading ? (
                  <p>Đang tải...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favoriteBooks.map((book) => (
                        <div key={book.bookId} className="book-card bg-white rounded-lg p-4 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
                          <div className="book-cover relative overflow-hidden rounded-lg mb-4" style={{paddingBottom: '150%'}}>
                            <img 
                              src={book.imageUrl || "/placeholder.svg"} 
                              alt={book.title} 
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-y-0 right-0 w-4"></div>
                          </div>
                          <h3 className="font-semibold text-lg mb-1 truncate">{book.title}</h3>
                          <p className="text-gray-600 text-sm mb-2 truncate">{book.author}</p>
                          <button 
                            onClick={() => handleOpenModal(book.bookId)}
                            className="mt-2 text-blue-600 hover:text-blue-800 flex items-center text-sm group"
                          >
                            Xem chi tiết
                            <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-center">
                      <button 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 1}
                        className="mx-1 px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="mx-2">
                        Trang {currentPage} / {totalPages}
                      </span>
                      <button 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                        className="mx-1 px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

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

        {isModalOpen && (
          <BookDetail
            bookId={selectedBookId}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  )
}
