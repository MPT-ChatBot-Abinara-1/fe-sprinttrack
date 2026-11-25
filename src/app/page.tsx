'use client';
import { ProtectedRoute } from '@/components/protected-route';
import { useState, useEffect } from 'react';
import { Task, TaskStatus, Division } from '@/types/sprinttrack';
import { KanbanColumn } from '@/components/kanban-column';
import { TaskDetailModal } from '@/components/task-detail-modal';
import { getSocket } from '@/lib/socket';
import { Filter } from 'lucide-react';

// Starter mock data agar template langsung memiliki tampilan fungsional
const initialTasks: Task[] = [
  {
    id: 'T-101',
    title: 'Desain Mekanisme Penjepit Sensor Kebakaran',
    description: 'Rancang modul bracket penjepit menggunakan SolidWorks dan ekspor ke STL untuk 3D Print.',
    status: 'TODO',
    priority: 'HIGH',
    division: 'MEKANIK',
    assigneeId: 'u-1',
    assignee: { id: 'u-1', name: 'Budi Santoso', email: 'budi@abinara.its.ac.id', phone: '6281234567890', role: 'STAFF', division: 'MEKANIK' },
    deadline: '2026-11-25T17:00:00Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'T-102',
    title: 'Kalibrasi Pembacaan Sensor IMU BNO055 via I2C',
    description: 'Implementasi filter Kalman dan verifikasi stabilitas orientasi robot saat bergerak cepat.',
    status: 'IN_PROGRESS',
    priority: 'CRITICAL',
    division: 'ELEKTRIK',
    assigneeId: 'u-2',
    assignee: { id: 'u-2', name: 'Siti Rahma', email: 'siti@abinara.its.ac.id', phone: '6289876543210', role: 'STAFF', division: 'ELEKTRIK' },
    deadline: '2026-11-20T12:00:00Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'T-103',
    title: 'Algoritma Path Planning A* pada Navigasi Maze',
    description: 'Optimasi waktu pencarian rute pada peta grid 2D dan pengujian integrasi dengan ROS2 node.',
    status: 'REVIEW',
    priority: 'MEDIUM',
    division: 'PEMROGRAMAN',
    assigneeId: 'u-3',
    assignee: { id: 'u-3', name: 'Ahmad Faiz', email: 'faiz@abinara.its.ac.id', phone: '6281122334455', role: 'STAFF', division: 'PEMROGRAMAN' },
    deadline: '2026-11-19T23:59:00Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'T-104',
    title: 'Wiring Harness Motor Servo Dynamixel',
    description: 'Penyusunan kabel daya dan sinyal TTL pada kaki robot sisi kanan.',
    status: 'DONE',
    priority: 'LOW',
    division: 'ELEKTRIK',
    assigneeId: 'u-2',
    assignee: { id: 'u-2', name: 'Siti Rahma', email: 'siti@abinara.its.ac.id', phone: '6289876543210', role: 'STAFF', division: 'ELEKTRIK' },
    deadline: '2026-11-18T10:00:00Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedDivision, setSelectedDivision] = useState<Division | 'ALL'>('ALL');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // FR-07: Real-time update listener via WebSocket
  useEffect(() => {
    const socket = getSocket();

    socket.on('task:updated', (updatedTask: Partial<Task> & { taskId?: string; id?: string }) => {
      const targetId = updatedTask.taskId || updatedTask.id;
      if (!targetId) return;

      setTasks((prev) =>
        prev.map((t) => (t.id === targetId ? { ...t, ...updatedTask } as Task : t))
      );
    });

    return () => {
      socket.off('task:updated');
    };
  }, []);

  // FR-08: Filter papan Kanban per divisi
  const filteredTasks = tasks.filter((task) =>
    selectedDivision === 'ALL' ? true : task.division === selectedDivision
  );

  const columns: { status: TaskStatus; title: string }[] = [
    { status: 'TODO', title: 'To Do' },
    { status: 'IN_PROGRESS', title: 'In Progress' },
    { status: 'REVIEW', title: 'Review' },
    { status: 'DONE', title: 'Done' },
  ];

   return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Dashboard & Filter Divisi (FR-08) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Papan Kanban Sprint 1</h1>
          <p className="text-xs text-gray-500 mt-1">
            Pantau dan perbarui status tugas teknis Tim Robotik Abinara secara real-time.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-semibold text-gray-600">Filter Divisi:</span>
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value as Division | 'ALL')}
            className="text-xs font-medium border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">Semua Divisi</option>
            <option value="MEKANIK">Mekanik</option>
            <option value="ELEKTRIK">Elektrik</option>
            <option value="PEMROGRAMAN">Pemrograman</option>
          </select>
        </div>
      </div>

      {/* Grid 4 Kolom Kanban (FR-06) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => (
          <KanbanColumn
            key={col.status}
            status={col.status}
            title={col.title}
            tasks={filteredTasks.filter((t) => t.status === col.status)}
            onTaskClick={(task) => setSelectedTask(task)}
          />
        ))}
      </div>

      {/* Drawer / Modal Detail Tugas (FR-09, FR-10, FR-11) */}
      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onStatusChange={(taskId, newStatus) => {
          setTasks((prev) =>
            prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
          );
          setSelectedTask(null);
        }}
      />
    </div>
    </ProtectedRoute>
  );
}
