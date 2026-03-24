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

  const btn =
    props.lightmode
      ? 'border-gray-300 text-gray-700 hover:bg-gray-100'
      : 'border-zinc-600 bg-zinc-800 text-gray-300 hover:border-amber-400 hover:text-amber-400'

  return (
    <div className="-mx-1 overflow-x-auto px-1 sm:mx-0 sm:overflow-visible sm:px-0">
      <div className="flex min-w-max items-center justify-start gap-1.5 sm:justify-end sm:gap-2">
      <button
        type="button"
        className={`flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded border sm:h-8 sm:min-h-0 sm:min-w-0 sm:w-8 ${btn}`}
        aria-label="Descargar imagen"
        onClick={() => setDownloadOpen(true)}
      >
        <Download className="h-4 w-4 sm:h-4" />
      </button>
      <button
        type="button"
        className={`flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded border sm:h-8 sm:min-h-0 sm:min-w-0 sm:w-8 ${btn}`}
        aria-label="Zoom +"
        onClick={props.zoomIn}
      >
        <ZoomIn className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={`flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded border sm:h-8 sm:min-h-0 sm:min-w-0 sm:w-8 ${btn}`}
        aria-label="Zoom -"
        onClick={props.zoomOut}
      >
        <ZoomOut className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={`flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded border sm:h-8 sm:min-h-0 sm:min-w-0 sm:w-8 ${btn}`}
        aria-label="Centrar vista"
        onClick={props.centerView}
      >
        <Focus className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={`flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded border sm:h-8 sm:min-h-0 sm:min-w-0 sm:w-8 ${btn}`}
        aria-label="Tema"
        onClick={() => props.setLightTheme(!props.lightmode)}
      >
        {props.lightmode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </button>
      <DownloadImageModal isOpen={downloadOpen} onClose={() => setDownloadOpen(false)} />
      </div>
    </div>
  )
}
