import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Profile } from './types';
import ProfileSelectionScreen from './components/ProfileSelectionScreen';
import Taskboard from './Taskboard';

const App: React.FC = () => {
    const [currentProfile, setCurrentProfile] = useLocalStorage<Profile | null>('currentProfile', null);

    useEffect(() => {
        const bodyClassList = document.body.classList;
        bodyClassList.remove('theme-princess', 'theme-bunny');
        if (currentProfile) {
            bodyClassList.add(`theme-${currentProfile}`);
        }
    }, [currentProfile]);

    const handleSelectProfile = (profile: Profile) => {
        setCurrentProfile(profile);
    };

    const handleSwitchProfile = () => {
        setCurrentProfile(null);
    };

    if (!currentProfile) {
        return <ProfileSelectionScreen onSelectProfile={handleSelectProfile} />;
    }

    return <Taskboard profile={currentProfile} onSwitchProfile={handleSwitchProfile} />;
};

export default App;