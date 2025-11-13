import React, { useEffect, useState } from 'react';
import { AIBuddyIcon, BunnyBuddyIcon } from './icons';
import { Profile } from '../types';

interface AIFeedbackBubbleProps {
  feedback: { message: string } | null;
  profile: Profile;
}

const AIFeedbackBubble: React.FC<AIFeedbackBubbleProps> = ({ feedback, profile }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (feedback) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [feedback]);
    
    const BuddyIcon = profile === 'princess' ? AIBuddyIcon : BunnyBuddyIcon;

    return (
        <div 
            className={`fixed top-20 right-6 z-50 p-4 rounded-2xl shadow-lg flex items-center transition-all duration-500 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
            style={{ 
                backgroundColor: 'var(--color-bg-card)', 
                border: '1px solid var(--color-border)',
                pointerEvents: isVisible ? 'auto' : 'none' 
            }}
        >
            {feedback && (
                <>
                    <BuddyIcon className="w-10 h-10 mr-3 flex-shrink-0" />
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)'}}>
                        {feedback.message}
                    </p>
                </>
            )}
        </div>
    );
};

export default AIFeedbackBubble;