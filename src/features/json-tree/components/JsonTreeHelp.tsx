import { useState } from 'react'
import { CircleHelp } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'

interface JsonTreeHelpProps {
  lightmode: boolean
  compact?: boolean
}

export function JsonTreeHelp({ lightmode, compact = false }: JsonTreeHelpProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center justify-center rounded-full transition ${
          compact ? 'h-6 w-6' : 'h-8 w-8'
        } ${
          lightmode ? 'text-gray-500 hover:bg-gray-100 hover:text-gray-700' : 'text-zinc-300 hover:bg-zinc-700 hover:text-white'
        }`}
        aria-label="Cómo funciona JSON Tree"
        title="Cómo funciona JSON Tree"
      >
        <CircleHelp className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Cómo funciona JSON Tree">
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            JSON Tree te permite pegar o editar JSON en el panel izquierdo y ver su estructura como
            árbol en el panel derecho.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>El editor valida el JSON mientras escribes.</li>
            <li>El árbol se actualiza para mostrar nodos, claves y relaciones.</li>
            <li>Puedes hacer zoom, centrar vista y cambiar la orientación del gráfico.</li>
            <li>También puedes alternar entre modo claro y oscuro.</li>
          </ul>
          <p>
            ¿Para qué sirve? Para entender JSON complejo rápidamente, depurar estructuras y explicar
            datos de forma visual.
          </p>
        </div>
      </Modal>
    </>
  )
}
