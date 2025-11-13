export interface Task {
  id: string;
  text: string;
  completed: boolean;
  tags: string[];
  createdAt: string;
  completedAt: string | null;
  dueDate: string;
  priority: number; // 1 (High) to 4 (Low)
}

export interface Habit {
    id: string;
    text: string;
    streak: number;
    lastCompleted: string | null; // ISO Date string
    createdAt: string;
    growthStage: number; // 0 (dead), 1 (sprout) to 5 (lush tree)
}

export type AchievementId = 
    | 'FIRST_TASK'
    | 'TEN_TASKS'
    | 'SEVEN_DAY_STREAK'
    | 'NIGHT_OWL'
    | 'EARLY_BIRD';

export interface Achievement {
    id: AchievementId;
    name: string;
    description: string;
    unlocked: boolean;
    unlockedAt: string | null;
}

export type Profile = 'princess' | 'bunny';

export type Theme = 'light' | 'dark';

export type View = 
    | { type: 'today' }
    | { type: 'analytics' }
    | { type: 'habits' }
    | { type: 'focus' }
    | { type: 'achievements' };

export interface AnalyticsData {
  weekly: { name: string; completed: number }[];
  monthly: { name:string; completed: number }[];
  byCategory: { name: string; value: number }[]; // Re-using for tags
  heatmap: { date: string; count: number }[];
}