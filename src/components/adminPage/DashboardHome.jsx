import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { FiActivity, FiDollarSign, FiShoppingCart, FiUser, FiUsers, FiBook, FiBookOpen } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dữ liệu mẫu cho biểu đồ
const chartData = [
    { name: 'Th1', value: 2800 },
    { name: 'Th2', value: 2200 },
    { name: 'Th3', value: 1800 },
    { name: 'Th4', value: 2800 },
    { name: 'Th5', value: 5900 },
    { name: 'Th6', value: 2700 },
    { name: 'Th7', value: 1600 },
    { name: 'Th8', value: 5200 },
    { name: 'Th9', value: 3700 },
    { name: 'Th10', value: 3400 },
    { name: 'Th11', value: 1400 },
    { name: 'Th12', value: 5400 },
];

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
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Tổng quan</h2>
                    <ChartJSBarChart data={chartData} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Độc giả tích cực</h2>
                    <p className="text-sm text-gray-500 mb-4">Top độc giả đã đọc/mượn nhiều sách nhất tháng này.</p>
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
