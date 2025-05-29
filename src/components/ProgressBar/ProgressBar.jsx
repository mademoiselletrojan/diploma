import React from 'react';

export default function ProgressBar({ progress }) {
  let bgColor = 'bg-gray-200';

  if (progress >= 100) bgColor = 'bg-green-500';
  else if (progress >= 50) bgColor = 'bg-orange-400';
  else if (progress > 0) bgColor = 'bg-yellow-400';

  return (
    <div className="h-3 w-full bg-gray-800 rounded-full mt-2">
      <div
        className={`h-full rounded-full transition-all duration-300 ${bgColor}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
