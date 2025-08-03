import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Get API base URL from environment or use default
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Configure axios defaults and interceptors
  useEffect(() => {
    // Set default base URL
    axios.defaults.baseURL = API_BASE_URL;
    
    // Set default headers
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }

    // Add response interceptor for handling 401 errors
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Clear invalid token
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          delete axios.defaults.headers.common['Authorization'];
          
          // Only show toast if it's not a background check
          if (error.config.url !== '/api/auth/me') {
            toast.error('Session expired. Please login again.');
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [token, API_BASE_URL]);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/auth/me');
          if (response.data.success && response.data.data?.user) {
            setUser(response.data.data.user);
          } else {
            console.error('Invalid user data received');
            logout();
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          // Don't show toast for background auth checks
          if (error.response?.status === 401) {
            logout();
          }
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      if (response.data.success && response.data.data) {
        const { user: userData, token: authToken } = response.data.data;
        
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('token', authToken);
        
        toast.success('Login successful!');
        return { success: true };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post('/api/auth/signup', {
        name,
        email,
        password
      });

      if (response.data.success && response.data.data) {
        const { user: userData, token: authToken } = response.data.data;
        
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('token', authToken);
        
        toast.success('Account created successfully!');
        return { success: true };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/admin-login', {
        email,
        password
      });

      if (response.data.success && response.data.data) {
        const { user: userData, token: authToken } = response.data.data;
        
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('token', authToken);
        
        toast.success('Admin login successful!');
        return { success: true };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Admin login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Logged out successfully');
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('/api/user/profile', profileData);
      if (response.data.success && response.data.data?.user) {
        setUser(response.data.data.user);
        toast.success('Profile updated successfully!');
        return { success: true };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    adminLogin,
    logout,
    updateProfile,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 