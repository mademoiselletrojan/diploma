// src/tests/english/ProgressBar.jsx
import '../../../styles/globals.scss';

export default function ProgressBar({ current, total }) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
      <div
        className="progress_bar h-4 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
