import { Task } from '../types';

export const getWeeklyData = (tasks: Task[]) => {
    const completedTasks = tasks.filter(t => t.completed && t.completedAt);
    const weeklyMap = new Map<string, number>();
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toLocaleDateString('en-US', { weekday: 'short' });
        weeklyMap.set(key, 0);
    }
    completedTasks.forEach(task => {
        const completedDate = new Date(task.completedAt!);
        if (new Date().getTime() - completedDate.getTime() < 7 * 24 * 60 * 60 * 1000) {
            const day = completedDate.toLocaleDateString('en-US', { weekday: 'short' });
            weeklyMap.set(day, (weeklyMap.get(day) || 0) + 1);
        }
    });
    return Array.from(weeklyMap.entries()).map(([name, completed]) => ({ name, completed }));
}

export const getMonthlyData = (tasks: Task[]) => {
    const completedTasks = tasks.filter(t => t.completed && t.completedAt);
    const monthlyMap = new Map<string, number>();
    const currentMonth = new Date().getMonth();
    for (let i = 3; i >= 0; i--) {
        const d = new Date();
        d.setDate(1);
        d.setMonth(currentMonth - i);
        monthlyMap.set(d.toLocaleDateString('en-US', { month: 'short' }), 0);
    }
    completedTasks.forEach(task => {
        const completedDate = new Date(task.completedAt!);
        const month = completedDate.toLocaleDateString('en-US', { month: 'short' });
        if (monthlyMap.has(month)) {
            monthlyMap.set(month, (monthlyMap.get(month) || 0) + 1);
        }
    });
    return Array.from(monthlyMap.entries()).map(([name, completed]) => ({ name, completed }));
}

export const getHeatmapData = (tasks: Task[]) => {
    const completedTasks = tasks.filter(t => t.completed && t.completedAt);
    const dateMap = new Map<string, number>();
    completedTasks.forEach(task => {
        const dateStr = new Date(task.completedAt!).toISOString().split('T')[0];
        dateMap.set(dateStr, (dateMap.get(dateStr) || 0) + 1);
    });
    return Array.from(dateMap.entries()).map(([date, count]) => ({ date, count }));
};
