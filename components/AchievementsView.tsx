import React from 'react';
import { Achievement } from '../types';
import { TrophyIcon } from './icons';

interface AchievementsViewProps {
  achievements: Achievement[];
}

const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
    const isUnlocked = achievement.unlocked;
    return (
        <div 
            className="p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300"
            style={{
                backgroundColor: isUnlocked ? 'var(--color-bg-card)' : 'var(--color-bg-sidebar)',
                border: `1px solid ${isUnlocked ? 'var(--color-primary)' : 'var(--color-border)'}`,
                opacity: isUnlocked ? 1 : 0.6,
            }}
        >
            <TrophyIcon className="w-12 h-12 mb-4" style={{ color: isUnlocked ? 'var(--color-primary-text)' : 'var(--color-text-secondary)'}} />
            <h3 className="font-bold" style={{ color: 'var(--color-text-primary)'}}>{achievement.name}</h3>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)'}}>{achievement.description}</p>
            {isUnlocked && achievement.unlockedAt && (
                <p className="text-xs mt-3" style={{ color: 'var(--color-accent-text)'}}>
                    Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                </p>
            )}
        </div>
    )
}

const AchievementsView: React.FC<AchievementsViewProps> = ({ achievements }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-card-rise">
      {achievements.map((ach, index) => (
        <div key={ach.id} style={{ animationDelay: `${index * 50}ms`}} className="animate-card-rise">
            <AchievementCard achievement={ach} />
        </div>
      ))}
    </div>
  );
};

export default AchievementsView;
