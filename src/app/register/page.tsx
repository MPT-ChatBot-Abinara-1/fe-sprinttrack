'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserRole, Division } from '@/types/sprinttrack';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'STAFF' as UserRole,
    division: 'MEKANIK' as Division,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO (Dev): Panggil endpoint POST /api/v1/auth/register
    alert(`[Template] Pendaftaran akun diajukan untuk: ${formData.name}`);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm w-full max-w-md space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Daftar Anggota Tim</h2>
          <p className="text-xs text-gray-500 mt-1">
            Daftarkan akun dan nomor WhatsApp aktif Anda untuk integrasi bot SprintTrack.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              required
              placeholder="Fauzan Firdaus"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email ITS</label>
            <input
              type="email"
              required
              placeholder="nama@abinara.its.ac.id"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Nomor WhatsApp Aktif (FR-02)
            </label>
            <input
              type="tel"
              required
              placeholder="081234567890"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Kata Sandi</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Peran (Role)</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="STAFF">Staff (Developer)</option>
                <option value="STAFF_AHLI">Staff Ahli (Reviewer)</option>
                <option value="GM">General Manager</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Divisi</label>
              <select
                value={formData.division}
                onChange={(e) => setFormData({ ...formData, division: e.target.value as Division })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="MEKANIK">Mekanik</option>
                <option value="ELEKTRIK">Elektrik</option>
                <option value="PEMROGRAMAN">Pemrograman</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Daftar Sekarang
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Sudah memiliki akun?{' '}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
