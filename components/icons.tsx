import React from 'react';

// Fix: Add a shared type for icon props to include `style`.
interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

export const AIBuddyIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ai-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style={{stopColor: 'var(--color-primary)', stopOpacity: '0.6'}} />
        <stop offset="100%" style={{stopColor: 'var(--color-primary)', stopOpacity: '0'}} />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#ai-glow)" />
    <path d="M50 10 L61.8 35.5 L90.5 39 L70 57.5 L75.3 85 L50 71 L24.7 85 L30 57.5 L9.5 39 L38.2 35.5 Z" fill="var(--color-primary)" />
    <circle cx="42" cy="50" r="4" fill="var(--color-text-primary)" />
    <circle cx="58" cy="50" r="4" fill="var(--color-text-primary)" />
    <path d="M45 62 Q50 68 55 62" stroke="var(--color-text-primary)" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

export const BunnyBuddyIcon = ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="bunny-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{stopColor: 'var(--color-primary)', stopOpacity: '0.6'}} />
                <stop offset="100%" style={{stopColor: 'var(--color-primary)', stopOpacity: '0'}} />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#bunny-glow)" />
        <path d="M50,20 C40,20 40,5 50,5 C60,5 60,20 50,20 Z" fill="var(--color-primary-text)" transform="rotate(-20 50 12)" />
        <path d="M50,20 C40,20 40,5 50,5 C60,5 60,20 50,20 Z" fill="var(--color-primary-text)" transform="rotate(20 50 12) scale(-1, 1) translate(-100, 0)" />
        <circle cx="50" cy="60" r="30" fill="var(--color-primary)" />
        <circle cx="42" cy="55" r="5" fill="var(--color-text-primary)" />
        <circle cx="58" cy="55" r="5" fill="var(--color-text-primary)" />
        <path d="M48 65 L52 65 M50 65 V 70" stroke="var(--color-text-primary)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
);

export const SunIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const MoonIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

export const PlusIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

export const TrashIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const EditIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);

export const ChartIcon = ({ className, style }: IconProps) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
);

export const TodayIcon = ({ className, style }: IconProps) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 15.75h.008v.008H12v-.008z" />
    </svg>
);

export const FlameIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797A8.33 8.33 0 0112 2.25c1.153 0 2.243.3 3.218.834a8.224 8.224 0 01.144 2.13z" />
  </svg>
);

export const TimerIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const TrophyIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 001.316-5.033.75.75 0 01.572-.734 8.25 8.25 0 0110.224 0 .75.75 0 01.572.734A9.753 9.753 0 0021 18.75h-4.5m-9 0a9.752 9.752 0 01-1.316-5.033.75.75 0 01.572-.734 8.25 8.25 0 0110.224 0 .75.75 0 01.572.734A9.753 9.753 0 0116.5 18.75m-9 0h9M12 2.25v3.75m-3.75 0h7.5" />
  </svg>
);

export const CheckIcon = ({ className, style }: IconProps) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

export const ChevronLeftIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const ChevronRightIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const CrownIcon = ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 80 H80 L90 40 L65 55 L50 20 L35 55 L10 40 Z" fill="var(--color-primary-text)" stroke="var(--color-primary-hover)" strokeWidth="3" />
        <circle cx="50" cy="25" r="5" fill="var(--color-tertiary)" />
        <circle cx="20" cy="45" r="5" fill="var(--color-secondary)" />
        <circle cx="80" cy="45" r="5" fill="var(--color-secondary)" />
    </svg>
);

export const BunnyIcon = ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50,30 C40,30 40,15 50,15 C60,15 60,30 50,30 Z" fill="var(--color-primary-text)" transform="rotate(-15 50 22)" />
        <path d="M50,30 C40,30 40,15 50,15 C60,15 60,30 50,30 Z" fill="var(--color-primary-text)" transform="rotate(15 50 22) scale(-1, 1) translate(-100, 0)" />
        <circle cx="50" cy="60" r="25" fill="var(--color-primary)" />
    </svg>
);

export const UsersIcon = ({ className, style }: IconProps) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.964A3 3 0 0012 12.75a3 3 0 00-3.75 0m-7.5-2.964A3 3 0 006 12.75a3 3 0 00-3.75 0M12 15.75a3 3 0 01-3-3m3 3a3 3 0 00-3-3m3 3h.008M9.75 12a3 3 0 013-3m3 3a3 3 0 00-3-3m-3 3a3 3 0 013 3m0 0h.008m-3 0h.008m0 0v.008m0-3.008v.008m-3 0v.008m0-3.008V12m-3 0v.008m0-3.008V12" />
    </svg>
);