import React, { useState, useEffect, useRef } from 'react';

const FOCUS_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

const FocusView: React.FC = () => {
    const [time, setTime] = useState(FOCUS_TIME);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = window.setInterval(() => {
                setTime(prev => prev - 1);
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive]);
    
    useEffect(() => {
        if (time <= 0) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsActive(false);
            
            // Notification for session end
            try {
                new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3').play();
            } catch(e) { console.error("Could not play sound."); }

            if(isBreak) {
                setTime(FOCUS_TIME);
                setIsBreak(false);
            } else {
                setTime(BREAK_TIME);
                setIsBreak(true);
            }
        }
    }, [time, isBreak]);

    const toggleTimer = () => setIsActive(!isActive);
    
    const resetTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsActive(false);
        setIsBreak(false);
        setTime(FOCUS_TIME);
    }
    
    const totalTime = isBreak ? BREAK_TIME : FOCUS_TIME;
    const progress = ((totalTime - time) / totalTime) * 100;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl animate-card-rise" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                {isBreak ? "Break Time" : "Focus Session"}
            </h2>
            <div className="relative w-64 h-64 flex items-center justify-center">
                 <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                    <circle 
                        className="stroke-current"
                        style={{ color: 'var(--color-bg-sidebar)'}}
                        cx="50" cy="50" r="45"
                        strokeWidth="10" fill="transparent"
                    />
                    <circle
                        className="stroke-current transition-all duration-1000 ease-linear"
                        style={{ color: 'var(--color-primary-text)'}}
                        cx="50" cy="50" r="45"
                        strokeWidth="10" fill="transparent"
                        strokeDasharray={2 * Math.PI * 45}
                        strokeDashoffset={(2 * Math.PI * 45) * (1 - progress / 100)}
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <span className="text-5xl font-bold" style={{ color: 'var(--color-text-primary)'}}>
                    {formatTime(time)}
                </span>
            </div>
            <div className="flex space-x-4 mt-8">
                <button 
                    onClick={toggleTimer} 
                    className="px-8 py-3 rounded-xl font-semibold text-white transition-transform hover:scale-105"
                    style={{ backgroundColor: 'var(--color-primary-text)' }}
                >
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button 
                    onClick={resetTimer} 
                    className="px-8 py-3 rounded-xl font-semibold"
                    style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-text)' }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default FocusView;
