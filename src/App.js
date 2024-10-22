import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import Login from './components/Login';
import ClientPage from './components/clientPage/ClientPage';
import Register from './components/Register';
import ProtectedRoute from './services/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/library/home" />} />
      <Route path='/library/home' element={<HomePage />} />
      <Route path='/library/login' element={<Login />} />
      <Route path='/library/register' element={<Register />} />
      {/* client */}
      <Route
        path='/library/client'
        element={
          <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
            <ClientPage />
          </ProtectedRoute>
        } 
      />
      {/* admin */}
      <Route
        path='/dashboard/*'
        element={
          <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
