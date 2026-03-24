import { useEffect, useRef } from 'react'
import { X, Maximize2, Minimize2 } from 'lucide-react'
import type { Note } from '@/types'
import { formatNoteDate } from './utils'
import { useDebounce } from '@/hooks/useDebounce'
import { Button } from '@/components/ui'

interface NoteEditorProps {
  note: Note
  onUpdate: (id: string, patch: Partial<Note>) => void
  onClose: () => void
  onDelete?: () => void
  onExport?: (format: 'md' | 'txt') => void
  onArchive?: () => void
  onToggleFullscreen?: () => void
  isMobile?: boolean
  isFullscreen?: boolean
}

export function NoteEditor({
  note,
  onUpdate,
  onClose,
  onDelete,
  onExport,
  onArchive,
  onToggleFullscreen,
  isMobile = false,
  isFullscreen = false,
}: NoteEditorProps) {
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const syncedNoteIdRef = useRef<string | null>(null)

  const debouncedUpdate = useDebounce(
    (id: string, patch: Partial<Note>) => {
      onUpdate(id, patch)
    },
    400
  )

  useEffect(() => {
    if (!titleRef.current || !contentRef.current) return
    if (syncedNoteIdRef.current === note.id) return
    titleRef.current.textContent = note.title
    contentRef.current.value = note.content
    syncedNoteIdRef.current = note.id
  }, [note])

  const handleTitleInput = () => {
    const title = titleRef.current?.textContent?.trim() ?? ''
    debouncedUpdate(note.id, { title })
  }

  const handleContentChange = () => {
    const content = contentRef.current?.value ?? ''
    debouncedUpdate(note.id, { content })
  }

  return (
    <div
      className={`flex min-h-0 flex-col bg-white ${
        isFullscreen
          ? 'fixed inset-0 z-50'
          : isMobile
            ? 'fixed inset-0 z-40 pt-[env(safe-area-inset-top)]'
            : 'h-full min-w-0 flex-1 border-l border-notion-border'
      }`}
    >
      <header className="flex shrink-0 items-center justify-between border-b border-notion-border px-3 py-2 sm:px-4">
        <div className="min-w-0 flex-1" />
        <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
          {onToggleFullscreen && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onToggleFullscreen}
              className="!min-h-[36px] !rounded-full border border-[rgba(55,53,47,0.1)] !bg-[rgba(55,53,47,0.04)] !py-2 hover:!bg-[rgba(55,53,47,0.08)] sm:!min-h-0 touch-manipulation"
              icon={isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            >
              <span className="hidden sm:inline">
                {isFullscreen ? 'Salir de pantalla completa' : 'Modo pantalla completa'}
              </span>
            </Button>
          )}
          {onExport && (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onExport('md')}
                className="!min-h-[36px] !rounded-full border border-[rgba(55,53,47,0.1)] !bg-[rgba(55,53,47,0.04)] !py-2 hover:!bg-[rgba(55,53,47,0.08)] sm:!min-h-0"
              >
                <span className="hidden sm:inline">Exportar .md</span>
                <span className="sm:hidden">.md</span>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onExport('txt')}
                className="!min-h-[36px] !rounded-full border border-[rgba(55,53,47,0.1)] !bg-[rgba(55,53,47,0.04)] !py-2 hover:!bg-[rgba(55,53,47,0.08)] sm:!min-h-0"
              >
                <span className="hidden sm:inline">Exportar .txt</span>
                <span className="sm:hidden">.txt</span>
              </Button>
            </>
          )}
          {onArchive && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onArchive}
              className="!min-h-[36px] !rounded-full border border-[rgba(55,53,47,0.1)] !bg-[rgba(55,53,47,0.04)] !py-2 hover:!bg-[rgba(55,53,47,0.08)] sm:!min-h-0 touch-manipulation"
            >
              Archivar
            </Button>
          )}
          {onDelete && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onDelete}
              className="!min-h-[36px] !rounded-full !border-0 !bg-red-600 !py-2 !text-white hover:!bg-red-700 sm:!min-h-0 touch-manipulation focus-visible:!ring-red-400"
            >
              Eliminar
            </Button>
          )}
          {isMobile && !isFullscreen && (
            <button
              type="button"
              onClick={onClose}
              className="rounded p-2.5 text-notion-textMuted hover:bg-notion-sidebarHover active:bg-notion-sidebarHover touch-manipulation min-h-[44px] min-w-[44px]"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          {isFullscreen && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-notion-textMuted hover:bg-[rgba(55,53,47,0.08)] min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div
            className={`mx-auto w-full shrink-0 pt-4 sm:pt-6 ${
              isFullscreen ? 'max-w-none px-6 sm:px-10 md:px-16 lg:px-24' : 'max-w-[900px] px-4 sm:px-6'
            }`}
          >
            <div
              ref={titleRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handleTitleInput}
              className="mb-1 min-h-[1.5em] text-2xl font-bold leading-tight text-notion-text outline-none empty:before:content-['Sin_título'] empty:before:text-notion-textMuted sm:text-3xl md:text-[40px]"
            />
            <p className="mb-3 text-[13px] text-notion-textMuted sm:mb-4 sm:text-[14px]">
              Última edición: {formatNoteDate(note.updatedAt)}
            </p>
          </div>

          <div
            className={`mx-auto w-full min-h-0 flex-1 pb-8 sm:pb-10 ${
              isFullscreen ? 'max-w-none px-6 sm:px-10 md:px-16 lg:px-24' : 'max-w-[900px] px-4 sm:px-6'
            }`}
          >
            <textarea
              ref={contentRef}
              defaultValue={note.content}
              onChange={handleContentChange}
              placeholder="Escribe aquí…"
              className="h-full min-h-[200px] w-full resize-none overflow-y-auto rounded border-0 bg-transparent py-3 text-[15px] leading-[1.6] text-notion-text outline-none placeholder:text-notion-textMuted sm:text-[16px] touch-manipulation"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
