import { Achievement, AchievementId, Task, Habit } from '../types';

export const achievementDefinitions: Record<AchievementId, Omit<Achievement, 'unlocked' | 'unlockedAt'>> = {
  FIRST_TASK: {
    id: 'FIRST_TASK',
    name: 'Task Initiator',
    description: 'Complete your very first task.',
  },
  TEN_TASKS: {
    id: 'TEN_TASKS',
    name: 'Task Master',
    description: 'Complete 10 tasks.',
  },
  SEVEN_DAY_STREAK: {
    id: 'SEVEN_DAY_STREAK',
    name: 'Habit Guru',
    description: 'Maintain a 7-day streak on any habit.',
  },
  NIGHT_OWL: {
    id: 'NIGHT_OWL',
    name: 'Night Owl',
    description: 'Complete a task after 10 PM.',
  },
  EARLY_BIRD: {
    id: 'EARLY_BIRD',
    name: 'Early Bird',
    description: 'Complete a task before 8 AM.',
  },
};

export const checkAchievements = (
  tasks: Task[],
  habits: Habit[],
  currentAchievements: Achievement[]
): AchievementId[] => {
  const unlocked: AchievementId[] = [];
  const completedTasks = tasks.filter(t => t.completed);

  // FIRST_TASK
  if (completedTasks.length >= 1) {
    unlocked.push('FIRST_TASK');
  }

  // TEN_TASKS
  if (completedTasks.length >= 10) {
    unlocked.push('TEN_TASKS');
  }

  // SEVEN_DAY_STREAK
  if (habits.some(h => h.streak >= 7)) {
    unlocked.push('SEVEN_DAY_STREAK');
  }

  // NIGHT_OWL & EARLY_BIRD
  completedTasks.forEach(task => {
    if (task.completedAt) {
      const hour = new Date(task.completedAt).getHours();
      if (hour >= 22) unlocked.push('NIGHT_OWL');
      if (hour < 8) unlocked.push('EARLY_BIRD');
    }
  });

  // Return only newly unlocked achievements
  const currentlyUnlockedIds = new Set(
    currentAchievements.filter(a => a.unlocked).map(a => a.id)
  );

  return [...new Set(unlocked)].filter(id => !currentlyUnlockedIds.has(id));
};