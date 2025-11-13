import React from 'react';
import { View } from '../types';
import { TodayIcon, ChartIcon, FlameIcon, TimerIcon, TrophyIcon } from './icons';

interface SidebarProps {
  view: View;
  setView: (view: View) => void;
  goToToday: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ view, setView, goToToday }) => {

    const NavItem = ({ icon, label, onClick, isActive }: { icon: React.ReactNode; label: string; onClick: () => void; isActive: boolean }) => (
        <li>
            <a
                href="#"
                onClick={(e) => { e.preventDefault(); onClick(); }}
                className={`flex items-center p-2 text-base font-normal rounded-lg transition-all group`}
                style={{
                  color: isActive ? 'var(--color-primary-text)' : 'var(--color-text-secondary)',
                  backgroundColor: isActive ? 'var(--color-primary)' : 'transparent'
                }}
            >
                <span className="transition-transform duration-200 group-hover:-rotate-[5deg] group-hover:scale-110">{icon}</span>
                <span className="ml-3">{label}</span>
            </a>
        </li>
    );

    return (
        <aside className="w-64 flex-shrink-0 p-4 border-r overflow-y-auto" style={{ backgroundColor: 'var(--color-bg-sidebar)', borderColor: 'var(--color-border)'}}>
            <nav className="space-y-2">
                <ul className="space-y-2">
                    <NavItem
                        icon={<TodayIcon className="w-6 h-6" />}
                        label="Day View"
                        onClick={goToToday}
                        isActive={view.type === 'today'}
                    />
                    <NavItem
                        icon={<FlameIcon className="w-6 h-6" />}
                        label="Habits"
                        onClick={() => setView({ type: 'habits' })}
                        isActive={view.type === 'habits'}
                    />
                </ul>
                <div className="pt-4 mt-4 space-y-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
                     <ul className="space-y-2">
                        <NavItem
                            icon={<TimerIcon className="w-6 h-6" />}
                            label="Focus Mode"
                            onClick={() => setView({ type: 'focus' })}
                            isActive={view.type === 'focus'}
                        />
                        <NavItem
                            icon={<ChartIcon className="w-6 h-6" />}
                            label="Analytics"
                            onClick={() => setView({ type: 'analytics' })}
                            isActive={view.type === 'analytics'}
                        />
                         <NavItem
                            icon={<TrophyIcon className="w-6 h-6" />}
                            label="Achievements"
                            onClick={() => setView({ type: 'achievements' })}
                            isActive={view.type === 'achievements'}
                        />
                     </ul>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;