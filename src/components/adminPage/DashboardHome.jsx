import React, { useState } from 'react';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FiActivity, FiUsers, FiBook, FiBookOpen, FiUser } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dữ liệu mẫu cho các năm
const yearlyData = {
    2022: [
        { name: 'Th1', value: 100 },
        { name: 'Th2', value: 200 },
        { name: 'Th3', value: 300 },
        { name: 'Th4', value: 400 },
        { name: 'Th5', value: 500 },
        { name: 'Th6', value: 600 },
        { name: 'Th7', value: 700 },
        { name: 'Th8', value: 800 },
        { name: 'Th9', value: 900 },
        { name: 'Th10', value: 1000 },
        { name: 'Th11', value: 1100 },
        { name: 'Th12', value: 1200 },
    ],
    2023: [
        { name: 'Th1', value: 150 },
        { name: 'Th2', value: 250 },
        { name: 'Th3', value: 350 },
        { name: 'Th4', value: 450 },
        { name: 'Th5', value: 550 },
        { name: 'Th6', value: 650 },
        { name: 'Th7', value: 750 },
        { name: 'Th8', value: 850 },
        { name: 'Th9', value: 950 },
        { name: 'Th10', value: 1050 },
        { name: 'Th11', value: 1150 },
        { name: 'Th12', value: 1250 },
    ],
    2024: [
        { name: 'Th1', value: 200 },
        { name: 'Th2', value: 300 },
        { name: 'Th3', value: 400 },
        { name: 'Th4', value: 500 },
        { name: 'Th5', value: 600 },
        { name: 'Th6', value: 700 },
        { name: 'Th7', value: 800 },
        { name: 'Th8', value: 900 },
        { name: 'Th9', value: 1000 },
        { name: 'Th10', value: 1100 },
        { name: 'Th11', value: 1200 },
        { name: 'Th12', value: 1300 },
    ],
};

const StatCard = ({ title, value, icon: Icon, change }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#0b328f]">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <Icon className="text-gray-400 w-5 h-5" />
        </div>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className={`text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change}
        </p>
    </div>
);

const RecentReaderItem = ({ name, email, booksRead }) => (
    <div className="flex items-center justify-between py-3">
        <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-300 rounded-full mr-3 flex items-center justify-center"><FiUser className="w-6 h-6" /></div>
            <div>
                <p className="font-medium text-sm text-gray-900">{name}</p>
                <p className="text-xs text-gray-500">{email}</p>
            </div>
        </div>
        <p className="font-medium text-sm text-gray-900">{booksRead} cuốn</p>
    </div>
);

const ChartJSBarChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.name),
        datasets: [
            {
                label: 'Lượt truy cập trang',
                data: data.map(item => item.value),
                backgroundColor: 'rgba(11, 50, 143, 0.5)',
                borderColor: 'rgb(11, 50, 143)',
                borderWidth: 1,
                borderRadius: 6,
                borderSkipped: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20,
                },
            },
            title: {
                display: true,
                text: 'Tổng quan lượt truy cập trang',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                backgroundColor: 'white',
                titleColor: '#0b328f',
                bodyColor: '#0b328f',
                borderColor: '#f2a429',
                borderWidth: 1,
                cornerRadius: 6,
                displayColors: false,
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.1)',
                },
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default function DashboardHome() {
    const [selectedYear, setSelectedYear] = useState(2024);

    return (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-orange-50 rounded-md">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Tổng quan</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Tổng số sách"
                        value="45.231"
                        icon={FiBook}
                        change="+201 cuốn so với tháng trước"
                    />
                    <StatCard
                        title="Độc giả mới"
                        value="+350"
                        icon={FiUsers}
                        change="+18,1% so với tháng trước"
                    />
                    <StatCard
                        title="Lượt mượn sách"
                        value="+1.234"
                        icon={FiBookOpen}
                        change="+19% so với tháng trước"
                    />
                    <StatCard
                        title="Đang hoạt động"
                        value="+573"
                        icon={FiActivity}
                        change="+201 so với giờ trước"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Tổng quan</h2>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            className="border border-gray-300 rounded-md p-2"
                        >
                            <option value={2022}>2022</option>
                            <option value={2023}>2023</option>
                            <option value={2024}>2024</option>
                        </select>
                    </div>
                    <ChartJSBarChart data={yearlyData[selectedYear]} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Sinh viên tích cực</h2>
                    <p className="text-sm text-gray-500 mb-4">Đã đọc nhiều sách nhất tháng này.</p>
                    <div className="space-y-4">
                        <RecentReaderItem name="Nguyễn Thị Hoa" email="hoa.nguyen@email.com" booksRead={15} />
                        <RecentReaderItem name="Trần Văn Nam" email="nam.tran@email.com" booksRead={12} />
                        <RecentReaderItem name="Lê Thị Lan" email="lan.le@email.com" booksRead={10} />
                        <RecentReaderItem name="Phạm Minh Tuấn" email="tuan.pham@email.com" booksRead={8} />
                        <RecentReaderItem name="Đỗ Thị Mai" email="mai.do@email.com" booksRead={7} />
                    </div>
                </div>
            </div>
        </div>
    );
}
