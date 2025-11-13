import React from 'react';
import { Profile } from '../types';
import { CrownIcon, BunnyIcon } from './icons';

interface ProfileSelectionScreenProps {
  onSelectProfile: (profile: Profile) => void;
}

const ProfileCard = ({ profile, icon, name, onSelect }: { profile: Profile, icon: React.ReactNode, name: string, onSelect: (profile: Profile) => void }) => (
    <div 
        onClick={() => onSelect(profile)}
        className="group flex flex-col items-center justify-center p-8 rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)'}}
    >
        <div className="w-32 h-32 mb-6 transition-transform duration-300 group-hover:scale-110">
            {icon}
        </div>
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)'}}>
            {name}
        </h2>
    </div>
)

const ProfileSelectionScreen: React.FC<ProfileSelectionScreenProps> = ({ onSelectProfile }) => {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center p-8" style={{ backgroundColor: 'var(--color-bg-dash)' }}>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: 'var(--color-text-primary)'}}>Who's planning today?</h1>
            <p className="text-lg mb-12" style={{ color: 'var(--color-text-secondary)'}}>Choose your profile to continue</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                <div className="theme-princess">
                    <ProfileCard 
                        profile="princess"
                        icon={<CrownIcon />}
                        name="Princess"
                        onSelect={onSelectProfile}
                    />
                </div>
                <div className="theme-bunny">
                     <ProfileCard 
                        profile="bunny"
                        icon={<BunnyIcon />}
                        name="Bunny"
                        onSelect={onSelectProfile}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileSelectionScreen;