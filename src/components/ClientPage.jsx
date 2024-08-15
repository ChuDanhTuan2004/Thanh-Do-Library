import React, { useState } from 'react';

export default function ClientPage() {
    const [openMenuId, setOpenMenuId] = useState(null);

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

    const books = generateItems('Cuốn Sách', 10);
    const textbooks = generateItems('Giáo Trình', 10);
    const researchPapers = generateItems('Nghiên Cứu', 10);

    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const renderSection = (title, items) => (
        <div className="mb-8">
            <div className=" flex justify-start">
                <h2 className="text-lg font-semibold mb-4 text-white border-2 rounded-full px-4 py-1 inline-flex items-center bg-[#faa21a]">
                    {title}
                </h2>
            </div>
            <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
                {items.map(item => (
                    <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-200 w-60 flex-shrink-0 relative">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.type} - {item.author}</p>
                        </div>
                        <div className="absolute top-2 right-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMenu(item.id);
                                }}
                                className="w-8 h-8 rounded-full bg-[#faa21a] border border-gray-300 flex items-center justify-center text-white hover:bg-[#e89100] transition-colors duration-200"
                            >
                                <span className="text-xl leading-none">&#8942;</span>
                            </button>
                            {openMenuId === item.id && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <a href="/add-to-bookshelf" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Thêm vào tủ sách của tôi</a>
                                        {item.canReadNow && (
                                            <a href={`/read/${item.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Đọc ngay</a>
                                        )}
                                        {!item.canReadNow && (
                                            <a href={`/borrow/${item.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Đăng ký mượn</a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0b328f] to-black text-white" onClick={() => setOpenMenuId(null)}>
            {/* Header */}
            <header className="p-4 bg-[#0b328f] shadow-md flex items-center justify-between px-10">
                <h1 className="text-2xl font-bold">Thư viện Thành Đô</h1>
                <nav>
                    <ul className="flex space-x-8">
                        <li><a href="/my-bookshelf" className="text-white hover:text-[#faa21a]">Tủ sách của tôi</a></li>
                        <li><a href="/logout" className="text-white hover:text-[#faa21a]">Đăng xuất</a></li>
                    </ul>
                </nav>
            </header>

            {/* Content */}
            <div className="p-6 space-y-10">
                {renderSection('Sách', books)}
                {renderSection('Giáo Trình', textbooks)}
                {renderSection('Bài Nghiên Cứu', researchPapers)}
            </div>
        </div>
    );
}