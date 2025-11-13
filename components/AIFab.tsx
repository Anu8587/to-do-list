import React from 'react';
import { AIBuddyIcon, BunnyBuddyIcon } from './icons';
import { Profile } from '../types';

interface AIFabProps {
    onClick: () => void;
    profile: Profile;
}

const AIFab: React.FC<AIFabProps> = ({ onClick, profile }) => {
    
    const BuddyIcon = profile === 'princess' ? AIBuddyIcon : BunnyBuddyIcon;

    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 animate-pulse-fab"
            style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-text)'
            }}
            aria-label="Ask AI Buddy"
        >
            <BuddyIcon className="w-12 h-12" />
        </button>
    );
};

export default AIFab;