import React from 'react';
import { Task } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  tasks: Task[];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, text: string) => void;
}

const EmptyState = () => (
    <div className="text-center py-16 px-4 flex flex-col items-center">
        <svg className="mx-auto h-40 w-40 text-gray-200 dark:text-gray-700" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: 'var(--color-secondary)', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor: 'var(--color-primary)', stopOpacity:1}} />
                </linearGradient>
            </defs>
            <path d="M75.34,22.18A25.4,25.4,0,0,0,32.5,34.4a20,20,0,1,0-3,39.8H72.5a18,18,0,0,0,2.84-35.79Z" fill="url(#skyGradient)" />
            <path d="M68,56.5l-4.24,1.29a1,1,0,0,1-1.18-.84L60,45.5l-2.58,11.45a1,1,0,0,1-1.18.84L52,56.5l-4.24,1.29a1,1,0,0,1-1.18-.84L44,45.5,41.42,57a1,1,0,0,1-1.18.84L36,56.5" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
        <h3 className="text-xl font-semibold mt-6" style={{ color: 'var(--color-text-primary)' }}>Your universe is clear.</h3>
        <p className="mt-2 max-w-xs" style={{ color: 'var(--color-text-secondary)' }}>"The best way to predict the future is to create it." – Peter Drucker</p>
    </div>
);

const TodoList: React.FC<TodoListProps> = ({ tasks, toggleTask, deleteTask, editTask }) => {

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  const uncompletedTasks = tasks.filter(t => !t.completed)
    .sort((a,b) => a.priority - b.priority || new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="space-y-0">
        {uncompletedTasks.length > 0 && (
            <section>
                <ul>
                    {uncompletedTasks.map((task, index) => (
                        <TodoItem
                            key={task.id}
                            task={task}
                            toggleTask={toggleTask}
                            deleteTask={deleteTask}
                            editTask={editTask}
                            style={{ animationDelay: `${index * 40}ms` }}
                        />
                    ))}
                </ul>
            </section>
        )}
        {completedTasks.length > 0 && (
            <section>
                <h3 className="text-sm font-semibold px-1 mb-2 mt-6" style={{ color: 'var(--color-text-secondary)' }}>Completed</h3>
                <ul>
                    {completedTasks.map((task, index) => (
                        <TodoItem
                            key={task.id}
                            task={task}
                            toggleTask={toggleTask}
                            deleteTask={deleteTask}
                            editTask={editTask}
                            style={{ animationDelay: `${(uncompletedTasks.length + index) * 40}ms` }}
                        />
                    ))}
                </ul>
            </section>
        )}
    </div>
  );
};

export default TodoList;