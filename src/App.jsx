import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Quiz from './pages/Quiz';
import Career from './pages/Career';
import Collage from './pages/Collage';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminQuestions from './pages/AdminQuestions';
import AdminColleges from './pages/AdminColleges';
import AdminUsers from './pages/AdminUsers';
import AdminAnalytics from './pages/AdminAnalytics';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 transition-colors duration-300">
            <Navbar />
            <main className="container mx-auto px-4 py-8 page-transition">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/quiz"
                  element={
                    <PrivateRoute>
                      <Quiz />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/career"
                  element={
                    <PrivateRoute>
                      <Career />
                    </PrivateRoute>
                  }
                />
                <Route path="/colleges" element={<Collage />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute adminOnly>
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/questions"
                  element={
                    <PrivateRoute adminOnly>
                      <AdminQuestions />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/colleges"
                  element={
                    <PrivateRoute adminOnly>
                      <AdminColleges />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <PrivateRoute adminOnly>
                      <AdminUsers />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/analytics"
                  element={
                    <PrivateRoute adminOnly>
                      <AdminAnalytics />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--surface-color)',
                  color: 'var(--text-primary)',
                  borderRadius: '12px',
                  padding: '16px',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-color)',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: 'var(--text-primary)',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: 'var(--text-primary)',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
