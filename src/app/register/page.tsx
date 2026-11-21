'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetcher } from '@/lib/api';
import type { UserRole, Division } from '@/types/sprinttrack';

const inputClass =
  'w-full min-h-[44px] px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder:text-gray-500 ' +
  'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ' +
  'aria-[invalid=true]:border-red-600 disabled:bg-gray-100 disabled:cursor-not-allowed';

type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  division: Division;
};
type FormErrors = Partial<Record<'name' | 'email' | 'phone' | 'password', string>>;

/* ---------- Validasi sisi klien ---------- */
function validate(f: FormData): FormErrors {
  const e: FormErrors = {};

  if (!f.name.trim()) e.name = 'Nama lengkap wajib diisi.';

  if (!f.email.trim()) e.email = 'Email wajib diisi.';
  else if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Format email tidak valid.';

  const phone = f.phone.trim();
  if (!phone) e.phone = 'Nomor WhatsApp wajib diisi.';
  else if (!/^\d+$/.test(phone)) e.phone = 'Nomor WhatsApp hanya boleh berisi angka.';
  else if (phone.length < 10) e.phone = 'Nomor WhatsApp minimal 10 digit.';

  if (f.password.length < 6) e.password = 'Kata sandi minimal 6 karakter.';

  return e;
}

/* ---------- Pembungkus label + petunjuk + pesan error ---------- */
function Field(props: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  const { id, label, hint, error, children } = props;
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-700 mb-1">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-gray-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'STAFF',
    division: 'MEKANIK',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Bersihkan timer bila pengguna meninggalkan halaman sebelum 1,5 detik.
  useEffect(() => {
    return () => {
      if (redirectTimer.current) clearTimeout(redirectTimer.current);
    };
  }, []);

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || success) return; // cegah klik ganda

    setServerError('');
    const found = validate(formData);
    setErrors(found);
    if (Object.keys(found).length > 0) return; // ada error -> jangan kirim

    setIsLoading(true);
    try {
      await fetcher('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
          role: formData.role,
          division: formData.division,
        }),
      });
      setSuccess(true);
      redirectTimer.current = setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      setServerError(
        err instanceof TypeError
          ? 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
          : err instanceof Error
            ? err.message
            : 'Terjadi kesalahan tak terduga. Silakan coba lagi.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const disabled = isLoading || success;

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm w-full max-w-md space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Daftar Anggota Tim</h2>
          <p className="text-xs text-gray-600 mt-1">
            Daftarkan akun dan nomor WhatsApp aktif Anda untuk integrasi bot SprintTrack.
          </p>
        </div>

        {/* Error dari server (mis. email/nomor sudah terdaftar) */}
        {serverError && (
          <div
            role="alert"
            className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
          >
            {serverError}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-900"
          >
            Akun berhasil dibuat. Mengarahkan Anda ke halaman masuk…
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Field id="name" label="Nama Lengkap" error={errors.name}>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Fauzan Firdaus"
              value={formData.name}
              onChange={(e) => setField('name', e.target.value)}
              disabled={disabled}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={inputClass}
            />
          </Field>

          <Field id="email" label="Email Kampus / Institusi" error={errors.email}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="nama@abinara.its.ac.id"
              value={formData.email}
              onChange={(e) => setField('email', e.target.value)}
              disabled={disabled}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={inputClass}
            />
          </Field>

          <Field
            id="phone"
            label="Nomor WhatsApp Aktif"
            hint="Gunakan format 62812…, hanya angka tanpa spasi, tanda + atau tanda hubung."
            error={errors.phone}
          >
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="628123456789"
              value={formData.phone}
              onChange={(e) => setField('phone', e.target.value)}
              disabled={disabled}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
              className={inputClass}
            />
          </Field>

          <Field id="password" label="Kata Sandi" hint="Minimal 6 karakter." error={errors.password}>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setField('password', e.target.value)}
              disabled={disabled}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : 'password-hint'}
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field id="role" label="Peran (Role)">
              <select
                id="role"
                value={formData.role}
                onChange={(e) => setField('role', e.target.value as UserRole)}
                disabled={disabled}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="STAFF">Staff</option>
                <option value="STAFF_AHLI">Staff Ahli</option>
                <option value="GM">GM</option>
              </select>
            </Field>

            <Field id="division" label="Divisi">
              <select
                id="division"
                value={formData.division}
                onChange={(e) => setField('division', e.target.value as Division)}
                disabled={disabled}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="MEKANIK">Mekanik</option>
                <option value="ELEKTRIK">Elektrik</option>
                <option value="PEMROGRAMAN">Pemrograman</option>
              </select>
            </Field>
          </div>

          <button
            type="submit"
            disabled={disabled}
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
            {isLoading ? 'Memproses…' : 'Daftar Akun'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600">
          Sudah memiliki akun?{' '}
          <Link
            href="/login"
            className="text-blue-700 font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
