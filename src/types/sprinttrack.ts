export type UserRole = 'GM' | 'STAFF_AHLI' | 'STAFF';

export type Division = 'MEKANIK' | 'ELEKTRIK' | 'PEMROGRAMAN';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  division: Division;
}

export interface ActivityLog {
  id: string;
  taskId: string;
  userId: string;
  user?: User;
  message: string;
  createdAt: string;
}

export interface Task {
  id: string;
  storyId?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string;
  division: Division;
  assigneeId: string;
  assignee?: User;
  logs?: ActivityLog[];
  createdAt: string;
  updatedAt: string;
}

export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface BurndownPoint {
  date: string;
  idealRemaining: number;
  actualRemaining: number;
}
