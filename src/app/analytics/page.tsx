'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Download } from 'lucide-react';

const mockBurndownData = [
  { day: 'Day 1', ideal: 100, actual: 100 },
  { day: 'Day 2', ideal: 80, actual: 90 },
  { day: 'Day 3', ideal: 60, actual: 65 },
  { day: 'Day 4', ideal: 40, actual: 45 },
  { day: 'Day 5', ideal: 20, actual: 22 },
  { day: 'Day 6', ideal: 0, actual: 5 },
];

export default function AnalyticsPage() {
  const handleDownloadPdf = () => {
    // TODO (Dev): Panggil endpoint GET /api/v1/sprints/:id/report dan trigger download PDF (FR-16)
    alert('[Template] Mengunduh laporan performa sprint dalam format PDF...');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Analitik & Laporan Sprint 1
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Visualisasi Burndown Chart dan rekap performa lintas divisi Tim Robotik Abinara.
          </p>
        </div>

        {/* FR-16: Tombol Unduh Laporan PDF */}
        <button
          onClick={handleDownloadPdf}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          Unduh Laporan PDF (FR-16)
        </button>
      </div>

      {/* Ringkasan Metrik (KPI) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-xs font-medium text-gray-500">Tugas Selesai (Target $\ge$ 80%)</p>
          <p className="text-2xl font-bold text-green-600 mt-1">85%</p>
          <p className="text-xs text-gray-400 mt-1">17 dari 20 tugas telah selesai</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-xs font-medium text-gray-500">Tugas Pending / Tertunda</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">3 Tugas</p>
          <p className="text-xs text-gray-400 mt-1">2 Review, 1 In Progress</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-xs font-medium text-gray-500">Kecepatan Respons Review</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">&lt; 24 Jam</p>
          <p className="text-xs text-gray-400 mt-1">Sesuai KPI non-fungsional PRD</p>
        </div>
      </div>

      {/* FR-15: Grafik Burndown Chart (Recharts) */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Burndown Chart Real-time</h3>
          <p className="text-xs text-gray-500">
            Perbandingan garis ideal burndown dengan estimasi sisa pekerjaan aktual per hari.
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockBurndownData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line
                type="monotone"
                dataKey="ideal"
                name="Garis Ideal"
                stroke="#9ca3af"
                strokeDasharray="5 5"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="actual"
                name="Sisa Aktual"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
