import React, { useState } from 'react';
import { PlusIcon } from './icons';
import { Task } from '../types';

interface AddTodoFormProps {
  addTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt' | 'completedAt'>) => void;
}

const priorityOptions = [
    { value: 1, label: 'Priority 1' },
    { value: 2, label: 'Priority 2' },
    { value: 3, label: 'Priority 3' },
    { value: 4, label: 'Priority 4' },
];


const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTask }) => {
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    addTask({
      text,
      tags: processedTags,
      dueDate,
      priority,
    });
    setText('');
    setTags('');
    setPriority(4);
  };

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
        ripple.remove();
    }
    button.appendChild(circle);
  }

  const inputStyle = {
    backgroundColor: 'var(--color-bg-sidebar)',
    color: 'var(--color-text-primary)',
    '--tw-ring-color': 'var(--color-primary-text)'
  } as React.CSSProperties;

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-xl shadow-sm space-y-3 mb-8" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)'}}>
        <div className="space-y-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., Renew passport"
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition"
            style={inputStyle}
          />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags, comma separated (e.g., urgent, home)"
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition"
            style={inputStyle}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="p-3 rounded-lg focus:outline-none focus:ring-2 transition"
                style={inputStyle}
            />
            <select
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value))}
                className="p-3 rounded-lg focus:outline-none focus:ring-2 transition appearance-none"
                style={inputStyle}
            >
                {priorityOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
        <div className="flex pt-2">
            <button
                type="submit"
                onClick={createRipple}
                className="relative overflow-hidden w-full flex items-center justify-center p-3 text-sm font-semibold rounded-lg text-white disabled:opacity-70 transition-colors"
                style={{ backgroundColor: 'var(--color-primary-text)'}}
            >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Task
            </button>
        </div>
    </form>
  );
};

export default AddTodoForm;