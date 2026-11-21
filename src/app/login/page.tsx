'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetcher } from '@/lib/api';
import { saveSession, type LoginResponse } from '@/lib/auth';

const inputClass =
  'w-full min-h-[44px] px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder:text-gray-500 ' +
  'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ' +
  'disabled:bg-gray-100 disabled:cursor-not-allowed';

const CREDENTIAL_ERROR = 'Email atau kata sandi yang Anda masukkan salah';
const NETWORK_ERROR = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return; // cegah klik ganda

    setError('');
    if (!email.trim() || !password) {
      setError('Email dan kata sandi wajib diisi.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetcher<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), password }),
      });

      // Simpan token JWT + profil pengguna, lalu langsung ke papan Kanban.
      saveSession(data.token, data.user);
      router.push('/');
    } catch (err) {
      // fetch() melempar TypeError bila server tidak terjangkau.
      setError(err instanceof TypeError ? NETWORK_ERROR : CREDENTIAL_ERROR);
      setIsLoading(false);
    }
    // Saat sukses, isLoading sengaja tetap true sampai halaman berpindah.
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm w-full max-w-md space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Masuk ke SprintTrack</h2>
          <p className="text-xs text-gray-600 mt-1">
            Gunakan akun tim robotik Abinara yang terikat dengan peran dan divisi Anda.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
          >
            {error}
          </div>
        )}

        {/* <form> + onSubmit membuat tombol Enter otomatis bisa mengirim form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="nama@abinara.its.ac.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className={`${inputClass} pr-28`}
              />
              {/* type="button" supaya klik tombol ini tidak mengirim form */}
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-pressed={showPassword}
                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                className="absolute inset-y-1 right-1 min-w-[44px] cursor-pointer rounded-md px-3 text-xs font-semibold text-blue-700 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                {showPassword ? 'Sembunyikan' : 'Tampilkan'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading && (
              <svg
                className="h-4 w-4 animate-spin motion-reduce:animate-none"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            )}
            {isLoading ? 'Memproses…' : 'Masuk'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600">
          Belum punya akun?{' '}
          <Link
            href="/register"
            className="text-blue-700 font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
          >
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
