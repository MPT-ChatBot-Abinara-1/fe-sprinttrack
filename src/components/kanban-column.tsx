'use client';

import { Task, TaskStatus } from '@/types/sprinttrack';
import { TaskCard } from './task-card';

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function KanbanColumn({ status, title, tasks, onTaskClick }: KanbanColumnProps) {
  const columnHeaderColors: Record<TaskStatus, string> = {
    TODO: 'border-t-4 border-gray-400',
    IN_PROGRESS: 'border-t-4 border-blue-500',
    REVIEW: 'border-t-4 border-amber-500',
    DONE: 'border-t-4 border-green-500',
  };

  return (
    <div className={`flex flex-col bg-gray-50 rounded-xl p-3 border border-gray-200 min-h-[500px] ${columnHeaderColors[status]}`}>
      <div className="flex items-center justify-between px-1 py-2 mb-2">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={onTaskClick} />
        ))}
        {tasks.length === 0 && (
          <div className="h-32 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400">
            Tidak ada tugas
          </div>
        )}
      </div>
    </div>
  );
}
