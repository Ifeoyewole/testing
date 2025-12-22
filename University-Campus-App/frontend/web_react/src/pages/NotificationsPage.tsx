import React, { useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';
import type { IconType } from 'react-icons';

type NotificationType = 'success' | 'warning' | 'info';

type NotificationItem = {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  icon: IconType;
};

function NotificationsPage() {
  const [notifications] = useState<NotificationItem[]>([
    {
      id: 1,
      type: 'success',
      title: 'Assignment Submitted',
      message: 'Your assignment for Database Systems has been submitted successfully',
      timestamp: '2 hours ago',
      icon: FiCheckCircle,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Attendance Alert',
      message: 'Your attendance in Data Structures is below 75%. Please attend upcoming classes.',
      timestamp: '5 hours ago',
      icon: FiAlertCircle,
    },
    {
      id: 3,
      type: 'info',
      title: 'New Event Posted',
      message: 'Guest Lecture: AI in Education has been scheduled for December 20',
      timestamp: '1 day ago',
      icon: FiInfo,
    },
    {
      id: 4,
      type: 'success',
      title: 'Grade Released',
      message: 'Your grade for Midterm Exam in Web Development has been released',
      timestamp: '2 days ago',
      icon: FiCheckCircle,
    },
    {
      id: 5,
      type: 'info',
      title: 'Timetable Updated',
      message: 'Your class schedule has been updated. Please review changes.',
      timestamp: '3 days ago',
      icon: FiInfo,
    },
    {
      id: 6,
      type: 'warning',
      title: 'Upcoming Deadline',
      message: 'Project submission deadline for Software Engineering is in 2 days',
      timestamp: '4 days ago',
      icon: FiAlertCircle,
    },
  ]);

  const getTypeStyles = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-l-4 border-green-500';
      case 'warning':
        return 'bg-yellow-50 border-l-4 border-yellow-500';
      case 'info':
        return 'bg-blue-50 border-l-4 border-blue-500';
      default:
        return 'bg-gray-50 border-l-4 border-gray-500';
    }
  };

  const getIconColor = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Notifications</h1>

      <div className="mb-6 flex justify-end">
        <button className="text-blue-500 hover:text-blue-600 font-semibold">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`${getTypeStyles(notification.type)} p-6 rounded-lg hover:shadow-md transition cursor-pointer`}
            >
              <div className="flex gap-4">
                <div className={`flex-shrink-0 ${getIconColor(notification.type)}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{notification.title}</h3>
                  <p className="text-gray-700 text-sm mb-2">{notification.message}</p>
                  <p className="text-gray-500 text-xs">{notification.timestamp}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NotificationsPage;
