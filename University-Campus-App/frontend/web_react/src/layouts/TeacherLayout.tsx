import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBarChart2, FiBook, FiUsers, FiCheckSquare, FiBell, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

type TeacherLayoutProps = {
  children: React.ReactNode;
};

function TeacherLayout({ children }: TeacherLayoutProps) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const teacherMenuItems = [
    { name: 'Overview', icon: FiBarChart2, path: '/teacher' },
    { name: 'My Courses', icon: FiBook, path: '/teacher/courses' },
    { name: 'My Students', icon: FiUsers, path: '/teacher/students' },
    { name: 'Attendance', icon: FiCheckSquare, path: '/teacher/attendance' },
  ];

  return (
    <div className="flex h-screen bg-amber-50">
      {/* Teacher Sidebar - Orange */}
      <aside
        className={`${
          sidebarOpen ? 'w-72' : 'w-20'
        } bg-gradient-to-b from-orange-700 to-orange-800 text-white shadow-2xl transition-all duration-300`}
      >
        <div className="p-6 border-b border-orange-600">
          <h1 className={`${sidebarOpen ? 'text-2xl' : 'text-lg'} font-bold bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent transition-all`}>
            {sidebarOpen ? 'Teacher Hub' : 'TH'}
          </h1>
        </div>

        <nav className="mt-8 space-y-2 px-4">
          {teacherMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-orange-600/50 transition text-orange-100 hover:text-white group"
              >
                <Icon size={22} className="group-hover:scale-110 transition" />
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-3 rounded-lg bg-orange-600/30 hover:bg-orange-500/50 transition text-orange-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Teacher Navbar */}
        <nav className="bg-gradient-to-r from-orange-600 to-orange-700 border-b border-orange-500 shadow-lg">
          <div className="px-8 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Teacher Dashboard</h2>
            <div className="flex items-center gap-6">
              <button className="relative text-orange-100 hover:text-white transition">
                <FiBell size={24} />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="flex items-center gap-3">
                <span className="text-sm text-orange-100">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/40 transition"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-amber-50">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default TeacherLayout;
