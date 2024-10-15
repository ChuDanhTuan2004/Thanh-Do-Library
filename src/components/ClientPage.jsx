import React, { useState, useEffect } from 'react';
import { FiBook, FiFileText, FiHome, FiRadio, FiList, FiMusic, FiUser, FiDisc, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ThanhDoBlueLogo from '../assets/images/logo_blue_thanh_do.png'

const BookCard = ({ book }) => (
    <div className="flex flex-col">
        <div className="relative aspect-[3/4] overflow-hidden rounded-md">
            <img 
                src={book.imageUrl} 
                alt={book.title} 
                className="w-full h-full object-cover"
            />
        </div>
        <div className="mt-2">
            <h3 className="text-sm font-medium text-black truncate">{book.title}</h3>
            <p className="text-xs text-gray-400">{book.author}</p>
        </div>
    </div>
);

export default function ClientPage() {
    const [openMenuId, setOpenMenuId] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [visibleBooks, setVisibleBooks] = useState(5);
    const [visibleTextbooks, setVisibleTextbooks] = useState(5);
    const [visibleResearchPapers, setVisibleResearchPapers] = useState(5);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const generateItems = (type, count) => (
        Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            title: `${type} ${String.fromCharCode(65 + i)}`,
            type,
            imageUrl: `https://picsum.photos/seed/${type}-${i}/300/200`,
            author: `Tác giả ${String.fromCharCode(65 + i)}`,
            canReadNow: Math.random() < 0.5,
        }))
    );

    const books = generateItems('Cuốn Sách', 15);
    const textbooks = generateItems('Giáo Trình', 15);
    const researchPapers = generateItems('Nghiên Cứu', 15);

    const toggleMenu = (id) => setOpenMenuId(openMenuId === id ? null : id);

    const renderSection = (title, items, icon, visibleCount, setVisibleCount) => (
        <div className="mb-8 relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center text-gray-900">
                    {icon} <span className="ml-2">{title}</span>
                </h2>
            </div>

            {/* Left and Right Arrows (for mobile only) */}
            <div className="absolute left-0 top-16 bottom-0 flex items-center md:hidden">
                <FiChevronLeft className="text-gray-400 hover:text-gray-600" size={40} />
            </div>
            <div className="absolute right-0 top-16 bottom-0 flex items-center md:hidden">
                <FiChevronRight className="text-gray-400 hover:text-gray-600" size={40} />
            </div>

            {/* Slider for Mobile, Grid for Desktop */}
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-6 md:overflow-visible overflow-x-auto snap-x snap-mandatory scrollbar-hide whitespace-nowrap">
                {items.slice(0, visibleCount).map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 w-full min-w-[90%] sm:min-w-0 md:w-auto md:flex-shrink-0 snap-center flex-shrink-0 md:snap-none overflow-hidden transform hover:shadow-md transition-shadow duration-200">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-gray-600">{item.type} - {item.author}</p>
                        </div>
                        <div className="px-4 pb-4 flex justify-between items-center">
                            {item.canReadNow ? (
                                <a href={`/read/${item.id}`} className="text-blue-600 hover:text-blue-800 font-semibold">Đọc ngay</a>
                            ) : (
                                <a href={`/borrow/${item.id}`} className="text-orange-500 hover:text-orange-700 font-semibold">Đăng ký mượn</a>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMenu(item.id);
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FiFileText size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* "Xem thêm" Button */}
            {(!isMobile || (isMobile && visibleCount >= items.length)) && (
                <div className="text-center mt-4">
                    <button
                        onClick={() => setVisibleCount(visibleCount + 5)}
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                        Xem thêm
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="flex h-screen bg-white text-black">
            {/* Sidebar */}
            <aside className="w-64 p-6 border-r border-gray-200">
                <img src={ThanhDoBlueLogo} alt="Thư viện Thành Đô Logo" className="h-8 mb-8" />
                
                <nav>
                    <h2 className="text-sm font-semibold mb-4">Khám phá</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="flex items-center text-gray-600 hover:text-black"><FiHome className="mr-3" /> Trang chủ</a></li>
                        <li><a href="#" className="flex items-center text-gray-600 hover:text-black"><FiBook className="mr-3" /> Duyệt sách</a></li>
                        <li><a href="#" className="flex items-center text-gray-600 hover:text-black"><FiRadio className="mr-3" /> Sách nói</a></li>
                    </ul>

                    <h2 className="text-sm font-semibold mt-8 mb-4">Thư viện</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="flex items-center text-gray-600 hover:text-black"><FiList className="mr-3" /> Danh sách đọc</a></li>
                        <li><a href="#" className="flex items-center text-gray-600 hover:text-black"><FiMusic className="mr-3" /> Sách đã mượn</a></li>
                        <li><a href="#" className="flex items-center text-gray-600 hover:text-black"><FiUser className="mr-3" /> Tác giả yêu thích</a></li>
                        <li><a href="#" className="flex items-center text-gray-600 hover:text-black"><FiDisc className="mr-3" /> Thể loại</a></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="p-6 flex justify-between items-center">
                    <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-gray-200 rounded-full text-sm font-medium">Sách</button>
                        <button className="px-4 py-2 text-gray-600 hover:text-black text-sm font-medium">Giáo trình</button>
                        <button className="px-4 py-2 text-gray-600 hover:text-black text-sm font-medium">Nghiên cứu</button>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium">Thêm sách</button>
                </header>

                {/* Content */}
                <div className="px-6">
                    <h2 className="text-2xl font-bold mb-4 text-black">Đọc ngay</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {books.slice(0, 6).map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4 text-black">Dành cho bạn</h2>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                        {books.slice(6, 14).map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
