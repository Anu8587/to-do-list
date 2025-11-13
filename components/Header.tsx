import React from 'react';
import { UsersIcon } from './icons';

interface HeaderProps {
  onSwitchProfile: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSwitchProfile }) => {
  return (
    <header className="flex items-center justify-between p-4 h-16 flex-shrink-0 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-card)'}}>
      <h1 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
        Taskboard
      </h1>
      <div className="flex items-center space-x-2">
        <button
          onClick={onSwitchProfile}
          className="p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"
          style={{ 
            color: 'var(--color-text-secondary)', 
            backgroundColor: 'var(--color-bg-sidebar)', 
            '--tw-ring-color': 'var(--color-primary-text)',
            '--tw-ring-offset-color': 'var(--color-bg-card)'
          } as React.CSSProperties}
          aria-label="Switch Profile"
        >
          <UsersIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;