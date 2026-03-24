import { Copy, Eye, EyeOff, RefreshCcw } from 'lucide-react'
import { useState } from 'react'
import { CircleHelp } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'

interface PasswordDisplayProps {
  password: string
  isMasked: boolean
  copied: boolean
  version: number
  onToggleMask: () => void
  onCopy: () => void
  onRegenerate: () => void
}

export function PasswordDisplay({
  password,
  isMasked,
  copied,
  version,
  onToggleMask,
  onCopy,
  onRegenerate,
}: PasswordDisplayProps) {
  const maskedValue = '*'.repeat(password.length)
  const displayValue = isMasked ? maskedValue : password
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div key={version} className="animate-[fadeIn_280ms_ease]">
        <div className="mb-2 flex items-center gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Generador de contraseñas
          </p>
          <button
            type="button"
            onClick={() => setIsHelpOpen(true)}
            className="inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Ayuda sobre el generador"
            title="Ayuda sobre el generador"
          >
            <CircleHelp className="h-4 w-4" />
          </button>
        </div>
        <div className="break-all rounded-xl border border-indigo-100 bg-indigo-50/70 p-4 font-mono text-xl font-semibold text-indigo-900 sm:text-2xl">
          {displayValue || 'Selecciona opciones y genera una contrasena'}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onCopy}
          disabled={!password}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Copy className="h-4 w-4" />
          {copied ? 'Copiado' : 'Copiar'}
        </button>

        <button
          type="button"
          onClick={onRegenerate}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <RefreshCcw className="h-4 w-4" />
          Generar
        </button>

        <button
          type="button"
          onClick={onToggleMask}
          disabled={!password}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isMasked ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          {isMasked ? 'Mostrar' : 'Ocultar'}
        </button>
      </div>

      <Modal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} title="Qué hace el generador">
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            Este módulo crea contraseñas aleatorias en tu navegador usando un generador criptográfico
            seguro.
          </p>
          <p>
            No usa backend ni guarda contraseñas. Puedes elegir longitud y tipos de caracteres para
            adaptar la complejidad.
          </p>
          <p>
            Botones: Copiar (envía al portapapeles), Generar (crea una nueva) y Mostrar/Ocultar
            (control visual en pantalla).
          </p>
        </div>
      </Modal>
    </section>
  )
}
