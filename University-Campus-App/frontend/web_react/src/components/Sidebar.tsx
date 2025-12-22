import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiCheckSquare, FiCalendar, FiMapPin, FiBell, FiUser } from 'react-icons/fi';
import { APP_NAME } from '../config/appConfig';

function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
    { name: 'Attendance', icon: FiCheckSquare, path: '/attendance' },
    { name: 'Timetable', icon: FiCalendar, path: '/timetable' },
    { name: 'Events', icon: FiMapPin, path: '/events' },
    { name: 'Notifications', icon: FiBell, path: '/notifications' },
    { name: 'Profile', icon: FiUser, path: '/profile' },
  ];

  return (
    <aside className="w-64 bg-gray-900/90 backdrop-blur text-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold">{APP_NAME}</h1>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-6 py-3 text-gray-200 hover:bg-gray-800 hover:text-white transition"
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
