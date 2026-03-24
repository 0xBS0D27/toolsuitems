import { UploadCloud } from 'lucide-react'
import { useRef, useState } from 'react'

interface NmapDropzoneProps {
  onFileLoaded: (xmlText: string, fileName: string) => void
}

export function NmapDropzone({ onFileLoaded }: NmapDropzoneProps) {
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const readFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      const content = typeof reader.result === 'string' ? reader.result : ''
      onFileLoaded(content, file.name)
    }
    reader.readAsText(file)
  }

  const onDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
    setDragOver(false)
    const file = event.dataTransfer.files?.[0]
    if (!file) return
    if (!file.name.toLowerCase().endsWith('.xml')) return
    readFile(file)
  }

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    readFile(file)
  }

  return (
    <section
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      className={`rounded-2xl border-2 border-dashed p-6 transition ${
        dragOver ? 'border-indigo-500 bg-indigo-50/70' : 'border-gray-300 bg-white'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".xml,text/xml,application/xml"
        onChange={onInputChange}
        className="hidden"
      />

      <div className="flex flex-col items-center text-center">
        <div className="mb-3 rounded-full bg-indigo-100 p-3 text-indigo-600">
          <UploadCloud className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Cargar XML de Nmap</h2>
        <p className="mt-1 text-sm text-gray-600">
          Arrastra y suelta un archivo `.xml` generado con `nmap -oX`, o selecciónalo manualmente.
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Seleccionar archivo
        </button>
      </div>
    </section>
  )
}
