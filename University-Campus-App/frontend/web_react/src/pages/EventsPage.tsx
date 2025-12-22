import React, { useState, useMemo } from 'react';
import EventCard from '../components/EventCard';

type EventCategory = 'all' | 'academic' | 'social';

type EventItem = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  category?: EventCategory;
};

function EventsPage() {
  const [filterCategory, setFilterCategory] = useState<EventCategory>('all');

  const events: EventItem[] = [
    {
      id: 1,
      title: 'Guest Lecture: AI in Education',
      description: 'Hear from industry experts about AI applications in modern education',
      date: '2025-12-20',
      time: '2:00 PM',
      location: 'Auditorium A',
      attendees: 156,
      category: 'academic',
    },
    {
      id: 2,
      title: 'Programming Workshop',
      description: 'Learn advanced React patterns and best practices',
      date: '2025-12-22',
      time: '10:00 AM',
      location: 'Lab 2',
      attendees: 45,
      category: 'academic',
    },
    {
      id: 3,
      title: 'Networking Event',
      description: 'Connect with industry professionals and alumni',
      date: '2025-12-25',
      time: '5:00 PM',
      location: 'Student Center',
      attendees: 230,
      category: 'social',
    },
    {
      id: 4,
      title: 'Annual Tech Conference',
      description: 'Three-day conference featuring keynote speakers and workshops',
      date: '2025-12-27',
      time: '9:00 AM',
      location: 'Convention Center',
      attendees: 500,
      category: 'academic',
    },
    {
      id: 5,
      title: 'Research Symposium',
      description: 'Student research presentations and demonstrations',
      date: '2026-01-05',
      time: '1:00 PM',
      location: 'Multi-Purpose Hall',
      attendees: 200,
      category: 'academic',
    },
    {
      id: 6,
      title: 'Campus Sports Day',
      description: 'Inter-department sports competition and team building',
      date: '2026-01-10',
      time: '7:00 AM',
      location: 'Sports Complex',
      attendees: 800,
      category: 'social',
    },
  ];

  const filteredEvents = useMemo(() => {
    if (filterCategory === 'all') return events;
    return events.filter((event) => event.category === filterCategory);
  }, [events, filterCategory]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Campus Events</h1>

      <div className="mb-8 flex gap-4">
        {(['all', 'academic', 'social'] as EventCategory[]).map((category) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-6 py-2 rounded-lg font-semibold transition capitalize ${
              filterCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
