import React, { useState, useEffect } from 'react'
import { ChevronRight, Trash2, ChevronLeft } from 'lucide-react'
import AxiosSupport from '../../services/axiosSupport'
import BookDetail from './BookDetail'

export default function FavoriteBooks() {
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
      fetchWishlist()
    } catch (err) {
      console.error('Lỗi khi xóa sách khỏi danh sách yêu thích:', err)
      setError('Không thể xóa sách khỏi danh sách yêu thích. Vui lòng thử lại sau.')
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F4F5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#18181B] mb-6">Sách yêu thích</h1>
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