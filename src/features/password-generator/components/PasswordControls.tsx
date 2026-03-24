import { useState } from 'react'
import { CircleHelp } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import type { PasswordOptions } from '../utils/passwordUtils'

interface PasswordControlsProps {
  length: number
  options: PasswordOptions
  autoCopy: boolean
  onLengthChange: (value: number) => void
  onToggleOption: (key: keyof PasswordOptions) => void
  onToggleAutoCopy: () => void
}

const OPTION_LABELS: Record<keyof PasswordOptions, string> = {
  lower: 'Minusculas',
  upper: 'Mayusculas',
  numbers: 'Numeros',
  symbols: 'Simbolos',
}

export function PasswordControls({
  length,
  options,
  autoCopy,
  onLengthChange,
  onToggleOption,
  onToggleAutoCopy,
}: PasswordControlsProps) {
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor="password-length" className="text-sm font-medium text-gray-700">
            Longitud
          </label>
          <button
            type="button"
            onClick={() => setIsHelpOpen(true)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Ayuda sobre longitud"
            title="Ayuda sobre longitud"
          >
            <CircleHelp className="h-4 w-4" />
          </button>
        </div>
        <span className="rounded-md bg-gray-100 px-2 py-1 text-sm font-semibold text-gray-900">
          {length}
        </span>
      </div>

      <input
        id="password-length"
        type="range"
        min={8}
        max={32}
        value={length}
        onChange={(e) => onLengthChange(Number(e.target.value))}
        className="w-full accent-indigo-600"
      />

      <div className="mt-5 space-y-3">
        {(Object.keys(options) as Array<keyof PasswordOptions>).map((key) => (
          <label key={key} className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={options[key]}
              onChange={() => onToggleOption(key)}
              className="h-4 w-4 rounded accent-indigo-600"
            />
            <span>{OPTION_LABELS[key]}</span>
          </label>
        ))}

        <label className="mt-2 flex cursor-pointer items-center gap-3 text-sm font-medium text-indigo-700">
          <input
            type="checkbox"
            checked={autoCopy}
            onChange={onToggleAutoCopy}
            className="h-4 w-4 rounded accent-indigo-600"
          />
          <span>Copiar automáticamente al generar</span>
        </label>
      </div>
      <Modal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} title="Longitud de contraseña">
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            La longitud define cuántos caracteres tendrá la contraseña. A mayor longitud, más
            combinaciones posibles y mayor resistencia a intentos de adivinación.
          </p>
          <p>
            Recomendación práctica: usar al menos 12 caracteres para cuentas importantes.
          </p>
        </div>
      </Modal>
    </section>
  )
}
