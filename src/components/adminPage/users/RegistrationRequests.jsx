import React, { useState, useEffect } from 'react';
import { Check, X, Search } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import AxiosSupport from '../../../services/axiosSupport';
import { useNavigate } from 'react-router-dom';

export default function RegistrationRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const pageSize = 10;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const navigate = useNavigate();

    const axiosSupport = new AxiosSupport();

    const loadRequests = async () => {
        try {
            const response = await axiosSupport.fetchWithAuth('getPendingRegistrations', {
                method: 'GET',
                params: {
                    page: currentPage,
                    size: pageSize,
                    search: searchTerm
                }
            });
            
            // Cập nhật state với dữ liệu từ response
            if (response && response.users) {
                setRequests(response.users);
                setTotalPages(response.totalPages);
                setTotalItems(response.totalItems);
                setCurrentPage(response.currentPage);
            }
        } catch (error) {
            console.error('Lỗi khi tải yêu cầu đăng ký:', error);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRequests();
    }, [currentPage, searchTerm]);

    const handleApprove = async (userId) => {
        try {
            await axiosSupport.fetchWithAuth('approveRegistration', {
                method: 'PUT'
            }, userId);
            
            await loadRequests();
            toast.success('Phê duyệt tài khoản thành công!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error('Lỗi khi phê duyệt:', error);
            toast.error('Có lỗi xảy ra khi phê duyệt tài khoản!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const confirmAndApprove = (userId) => {
        setSelectedUserId(userId);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedUserId(null);
    };

    const handleConfirmApprove = () => {
        if (selectedUserId) {
            handleApprove(selectedUserId);
            handleCloseDialog();
        }
    };

    const handleReject = async (userId) => {
        try {
            await axiosSupport.fetchWithAuth('rejectRegistration', {
                method: 'POST',
                body: JSON.stringify({ approved: false })
            }, userId);
            await loadRequests();
            alert('Từ chối thành công!');
        } catch (error) {
            console.error('Lỗi khi từ chối:', error);
            alert('Có lỗi xảy ra khi từ chối!');
        }
    };

    if (loading) {
        return <div className="text-center p-6">Đang tải...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Quản lý yêu cầu đăng ký</h1>
            
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo email hoặc mã sinh viên..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
            </div>

            {requests.length === 0 ? (
                <div className="text-center text-gray-500">
                    Không có yêu cầu đăng ký nào
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left">Mã sinh viên</th>
                                    <th className="px-6 py-3 text-left">Email</th>
                                    <th className="px-6 py-3 text-center">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((user) => (
                                    <tr key={user.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">{user.username}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => confirmAndApprove(user.id)}
                                                className="mr-2 p-2 text-green-600 hover:bg-green-100 rounded-full transition duration-200"
                                                title="Phê duyệt"
                                            >
                                                <Check className="h-5 w-5" />
                                            </button>
                                            {/* <button
                                                onClick={() => handleReject(user.id)}
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                                                title="Từ chối"
                                            >
                                                <X className="h-5 w-5" />
                                            </button> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-4 flex justify-center">
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                    disabled={currentPage === 0}
                                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                                >
                                    Trước
                                </button>
                                <span className="px-4 py-2">
                                    Trang {currentPage + 1} / {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                    disabled={currentPage === totalPages - 1}
                                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                                >
                                    Sau
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-semibold mb-4">Xác nhận phê duyệt</h3>
                        <p className="mb-6">Bạn có chắc chắn muốn phê duyệt tài khoản này?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCloseDialog}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleConfirmApprove}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}