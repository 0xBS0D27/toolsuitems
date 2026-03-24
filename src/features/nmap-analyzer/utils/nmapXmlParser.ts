export interface NmapPortRow {
  id: string
  ip: string
  hostState: string
  port: number
  protocol: string
  portState: string
  service: string
  version: string
  isCritical: boolean
}

const CRITICAL_PORTS = new Set([21, 22, 23, 80, 443, 445, 3306, 3389])

function textValue(value: string | null | undefined, fallback = '-'): string {
  const normalized = value?.trim()
  return normalized ? normalized : fallback
}

export function parseNmapXml(xmlText: string): NmapPortRow[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlText, 'application/xml')
  const parserError = doc.querySelector('parsererror')

  if (parserError) {
    throw new Error('El XML no es valido o esta corrupto.')
  }

  const hosts = Array.from(doc.querySelectorAll('host'))
  const rows: NmapPortRow[] = []

  hosts.forEach((host, hostIndex) => {
    const addressNode = host.querySelector('address[addrtype="ipv4"], address')
    const ip = textValue(addressNode?.getAttribute('addr'), 'Sin IP')
    const hostState = textValue(host.querySelector('status')?.getAttribute('state'), 'unknown')
    const ports = Array.from(host.querySelectorAll('ports > port'))

    if (!ports.length) {
      rows.push({
        id: `${hostIndex}-no-ports`,
        ip,
        hostState,
        port: 0,
        protocol: '-',
        portState: 'sin-datos',
        service: '-',
        version: '-',
        isCritical: false,
      })
      return
    }

    ports.forEach((portNode, portIndex) => {
      const port = Number.parseInt(portNode.getAttribute('portid') ?? '0', 10)
      const protocol = textValue(portNode.getAttribute('protocol'))
      const portState = textValue(portNode.querySelector('state')?.getAttribute('state'), 'unknown')
      const serviceNode = portNode.querySelector('service')
      const service = textValue(serviceNode?.getAttribute('name'))
      const product = textValue(serviceNode?.getAttribute('product'), '')
      const version = textValue(serviceNode?.getAttribute('version'), '')
      const extraInfo = textValue(serviceNode?.getAttribute('extrainfo'), '')
      const versionText = [product, version, extraInfo].filter(Boolean).join(' ').trim()

      rows.push({
        id: `${hostIndex}-${portIndex}-${ip}-${port}`,
        ip,
        hostState,
        port,
        protocol,
        portState,
        service,
        version: versionText || '-',
        isCritical: CRITICAL_PORTS.has(port),
      })
    })
  })

  return rows
}

export function exportRowsToJson(rows: NmapPortRow[]): string {
  return JSON.stringify(rows, null, 2)
}

function csvEscape(value: string | number): string {
  const str = String(value ?? '')
  if (str.includes('"') || str.includes(',') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export function exportRowsToCsv(rows: NmapPortRow[]): string {
  const headers = ['IP', 'HostState', 'Port', 'Protocol', 'PortState', 'Service', 'Version', 'Critical']
  const lines = rows.map((row) =>
    [
      row.ip,
      row.hostState,
      row.port === 0 ? '-' : row.port,
      row.protocol,
      row.portState,
      row.service,
      row.version,
      row.isCritical ? 'yes' : 'no',
    ]
      .map(csvEscape)
      .join(',')
  )
  return [headers.join(','), ...lines].join('\n')
}

export function downloadTextFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
