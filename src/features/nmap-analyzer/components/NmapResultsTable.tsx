import { AlertTriangle, ExternalLink } from 'lucide-react'
import type { NmapPortRow } from '../utils/nmapXmlParser'

interface NmapResultsTableProps {
  rows: NmapPortRow[]
}

function stateBadgeClass(state: string) {
  if (state === 'open') return 'bg-emerald-100 text-emerald-700'
  if (state === 'closed') return 'bg-red-100 text-red-700'
  if (state === 'filtered') return 'bg-amber-100 text-amber-700'
  return 'bg-gray-100 text-gray-700'
}

function hostStateBadgeClass(state: string) {
  if (state === 'up') return 'bg-emerald-100 text-emerald-700'
  if (state === 'down') return 'bg-red-100 text-red-700'
  return 'bg-gray-100 text-gray-700'
}

function openExploitSearch(service: string, version: string) {
  const query = `${service} ${version} exploit cve`.trim()
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function NmapResultsTable({ rows }: NmapResultsTableProps) {
  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
        No hay filas para mostrar con los filtros actuales.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-4 py-3">IP</th>
              <th className="px-4 py-3">Host</th>
              <th className="px-4 py-3">Puerto</th>
              <th className="px-4 py-3">Protocolo</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Servicio</th>
              <th className="px-4 py-3">Version</th>
              <th className="px-4 py-3">Accion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/70">
                <td className="px-4 py-3 font-medium">{row.ip}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${hostStateBadgeClass(row.hostState)}`}>
                    {row.hostState}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="inline-flex items-center gap-2">
                    <span>{row.port === 0 ? '-' : row.port}</span>
                    {row.isCritical && (
                      <span
                        className="inline-flex items-center text-red-600"
                        title="Puerto critico: puede exponer servicios sensibles (ej. SMB/RDP)."
                        aria-label="Puerto critico"
                      >
                        <AlertTriangle className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">{row.protocol}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${stateBadgeClass(row.portState)}`}>
                    {row.portState}
                  </span>
                </td>
                <td className="px-4 py-3">{row.service}</td>
                <td className="px-4 py-3">{row.version}</td>
                <td className="px-4 py-3">
                  {row.version !== '-' && row.service !== '-' ? (
                    <button
                      type="button"
                      onClick={() => openExploitSearch(row.service, row.version)}
                      className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-50"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Search Exploit
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
