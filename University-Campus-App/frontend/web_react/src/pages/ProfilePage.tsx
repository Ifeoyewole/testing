import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2 } from 'react-icons/fi';

type Profile = {
  name: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  year: string;
  location: string;
  bio: string;
  joinDate: string;
};

function ProfilePage() {
  const [profile] = useState<Profile>({
    name: 'John Doe',
    email: 'john.doe@university.edu',
    phone: '+1 (555) 123-4567',
    studentId: 'STU-2025-001',
    department: 'Computer Science',
    year: 'Final Year',
    location: 'City, State',
    bio: 'Passionate about technology and learning new skills',
    joinDate: 'September 2021',
  });

  const [editMode, setEditMode] = useState(false);

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-6 items-start">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <FiUser className="text-white" size={48} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
                <p className="text-gray-600 text-lg">{profile.department}</p>
                <p className="text-gray-500 text-sm mt-1">Member since {profile.joinDate}</p>
              </div>
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <FiEdit2 size={18} />
              {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="border-t pt-4">
            <p className="text-gray-700">{profile.bio}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-2">Student ID</label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{profile.studentId}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
                  <FiMail size={16} /> Email Address
                </label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{profile.email}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
                  <FiPhone size={16} /> Phone Number
                </label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{profile.phone}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
                  <FiMapPin size={16} /> Location
                </label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{profile.location}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Academic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-2">Department</label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{profile.department}</p>
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-2">Current Year</label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{profile.year}</p>
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
            <button className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition border border-red-200">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
