import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Category from './components/Category';
import UserManagement from './components/UserManagement';
import Document from './components/Document';
import HomePage from './components/HomePage';
import Login from './components/Login';
import ClientPage from './components/ClientPage';
import Register from './components/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/library/home" />} />
      <Route path='/library/home' element={<HomePage />} />
      <Route path='/library/login' element={<Login />} />
      <Route path='/library/register' element={<Register />} />
      {/* client */}
      <Route path='/library/client' element={<ClientPage />} />
      {/* admin */}
      <Route path='/dashboard/home' element={<Dashboard />} />
      <Route path='/dashboard/categories' element={<Category />} />
      <Route path='/dashboard/users' element={<UserManagement />} />
      <Route path='/dashboard/documents' element={<Document />} />
    </Routes>
  );
}

export default App;
