import React from 'react'
import { Clock } from 'lucide-react'

const borrowedBooks = [
  { id: 1, title: "Lập trình Python cho người mới bắt đầu", author: "Nguyễn Văn A", dueDate: "2024-05-15", coverUrl: "https://picsum.photos/200/300?random=1" },
  { id: 2, title: "Kinh tế học vĩ mô", author: "Trần Thị B", dueDate: "2024-05-20", coverUrl: "https://picsum.photos/200/300?random=2" },
  { id: 3, title: "Lịch sử Việt Nam", author: "Lê Văn C", dueDate: "2024-05-18", coverUrl: "https://picsum.photos/200/300?random=3" },
  { id: 4, title: "Toán cao cấp", author: "Phạm Văn D", dueDate: "2024-05-22", coverUrl: "https://picsum.photos/200/300?random=4" },
  { id: 5, title: "Vật lý đại cương", author: "Nguyễn Thị E", dueDate: "2024-05-25", coverUrl: "https://picsum.photos/200/300?random=5" },
  { id: 6, title: "Hóa học hữu cơ", author: "Trần Văn F", dueDate: "2024-05-28", coverUrl: "https://picsum.photos/200/300?random=6" },
  { id: 7, title: "Sinh học phân tử", author: "Lê Thị G", dueDate: "2024-06-01", coverUrl: "https://picsum.photos/200/300?random=7" },
  { id: 8, title: "Triết học Mác-Lênin", author: "Phạm Văn H", dueDate: "2024-06-05", coverUrl: "https://picsum.photos/200/300?random=8" },
  { id: 9, title: "Kỹ năng giao tiếp", author: "Nguyễn Văn I", dueDate: "2024-06-10", coverUrl: "https://picsum.photos/200/300?random=9" },
  { id: 10, title: "Quản trị kinh doanh", author: "Trần Thị J", dueDate: "2024-06-15", coverUrl: "https://picsum.photos/200/300?random=10" },
]

export default function ReadingHistory() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#18181B] mb-6">Sách đang mượn</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {borrowedBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-lg p-2 shadow-sm transition duration-300 hover:shadow-md relative">
              <div className="relative overflow-hidden rounded-md mb-2" style={{paddingBottom: '150%'}}>
                <img 
                  src={book.coverUrl} 
                  alt={book.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-sm mb-1 text-[#18181B] truncate">{book.title}</h3>
              <p className="text-[#71717A] text-xs mb-2 truncate">{book.author}</p>
              {/* <p className="text-xs text-[#71717A] flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Hạn trả: {book.dueDate}
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}