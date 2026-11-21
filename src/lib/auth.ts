// src/lib/auth.ts
// Semua urusan "siapa yang sedang login" dikumpulkan di sini, supaya
// halaman lain tidak menulis localStorage sendiri-sendiri.
import type { User } from '@/types/sprinttrack';

export interface LoginResponse {
  token: string;
  user: User;
}

/** Nama event kustom; Navbar mendengarkan ini agar langsung berubah saat login/logout. */
export const AUTH_EVENT = 'auth-change';

export function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null; // data rusak -> anggap belum login
  }
}

export function saveSession(token: string, user: User): void {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearSession(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.dispatchEvent(new Event(AUTH_EVENT));
}
