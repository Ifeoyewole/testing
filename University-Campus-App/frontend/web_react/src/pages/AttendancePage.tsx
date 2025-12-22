import React from 'react';
import AttendanceCard from '../components/AttendanceCard';

type SubjectAttendance = {
  subject: string;
  attended: number;
  total: number;
};

function AttendancePage() {
  const subjects: SubjectAttendance[] = [
    { subject: 'Database Systems', attended: 18, total: 20 },
    { subject: 'Web Development', attended: 19, total: 20 },
    { subject: 'Data Structures', attended: 15, total: 20 },
    { subject: 'Software Engineering', attended: 17, total: 18 },
    { subject: 'Cloud Computing', attended: 16, total: 20 },
    { subject: 'Mobile Development', attended: 14, total: 15 },
  ];

  const overallAttendance =
    (subjects.reduce((sum, s) => sum + s.attended, 0) /
      subjects.reduce((sum, s) => sum + s.total, 0)) *
    100;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Attendance Report</h1>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white mb-8">
        <h2 className="text-xl font-semibold mb-4">Overall Attendance</h2>
        <div className="flex items-end gap-4">
          <div>
            <p className="text-5xl font-bold">{overallAttendance.toFixed(1)}%</p>
            <p className="text-blue-100 text-sm mt-1">of all classes attended</p>
          </div>
          <div className="flex-1">
            <div className="w-full bg-blue-400 rounded-full h-4">
              <div
                className="h-4 bg-white rounded-full transition-all"
                style={{ width: `${overallAttendance}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((item) => (
          <AttendanceCard
            key={item.subject}
            subject={item.subject}
            attended={item.attended}
            total={item.total}
          />
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Attendance Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Excellent Attendance</p>
            <p className="text-3xl font-bold text-green-500">3</p>
            <p className="text-gray-500 text-sm">75% or higher</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Fair Attendance</p>
            <p className="text-3xl font-bold text-yellow-500">2</p>
            <p className="text-gray-500 text-sm">60-74%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Low Attendance</p>
            <p className="text-3xl font-bold text-red-500">1</p>
            <p className="text-gray-500 text-sm">Below 60%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendancePage;
