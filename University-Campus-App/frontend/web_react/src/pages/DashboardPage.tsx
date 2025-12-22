import React from 'react';
import AttendanceCard from '../components/AttendanceCard';
import EventCard from '../components/EventCard';

type AttendanceItem = {
  subject: string;
  attended: number;
  total: number;
};

type EventItem = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
};

function DashboardPage() {
  const attendanceData: AttendanceItem[] = [
    { subject: 'Database Systems', attended: 18, total: 20 },
    { subject: 'Web Development', attended: 19, total: 20 },
    { subject: 'Data Structures', attended: 15, total: 20 },
  ];

  const upcomingEvents: EventItem[] = [
    {
      id: 1,
      title: 'Guest Lecture: AI in Education',
      description: 'Hear from industry experts about AI applications',
      date: '2025-12-20',
      time: '2:00 PM',
      location: 'Auditorium A',
      attendees: 156,
    },
    {
      id: 2,
      title: 'Programming Workshop',
      description: 'Learn advanced React patterns and best practices',
      date: '2025-12-22',
      time: '10:00 AM',
      location: 'Lab 2',
      attendees: 45,
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome Back!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-gray-100 text-sm font-semibold mb-2">Attendance Rate</h3>
          <p className="text-4xl font-bold">84%</p>
          <p className="text-blue-100 text-sm mt-2">Excellent performance</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-gray-100 text-sm font-semibold mb-2">Current Courses</h3>
          <p className="text-4xl font-bold">6</p>
          <p className="text-green-100 text-sm mt-2">This semester</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-gray-100 text-sm font-semibold mb-2">Upcoming Events</h3>
          <p className="text-4xl font-bold">12</p>
          <p className="text-purple-100 text-sm mt-2">This month</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Attendance Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attendanceData.map((item) => (
            <AttendanceCard
              key={item.subject}
              subject={item.subject}
              attended={item.attended}
              total={item.total}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
