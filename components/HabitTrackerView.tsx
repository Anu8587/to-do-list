import React, { useState } from 'react';
import { Habit } from '../types';
import { PlusIcon, TrashIcon } from './icons';
import HabitForest from './HabitForest';

interface HabitTrackerViewProps {
  habits: Habit[];
  addHabit: (text: string) => void;
  toggleHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
}

const HabitItem = ({ habit, onToggle, onDelete }: { habit: Habit, onToggle: (id: string) => void, onDelete: (id: string) => void }) => {
    const today = new Date().toISOString().split('T')[0];
    const isCompletedToday = habit.lastCompleted === today;

    return (
        <div className="p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:shadow-[0_0_20px_var(--color-glow)]" 
             style={{ backgroundColor: 'var(--color-bg-card)', border: `1px solid ${isCompletedToday ? 'var(--color-accent)' : 'var(--color-border)'}`}}>
            
            <HabitForest growthStage={habit.growthStage} />
            
            <h3 className="font-bold text-lg mt-4" style={{ color: 'var(--color-text-primary)'}}>{habit.text}</h3>
            
            <p className="text-sm my-2" style={{ color: 'var(--color-text-secondary)'}}>
              Streak: <span className="font-bold" style={{ color: habit.streak > 0 ? '#F97316' : 'inherit' }}>{habit.streak} days</span>
            </p>

            <div className="flex items-center space-x-2 mt-4">
                <button 
                    onClick={() => onToggle(habit.id)}
                    disabled={isCompletedToday}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                    style={{ 
                        backgroundColor: isCompletedToday ? 'var(--color-accent)' : 'var(--color-primary)', 
                        color: isCompletedToday ? 'var(--color-accent-text)' : 'var(--color-primary-text)' 
                    }}
                    aria-label={`Mark ${habit.text} as complete`}
                >
                    {isCompletedToday ? "Completed!" : "Did it Today"}
                </button>
                 <button onClick={() => onDelete(habit.id)} className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50">
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

const AddHabitForm = ({ onAdd }: { onAdd: (text: string) => void }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 rounded-2xl mb-8" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)'}}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g., Drink water"
                className="w-full p-3 rounded-lg focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'var(--color-bg-sidebar)', color: 'var(--color-text-primary)', '--tw-ring-color': 'var(--color-primary-text)' } as React.CSSProperties}
            />
            <button
                type="submit"
                className="flex items-center justify-center px-6 text-sm font-semibold rounded-lg text-white disabled:opacity-70 transition-colors"
                style={{ backgroundColor: 'var(--color-primary-text)'}}
            >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add
            </button>
        </form>
    );
};

const HabitTrackerView: React.FC<HabitTrackerViewProps> = ({ habits, addHabit, toggleHabit, deleteHabit }) => {
  return (
    <div className="animate-card-rise">
      <AddHabitForm onAdd={addHabit} />
      <div>
        {habits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {habits.map((habit, index) => (
                    <div key={habit.id} className="animate-card-rise" style={{ animationDelay: `${index * 50}ms` }}>
                        <HabitItem habit={habit} onToggle={toggleHabit} onDelete={deleteHabit} />
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-16 px-4 flex flex-col items-center">
                 <svg className="mx-auto h-40 w-40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 85 V60" stroke="var(--color-border)" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <path d="M50 60 C 40 55, 40 45, 50 40" stroke="var(--color-border)" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <path d="M50 60 C 60 55, 60 45, 50 40" stroke="var(--color-border)" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <circle cx="65" cy="25" r="3" fill="var(--color-primary)" />
                    <circle cx="35" cy="30" r="2" fill="var(--color-secondary)" />
                    <circle cx="55" cy="15" r="2" fill="var(--color-tertiary)" />
                </svg>
                <h3 className="text-xl font-semibold mt-6" style={{ color: 'var(--color-text-primary)' }}>Plant a new star-seed.</h3>
                <p className="mt-2 max-w-sm" style={{ color: 'var(--color-text-secondary)' }}>"A habit is a universe you build within yourself." Start a new habit to grow your own cosmic forest.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default HabitTrackerView;