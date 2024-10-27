"use client"

import React, { useState, useEffect } from 'react'
import { Book, Clock, Star, ChevronRight, RefreshCw, AlertCircle, ChevronLeft, Trash2 } from 'lucide-react'
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
  const booksPerPage = 6
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

  const handleRemoveFromWishlist = async (bookId) => {
    try {
      await axiosSupport.removeBookFromWishlist(userId, bookId)
      // Cập nhật lại danh sách sau khi xóa
      fetchWishlist()
    } catch (err) {
      console.error('Lỗi khi xóa sách khỏi danh sách yêu thích:', err)
      setError('Không thể xóa sách khỏi danh sách yêu thích. Vui lòng thử lại sau.')
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F4F5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#18181B] mb-6">Tủ sách của tôi</h1>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="border-b border-[#E4E4E7]">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('favorites')}
                className={`w-1/2 py-3 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'favorites'
                    ? 'border-[#0EA5E9] text-[#0EA5E9]'
                    : 'border-transparent text-[#71717A] hover:text-[#18181B] hover:border-[#D4D4D8]'
                }`}
              >
                Sách yêu thích
              </button>
              <button
                onClick={() => setActiveTab('borrowed')}
                className={`w-1/2 py-3 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'borrowed'
                    ? 'border-[#0EA5E9] text-[#0EA5E9]'
                    : 'border-transparent text-[#71717A] hover:text-[#18181B] hover:border-[#D4D4D8]'
                }`}
              >
                Sách đang mượn
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-lg font-semibold text-[#18181B] mb-4">Sách yêu thích</h2>
                {isLoading ? (
                  <p className="text-[#71717A]">Đang tải...</p>
                ) : error ? (
                  <p className="text-[#EF4444]">{error}</p>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {favoriteBooks.map((book) => (
                        <div key={book.bookId} className="bg-white rounded-lg p-2 shadow-sm transition duration-300 hover:shadow-md relative">
                          <div className="relative overflow-hidden rounded-md mb-2" style={{paddingBottom: '150%'}}>
                            <img 
                              src={book.imageUrl || "/placeholder.svg"} 
                              alt={book.title} 
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="font-semibold text-sm mb-1 text-[#18181B] truncate">{book.title}</h3>
                          <p className="text-[#71717A] text-xs mb-2 truncate">{book.author}</p>
                          <button 
                            onClick={() => handleOpenModal(book.bookId)}
                            className="mt-1 text-[#0EA5E9] hover:text-[#0284C7] flex items-center text-xs group"
                          >
                            Chi tiết
                            <ChevronRight className="w-3 h-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                          </button>
                          <button 
                            onClick={() => handleRemoveFromWishlist(book.bookId)}
                            className="absolute top-1 right-1 text-[#EF4444] hover:text-[#DC2626] bg-white rounded-full p-1"
                            title="Xóa khỏi danh sách yêu thích"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-center">
                      <button 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 1}
                        className="mx-1 px-2 py-1 rounded bg-[#0EA5E9] text-white disabled:bg-[#D4D4D8]"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="mx-2 text-sm text-[#71717A]">
                        Trang {currentPage} / {totalPages}
                      </span>
                      <button 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                        className="mx-1 px-2 py-1 rounded bg-[#0EA5E9] text-white disabled:bg-[#D4D4D8]"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'borrowed' && (
              <div>
                <h2 className="text-lg font-semibold text-[#18181B] mb-4">Sách đang mượn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {borrowedBooks.map((book) => (
                    <div key={book.id} className="bg-[#F4F4F5] rounded-lg p-3 flex items-start">
                      <img src={book.coverUrl} alt={book.title} className="w-16 h-24 object-cover rounded mr-3" />
                      <div>
                        <h3 className="font-semibold text-sm text-[#18181B] mb-1">{book.title}</h3>
                        <p className="text-[#71717A] text-xs mb-2">{book.author}</p>
                        <p className="text-xs text-[#71717A] flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
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

        <div className="mt-6 flex justify-between items-center">
          <button className="bg-[#0EA5E9] text-white px-3 py-2 rounded text-sm hover:bg-[#0284C7] transition duration-300">
            Mượn sách mới
          </button>
        </div>

        <div className="mt-6 bg-[#FEFCE8] border border-[#FEF08A] rounded-md p-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-4 w-4 text-[#CA8A04]" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-xs font-medium text-[#854D0E]">Lưu ý</h3>
              <div className="mt-1 text-xs text-[#854D0E]">
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
