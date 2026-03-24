import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { NmapDropzone } from './components/NmapDropzone'
import { NmapResultsTable } from './components/NmapResultsTable'
import { useNmapAnalyzer } from './hooks/useNmapAnalyzer'

export function NmapAnalyzerPage() {
  const {
    rows,
    filteredRows,
    search,
    setSearch,
    onlyOpen,
    setOnlyOpen,
    criticalOnly,
    setCriticalOnly,
    fileName,
    error,
    loadXmlText,
    exportJson,
    exportCsv,
  } = useNmapAnalyzer()

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-slate-50 via-indigo-50/20 to-emerald-50/20">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex items-start justify-between gap-3">
          <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900 sm:text-3xl">
            <ShieldAlert className="h-8 w-8 text-emerald-600 sm:h-9 sm:w-9" />
            <span>Nmap XML Parser & Security Analyzer</span>
          </h1>
          <Link
            to="/"
            className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Volver
          </Link>
        </div>

        <NmapDropzone onFileLoaded={loadXmlText} />

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {rows.length > 0 && (
          <>
            <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm text-gray-600">Archivo cargado: <span className="font-semibold text-gray-800">{fileName}</span></p>
                  <p className="text-sm text-gray-600">
                    Registros visibles: <span className="font-semibold text-gray-800">{filteredRows.length}</span> / {rows.length}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={exportJson}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Exportar JSON
                  </button>
                  <button
                    type="button"
                    onClick={exportCsv}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Exportar CSV
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por IP, servicio, puerto o version..."
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
                <button
                  type="button"
                  onClick={() => setOnlyOpen((v) => !v)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    onlyOpen ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Solo Abiertos
                </button>
                <button
                  type="button"
                  onClick={() => setCriticalOnly((v) => !v)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    criticalOnly ? 'bg-red-600 text-white hover:bg-red-700' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Puertos Criticos
                </button>
              </div>
            </section>

            <div className="mt-5">
              <NmapResultsTable rows={filteredRows} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
