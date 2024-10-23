import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CategoryManagement from './categories/CategoryManagement';
import DashboardHome from './DashboardHome';
import DashboardLayout from './DashboardLayout';
import Document from './documents/Document';
import UserManagement from './users/UserManagement';

export default function Dashboard() {
    const currentUser = {
        name: 'Admin Name',
        email: 'admin@example.com'
    };

    const handleLogout = () => {
        // Xử lý đăng xuất ở đây
        console.log('Đăng xuất');
    };

    return (
        <Routes>
            <Route element={<DashboardLayout currentUser={currentUser} onLogout={handleLogout} />}>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<DashboardHome />} />
                <Route path="documents" element={<Document />} />
                <Route path="categories" element={<CategoryManagement />} />
                <Route path="users" element={<UserManagement />} />
            </Route>
        </Routes>
    );
}
