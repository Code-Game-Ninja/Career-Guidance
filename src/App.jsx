import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Career from './pages/Career';
import Collage from './pages/Collage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminQuestions from './pages/AdminQuestions';
import AdminColleges from './pages/AdminColleges';
import AdminUsers from './pages/AdminUsers';
import AdminAnalytics from './pages/AdminAnalytics';

import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    // Check if backend is accessible
    const checkBackend = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/health`);
        if (response.ok) {
          setBackendStatus('connected');
        } else {
          setBackendStatus('error');
        }
      } catch (error) {
        console.error('Backend connection error:', error);
        setBackendStatus('error');
      }
    };

    checkBackend();
  }, []);

  // Show loading or error state
  if (backendStatus === 'checking') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Career Guidance System</h2>
          <p className="text-gray-300">Connecting to backend services...</p>
        </div>
      </div>
    );
  }

  if (backendStatus === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Backend Connection Error</h2>
          <p className="text-gray-300 mb-6">
            Unable to connect to the backend services. This might be due to:
          </p>
          <ul className="text-gray-300 text-left mb-6 space-y-2">
            <li>• Backend authentication protection is enabled</li>
            <li>• Backend service is temporarily unavailable</li>
            <li>• Network connectivity issues</li>
          </ul>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-300">
              <strong>To fix this:</strong><br/>
              1. Go to Vercel Dashboard<br/>
              2. Select your backend project<br/>
              3. Go to Settings → Security<br/>
              4. Disable "Vercel Authentication"
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />
                <Route path="/career" element={<PrivateRoute><Career /></PrivateRoute>} />
                <Route path="/colleges" element={<PrivateRoute><Collage /></PrivateRoute>} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                <Route path="/admin/questions" element={<PrivateRoute><AdminQuestions /></PrivateRoute>} />
                <Route path="/admin/colleges" element={<PrivateRoute><AdminColleges /></PrivateRoute>} />
                <Route path="/admin/users" element={<PrivateRoute><AdminUsers /></PrivateRoute>} />
                <Route path="/admin/analytics" element={<PrivateRoute><AdminAnalytics /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
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
