import { useState } from 'react'
import { toPng, toSvg } from 'html-to-image'
import { useStored } from '@/features/json-tree/store/useStored'
import { X } from 'lucide-react'

type Props = { isOpen: boolean; onClose: () => void }

function downloadUri(uri: string, name: string) {
  const link = document.createElement('a')
  link.download = name
  link.href = uri
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function DownloadImageModal({ isOpen, onClose }: Props) {
  const lightmode = useStored((s) => s.lightmode)
  const [imageName, setImageName] = useState('jsontree')
  const [isPng, setIsPng] = useState(true)
  const [transparent, setTransparent] = useState(true)

  const handleExport = async () => {
    try {
      const el = document.querySelector("svg[id*='ref']") as HTMLElement
      if (!el) return
      const exportFn = isPng ? toPng : toSvg
      const dataUri = await exportFn(el, {
        quality: 1,
        backgroundColor: transparent
          ? 'transparent'
          : lightmode
            ? '#FFFFFF'
            : '#1E1E1E',
      })
      downloadUri(dataUri, `${imageName}.${isPng ? 'png' : 'svg'}`)
      onClose()
    } catch {
      // ignore
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Descargar imagen</span>
          <button
            type="button"
            className="rounded p-1 hover:bg-gray-100"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="mt-4 flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={isPng}
              onChange={() => setIsPng(true)}
              className="h-4 w-4"
            />
            PNG
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={!isPng}
              onChange={() => setIsPng(false)}
              className="h-4 w-4"
            />
            SVG
          </label>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="transparent"
            checked={transparent}
            onChange={(e) => setTransparent(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="transparent" className="text-sm">
            Fondo transparente
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            className="rounded bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            onClick={handleExport}
          >
            Descargar
          </button>
        </div>
      </div>
    </div>
  )
}
