import React from 'react';

interface DashboardHeaderProps {
  taskStreak: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ taskStreak }) => {
  return (
    <div className="p-6 rounded-2xl mb-8 flex flex-col items-center justify-center text-center" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
      <div key={taskStreak} className="animate-number-pop">
        <span className="text-6xl md:text-7xl font-bold" style={{ color: 'var(--color-primary-text)'}}>
          {taskStreak}
        </span>
      </div>
      <h2 className="font-semibold text-lg mt-2 tracking-wide" style={{ color: 'var(--color-text-secondary)'}}>
        Day Streak
      </h2>
      <p className="text-sm mt-2 max-w-xs" style={{ color: 'var(--color-text-secondary)'}}>
        {taskStreak > 0 ? `You're on fire! 🔥 Keep the momentum going.` : "Complete a task today to start a new streak! ✨"}
      </p>
    </div>
  );
};

export default DashboardHeader;