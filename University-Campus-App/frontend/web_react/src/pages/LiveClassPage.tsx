import React, { useState } from 'react';
import { FiVideo, FiUsers, FiClock } from 'react-icons/fi';
import ClassRoom from '../components/ClassRoom';

type LiveClass = {
  id: string;
  name: string;
  teacher: string;
  startTime: string;
  duration: string;
  studentsCount: number;
  isLive: boolean;
};

function LiveClassPage() {
  const [selectedClass, setSelectedClass] = useState<LiveClass | null>(null);
  const [isInClass, setIsInClass] = useState(false);

  // Mock data - replace with actual API call
  const liveClasses: LiveClass[] = [
    {
      id: 'class-1',
      name: 'Database Systems - Lecture 5',
      teacher: 'Dr. Johnson',
      startTime: '10:00 AM',
      duration: '2 hours',
      studentsCount: 156,
      isLive: true,
    },
    {
      id: 'class-2',
      name: 'Web Development - Lab Session',
      teacher: 'Prof. Smith',
      startTime: '2:00 PM',
      duration: '1.5 hours',
      studentsCount: 89,
      isLive: true,
    },
    {
      id: 'class-3',
      name: 'Machine Learning - Tutorial',
      teacher: 'Dr. Chen',
      startTime: '4:00 PM',
      duration: '1 hour',
      studentsCount: 203,
      isLive: false,
    },
  ];

  const handleJoinClass = (classItem: LiveClass) => {
    setSelectedClass(classItem);
    setIsInClass(true);
  };

  const handleLeaveClass = () => {
    setIsInClass(false);
    setSelectedClass(null);
  };

  // Mock function to get Livekit token
  const getLiveKitToken = async (roomName: string, userName: string) => {
    // In production, call your backend to generate a token
    // For now, return mock data
    return 'mock-token';
  };

  if (isInClass && selectedClass) {
    return (
      <div className="h-screen flex flex-col">
        <div className="bg-emerald-700 p-4 flex justify-between items-center">
          <div>
            <h2 className="text-white font-bold text-lg">{selectedClass.name}</h2>
            <p className="text-emerald-100 text-sm">Teacher: {selectedClass.teacher}</p>
          </div>
          <button
            onClick={handleLeaveClass}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
          >
            Leave Class
          </button>
        </div>

        <div className="flex-1">
          <ClassRoom
            roomName={selectedClass.id}
            userName="student-user" // Replace with actual user name
            token="your-livekit-token" // Replace with actual token from backend
            serverUrl="wss://your-livekit-server.com" // Replace with your Livekit server URL
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Live Classes</h1>
        <p className="text-gray-600">Join ongoing classes or see upcoming sessions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Live Now</p>
              <p className="text-3xl font-bold mt-1">
                {liveClasses.filter((c) => c.isLive).length}
              </p>
            </div>
            <FiVideo className="text-emerald-200" size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Students</p>
              <p className="text-3xl font-bold mt-1">
                {liveClasses.reduce((sum, c) => sum + c.studentsCount, 0)}
              </p>
            </div>
            <FiUsers className="text-blue-200" size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Today's Classes</p>
              <p className="text-3xl font-bold mt-1">{liveClasses.length}</p>
            </div>
            <FiClock className="text-purple-200" size={40} />
          </div>
        </div>
      </div>

      {/* Live Classes List */}
      <div className="space-y-4">
        {liveClasses.map((classItem) => (
          <div
            key={classItem.id}
            className={`bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-l-4 ${
              classItem.isLive
                ? 'border-green-500'
                : 'border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {classItem.name}
                  </h3>
                  {classItem.isLive && (
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                      LIVE
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FiUsers size={16} />
                    <span>{classItem.studentsCount} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock size={16} />
                    <span>{classItem.startTime} • {classItem.duration}</span>
                  </div>
                  <span className="text-gray-500">Teacher: {classItem.teacher}</span>
                </div>
              </div>

              <button
                onClick={() => handleJoinClass(classItem)}
                disabled={!classItem.isLive}
                className={`px-8 py-3 rounded-lg font-semibold transition ${
                  classItem.isLive
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {classItem.isLive ? 'Join Class' : 'Not Started'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-3">
          How to participate in live classes:
        </h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start gap-2">
            <span className="font-bold">1.</span>
            <span>Click "Join Class" to enter the live session</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">2.</span>
            <span>Watch the stream - you'll see the teacher and shared content</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">3.</span>
            <span>Raise your hand to request permission to speak</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">4.</span>
            <span>Wait for teacher approval before unmuting your microphone</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">5.</span>
            <span>You can turn your camera on/off at any time</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LiveClassPage;
