import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './components/homePages/HomePage';
import Login from './components/Login';
import ClientPage from './components/clientPage/ClientPage';
import Register from './components/Register';
import ProtectedRoute from './services/ProtectedRoute';
import Dashboard from './components/adminPage/Dashboard';
import LibraryIntroduction from './components/homePages/LibraryIntroduction';
import ScientificResearchPaper from './components/homePages/ScientificResearchPaper';
import FeaturedCategories from './components/homePages/FeaturedCategories';
import BookSuggestion from './components/homePages/BookSuggestion';
import 'react-toastify/dist/ReactToastify.css';
import MyBookshelf from './components/clientPage/MyBookshelf';
import BookDetail from './components/clientPage/BookDetail';
import { UserProvider } from './services/UserContext';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/library/home" />} />
        <Route path='/library/home' element={<HomePage />} />
        <Route path='/library/login' element={<Login />} />
        <Route path='/library/register' element={<Register />} />
        {/* Thêm các route mới */}
        <Route path='/library/introduction' element={<LibraryIntroduction />} />
        <Route path='/library/research' element={<ScientificResearchPaper />} />
        <Route path='/library/categories' element={<FeaturedCategories />} />
        <Route path='/library/bookSuggestion' element={<BookSuggestion />} />
        {/* client */}
        <Route
          path='/library/client'
          element={
            <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
              <ClientPage />
            </ProtectedRoute>
          }
        >
          {/* Thêm route con cho MyBookshelf */}
          <Route path="myBookshelf" element={<MyBookshelf />} />

          {/* Route con cho trang chi tiết sách */}
          <Route path="book/:id" element={<BookDetail />} />
        </Route>
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
    </UserProvider>
  );
}

export default App;
