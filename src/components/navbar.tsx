import Link from 'next/link';

export function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-blue-600">SprintTrack</span>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">
              Abinara-1
            </span>
          </Link>

          <nav className="hidden md:flex space-x-4">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Papan Kanban
            </Link>
            <Link
              href="/analytics"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Analitik & Burndown
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/login"
            className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Daftar
          </Link>
        </div>
      </div>
    </header>
  );
}
