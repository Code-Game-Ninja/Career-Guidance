import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { 
  Users, 
  Building2, 
  BookOpen, 
  TrendingUp,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus,
  Loader2,
  Activity
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AdminAnalytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/dashboard');
      setAnalytics(response.data.data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Sample data for charts (in real app, this would come from the backend)
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Users',
        data: [12, 19, 15, 25, 22, 30, 28, 35, 40, 38, 45, 50],
        backgroundColor: 'rgba(147, 51, 234, 0.8)',
        borderColor: 'rgba(147, 51, 234, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Active Users',
        data: [8, 15, 12, 20, 18, 25, 22, 28, 32, 30, 35, 40],
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
        borderColor: 'rgba(236, 72, 153, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };

  const testCompletionData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        label: 'Test Completion Rate (%)',
        data: [65, 72, 68, 75, 82, 78, 85, 88],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#374151',
          font: {
            size: 12,
            weight: 'bold'
          },
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(147, 51, 234, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        padding: 12
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
          drawBorder: false
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
          drawBorder: false
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11
          }
        }
      }
    }
  };

  const lineChartOptions = {
    ...chartOptions,
    scales: {
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
          drawBorder: false
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11
          }
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
          drawBorder: false
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11
          },
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-300 text-lg font-medium">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gray-100/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-gray-200/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-16 w-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-orange-600">
                  Analytics & Reports
                </h1>
                <p className="text-gray-600 text-lg">System statistics and performance metrics</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Last updated</p>
              <p className="text-sm font-medium text-gray-900">{formatDate(new Date())}</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Total Users</p>
                <p className="text-2xl font-bold text-white">{analytics?.stats?.totalUsers || 3}</p>
                <p className="text-xs text-green-400">+12% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Tests Taken</p>
                <p className="text-2xl font-bold text-white">{analytics?.stats?.totalTests || 6}</p>
                <p className="text-xs text-green-400">+8% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-pink-500 to-magenta-600 rounded-xl shadow-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Colleges</p>
                <p className="text-2xl font-bold text-white">{analytics?.stats?.totalColleges || 999}</p>
                <p className="text-xs text-green-400">+5% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Active Users</p>
                <p className="text-2xl font-bold text-white">{analytics?.stats?.activeUsers || 0}</p>
                <p className="text-xs text-green-400">+15% from last month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth Chart */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">User Growth</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">New Users</span>
                <div className="w-3 h-3 bg-pink-500 rounded-full ml-4"></div>
                <span className="text-sm text-gray-600">Active Users</span>
              </div>
            </div>
            <div className="h-80">
              <Bar data={userGrowthData} options={chartOptions} />
            </div>
          </div>

          {/* Test Completion Rate Chart */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Test Completion Rate</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Completion Rate</span>
              </div>
            </div>
            <div className="h-80">
              <Line data={testCompletionData} options={lineChartOptions} />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Admin User</p>
                  <p className="text-sm text-gray-600">New user registration</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">270%</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Test Completed</p>
                  <p className="text-sm text-gray-600">Aptitude test finished</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-blue-600">85%</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">College Added</p>
                  <p className="text-sm text-gray-600">New college information</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-purple-600">New</p>
                <p className="text-xs text-gray-500">30 minutes ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Test Results Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50 mt-8 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Test Results</h2>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
              View All Results
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {analytics?.recentTests?.slice(0, 5).map((test) => (
                  <tr key={test._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{test.userId?.name || 'Unknown User'}</p>
                        <p className="text-sm text-gray-600">{test.userId?.email || 'No email'}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        test.score >= 80 ? 'bg-green-100 text-green-800' :
                        test.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {test.score}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{formatDate(test.createdAt)}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        Completed
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 bg-gray-100 rounded-lg hover:scale-110 transition-all duration-300">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 bg-gray-100 rounded-lg hover:scale-110 transition-all duration-300">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics; 