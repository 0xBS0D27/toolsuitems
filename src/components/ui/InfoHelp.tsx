import { useState, useEffect, useRef } from 'react'
import { Info } from 'lucide-react'

const BULLETS = [
  'No necesitas registro ni inicio de sesión.',
  'Tus notas se guardan únicamente en este navegador (almacenamiento local).',
  'No enviamos ni almacenamos tu información en servidores o bases de datos.',
  'Si borras los datos del navegador o usas otro dispositivo, tus notas no se trasladan automáticamente.',
  'Para respaldo, usa "Exportar .txt" o "Exportar .md".',
  'Próximamente: Tablero Kanban para organizar por columnas.',
]

export function InfoHelp() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-notion-textMuted transition-colors hover:bg-[rgba(55,53,47,0.08)] hover:text-notion-text focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
        aria-label="Cómo funciona"
        title="Cómo funciona"
      >
        <Info className="h-4 w-4" strokeWidth={2} aria-hidden />
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh] sm:items-center sm:pt-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="info-help-title"
        >
          <div
            className="absolute inset-0 bg-black/25 transition-opacity duration-150"
            onClick={close}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            className="relative w-full max-w-[min(92vw,480px)] min-w-0 overflow-hidden rounded-2xl bg-[#fafaf8] shadow-lg transition-all duration-150"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6">
              <h2
                id="info-help-title"
                className="mb-4 text-[17px] font-semibold leading-snug tracking-tight text-notion-text"
              >
                Cómo funciona All Notes
              </h2>
              <ul className="space-y-2 text-[14px] leading-relaxed text-notion-textMuted">
                {BULLETS.map((text, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-notion-textMuted" aria-hidden />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-xl border border-[rgba(55,53,47,0.15)] bg-white px-4 py-2.5 text-[14px] font-medium text-notion-text transition-colors hover:bg-[rgba(55,53,47,0.04)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
