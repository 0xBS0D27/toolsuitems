import { useState } from 'react'
import {
  FileText,
  Star,
  Archive,
  ChevronLeft,
  Plus,
  Menu,
} from 'lucide-react'
import { Brand, NotificationBell } from '@/components/ui'

interface SidebarProps {
  currentView: 'notes' | 'favorites' | 'archived'
  onViewChange: (view: 'notes' | 'favorites' | 'archived') => void
  onNewNote: () => void
  /** En móvil: sidebar como overlay. true = visible */
  mobileOpen?: boolean
  /** En móvil: cerrar al navegar o al hacer clic fuera */
  onMobileClose?: () => void
}

export function Sidebar({
  currentView,
  onViewChange,
  onNewNote,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const linkClass = (view: 'notes' | 'favorites' | 'archived') =>
    `flex items-center gap-2 w-full rounded-r-md px-2 py-1.5 text-[14px] leading-snug text-[rgba(55,53,47,0.8)] transition-colors duration-[150ms] hover:bg-notion-sidebarHover active:bg-notion-sidebarActive touch-manipulation ${
      currentView === view ? 'bg-notion-sidebarActiveBlue text-indigo-800 border-l-2 border-indigo-500' : 'border-l-2 border-transparent'
    }`

  const handleNav = (view: 'notes' | 'favorites' | 'archived') => {
    onViewChange(view)
    onMobileClose?.()
  }

  const handleNew = () => {
    onNewNote()
    onMobileClose?.()
  }

  const sidebarContent = (narrow: boolean) => (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-[rgba(55,53,47,0.06)] px-1">
        <div className="flex min-w-0 flex-1 items-center">
          {narrow && onMobileClose && (
            <button
              type="button"
              onClick={onMobileClose}
              className="-ml-1 shrink-0 rounded p-2 text-notion-textMuted hover:bg-notion-sidebarHover touch-manipulation"
              aria-label="Cerrar menú"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <Brand />
        </div>
        <NotificationBell />
      </header>

      <nav className="flex-1 overflow-y-auto py-1.5">
        <div className="px-1.5 pb-0.5">
          <button
            type="button"
            onClick={handleNew}
            className="flex w-full items-center gap-2 rounded-lg border border-[rgba(55,53,47,0.12)] bg-white px-2 py-2 text-[14px] text-notion-textMuted transition-colors hover:bg-notion-sidebarHover active:bg-notion-sidebarHover touch-manipulation min-h-[40px]"
          >
            <Plus className="h-4 w-4 shrink-0" />
            <span>Nueva nota</span>
          </button>
          <button type="button" onClick={() => handleNav('notes')} className={linkClass('notes')}>
            <FileText className="h-4 w-4 shrink-0" />
            <span>Notas</span>
          </button>
        </div>

        <div className="my-1 border-t border-[rgba(55,53,47,0.06)] px-1.5 pt-1.5">
          <p className="px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-notion-textMuted">
            PRIVADO
          </p>
          <button type="button" onClick={() => handleNav('favorites')} className={linkClass('favorites')}>
            <Star className="h-4 w-4 shrink-0" />
            <span>Favoritos</span>
          </button>
          <button type="button" onClick={() => handleNav('archived')} className={linkClass('archived')}>
            <Archive className="h-4 w-4 shrink-0" />
            <span>Archivados</span>
          </button>
        </div>
      </nav>

      {!narrow && (
        <div className="border-t border-[rgba(55,53,47,0.06)] p-1">
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="flex w-full items-center justify-center rounded p-2 text-notion-textMuted hover:bg-notion-sidebarHover touch-manipulation min-h-[40px]"
            aria-label="Colapsar menú"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  )

  const isMobileOverlay = typeof onMobileClose === 'function'

  if (isMobileOverlay) {
    return (
      <>
        <div
          className={`fixed inset-0 z-30 bg-black/30 transition-opacity duration-200 md:hidden ${
            mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={onMobileClose}
          aria-hidden="true"
        />
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[min(280px,85vw)] flex-col border-r border-notion-border bg-notion-sidebar shadow-xl transition-transform duration-200 ease-out md:relative md:inset-auto md:z-0 md:w-[260px] md:shrink-0 md:translate-x-0 md:shadow-none ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          aria-hidden={!mobileOpen}
        >
          {sidebarContent(true)}
        </aside>
      </>
    )
  }

  if (collapsed) {
    return (
      <aside className="hidden w-12 shrink-0 flex-col border-r border-notion-border bg-notion-sidebar md:flex">
        <div className="flex h-14 items-center justify-center border-b border-notion-border">
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="rounded p-2 text-notion-textMuted hover:bg-notion-sidebarHover"
            aria-label="Expandir menú"
          >
            <ChevronLeft className="h-5 w-5 rotate-180" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-2">
          <button
            type="button"
            onClick={onNewNote}
            className="rounded p-2 text-notion-textMuted hover:bg-notion-sidebarHover"
            aria-label="Nueva nota"
          >
            <Plus className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => onViewChange('notes')}
            className={`rounded p-2 ${currentView === 'notes' ? 'bg-notion-sidebarActive text-notion-text' : 'text-notion-textMuted hover:bg-notion-sidebarHover'}`}
            aria-label="Notas"
          >
            <FileText className="h-5 w-5" />
          </button>
        </nav>
      </aside>
    )
  }

  return (
    <aside className="hidden w-[260px] shrink-0 flex-col border-r border-notion-border bg-notion-sidebar md:flex">
      {sidebarContent(false)}
    </aside>
  )
}

export function SidebarTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded p-2 text-notion-textMuted hover:bg-notion-sidebarHover active:bg-notion-sidebarHover touch-manipulation min-h-[44px] min-w-[44px] md:hidden"
      aria-label="Abrir menú"
    >
      <Menu className="h-6 w-6" />
    </button>
  )
}
