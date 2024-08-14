import React, { useState, useRef, useEffect } from 'react';
import { FiMenu, FiBook, FiUsers, FiArchive, FiActivity, FiPlus, FiUserPlus, FiBell, FiCalendar, FiStar, FiUser, FiClock } from 'react-icons/fi';
import Sidebar from './Sidebar';

export default function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    // Đóng sidebar khi nhấp chuột bên ngoài nó
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isSidebarOpen]);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} sidebarRef={sidebarRef} />

            {/* Nút menu cho mobile */}
            <div className="md:hidden">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="m-2 p-2 rounded bg-gray-800 text-white focus:outline-none">
                    <FiMenu size={24} />
                </button>
            </div>

            {/* Nội dung chính */}
            <div className="flex-1 p-10 space-y-6">
                <h1 className="text-2xl font-bold">Bảng điều khiển quản trị viên</h1>

                {/* Lưới thống kê và thông tin */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Thống kê thư viện */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <FiBook className="text-blue-500 text-3xl mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Thống kê thư viện</h2>
                            <p><FiBook className="inline-block mr-2" />Sách: 1200</p>
                            <p><FiUsers className="inline-block mr-2" />Thành viên: 300</p>
                            <p><FiArchive className="inline-block mr-2" />Mượn sách: 150</p>
                        </div>
                    </div>

                    {/* Hoạt động gần đây */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <FiActivity className="text-green-500 text-3xl mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Hoạt động gần đây</h2>
                            <ul className="list-disc list-inside">
                                <li>John Doe đã mượn <strong>"The Great Gatsby"</strong></li>
                                <li>Jane Smith đã trả <strong>"1984"</strong></li>
                                <li>Thành viên mới đã đăng ký: <strong>Sarah Lee</strong></li>
                            </ul>
                        </div>
                    </div>

                    {/* Tùy chọn quản lý */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Tùy chọn quản lý</h2>
                        <button className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 flex items-center">
                            <FiPlus className="mr-2" />Thêm sách mới
                        </button>
                        <button className="w-full text-left px-4 py-2 mt-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 flex items-center">
                            <FiUserPlus className="mr-2" />Đăng ký thành viên mới
                        </button>
                    </div>
                    
                    {/* Thông báo thư viện */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <FiBell className="text-yellow-500 text-3xl mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Thông báo thư viện</h2>
                            <p><FiCalendar className="inline-block mr-2" />Sách mới sẽ về vào tuần tới!</p>
                            <p><FiCalendar className="inline-block mr-2" />Thư viện sẽ đóng cửa để bảo trì vào thứ Sáu.</p>
                        </div>
                    </div>

                    {/* Sự kiện sắp tới */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <FiCalendar className="text-purple-500 text-3xl mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Sự kiện sắp tới</h2>
                            <p>Hội chợ sách - 25 Tháng 8</p>
                            <p>Gặp gỡ tác giả - 10 Tháng 9</p>
                        </div>
                    </div>

                    {/* Phản hồi của người dùng */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <FiUsers className="text-red-500 text-3xl mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Phản hồi của người dùng</h2>
                            <p>"Bộ sưu tập sách rất tuyệt vời!"</p>
                            <p>"Nhân viên thân thiện và môi trường sạch sẽ."</p>
                        </div>
                    </div>

                    {/* Sách nổi bật */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <FiStar className="text-yellow-500 text-3xl mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Sách nổi bật</h2>
                            <ul className="list-disc list-inside">
                                <li><strong>"To Kill a Mockingbird"</strong> - Harper Lee</li>
                                <li><strong>"Pride and Prejudice"</strong> - Jane Austen</li>
                                <li><strong>"1984"</strong> - George Orwell</li>
                            </ul>
                        </div>
                    </div>

                    {/* Những người độc giả tích cực */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <FiUser className="text-teal-500 text-3xl mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Những người độc giả tích cực</h2>
                            <ul className="list-disc list-inside">
                                <li><strong>Maria Nguyen</strong> - Đọc 25 cuốn sách trong năm</li>
                                <li><strong>Hanh Pham</strong> - Tham gia 10 sự kiện của thư viện</li>
                                <li><strong>Minh Tran</strong> - Đóng góp 15 đánh giá sách</li>
                            </ul>
                        </div>
                    </div>

                    {/* Danh sách sinh viên đang chờ phê duyệt đọc sách trực tuyến */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <FiClock className="text-orange-500 text-3xl mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Chờ phê duyệt đọc sách</h2>
                            <ul className="list-disc list-inside">
                                <li><strong>Nguyen Thi Mai</strong> - Đang chờ phê duyệt</li>
                                <li><strong>Tran Van An</strong> - Đang chờ phê duyệt</li>
                                <li><strong>Le Thi Hoa</strong> - Đang chờ phê duyệt</li>
                                <li><strong>Vu Van Nam</strong> - Đang chờ phê duyệt</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
