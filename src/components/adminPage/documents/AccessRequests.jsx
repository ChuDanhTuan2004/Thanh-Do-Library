import React, { useEffect, useState } from 'react';
import { FiCheck, FiX, FiSearch } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosSupport from '../../../services/axiosSupport';

const axios = new AxiosSupport();

export default function AccessRequests() {
    // Xóa fakeRequests và thay đổi state
    const [requests, setRequests] = useState([]);
    const [searchParams, setSearchParams] = useState({
        username: '',
        bookTitle: '',
        status: '',
    });
    const [currentPage, setCurrentPage] = useState(0); // Đổi thành 0 vì API bắt đầu từ 0
    const [itemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [currentRequestId, setCurrentRequestId] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, [currentPage]);

    const fetchRequests = async () => {
        try {
            const queryParams = new URLSearchParams({
                page: currentPage,
                size: itemsPerPage,
                ...(searchParams.username && { username: searchParams.username }),
                ...(searchParams.bookTitle && { bookTitle: searchParams.bookTitle }),
                ...(searchParams.status && { status: searchParams.status })
            });

            const response = await axios.fetchWithAuth('getAllRequests', {
                method: 'GET',
                params: queryParams
            });

            setRequests(response.content);
            setTotalPages(response.totalPages);
            setTotalElements(response.totalElements);
        } catch (error) {
            toast.error('Không thể tải danh sách yêu cầu!');
            console.error('Lỗi khi tải yêu cầu:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(0);
        fetchRequests();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleApprove = async (requestId) => {
        try {
            const currentUser = await axios.getCurrentUser(); // Lấy thông tin người dùng hiện tại
            await axios.processAccessRequest(
                requestId,
                currentUser.id, // librarianId
                true, // isApproved
                '' // không cần lý do từ chối khi phê duyệt
            );
            toast.success('Đã phê duyệt yêu cầu!');
            fetchRequests(); // Tải lại danh sách sau khi phê duyệt
        } catch (error) {
            toast.error('Không thể phê duyệt yêu cầu!');
            console.error('Lỗi khi phê duyệt:', error);
        }
    };

    const handleReject = async (requestId) => {
        setCurrentRequestId(requestId);
        setShowDialog(true);
    };

    const confirmReject = async () => {
        try {
            const currentUser = await axios.getCurrentUser();
            await axios.processAccessRequest(
                currentRequestId,
                currentUser.id,
                false,
                rejectionReason
            );
            toast.success('Đã từ chối yêu cầu!');
            fetchRequests();
        } catch (error) {
            toast.error('Không thể từ chối yêu cầu!');
            console.error('Lỗi khi từ chối:', error);
        } finally {
            setShowDialog(false);
            setRejectionReason('');
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            PENDING: 'bg-yellow-100 text-yellow-800',
            APPROVED: 'bg-green-100 text-green-800',
            REJECTED: 'bg-red-100 text-red-800'
        };
        const statusText = {
            PENDING: 'Chờ duyệt',
            APPROVED: 'Đã duyệt',
            REJECTED: 'Từ chối'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
                {statusText[status]}
            </span>
        );
    };

    return (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-orange-50 rounded-md shadow-lg">
            <div className="flex-1 space-y-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Quản lý yêu cầu truy cập sách
                </h1>

                {/* Form tìm kiếm */}
                <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Tên người dùng"
                            name="username"
                            value={searchParams.username}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Tên sách"
                            name="bookTitle"
                            value={searchParams.bookTitle}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            name="status"
                            value={searchParams.status}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Tất cả trạng thái</option>
                            <option value="PENDING">Chờ duyệt</option>
                            <option value="APPROVED">Đã duyệt</option>
                            <option value="REJECTED">Từ chối</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center">
                            <FiSearch className="mr-2" />
                            Tìm kiếm
                        </button>
                    </div>
                </form>

                {/* Bảng danh sách yêu cầu */}
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Người yêu cầu
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sách
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Lý do
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày yêu cầu
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {requests.map(request => (
                                <tr key={request.requestId} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {request.username}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {request.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">{request.bookTitle}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 max-w-xs overflow-hidden text-ellipsis">
                                            {request.reason}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(request.requestDate).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(request.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {request.status === 'PENDING' && (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleApprove(request.id)}
                                                    className="text-green-600 hover:text-green-900"
                                                >
                                                    <FiCheck className="inline-block mr-1" /> Duyệt
                                                </button>
                                                <button
                                                    onClick={() => handleReject(request.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <FiX className="inline-block mr-1" /> Từ chối
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang */}
                <div className="flex justify-between items-center mt-4 bg-white p-4 rounded-lg shadow-md">
                    <span className="text-sm text-gray-700">
                        Trang <span className="font-medium">{currentPage + 1}</span> trên{' '}
                        <span className="font-medium">{totalPages}</span>
                    </span>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handlePageChange(0)}
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            disabled={currentPage === 0}
                        >
                            &lt;&lt;
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            disabled={currentPage === 0}
                        >
                            &lt;
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            disabled={currentPage === totalPages - 1}
                        >
                            &gt;
                        </button>
                        <button
                            onClick={() => handlePageChange(totalPages - 1)}
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            disabled={currentPage === totalPages - 1}
                        >
                            &gt;&gt;
                        </button>
                    </div>
                </div>
            </div>

            {/* Dialog từ chối */}
            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Nhập lý do từ chối</h2>
                        <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            rows="6"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowDialog(false)}
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={confirmReject}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Từ chối
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}
