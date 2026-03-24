import { useState, useEffect, useRef } from 'react'
import { Bell } from 'lucide-react'

const STORAGE_KEY = 'noteall_aviso_kanban_visto'

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [avisoVisto, setAvisoVisto] = useState(true)
  const popoverRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const value = localStorage.getItem(STORAGE_KEY)
    setAvisoVisto(value === 'true')
  }, [])

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current?.contains(e.target as Node) ||
        buttonRef.current?.contains(e.target as Node)
      )
        return
      setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleEntendido = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setAvisoVisto(true)
    setOpen(false)
  }

  const showBadge = !avisoVisto

  return (
    <div className="relative flex items-center">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative rounded p-2 text-notion-textMuted transition-colors duration-[150ms] hover:bg-notion-sidebarHover hover:text-notion-text active:bg-notion-sidebarActive"
        aria-label="Notificaciones"
        aria-expanded={open}
      >
        <Bell className="h-4 w-4 shrink-0" />
        {showBadge && (
          <span
            className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-red-500"
            aria-hidden="true"
          />
        )}
      </button>

      {open && (
        <div
          ref={popoverRef}
          className="absolute left-0 top-full z-50 mt-1 w-[280px] rounded-lg border border-notion-border bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
          role="dialog"
          aria-label="Aviso"
        >
          <h3 className="mb-1 text-[15px] font-semibold text-notion-text">
            Novedad próximamente
          </h3>
          <p className="mb-4 text-[14px] leading-relaxed text-notion-textMuted">
            Tablero Kanban está próximo a llegar.
          </p>
          <button
            type="button"
            onClick={handleEntendido}
            className="w-full rounded-md bg-notion-sidebarActive px-3 py-2 text-[14px] font-medium text-notion-text transition-colors hover:bg-notion-sidebarHover"
          >
            Entendido
          </button>
        </div>
      )}
    </div>
  )
}
