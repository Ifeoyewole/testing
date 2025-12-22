import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiCheckSquare, FiCalendar, FiBook, FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

type StudentLayoutProps = {
  children: React.ReactNode;
};

function StudentLayout({ children }: StudentLayoutProps) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const studentMenuItems = [
    { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
    { name: 'Attendance', icon: FiCheckSquare, path: '/attendance' },
    { name: 'Timetable', icon: FiCalendar, path: '/timetable' },
    { name: 'Courses', icon: FiBook, path: '/events' },
    { name: 'Notifications', icon: FiBell, path: '/notifications' },
    { name: 'Profile', icon: FiUser, path: '/profile' },
  ];

  return (
    <div className="flex h-screen bg-emerald-50">
      {/* Student Sidebar - Green */}
      <aside className="w-64 bg-gradient-to-b from-emerald-700 to-emerald-800 text-white shadow-lg">
        <div className="p-6 border-b border-emerald-600">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
            Student Portal
          </h1>
        </div>

        <nav className="mt-8 space-y-1 px-4">
          {studentMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-emerald-100 hover:bg-emerald-600/50 hover:text-white transition group"
              >
                <Icon size={20} className="group-hover:scale-110 transition" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Student Navbar */}
        <nav className="bg-gradient-to-r from-emerald-600 to-teal-600 border-b border-emerald-500 shadow-md">
          <div className="px-8 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">My Learning Journey</h2>
            <div className="flex items-center gap-6">
              <button className="relative text-emerald-100 hover:text-white transition">
                <FiBell size={24} />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></span>
              </button>
              <div className="flex items-center gap-3">
                <span className="text-sm text-emerald-100">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/30 text-orange-100 hover:bg-orange-600/40 transition"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-emerald-50">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default StudentLayout;
