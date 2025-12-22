import React from 'react';
import { FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';

type AttendanceCardProps = {
  subject: string;
  attended: number;
  total: number;
};

function AttendanceCard({ subject, attended, total }: AttendanceCardProps) {
  const percentage = total > 0 ? (attended / total) * 100 : 0;
  let statusIcon = FiXCircle;
  let statusColor = 'text-red-500';

  if (percentage >= 75) {
    statusIcon = FiCheckCircle;
    statusColor = 'text-green-500';
  } else if (percentage >= 60) {
    statusIcon = FiClock;
    statusColor = 'text-yellow-500';
  }

  const StatusIcon = statusIcon;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-gray-800">{subject}</h4>
        <StatusIcon className={`${statusColor} w-5 h-5`} />
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Attendance Rate</span>
          <span className="font-semibold">{percentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              percentage >= 75
                ? 'bg-green-500'
                : percentage >= 60
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        {attended} / {total} classes attended
      </p>
    </div>
  );
}

export default AttendanceCard;
