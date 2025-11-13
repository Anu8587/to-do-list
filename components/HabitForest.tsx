import React from 'react';

interface HabitForestProps {
  growthStage: number;
}

const TreeStage0 = () => ( // Withered Tree / Empty Plot
    <svg viewBox="0 0 100 100" className="w-24 h-24 text-gray-400 dark:text-gray-600">
        <path d="M50 85 V30 M50 50 L35 35 M50 50 L65 35 M50 65 L40 55 M50 65 L60 55" stroke="var(--color-border)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
);

const TreeStage1 = () => ( // Sprout
    <svg viewBox="0 0 100 100" className="w-24 h-24" style={{color: 'var(--color-primary-text)'}}>
        <path d="M50 85 V60" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M50 60 C 40 55, 40 45, 50 40" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M50 60 C 60 55, 60 45, 50 40" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
);

const TreeStage2 = () => ( // Small Tree
    <svg viewBox="0 0 100 100" className="w-24 h-24">
        <path d="M50 85 V40" stroke="var(--color-text-primary)" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="30" r="15" fill="var(--color-secondary)" />
    </svg>
);

const TreeStage3 = () => ( // Medium Tree
    <svg viewBox="0 0 100 100" className="w-24 h-24">
        <path d="M50 85 V45" stroke="var(--color-text-primary)" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M50 65 L35 50" stroke="var(--color-text-primary)" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M50 65 L65 50" stroke="var(--color-text-primary)" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="35" r="20" fill="var(--color-primary)" />
        <circle cx="35" cy="45" r="15" fill="var(--color-secondary)" />
        <circle cx="65" cy="45" r="15" fill="var(--color-secondary)" />
    </svg>
);

const TreeStage4 = () => ( // Large Tree
    <svg viewBox="0 0 100 100" className="w-24 h-24">
        <path d="M50 85 V40" stroke="var(--color-text-primary)" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M50 70 L30 55" stroke="var(--color-text-primary)" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M50 70 L70 55" stroke="var(--color-text-primary)" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M50 55 L40 40" stroke="var(--color-text-primary)" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M50 55 L60 40" stroke="var(--color-text-primary)" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="25" r="22" fill="var(--color-primary)" />
        <circle cx="30" cy="40" r="18" fill="var(--color-accent)" />
        <circle cx="70" cy="40" r="18" fill="var(--color-accent)" />
    </svg>
);

const TreeStage5 = () => ( // Lush Tree
    <svg viewBox="0 0 100 100" className="w-24 h-24">
        <path d="M50 85 V35" stroke="var(--color-text-primary)" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M50 75 L25 55" stroke="var(--color-text-primary)" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M50 75 L75 55" stroke="var(--color-text-primary)" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M50 55 L35 40" stroke="var(--color-text-primary)" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M50 55 L65 40" stroke="var(--color-text-primary)" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="25" r="25" fill="var(--color-primary-text)" />
        <circle cx="28" cy="40" r="20" fill="var(--color-primary)" />
        <circle cx="72" cy="40" r="20" fill="var(--color-accent)" />
        <circle cx="50" cy="45" r="20" fill="var(--color-tertiary)" />
    </svg>
);

const HabitForest: React.FC<HabitForestProps> = ({ growthStage }) => {
    switch(growthStage) {
        case 1: return <TreeStage1 />;
        case 2: return <TreeStage2 />;
        case 3: return <TreeStage3 />;
        case 4: return <TreeStage4 />;
        case 5: return <TreeStage5 />;
        default: return <TreeStage0 />;
    }
};

export default HabitForest;