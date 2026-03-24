import type { Note } from '@/types'
import type { FilterView } from './useFilteredNotes'
import { useState } from 'react'
import { NoteRow } from './NoteRow'
import { EmptyState } from './EmptyState'
import { ExportFormatModal } from './ExportFormatModal'

interface NotesListProps {
  notes: Note[]
  view: FilterView
  selectedId: string | null
  onSelectNote: (id: string) => void
  onNewNote: () => void
  onToggleFavorite: (id: string) => void
  onArchive: (id: string) => void
  onDelete: (id: string) => void
}

export function NotesList({
  notes,
  view,
  selectedId,
  onSelectNote,
  onNewNote,
  onToggleFavorite,
  onArchive,
  onDelete,
}: NotesListProps) {
  const [noteToExport, setNoteToExport] = useState<Note | null>(null)

  if (notes.length === 0) {
    const messages: Record<FilterView, string> = {
      all: 'Aún no hay notas.',
      favorites: 'No tienes favoritos.',
      archived: 'No hay notas archivadas.',
    }
    return (
      <EmptyState
        message={messages[view]}
        onNewNote={view === 'all' ? onNewNote : undefined}
      />
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {notes.map((note) => (
        <NoteRow
          key={note.id}
          note={note}
          isActive={selectedId === note.id}
          onSelect={() => onSelectNote(note.id)}
          onToggleFavorite={() => onToggleFavorite(note.id)}
          onArchive={view !== 'archived' ? () => onArchive(note.id) : undefined}
          onDelete={() => onDelete(note.id)}
          onExport={() => setNoteToExport(note)}
        />
      ))}
      <ExportFormatModal
        isOpen={!!noteToExport}
        onClose={() => setNoteToExport(null)}
        note={noteToExport}
      />
    </div>
  )
}
