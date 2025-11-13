import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface DayNavigatorProps {
  selectedDate: Date;
  goToPreviousDay: () => void;
  goToNextDay: () => void;
  goToToday: () => void;
}

const DayNavigator: React.FC<DayNavigatorProps> = ({
  selectedDate,
  goToPreviousDay,
  goToNextDay,
  goToToday,
}) => {
  const isToday = new Date().toDateString() === selectedDate.toDateString();

  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
        {formatter.format(selectedDate)}
      </h1>
      <div className="flex items-center space-x-2">
        <button
          onClick={goToPreviousDay}
          className="p-2 rounded-lg transition-colors hover:bg-[var(--color-bg-sidebar)]"
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label="Previous day"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={goToToday}
          disabled={isToday}
          className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-bg-sidebar)]"
          style={{
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
          }}
        >
          Today
        </button>
        <button
          onClick={goToNextDay}
          className="p-2 rounded-lg transition-colors hover:bg-[var(--color-bg-sidebar)]"
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label="Next day"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default DayNavigator;
