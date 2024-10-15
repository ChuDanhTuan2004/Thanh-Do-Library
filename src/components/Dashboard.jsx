import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Document from './Document';
import Category from './Category';
import UserManagement from './UserManagement';
import DashboardHome from './DashboardHome'

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
                <Route path="categories" element={<Category />} />
                <Route path="users" element={<UserManagement />} />
            </Route>
        </Routes>
    );
}
