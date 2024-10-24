import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            toast.warning('Vui lòng đăng nhập!');
            navigate('/library/login');
        } else if (!allowedRoles.includes(userRole)) {
            toast.warning('Bạn không có quyền truy cập trang này');
            navigate('/library/home');
        }
    }, [token, userRole, allowedRoles, navigate]);

    if (!token || !allowedRoles.includes(userRole)) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
