import React from 'react';
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';

type Event = {
  id?: number | string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
};

type EventCardProps = {
  event: Event;
};

function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{event.description}</p>
      
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <FiCalendar size={16} className="text-blue-500" />
          <span>
            {event.date} at {event.time}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FiMapPin size={16} className="text-red-500" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiUsers size={16} className="text-green-500" />
          <span>{event.attendees} attending</span>
        </div>
      </div>

      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        Register Interest
      </button>
    </div>
  );
}

export default EventCard;
