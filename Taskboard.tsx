import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Task, Theme, View, AnalyticsData, Habit, Achievement, Profile } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getAIFeedback } from './services/geminiService';
import Header from './components/Header';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import AnalyticsView from './components/AnalyticsView';
import Sidebar from './components/Sidebar';
import HabitTrackerView from './components/HabitTrackerView';
import FocusView from './components/FocusView';
import AchievementsView from './components/AchievementsView';
import { checkAchievements, achievementDefinitions } from './lib/achievements';
import { getHeatmapData, getMonthlyData, getWeeklyData } from './lib/time';
import DashboardHeader from './components/DashboardHeader';
import AIFeedbackBubble from './components/AIFeedbackBubble';
import AIFab from './components/AIFab';
import DayNavigator from './components/DayNavigator';

interface TaskboardProps {
    profile: Profile;
    onSwitchProfile: () => void;
}

const Taskboard: React.FC<TaskboardProps> = ({ profile, onSwitchProfile }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>(`${profile}_tasks`, []);
  const [habits, setHabits] = useLocalStorage<Habit[]>(`${profile}_habits`, []);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>(
    `${profile}_achievements`, 
    Object.values(achievementDefinitions).map(a => ({...a, unlocked: false, unlockedAt: null}))
  );
  const [theme, setTheme] = useLocalStorage<Theme>(`${profile}_theme`, 'light');
  const [view, setView] = useState<View>({ type: 'today' });
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [taskStreak, setTaskStreak] = useLocalStorage<number>(`${profile}_taskStreak`, 0);
  const [lastTaskCompletionDate, setLastTaskCompletionDate] = useLocalStorage<string | null>(`${profile}_lastTaskCompletionDate`, null);
  const [aiFeedback, setAiFeedback] = useState<{ message: string } | null>(null);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);
  
  useEffect(() => {
    if (aiFeedback) {
        const timer = setTimeout(() => {
            setAiFeedback(null);
        }, 5000);
        return () => clearTimeout(timer);
    }
  }, [aiFeedback]);

  useEffect(() => {
    const newlyUnlocked = checkAchievements(tasks, habits, achievements);
    if (newlyUnlocked.length > 0) {
      setAchievements(prev =>
        prev.map(ach =>
          newlyUnlocked.includes(ach.id) && !ach.unlocked
            ? { ...ach, unlocked: true, unlockedAt: new Date().toISOString() }
            : ach
        )
      );
    }
  }, [tasks, habits, achievements, setAchievements]);
  
  useEffect(() => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const needsUpdate = habits.some(h => h.lastCompleted !== null && h.lastCompleted < yesterdayStr);

    if(needsUpdate) {
        setHabits(prevHabits => 
            prevHabits.map(habit => {
                if (habit.lastCompleted !== null && new Date(habit.lastCompleted) < yesterday) {
                    return { ...habit, streak: 0, growthStage: 0 };
                }
                return habit;
            })
        );
    }
  }, [setHabits]);
  
  type AIFeedbackEventType = 'add_task' | 'complete_task' | 'delete_task' | 'fab_click';

  const triggerAIFeedback = useCallback(async (
    eventType: AIFeedbackEventType,
    contextOverrides: Partial<{ taskTitle: string; }> = {}
  ) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const hour = new Date().getHours();
    
    const context = {
        eventType,
        taskTitle: contextOverrides.taskTitle || '',
        taskCountToday: tasks.filter(t => t.dueDate === todayStr && !t.completed).length,
        completedCountToday: tasks.filter(t => t.completed && t.completedAt?.startsWith(todayStr)).length,
        overdueTasksCount: tasks.filter(t => !t.completed && new Date(t.dueDate) < new Date(todayStr)).length,
        streak: taskStreak,
        timeOfDay: (hour < 12) ? 'morning' : (hour < 18) ? 'afternoon' : (hour < 22) ? 'evening' : 'night',
    };
    
    const message = await getAIFeedback(context as any);
    setAiFeedback({ message });

  }, [tasks, taskStreak]);


  const addTask = useCallback((task: Omit<Task, 'id' | 'completed' | 'createdAt' | 'completedAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setTasks(prev => [newTask, ...prev]);
    triggerAIFeedback('add_task', { taskTitle: newTask.text });
  }, [setTasks, triggerAIFeedback]);

  const toggleTask = useCallback((id: string) => {
    let wasCompleted = false;
    let taskTitle = '';
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === id) {
            wasCompleted = !task.completed;
            taskTitle = task.text;
            return { ...task, completed: !task.completed, completedAt: !task.completed ? new Date().toISOString() : null } 
        }
        return task;
      })
    );

    if (wasCompleted) {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        
        if (lastTaskCompletionDate !== todayStr) {
            const yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastTaskCompletionDate === yesterdayStr) {
                setTaskStreak(prev => prev + 1);
            } else {
                setTaskStreak(1);
            }
            setLastTaskCompletionDate(todayStr);
        }
        triggerAIFeedback('complete_task', { taskTitle });
    }
  }, [setTasks, lastTaskCompletionDate, setLastTaskCompletionDate, setTaskStreak, triggerAIFeedback]);

  const deleteTask = useCallback((id: string) => {
    const taskToDelete = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(task => task.id !== id));
    if (taskToDelete) {
        triggerAIFeedback('delete_task', { taskTitle: taskToDelete.text });
    }
  }, [setTasks, tasks, triggerAIFeedback]);

  const editTask = useCallback((id:string, text: string) => {
      setTasks(prev => prev.map(task => task.id === id ? {...task, text} : task));
  }, [setTasks]);

  const addHabit = (text: string) => {
      if (!text.trim() || habits.some(h => h.text.toLowerCase() === text.trim().toLowerCase())) return;
      const newHabit: Habit = {
          id: crypto.randomUUID(),
          text: text.trim(),
          streak: 0,
          lastCompleted: null,
          createdAt: new Date().toISOString(),
          growthStage: 0,
      };
      setHabits(prev => [...prev, newHabit]);
  }
  
  const toggleHabit = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(prevHabits => 
      prevHabits.map(habit => {
        if (habit.id === id) {
          const isCompletedToday = habit.lastCompleted === today;
          if (isCompletedToday) return habit; 

          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const wasCompletedYesterday = habit.lastCompleted === yesterday.toISOString().split('T')[0];
          
          const newStreak = wasCompletedYesterday ? habit.streak + 1 : 1;
          const newGrowthStage = newStreak === 1 ? 1 : Math.min(5, habit.growthStage + 1);

          return {
            ...habit,
            lastCompleted: today,
            streak: newStreak,
            growthStage: newGrowthStage,
          }
        }
        return habit;
      })
    )
  }
  
  const deleteHabit = (id: string) => {
      setHabits(prev => prev.filter(h => h.id !== id));
  }
  
  const handleFabClick = () => {
    triggerAIFeedback('fab_click');
  }

  const goToPreviousDay = () => {
      setSelectedDate(prev => {
          const newDate = new Date(prev);
          newDate.setDate(newDate.getDate() - 1);
          return newDate;
      });
  };

  const goToNextDay = () => {
      setSelectedDate(prev => {
          const newDate = new Date(prev);
          newDate.setDate(newDate.getDate() + 1);
          return newDate;
      });
  };
  
  const goToToday = () => {
      setSelectedDate(new Date());
      setView({ type: 'today' });
  }

  const filteredTasks = useMemo(() => {
    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === selectedDateStr);
  }, [tasks, selectedDate]);
  
  const analyticsData = useMemo<AnalyticsData>(() => {
    const tagMap = new Map<string, number>();
    tasks.forEach(task => {
      if (task.tags && task.tags.length > 0) {
        task.tags.forEach(tag => {
          const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
          tagMap.set(capitalizedTag, (tagMap.get(capitalizedTag) || 0) + 1);
        });
      } else {
        tagMap.set('No Tag', (tagMap.get('No Tag') || 0) + 1);
      }
    });

    return {
      weekly: getWeeklyData(tasks),
      monthly: getMonthlyData(tasks),
      heatmap: getHeatmapData(tasks),
      byCategory: Array.from(tagMap.entries()).map(([name, value]) => ({ name, value }))
    };
  }, [tasks]);

  const renderView = () => {
      switch(view.type) {
        case 'analytics':
            return <AnalyticsView data={analyticsData} />;
        case 'habits':
            return <HabitTrackerView habits={habits} addHabit={addHabit} toggleHabit={toggleHabit} deleteHabit={deleteHabit} />;
        case 'focus':
            return <FocusView />;
        case 'achievements':
            return <AchievementsView achievements={achievements} />;
        case 'today':
             return (
                <>
                    <DayNavigator 
                        selectedDate={selectedDate}
                        goToPreviousDay={goToPreviousDay}
                        goToNextDay={goToNextDay}
                        goToToday={goToToday}
                    />
                    <DashboardHeader taskStreak={taskStreak} />
                    <AddTodoForm addTask={addTask} />
                    <TodoList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} />
                </>
            );
        default:
            return null;
      }
  }

  return (
    <div className="h-screen w-screen flex flex-col transition-colors duration-300" style={{ backgroundColor: 'var(--color-bg-dash)', color: 'var(--color-text-primary)'}}>
      <AIFeedbackBubble feedback={aiFeedback} profile={profile} />
      <Header onSwitchProfile={onSwitchProfile} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar view={view} setView={setView} goToToday={goToToday} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {renderView()}
        </main>
      </div>
       <AIFab onClick={handleFabClick} profile={profile} />
    </div>
  );
};

export default Taskboard;