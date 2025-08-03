// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  
  // User
  USER_STATS: `${API_BASE_URL}/api/user/stats`,
  USER_SAVED_COLLEGES: `${API_BASE_URL}/api/user/saved-colleges`,
  USER_SAVE_COLLEGE: `${API_BASE_URL}/api/user/save-college`,
  USER_REMOVE_COLLEGE: `${API_BASE_URL}/api/user/remove-college`,
  
  // Aptitude
  APTITUDE_QUESTIONS: `${API_BASE_URL}/api/aptitude/questions`,
  APTITUDE_SUBMIT: `${API_BASE_URL}/api/aptitude/submit`,
  APTITUDE_HISTORY: `${API_BASE_URL}/api/aptitude/history`,
  
  // Colleges
  COLLEGES: `${API_BASE_URL}/api/colleges`,
  COLLEGES_FILTERS: `${API_BASE_URL}/api/colleges/filters`,
  
  // Admin
  ADMIN_DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,
  ADMIN_USERS: `${API_BASE_URL}/api/admin/users`,
  ADMIN_USER_TOGGLE: `${API_BASE_URL}/api/admin/users`,
  ADMIN_QUESTIONS: `${API_BASE_URL}/api/admin/questions`,
  ADMIN_COLLEGES: `${API_BASE_URL}/api/admin/colleges`,
  ADMIN_TEST_RESULTS: `${API_BASE_URL}/api/admin/test-results`,
};

export default API_BASE_URL; 