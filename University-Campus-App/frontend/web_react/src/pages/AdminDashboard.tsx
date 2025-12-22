import React, { useState } from 'react';
import { FiBarChart2, FiUsers, FiCheckSquare, FiSettings, FiCalendar, FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const tabs = [
  { id: 'overview', label: 'Overview', icon: FiBarChart2 },
  { id: 'users', label: 'User Management', icon: FiUsers },
  { id: 'attendance', label: 'Attendance', icon: FiCheckSquare },
  { id: 'settings', label: 'Settings', icon: FiSettings },
] as const;

type TabId = (typeof tabs)[number]['id'];

type StatCard = {
  label: string;
  value: string;
  icon: React.ComponentType<{ size?: number | string }>;
  color: string;
};

function AdminDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats: StatCard[] = [
    { label: 'Total Students', value: '1,250', icon: FiUsers, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Teachers', value: '85', icon: FiUsers, color: 'from-green-500 to-green-600' },
    { label: 'Active Courses', value: '156', icon: FiCalendar, color: 'from-purple-500 to-purple-600' },
    { label: 'Avg Attendance', value: '82%', icon: FiCheckSquare, color: 'from-yellow-500 to-yellow-600' },
  ];

  return (
    <div className="min-h-screen text-white">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className="text-white/40">
                    <Icon size={32} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-4 mb-8 border-b border-white/10 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { user: 'John Doe', action: 'Joined Course: Database Systems', time: '2 hours ago' },
                    { user: 'Jane Smith', action: 'Submitted Assignment', time: '4 hours ago' },
                    { user: 'Prof. Wilson', action: 'Created New Event', time: '1 day ago' },
                    { user: 'System', action: 'Attendance Report Generated', time: '1 day ago' },
                  ].map((activity) => (
                    <div key={`${activity.user}-${activity.time}`} className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                      <div>
                        <p className="font-medium">{activity.user}</p>
                        <p className="text-sm text-gray-400">{activity.action}</p>
                      </div>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition font-semibold">
                    Add New User
                  </button>
                  <button className="w-full px-4 py-3 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition font-semibold">
                    Create Course
                  </button>
                  <button className="w-full px-4 py-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition font-semibold">
                    Generate Reports
                  </button>
                  <button className="w-full px-4 py-3 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition font-semibold">
                    Send Notification
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">User Management</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'John Doe', email: 'john@uni.edu', role: 'Student', status: 'Active' },
                      { name: 'Jane Smith', email: 'jane@uni.edu', role: 'Teacher', status: 'Active' },
                      { name: 'Prof. Wilson', email: 'wilson@uni.edu', role: 'Teacher', status: 'Active' },
                      { name: 'Bob Johnson', email: 'bob@uni.edu', role: 'Student', status: 'Inactive' },
                    ].map((row) => (
                      <tr key={row.email} className="border-b border-white/10 hover:bg-white/5 transition">
                        <td className="py-3 px-4">{row.name}</td>
                        <td className="py-3 px-4 text-gray-400">{row.email}</td>
                        <td className="py-3 px-4">{row.role}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            row.status === 'Active'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Attendance Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-gray-400 text-sm mb-2">Overall Attendance Rate</p>
                  <p className="text-3xl font-bold">82.5%</p>
                  <div className="mt-4 w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: '82.5%' }}></div>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-gray-400 text-sm mb-2">Students Below 75%</p>
                  <p className="text-3xl font-bold text-red-400">127</p>
                  <p className="text-gray-400 text-sm mt-2">Need intervention</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-6">System Settings</h3>
              <div className="space-y-4">
                <div className="p-4 border border-white/10 rounded-lg">
                  <p className="font-semibold mb-2">Email Notifications</p>
                  <p className="text-gray-400 text-sm mb-3">Enable or disable email notifications for all users</p>
                  <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition">
                    Configure
                  </button>
                </div>
                <div className="p-4 border border-white/10 rounded-lg">
                  <p className="font-semibold mb-2">System Maintenance</p>
                  <p className="text-gray-400 text-sm mb-3">Schedule maintenance windows</p>
                  <button className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition">
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
