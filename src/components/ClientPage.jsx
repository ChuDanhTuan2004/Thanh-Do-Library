import React, { useState, useEffect } from 'react';
import { FiBook, FiFileText, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ThanhDoBlueLogo from '../assets/images/logo_blue_thanh_do.png'

export default function ClientPage() {
    const [openMenuId, setOpenMenuId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Kiểm tra kích thước màn hình cho mobile
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Gọi hàm để set giá trị ban đầu

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // State to track how many items are displayed
    const [visibleBooks, setVisibleBooks] = useState(5);
    const [visibleTextbooks, setVisibleTextbooks] = useState(5);
    const [visibleResearchPapers, setVisibleResearchPapers] = useState(5);

    const generateItems = (type, count) => {
        return Array.from({ length: count }, (v, i) => ({
            id: i + 1,
            title: `${type} ${String.fromCharCode(65 + i)}`,
            type: type,
            imageUrl: `https://picsum.photos/seed/${type}-${i}/300/200`,
            author: `Tác giả ${String.fromCharCode(65 + i)}`,
            canReadNow: Math.random() < 0.5, // Randomly determine if the item can be read immediately
        }));
    };

    const books = generateItems('Cuốn Sách', 15);  // Increase total items available
    const textbooks = generateItems('Giáo Trình', 15);
    const researchPapers = generateItems('Nghiên Cứu', 15);

    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const filterItems = (items) => {
        return items.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const renderSection = (title, items, icon, visibleCount, setVisibleCount) => (
        <div className="mb-8 relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center text-white bg-[#faa21a] rounded-full px-4 py-2">
                    {icon} <span className="ml-2">{title}</span>
                </h2>
            </div>

            {/* Left and Right Arrows (for mobile only) */}
            <div className="absolute left-0 top-16 bottom-0 flex items-center md:hidden">
                <FiChevronLeft className="text-white opacity-50 hover:opacity-100" size={40} />
            </div>
            <div className="absolute right-0 top-16 bottom-0 flex items-center md:hidden">
                <FiChevronRight className="text-white opacity-50 hover:opacity-100" size={40} />
            </div>

            {/* Slider for Mobile, Grid for Desktop */}
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-6 md:overflow-visible overflow-x-auto snap-x snap-mandatory scrollbar-hide whitespace-nowrap">
                {items.slice(0, visibleCount).map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow-lg w-full min-w-[90%] sm:min-w-0 md:w-auto md:flex-shrink-0 snap-center flex-shrink-0 md:snap-none overflow-hidden transform hover:scale-105 transition-transform duration-200">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-[#08367b]">{item.title}</h3>
                            <p className="text-gray-600">{item.type} - {item.author}</p>
                        </div>
                        <div className="px-4 pb-4 flex justify-between items-center">
                            {item.canReadNow ? (
                                <a href={`/read/${item.id}`} className="text-[#08367b] hover:text-[#faa21a] font-semibold">Đọc ngay</a>
                            ) : (
                                <a href={`/borrow/${item.id}`} className="text-orange-500 hover:text-[#faa21a] font-semibold">Đăng ký mượn</a>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMenu(item.id);
                                }}
                                className="text-gray-600 hover:text-gray-900"
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
                        className="bg-[#08367b] text-white font-semibold py-1 px-4 rounded hover:bg-[#77a2e2]"
                    >
                        Xem thêm
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#08367b] to-black text-white">
            {/* Header */}
            <header className="p-4 bg-[#254b9e] shadow-md flex items-center justify-between px-6 md:px-10">
            <img src={ThanhDoBlueLogo} alt="Thư viện Thành Đô Logo" className="h-16 md:h-10 lg:h-20 rounded" />                <nav>
                    <ul className="flex space-x-4 md:space-x-8">
                        <li><a href="/my-bookshelf" className="text-white hover:text-[#faa21a]">Tủ sách của tôi</a></li>
                        <li><a href="/logout" className="text-white hover:text-[#faa21a]">Đăng xuất</a></li>
                    </ul>
                </nav>
            </header>

            {/* Intro Section */}
            <div className="p-6 bg-[#08367b] text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Chào mừng đến với Thư viện Thành Đô</h2>
                <p className="text-lg text-[#faa21a]">
                    Khám phá hàng ngàn cuốn sách, giáo trình và bài nghiên cứu phù hợp với mọi sở thích và nhu cầu học tập của bạn.
                </p>
            </div>

            {/* Search Input */}
            <div className="p-4 sm:p-6">
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sách, giáo trình, bài nghiên cứu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                            className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4"
                        />
                        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>

                {/* Content Section */}
                {renderSection('Sách', filterItems(books), <FiBook />, visibleBooks, setVisibleBooks)}
                {renderSection('Giáo Trình', filterItems(textbooks), <FiFileText />, visibleTextbooks, setVisibleTextbooks)}
                {renderSection('Bài Nghiên Cứu', filterItems(researchPapers), <FiFileText />, visibleResearchPapers, setVisibleResearchPapers)}
            </div>

            {/* Footer */}
            <footer className="bg-[#08367b] text-white p-4 mt-8 text-center">
                <p className="text-sm">&copy; 2024 Thư viện Thành Đô. All rights reserved.</p>
            </footer>
        </div>
    );
}
