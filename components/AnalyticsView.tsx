import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AnalyticsData } from '../types';

interface AnalyticsViewProps {
  data: AnalyticsData;
}

const COLORS = ['var(--color-primary)', 'var(--color-tertiary)', 'var(--color-accent)', 'var(--color-secondary)'];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 text-sm rounded-lg shadow-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                <p className="font-bold">{label}</p>
                <p>{`${payload[0].name}: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const ProductivityHeatmap = ({ data }: { data: { date: string, count: number }[] }) => {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 365);
    
    const dates = new Map(data.map(item => [item.date, item.count]));
    const maxCount = Math.max(...data.map(d => d.count), 1);

    const days = [];
    let currentDate = new Date(startDate);
    
    // Align to the last Sunday
    currentDate.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7 * 53; i++) { // 7 days * 53 weeks
        const dateStr = currentDate.toISOString().split('T')[0];
        const count = dates.get(dateStr) || 0;
        days.push({ date: dateStr, count });
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    const getColor = (count: number) => {
        if (count === 0) return 'var(--color-bg-sidebar)';
        const opacity = Math.max(0.3, Math.min(1, count / (maxCount / 1.5)));
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-text').trim();
        const [r, g, b] = primaryColor.match(/\w\w/g)?.map(x => parseInt(x, 16)) ?? [109, 40, 217];
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="overflow-x-auto p-2">
            <div className="grid grid-rows-8 grid-flow-col gap-1">
                {/* Day Labels */}
                <div className="w-8 text-xs" style={{color: 'var(--color-text-secondary)'}}></div>
                 {dayLabels.map((day, i) => i % 2 !== 0 ? <div key={day} className="h-4 text-xs flex items-center" style={{color: 'var(--color-text-secondary)'}}>{day}</div> : <div key={day} className="h-4"></div>)}

                {/* Heatmap cells */}
                {days.map(day => (
                    <div key={day.date} className="w-4 h-4 rounded-sm" style={{ backgroundColor: getColor(day.count) }} title={`${day.count} tasks on ${day.date}`}></div>
                ))}
            </div>
        </div>
    );
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ data }) => {
    const tickColor = 'var(--color-text-secondary)';
    const gridColor = 'var(--color-border)';

    return (
        <div className="space-y-8 animate-card-rise" style={{ animationDelay: '100ms' }}>
             <div className="p-6 rounded-2xl shadow-sm" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)'}}>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Productivity Heatmap</h3>
                <ProductivityHeatmap data={data.heatmap} />
            </div>

            <div className="p-6 rounded-2xl shadow-sm" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)'}}>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Weekly Completions</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.weekly}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                        <XAxis dataKey="name" stroke={tickColor} fontSize={12} />
                        <YAxis stroke={tickColor} fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{fontSize: "14px"}} />
                        <Bar dataKey="completed" fill="var(--color-primary-text)" name="Tasks Completed" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl shadow-sm" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)'}}>
                    <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Monthly Completions</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data.monthly}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                            <XAxis dataKey="name" stroke={tickColor} fontSize={12} />
                            <YAxis stroke={tickColor} fontSize={12}/>
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="completed" fill="var(--color-accent-text)" name="Tasks Completed" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="p-6 rounded-2xl shadow-sm" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)'}}>
                    <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Tasks by Tag</h3>
                     {data.byCategory.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={data.byCategory}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    labelStyle={{ fontSize: '12px', fill: 'var(--color-text-secondary)' }}
                                >
                                    {data.byCategory.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-[300px]" style={{ color: 'var(--color-text-secondary)' }}>
                           No tag data to display.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsView;