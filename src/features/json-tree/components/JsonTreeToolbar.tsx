import { useState } from 'react'
import { ZoomIn, ZoomOut, Focus, Sun, Moon, Download } from 'lucide-react'
import { DownloadImageModal } from './DownloadImageModal'

type Props = {
  fullscreen: boolean
  toggleFullscreen: (v: boolean) => void
  direction: string
  setDirection: () => void
  centerView: () => void
  zoomIn: () => void
  zoomOut: () => void
  lightmode: boolean
  setLightTheme: (v: boolean) => void
}

export function JsonTreeToolbar(props: Props) {
  const [downloadOpen, setDownloadOpen] = useState(false)

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className={`flex h-8 w-8 items-center justify-center rounded border ${
          props.lightmode
            ? 'border-gray-300 text-gray-700 hover:bg-gray-100'
            : 'border-zinc-600 bg-zinc-800 text-gray-300 hover:border-amber-400 hover:text-amber-400'
        }`}
        aria-label="Descargar imagen"
        onClick={() => setDownloadOpen(true)}
      >
        <Download className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={`hidden h-8 w-8 items-center justify-center rounded border md:flex ${
          props.lightmode
            ? 'border-gray-300 text-gray-700 hover:bg-gray-100'
            : 'border-zinc-600 bg-zinc-800 text-gray-300 hover:border-amber-400 hover:text-amber-400'
        }`}
        aria-label="Zoom +"
        onClick={props.zoomIn}
      >
        <ZoomIn className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={`hidden h-8 w-8 items-center justify-center rounded border md:flex ${
          props.lightmode
            ? 'border-gray-300 text-gray-700 hover:bg-gray-100'
            : 'border-zinc-600 bg-zinc-800 text-gray-300 hover:border-amber-400 hover:text-amber-400'
        }`}
        aria-label="Zoom -"
        onClick={props.zoomOut}
      >
        <ZoomOut className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={`flex h-8 w-8 items-center justify-center rounded border ${
          props.lightmode
            ? 'border-gray-300 text-gray-700 hover:bg-gray-100'
            : 'border-zinc-600 bg-zinc-800 text-gray-300 hover:border-amber-400 hover:text-amber-400'
        }`}
        aria-label="Centrar vista"
        onClick={props.centerView}
      >
        <Focus className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={`flex h-8 w-8 items-center justify-center rounded border ${
          props.lightmode
            ? 'border-gray-300 text-gray-700 hover:bg-gray-100'
            : 'border-zinc-600 bg-zinc-800 text-gray-300 hover:border-amber-400 hover:text-amber-400'
        }`}
        aria-label="Tema"
        onClick={() => props.setLightTheme(!props.lightmode)}
      >
        {props.lightmode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </button>
      <DownloadImageModal isOpen={downloadOpen} onClose={() => setDownloadOpen(false)} />
    </div>
  )
}
