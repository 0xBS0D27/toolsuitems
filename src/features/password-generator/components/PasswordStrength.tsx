import { useState } from 'react'
import { CircleHelp, ShieldCheck } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import type { PasswordStrengthLevel } from '../utils/passwordUtils'

interface PasswordStrengthProps {
  entropy: number
  strength: PasswordStrengthLevel
}

function getStrengthColor(strength: PasswordStrengthLevel) {
  if (strength === 'Debil') return 'bg-red-500'
  if (strength === 'Media') return 'bg-yellow-500'
  return 'bg-green-500'
}

function getStrengthWidth(entropy: number) {
  const normalized = Math.max(0, Math.min(100, (entropy / 100) * 100))
  return `${normalized}%`
}

export function PasswordStrength({
  entropy,
  strength,
}: PasswordStrengthProps) {
  const color = getStrengthColor(strength)
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-700">Seguridad</p>
          <button
            type="button"
            onClick={() => setIsHelpOpen(true)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Ayuda sobre seguridad"
            title="Ayuda sobre seguridad"
          >
            <CircleHelp className="h-4 w-4" />
          </button>
        </div>
        <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
          <ShieldCheck className="h-4 w-4 text-amber-500" />
          <span>{strength}</span>
        </p>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: getStrengthWidth(entropy) }}
        />
      </div>

      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p>Entropia estimada: {entropy.toFixed(1)} bits</p>
      </div>

      <Modal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} title="Cómo se mide la seguridad">
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            Esta barra usa una estimación de entropía (en bits). La entropía representa cuántas
            combinaciones posibles tiene la contraseña.
          </p>
          <p>
            Más bits significan más dificultad para adivinarla. La entropía aumenta con longitud y
            variedad de caracteres.
          </p>
          <p>
            Niveles: menos de 40 débil, 40-60 media, 60-80 fuerte y más de 80 muy fuerte.
          </p>
        </div>
      </Modal>
    </section>
  )
}
