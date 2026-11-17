'use client';

import { Task } from '@/types/sprinttrack';
import { formatDeadline } from '@/lib/utils';
import { Clock, User } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const divisionColors: Record<string, string> = {
    MEKANIK: 'bg-amber-100 text-amber-800 border-amber-200',
    ELEKTRIK: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    PEMROGRAMAN: 'bg-purple-100 text-purple-800 border-purple-200',
  };

  const priorityColors: Record<string, string> = {
    LOW: 'text-gray-500',
    MEDIUM: 'text-blue-500',
    HIGH: 'text-orange-500',
    CRITICAL: 'text-red-600 font-bold',
  };

  return (
    <div
      onClick={() => onClick(task)}
      className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all space-y-3"
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
            divisionColors[task.division] || 'bg-gray-100 text-gray-800'
          }`}
        >
          {task.division}
        </span>
        <span className={`text-xs uppercase font-semibold ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">{task.title}</h4>

      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
        <div className="flex items-center space-x-1.5">
          <User className="w-3.5 h-3.5" />
          <span>{task.assignee?.name || 'Belum ada'}</span>
        </div>
        <div className="flex items-center space-x-1.5 text-gray-600">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatDeadline(task.deadline)}</span>
        </div>
      </div>
    </div>
  );
}
