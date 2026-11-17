import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-3xl font-bold text-gray-900">404 - Halaman Tidak Ditemukan</h2>
      <p className="text-sm text-gray-500 mt-2">Halaman yang Anda tuju tidak tersedia di SprintTrack.</p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
