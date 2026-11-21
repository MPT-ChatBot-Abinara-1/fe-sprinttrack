'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AUTH_EVENT, clearSession, getUser } from '@/lib/auth';
import type { Division, User } from '@/types/sprinttrack';

// Warna lencana divisi, disamakan dengan warna lencana di kartu Kanban.
const DIVISION_BADGE: Record<Division, { label: string; className: string }> = {
  MEKANIK: { label: 'Mekanik', className: 'bg-amber-100 text-amber-800' },
  ELEKTRIK: { label: 'Elektrik', className: 'bg-emerald-100 text-emerald-800' },
  PEMROGRAMAN: { label: 'Pemrograman', className: 'bg-purple-100 text-purple-800' },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2';

export function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  // "ready" mencegah kedipan: sebelum localStorage dibaca, area tombol auth dikosongkan dulu.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setUser(getUser());
      setReady(true);
    };
    sync(); // baca saat pertama tampil

    window.addEventListener(AUTH_EVENT, sync); // login/logout di tab ini
    window.addEventListener('storage', sync); // login/logout di tab lain
    return () => {
      window.removeEventListener(AUTH_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const handleLogout = () => {
    clearSession();
    router.push('/login');
  };

  const badge = user ? DIVISION_BADGE[user.division] : null;

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className={`flex items-center space-x-2 rounded ${focusRing}`}>
            <span className="text-xl font-bold tracking-tight text-blue-600">SprintTrack</span>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">
              Abinara-1
            </span>
          </Link>

          <nav className="hidden md:flex space-x-4" aria-label="Navigasi utama">
            <Link
              href="/"
              className={`text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded ${focusRing}`}
            >
              Papan Kanban
            </Link>
            <Link
              href="/analytics"
              className={`text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded ${focusRing}`}
            >
              Analitik & Burndown
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          {ready && !user && (
            <>
              <Link
                href="/login"
                className={`inline-flex items-center min-h-[44px] text-sm font-medium px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer ${focusRing}`}
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className={`inline-flex items-center min-h-[44px] text-sm font-medium px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer ${focusRing}`}
              >
                Daftar
              </Link>
            </>
          )}

          {ready && user && (
            <>
              <span className="hidden sm:inline max-w-[200px] truncate text-sm font-medium text-gray-900">
                {user.name}
              </span>
              {badge && (
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${badge.className}`}>
                  {badge.label}
                </span>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className={`min-h-[44px] text-sm font-medium px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer ${focusRing}`}
              >
                Keluar
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
