import { Star, Archive, Trash2, FileDown } from 'lucide-react'
import type { Note } from '@/types'
import { formatNoteDate, notePreview } from './utils'
import { Button } from '@/components/ui'
import { TagChip } from './TagChip'

const BAR_COLORS = ['bg-emerald-400', 'bg-blue-400', 'bg-violet-400', 'bg-pink-400'] as const
function barColor(id: string): (typeof BAR_COLORS)[number] {
  let n = 0
  for (let i = 0; i < id.length; i++) n += id.charCodeAt(i)
  return BAR_COLORS[Math.abs(n) % BAR_COLORS.length]
}

interface NoteRowProps {
  note: Note
  isActive: boolean
  onSelect: () => void
  onToggleFavorite: () => void
  onArchive?: () => void
  onDelete?: () => void
  onExport?: () => void
}

export function NoteRow({
  note,
  isActive,
  onSelect,
  onToggleFavorite,
  onArchive,
  onDelete,
  onExport,
}: NoteRowProps) {
  const leftBar = barColor(note.id)
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      className={`group flex cursor-pointer overflow-hidden rounded-xl border border-[rgba(55,53,47,0.08)] bg-white text-left shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-[box-shadow,background-color,border-color] hover:border-[rgba(55,53,47,0.12)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.08)] active:bg-[rgba(55,53,47,0.02)] touch-manipulation min-h-0 ${
        isActive ? 'border-indigo-200 bg-indigo-50/50 shadow-[0_1px_3px_rgba(0,0,0,0.08)]' : ''
      }`}
    >
      <div className={`w-1 shrink-0 ${leftBar} min-h-[72px]`} aria-hidden />
      <div className="min-w-0 flex-1 py-3 pl-4 pr-3 sm:py-3.5 sm:pl-5 sm:pr-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold leading-snug text-notion-text">
              {note.title || 'Sin título'}
            </p>
            <p className="mt-0.5 truncate text-[12px] leading-relaxed text-notion-textMuted">
              {formatNoteDate(note.updatedAt)} · {notePreview(note.content)}
            </p>
            {note.tags && note.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {note.tags.map((tag) => (
                  <TagChip key={tag} tag={tag} />
                ))}
              </div>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-0.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-within:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite()
              }}
              className="rounded p-1.5 text-notion-textMuted hover:bg-black/5 hover:text-notion-text min-h-[36px] min-w-[36px] flex items-center justify-center sm:min-h-0 sm:min-w-0"
              aria-label={note.favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              <Star
                className={`h-4 w-4 ${note.favorite ? 'fill-amber-400 text-amber-500' : ''}`}
              />
            </button>
            {onExport && (
              <Button
                variant="ghost"
                size="sm"
                icon={<FileDown className="h-4 w-4" />}
                onClick={(e) => {
                  e.stopPropagation()
                  onExport()
                }}
                aria-label="Exportar"
                className="!min-h-[36px] !min-w-[36px] !rounded-lg sm:!min-h-0 sm:!min-w-0"
              />
            )}
            {onArchive && (
              <Button
                variant="ghost"
                size="sm"
                icon={<Archive className="h-4 w-4" />}
                onClick={(e) => {
                  e.stopPropagation()
                  onArchive()
                }}
                aria-label="Archivar"
                className="!min-h-[36px] !min-w-[36px] !rounded-lg sm:!min-h-0 sm:!min-w-0"
              />
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                icon={<Trash2 className="h-4 w-4" />}
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
                aria-label="Eliminar"
                className="!min-h-[36px] !min-w-[36px] !rounded-lg sm:!min-h-0 sm:!min-w-0"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
