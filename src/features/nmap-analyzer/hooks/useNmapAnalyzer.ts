import { useMemo, useState } from 'react'
import {
  downloadTextFile,
  exportRowsToCsv,
  exportRowsToJson,
  parseNmapXml,
  type NmapPortRow,
} from '../utils/nmapXmlParser'

const CRITICAL_PORTS = new Set([21, 22, 23, 80, 443, 445, 3306, 3389])

export function useNmapAnalyzer() {
  const [rows, setRows] = useState<NmapPortRow[]>([])
  const [search, setSearch] = useState('')
  const [onlyOpen, setOnlyOpen] = useState(false)
  const [criticalOnly, setCriticalOnly] = useState(false)
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState('')

  const loadXmlText = (xmlText: string, sourceName: string) => {
    try {
      const parsed = parseNmapXml(xmlText)
      setRows(parsed)
      setFileName(sourceName)
      setError('')
    } catch (e) {
      const message = e instanceof Error ? e.message : 'No se pudo analizar el archivo XML.'
      setError(message)
      setRows([])
      setFileName('')
    }
  }

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase()
    return rows.filter((row) => {
      if (onlyOpen && row.portState !== 'open') return false
      if (criticalOnly && !CRITICAL_PORTS.has(row.port)) return false
      if (!query) return true

      const hayMatch =
        row.ip.toLowerCase().includes(query) ||
        row.service.toLowerCase().includes(query) ||
        String(row.port).includes(query) ||
        row.version.toLowerCase().includes(query)

      return hayMatch
    })
  }, [rows, search, onlyOpen, criticalOnly])

  const exportJson = () => {
    const content = exportRowsToJson(filteredRows)
    downloadTextFile('nmap-analisis-filtrado.json', content, 'application/json;charset=utf-8')
  }

  const exportCsv = () => {
    const content = exportRowsToCsv(filteredRows)
    downloadTextFile('nmap-analisis-filtrado.csv', content, 'text/csv;charset=utf-8')
  }

  return {
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
  }
}
