import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiLogOut, FiUsers, FiBarChart2, FiCheckSquare, FiSettings, FiBell } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

type AdminLayoutProps = {
  children: React.ReactNode;
};

function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const adminMenuItems = [
    { name: 'Dashboard', icon: FiBarChart2, path: '/admin' },
    { name: 'User Management', icon: FiUsers, path: '/admin/users' },
    { name: 'Attendance', icon: FiCheckSquare, path: '/admin/attendance' },
    { name: 'Settings', icon: FiSettings, path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Admin Sidebar - Dark Blue */}
      <aside
        className={`${
          sidebarOpen ? 'w-72' : 'w-20'
        } bg-gradient-to-b from-blue-900 to-blue-950 text-white shadow-2xl transition-all duration-300`}
      >
        <div className="p-6 border-b border-blue-800">
          <h1 className={`${sidebarOpen ? 'text-2xl' : 'text-lg'} font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent transition-all`}>
            {sidebarOpen ? 'Admin Panel' : 'AP'}
          </h1>
        </div>

        <nav className="mt-8 space-y-2 px-4">
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-blue-800/50 transition text-blue-100 hover:text-white group"
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
            className="w-full flex items-center justify-center p-3 rounded-lg bg-blue-800/30 hover:bg-blue-700/50 transition text-blue-300"
          >
            <FiMenu size={20} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Navbar */}
        <nav className="bg-gradient-to-r from-blue-800 to-blue-900 border-b border-blue-700 shadow-lg">
          <div className="px-8 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
            <div className="flex items-center gap-6">
              <button className="relative text-blue-200 hover:text-white transition">
                <FiBell size={24} />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="flex items-center gap-3">
                <span className="text-sm text-blue-100">{user?.email}</span>
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
        <main className="flex-1 overflow-auto bg-slate-950">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
