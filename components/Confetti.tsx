import React, { useEffect } from 'react';

interface ConfettiProps {
    onComplete: () => void;
}

const ConfettiPiece = ({ style }: { style: React.CSSProperties }) => {
    return <div className="absolute w-2 h-2 rounded-full" style={style} />;
};

const Confetti: React.FC<ConfettiProps> = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 1000); // Cleanup after animation
        return () => clearTimeout(timer);
    }, [onComplete]);
    
    const colors = ['var(--color-primary)', 'var(--color-accent)', 'var(--color-secondary)', 'var(--color-tertiary)'];
    const particles = Array.from({ length: 15 }).map((_, i) => {
        const angle = (i / 15) * 360;
        const radius = Math.random() * 20 + 20;
        const style = {
            backgroundColor: colors[i % colors.length],
            animation: `confetti-pop 0.8s ${i * 0.02}s ease-out forwards`,
            transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
        };
        return <ConfettiPiece key={i} style={style} />;
    });

    return <div className="absolute inset-0 flex items-center justify-center pointer-events-none">{particles}</div>;
};

export default Confetti;