import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../types';
// Fix: Replaced missing CalendarIcon and FlagIcon with existing TodayIcon and FlameIcon to resolve import errors.
import { TrashIcon, EditIcon, TodayIcon, FlameIcon, CheckIcon } from './icons';
import Confetti from './Confetti';

interface TodoItemProps {
  task: Task;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, text: string) => void;
  style?: React.CSSProperties;
}

const priorityColors: { [key: number]: string } = {
    1: '#FFD4EA', // Stardust Pink
    2: '#E9D9FF', // Cosmic Lavender
    3: '#D4E5FF', // Pastel Nebula Blue
    4: '#D0D3DD', // Moon Gray
};

const tagColors = [
    { bg: 'var(--color-primary)', text: 'var(--color-primary-text)' },
    { bg: 'var(--color-secondary)', text: '#1E3A8A' }, // Deep Nebula Blue Text
    { bg: 'var(--color-tertiary)', text: '#9D174D' }, // Deep Stardust Pink Text
    { bg: 'var(--color-accent)', text: 'var(--color-accent-text)' },
];


const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    today.setHours(0,0,0,0);
    tomorrow.setHours(0,0,0,0);
    const taskDate = new Date(date.getTime()); // Use a copy
    taskDate.setHours(0,0,0,0);
    
    if (taskDate < today) return "Overdue";
    if (taskDate.getTime() === today.getTime()) return "Today";
    if (taskDate.getTime() === tomorrow.getTime()) return "Tomorrow";
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const CustomCheckbox = ({ checked, priority, onClick }: { checked: boolean; priority: number; onClick: () => void; }) => {
    const priorityColor = priorityColors[priority] || priorityColors[4];
    const [showConfetti, setShowConfetti] = useState(false);

    const handleClick = () => {
        onClick();
        if(!checked) {
            setShowConfetti(true);
        }
    }

    return (
        <div className="relative">
            <div 
                onClick={handleClick}
                className={`h-6 w-6 mt-1 rounded-full border-2 transition-all duration-200 cursor-pointer flex-shrink-0 flex items-center justify-center`}
                style={{ 
                    borderColor: checked ? priorityColor : '#CBD5E1', 
                    backgroundColor: checked ? priorityColor : 'transparent' 
                }}
            >
                {checked && <CheckIcon className="w-4 h-4 text-white animate-check-bloom" />}
            </div>
            {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
        </div>
    );
};

const TodoItem: React.FC<TodoItemProps> = ({ task, toggleTask, deleteTask, editTask, style }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [isDeleting, setIsDeleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (isEditing && editText.trim() !== '') {
      editTask(task.id, editText);
    } else {
        setEditText(task.text);
    }
    setIsEditing(!isEditing);
  };
  
  const handleDelete = () => {
      setIsDeleting(true);
      setTimeout(() => {
          deleteTask(task.id);
      }, 400); // match duration of animation
  }
  
  const priorityColor = priorityColors[task.priority] || priorityColors[4];
  const liClass = `group flex items-start p-4 mb-3 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-lg animate-card-rise hover:scale-[1.02] hover:shadow-[0_0_20px_var(--color-glow)] ${isDeleting ? 'animate-tilt-fade' : ''}`;

  return (
    <li
      className={liClass}
      style={{
        ...style,
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      <CustomCheckbox checked={task.completed} priority={task.priority} onClick={() => toggleTask(task.id)} />

      <div className="ml-4 flex-grow">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
            className="w-full bg-transparent focus:outline-none"
            style={{ color: 'var(--color-text-primary)'}}
          />
        ) : (
          <p
            className={`transition-colors ${
              task.completed ? 'line-through' : ''
            }`}
            style={{ 
              color: task.completed ? 'var(--color-text-secondary)' : 'var(--color-text-primary)' 
            }}
          >
            {task.text}
          </p>
        )}
        <div className="flex items-center flex-wrap gap-2 mt-2 text-xs" style={{ color: 'var(--color-text-secondary)'}}>
           <div className={`flex items-center ${formatDate(task.dueDate) === 'Overdue' ? 'text-red-500' : ''}`}>
               <TodayIcon className="w-4 h-4 mr-1"/>
               <span>{formatDate(task.dueDate)}</span>
           </div>
           {task.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-2 py-0.5 rounded-full font-semibold" 
                style={{ 
                    backgroundColor: tagColors[index % tagColors.length].bg, 
                    color: tagColors[index % tagColors.length].text 
                }}
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
      <div className="flex items-center space-x-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={handleEdit} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" style={{ color: 'var(--color-text-secondary)'}} aria-label="Edit task">
          <EditIcon className="w-5 h-5" />
        </button>
        <button onClick={handleDelete} className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-gray-400 hover:text-red-500" aria-label="Delete task">
          <TrashIcon className="w-5 h-5" />
        </button>
        <FlameIcon className={`w-5 h-5 animate-heartbeat`} style={{ color: priorityColor }} />
      </div>
    </li>
  );
};

export default TodoItem;