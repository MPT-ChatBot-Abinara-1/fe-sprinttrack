'use client';

import { useState } from 'react';
import { Task, TaskStatus } from '@/types/sprinttrack';
import { formatDeadline } from '@/lib/utils';
import { X, Send, CheckCircle, AlertTriangle } from 'lucide-react';

interface TaskDetailModalProps {
  task: Task | null;
  onClose: () => void;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
}

export function TaskDetailModal({ task, onClose, onStatusChange }: TaskDetailModalProps) {
  const [logInput, setLogInput] = useState('');
  const [revisionNote, setRevisionNote] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  if (!task) return null;

  const handleUpdateStatus = (status: TaskStatus) => {
    // TODO (Dev): Panggil endpoint PATCH /api/v1/tasks/:id/status
    onStatusChange?.(task.id, status);
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logInput.trim()) return;

    // TODO (Dev): Panggil endpoint POST /api/v1/tasks/:id/logs
    console.log('Menambahkan log aktivitas:', logInput);
    setLogInput('');
  };

  const handleApprove = () => {
    // TODO (Dev): Panggil endpoint POST /api/v1/tasks/:id/review { decision: 'APPROVED' }
    console.log('Approve tugas:', task.id);
  };

  const handleReject = () => {
    if (!revisionNote.trim()) {
      alert('Catatan revisi wajib diisi jika menolak tugas!');
      return;
    }
    // TODO (Dev): Panggil endpoint POST /api/v1/tasks/:id/review { decision: 'REJECTED', revisionNote }
    console.log('Reject tugas:', task.id, revisionNote);
    setIsRejecting(false);
    setRevisionNote('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
              {task.division}
            </span>
            <h2 className="text-lg font-bold text-gray-900 mt-1">{task.title}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-sm text-gray-700">
          <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-xs text-gray-500">Penanggung Jawab</p>
              <p className="font-semibold text-gray-900">{task.assignee?.name || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Deadline</p>
              <p className="font-semibold text-gray-900">{formatDeadline(task.deadline)}</p>
            </div>
          </div>

          {/* Deskripsi & Kriteria (FR-09) */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Deskripsi & Spesifikasi Teknis</h4>
            <p className="text-gray-600 whitespace-pre-wrap">{task.description || 'Tidak ada deskripsi'}</p>
          </div>

          {/* Pembaruan Status (FR-10) */}
          <div className="p-4 border border-gray-200 rounded-lg space-y-2">
            <h4 className="font-semibold text-gray-900">Ubah Status Tugas</h4>
            <div className="flex flex-wrap gap-2">
              {(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'] as TaskStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => handleUpdateStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    task.status === status
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Alur Review Staff Ahli (FR-11) */}
          {task.status === 'REVIEW' && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-3">
              <h4 className="font-semibold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Tindakan Review (Staff Ahli)
              </h4>
              <p className="text-xs text-amber-700">
                Tugas ini menunggu persetujuan Staff Ahli sebelum dapat ditandai selesai.
              </p>
              {!isRejecting ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleApprove}
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Approve (Done)
                  </button>
                  <button
                    onClick={() => setIsRejecting(true)}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700"
                  >
                    Reject (Revisi)
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <textarea
                    placeholder="Masukkan catatan revisi wajib..."
                    value={revisionNote}
                    onChange={(e) => setRevisionNote(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-xs"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleReject}
                      className="px-3 py-1 bg-red-600 text-white rounded text-xs font-semibold"
                    >
                      Kirim Penolakan
                    </button>
                    <button
                      onClick={() => setIsRejecting(false)}
                      className="px-3 py-1 border border-gray-300 rounded text-xs"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Log Aktivitas (FR-10) */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Log Aktivitas</h4>
            <form onSubmit={handleAddLog} className="flex gap-2">
              <input
                type="text"
                placeholder="Catat progres atau kendala..."
                value={logInput}
                onChange={(e) => setLogInput(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                Catat
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
