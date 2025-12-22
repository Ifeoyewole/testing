import React, { useState } from 'react';
import { FiBook, FiUsers, FiCheckSquare, FiBarChart2, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const tabs = [
  { id: 'overview', label: 'Overview', icon: FiBarChart2 },
  { id: 'courses', label: 'My Courses', icon: FiBook },
  { id: 'students', label: 'Students', icon: FiUsers },
  { id: 'assignments', label: 'Assignments', icon: FiCheckSquare },
] as const;

type TabId = (typeof tabs)[number]['id'];

type StatCard = {
  label: string;
  value: string;
  icon: React.ComponentType<{ size?: number | string }>;
  color: string;
};

function TeacherDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats: StatCard[] = [
    { label: 'My Students', value: '145', icon: FiUsers, color: 'from-blue-500 to-blue-600' },
    { label: 'Classes Today', value: '3', icon: FiBook, color: 'from-green-500 to-green-600' },
    { label: 'Pending Submissions', value: '23', icon: FiCheckSquare, color: 'from-purple-500 to-purple-600' },
    { label: 'Avg Attendance', value: '88%', icon: FiBarChart2, color: 'from-yellow-500 to-yellow-600' },
  ];

  return (
    <div className="min-h-screen text-white">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Teacher Dashboard
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
                    ? 'border-green-500 text-green-400'
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
                <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
                <div className="space-y-4">
                  {[
                    { time: '9:00 - 10:30', course: 'Database Systems', room: 'Lab 201', students: 45 },
                    { time: '11:00 - 12:30', course: 'Web Development', room: 'Lab 202', students: 38 },
                    { time: '2:00 - 3:30', course: 'Advanced SQL', room: 'Lab 203', students: 32 },
                  ].map((class_) => (
                    <div key={`${class_.course}-${class_.time}`} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{class_.course}</p>
                          <p className="text-sm text-gray-400 mt-1">{class_.time} • {class_.room}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                          {class_.students} students
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition font-semibold">
                    Post Assignment
                  </button>
                  <button className="w-full px-4 py-3 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition font-semibold">
                    Mark Attendance
                  </button>
                  <button className="w-full px-4 py-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition font-semibold">
                    Grade Submissions
                  </button>
                  <button className="w-full px-4 py-3 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition font-semibold">
                    View Reports
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Database Systems', students: 45, section: 'A', semester: 'Fall 2025' },
                { name: 'Web Development', students: 38, section: 'B', semester: 'Fall 2025' },
                { name: 'Advanced SQL', students: 32, section: 'A', semester: 'Fall 2025' },
              ].map((course) => (
                <div key={course.name} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/30 transition">
                  <h4 className="font-semibold text-lg mb-3">{course.name}</h4>
                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <p>Section: {course.section}</p>
                    <p>Students: {course.students}</p>
                    <p>Semester: {course.semester}</p>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition font-semibold text-sm">
                    Manage Course
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'students' && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Student List</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Student ID</th>
                      <th className="text-left py-3 px-4">Attendance</th>
                      <th className="text-left py-3 px-4">GPA</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'John Doe', id: 'STU001', attendance: '92%', gpa: '3.8' },
                      { name: 'Jane Smith', id: 'STU002', attendance: '88%', gpa: '3.5' },
                      { name: 'Bob Wilson', id: 'STU003', attendance: '85%', gpa: '3.2' },
                      { name: 'Alice Brown', id: 'STU004', attendance: '78%', gpa: '2.9' },
                    ].map((student) => (
                      <tr key={student.id} className="border-b border-white/10 hover:bg-white/5 transition">
                        <td className="py-3 px-4">{student.name}</td>
                        <td className="py-3 px-4 text-gray-400">{student.id}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            parseFloat(student.attendance) >= 85
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {student.attendance}
                          </span>
                        </td>
                        <td className="py-3 px-4">{student.gpa}</td>
                        <td className="py-3 px-4">
                          <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Submissions</h3>
              <div className="space-y-4">
                {[
                  { title: 'Project 1: Database Design', submitted: 42, pending: 3, course: 'Database Systems' },
                  { title: 'Lab 3: Web Forms', submitted: 38, pending: 0, course: 'Web Development' },
                  { title: 'Quiz 5', submitted: 45, pending: 0, course: 'Database Systems' },
                ].map((assignment) => (
                  <div key={assignment.title} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{assignment.title}</p>
                        <p className="text-sm text-gray-400 mt-1">{assignment.course}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-400">{assignment.submitted} Submitted</p>
                        {assignment.pending > 0 && (
                          <p className="text-sm text-yellow-400">{assignment.pending} Pending</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
