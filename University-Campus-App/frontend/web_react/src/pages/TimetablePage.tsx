import React from 'react';
import { FiMapPin, FiUser } from 'react-icons/fi';

type ClassItem = {
  time: string;
  subject: string;
  room: string;
  instructor: string;
};

type DaySchedule = {
  day: string;
  classes: ClassItem[];
};

function TimetablePage() {
  const timetable: DaySchedule[] = [
    {
      day: 'Monday',
      classes: [
        { time: '9:00 - 10:30', subject: 'Database Systems', room: 'Lab 201', instructor: 'Dr. Smith' },
        { time: '11:00 - 12:30', subject: 'Web Development', room: 'Lab 202', instructor: 'Prof. Johnson' },
      ],
    },
    {
      day: 'Tuesday',
      classes: [
        { time: '10:00 - 11:30', subject: 'Data Structures', room: 'Room 301', instructor: 'Dr. Williams' },
        { time: '2:00 - 3:30', subject: 'Software Engineering', room: 'Lab 203', instructor: 'Prof. Brown' },
      ],
    },
    {
      day: 'Wednesday',
      classes: [
        { time: '9:00 - 10:30', subject: 'Cloud Computing', room: 'Lab 204', instructor: 'Dr. Davis' },
        { time: '1:00 - 2:30', subject: 'Mobile Development', room: 'Lab 205', instructor: 'Prof. Miller' },
      ],
    },
    {
      day: 'Thursday',
      classes: [
        { time: '10:00 - 11:30', subject: 'Database Systems', room: 'Lab 201', instructor: 'Dr. Smith' },
        { time: '3:00 - 4:30', subject: 'Web Development', room: 'Lab 202', instructor: 'Prof. Johnson' },
      ],
    },
    {
      day: 'Friday',
      classes: [
        { time: '9:30 - 11:00', subject: 'Data Structures', room: 'Room 301', instructor: 'Dr. Williams' },
        { time: '2:00 - 3:30', subject: 'Cloud Computing', room: 'Lab 204', instructor: 'Dr. Davis' },
      ],
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Weekly Timetable</h1>

      <div className="space-y-6">
        {timetable.map((day) => (
          <div key={day.day} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4">
              <h2 className="text-xl font-semibold">{day.day}</h2>
            </div>
            
            <div className="divide-y">
              {day.classes.map((classItem) => (
                <div key={`${day.day}-${classItem.time}-${classItem.subject}`} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {classItem.subject}
                      </h3>
                      <div className="space-y-1 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Time:</span>
                          <span>{classItem.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiMapPin size={16} className="text-red-500" />
                          <span>{classItem.room}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiUser size={16} className="text-blue-500" />
                          <span>{classItem.instructor}</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimetablePage;
