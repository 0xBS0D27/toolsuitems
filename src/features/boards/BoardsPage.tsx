import { Link } from 'react-router-dom'
import { LayoutGrid, ArrowLeft } from 'lucide-react'

export function BoardsPage() {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/40">
      <header className="border-b border-gray-200/60 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Inicio
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow-inner">
          <LayoutGrid className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={1.5} />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Próximamente: Tablero Kanban
        </h1>
        <p className="max-w-md text-[14px] text-gray-600 sm:text-[15px]">
          Organiza tus tareas en columnas (Por hacer, En progreso, Hecho). Estamos trabajando en ello.
        </p>
        <Link
          to="/"
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-amber-600"
        >
          Volver al inicio
        </Link>
      </main>
    </div>
  )
}
