import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2 } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(user?.name ?? '');
  const [editDepartment, setEditDepartment] = useState(user?.department ?? 'Computer Science');

  const handleSave = () => {
    updateProfile({ name: editName, department: editDepartment });
    setEditMode(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-6 items-start">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <FiUser className="text-white" size={48} />
                )}
              </div>
              <div>
                {editMode ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 outline-none bg-transparent"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-800">{user?.name ?? 'User'}</h1>
                )}
                {editMode ? (
                  <input
                    type="text"
                    value={editDepartment}
                    onChange={(e) => setEditDepartment(e.target.value)}
                    className="text-gray-600 text-lg border-b-2 border-blue-500 outline-none bg-transparent mt-1"
                  />
                ) : (
                  <p className="text-gray-600 text-lg">{user?.department ?? 'Department'}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">
                  Member since {user?.joinDate ? new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {editMode && (
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Save
                </button>
              )}
              <button
                onClick={() => {
                  if (editMode) {
                    setEditName(user?.name ?? '');
                    setEditDepartment(user?.department ?? 'Computer Science');
                  }
                  setEditMode(!editMode);
                }}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                <FiEdit2 size={18} />
                {editMode ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-gray-700">Passionate about technology and learning new skills</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  {user?.userType === 'teacher' ? 'Staff ID' : 'Student ID'}
                </label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">
                  {user?.studentId ?? user?.staffId ?? 'N/A'}
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
                  <FiMail size={16} /> Email Address
                </label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{user?.email ?? 'N/A'}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
                  <FiPhone size={16} /> Phone Number
                </label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">Not set</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
                  <FiMapPin size={16} /> Location
                </label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">Not set</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Academic Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-2">Department</label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{user?.department ?? 'Not set'}</p>
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-2">Role</label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg capitalize">{user?.userType ?? 'N/A'}</p>
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-2">Current GPA</label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">3.85 / 4.0</p>
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-2">Enrolled Courses</label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">6 courses</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>

          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition border border-gray-200">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition border border-gray-200">
              Privacy Settings
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition border border-gray-200">
              Notifications Preferences
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition border border-red-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
