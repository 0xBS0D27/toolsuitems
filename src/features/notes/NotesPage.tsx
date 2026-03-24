import { useNotes } from '@/hooks/useNotes'
import {
  NotesList,
  NoteEditor,
  QuickFind,
  ConfirmDeleteModal,
  useFilteredNotes,
  useSearchAndTagFilter,
  exportNote,
} from '@/features/notes'
import { Sidebar, SidebarTrigger } from '@/components/layout'
import { InfoHelp } from '@/components/ui'
import { useState, useEffect, useCallback } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { BookOpen } from 'lucide-react'

type SidebarView = 'notes' | 'favorites' | 'archived'
type FilterView = 'all' | 'favorites' | 'archived'

function sidebarToFilter(view: SidebarView): FilterView {
  if (view === 'notes') return 'all'
  return view as FilterView
}

const SECTION_HEADERS: Record<FilterView, { title: string; subtitle: string }> = {
  all: { title: 'Notas', subtitle: 'Todas tus notas' },
  favorites: { title: 'Favoritos', subtitle: 'Tus notas destacadas' },
  archived: { title: 'Archivados', subtitle: 'Notas guardadas' },
}

export function NotesPage() {
  const isMobile = useIsMobile()
  const {
    notes,
    addNote,
    updateNote,
    deleteNote,
    getNote,
    toggleFavorite,
    toggleArchived,
  } = useNotes()

  const [sidebarView, setSidebarView] = useState<SidebarView>('notes')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [editorFullscreen, setEditorFullscreen] = useState(false)
  const [deleteModalNoteId, setDeleteModalNoteId] = useState<string | null>(null)

  const { searchQuery, setSearchQuery } = useSearchAndTagFilter()
  const filterView = sidebarToFilter(sidebarView)
  const filteredNotes = useFilteredNotes(notes, filterView, searchQuery, null)
  const { title: sectionTitle, subtitle: sectionSubtitle } = SECTION_HEADERS[filterView]

  const selectedNote = selectedId ? getNote(selectedId) : null

  const handleNewNote = useCallback(() => {
    const note = addNote()
    setSelectedId(note.id)
    setSearchQuery('')
    setSidebarOpen(false)
  }, [addNote, setSearchQuery])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        handleNewNote()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleNewNote])

  const handleArchive = useCallback(
    (id: string) => {
      toggleArchived(id)
      if (selectedId === id) setSelectedId(null)
    },
    [toggleArchived, selectedId]
  )

  const handleDeleteConfirm = useCallback(() => {
    if (deleteModalNoteId) {
      deleteNote(deleteModalNoteId)
      if (selectedId === deleteModalNoteId) setSelectedId(null)
      setEditorFullscreen(false)
      setDeleteModalNoteId(null)
    }
  }, [deleteModalNoteId, deleteNote, selectedId])

  const handleCloseEditor = useCallback(() => {
    setSelectedId(null)
    setEditorFullscreen(false)
  }, [])

  if (editorFullscreen && selectedNote) {
    return (
      <>
        <div className="fixed inset-0 z-40 flex flex-col bg-white">
          <NoteEditor
            note={selectedNote}
            onUpdate={updateNote}
            onClose={handleCloseEditor}
            onDelete={() => setDeleteModalNoteId(selectedNote.id)}
            onExport={(format) => exportNote(selectedNote, format)}
            onArchive={() => handleArchive(selectedNote.id)}
            onToggleFullscreen={() => setEditorFullscreen(false)}
            isFullscreen
            isMobile={isMobile}
          />
        </div>
        <ConfirmDeleteModal
          isOpen={!!deleteModalNoteId}
          onClose={() => setDeleteModalNoteId(null)}
          onConfirm={handleDeleteConfirm}
          noteTitle={deleteModalNoteId ? getNote(deleteModalNoteId)?.title : undefined}
        />
      </>
    )
  }

  return (
    <div className="flex h-[100dvh] min-h-0 overflow-hidden bg-notion-bg">
      <Sidebar
        currentView={sidebarView}
        onViewChange={setSidebarView}
        onNewNote={handleNewNote}
        mobileOpen={isMobile ? sidebarOpen : undefined}
        onMobileClose={isMobile ? () => setSidebarOpen(false) : undefined}
      />

      <main className="flex min-w-0 flex-1 flex-col min-h-0">
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {(sidebarView === 'notes' ||
            sidebarView === 'favorites' ||
            sidebarView === 'archived') && (
            <>
              <section className="flex min-w-0 flex-1 flex-col overflow-hidden bg-notion-page">
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                  <div className="mx-auto w-full max-w-[960px] px-6 py-0 sm:px-8 md:px-10">
                    <header className="mb-0">
                      <div className="flex items-center gap-3 px-2 pt-2 sm:pt-0">
                        <SidebarTrigger onClick={() => setSidebarOpen(true)} />
                      </div>
                      <div className="rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50/90 to-pink-50/80 px-6 py-6 sm:px-8 sm:py-7 md:px-10">
                        <div className="flex items-center justify-between gap-4 sm:gap-5">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/70 text-indigo-600 shadow-sm sm:h-14 sm:w-14">
                            <BookOpen className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.5} />
                          </div>
                          <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h1 className="text-2xl font-bold leading-tight tracking-tight text-notion-text sm:text-3xl">
                                {sectionTitle}
                              </h1>
                              <p className="mt-0.5 text-[14px] leading-relaxed text-notion-textMuted">
                                {sectionSubtitle}
                              </p>
                            </div>
                            <InfoHelp />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 px-0 pb-2">
                        <div className="min-w-0 flex-1">
                          <QuickFind
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Buscar notas…"
                          />
                        </div>
                      </div>
                    </header>

                    <div className="px-0 pb-6 sm:pb-8">
                    <NotesList
                      notes={filteredNotes}
                      view={filterView}
                      selectedId={selectedId}
                      onSelectNote={setSelectedId}
                      onNewNote={handleNewNote}
                      onToggleFavorite={toggleFavorite}
                      onArchive={handleArchive}
                      onDelete={(id) => setDeleteModalNoteId(id)}
                    />
                    </div>
                  </div>
                </div>
              </section>

              {selectedNote && (
                <NoteEditor
                  note={selectedNote}
                  onUpdate={updateNote}
                  onClose={handleCloseEditor}
                  onDelete={() => setDeleteModalNoteId(selectedNote.id)}
                  onExport={(format) => exportNote(selectedNote, format)}
                  onArchive={() => handleArchive(selectedNote.id)}
                  onToggleFullscreen={() => setEditorFullscreen(true)}
                  isFullscreen={false}
                  isMobile={isMobile}
                />
              )}
            </>
          )}
        </div>
      </main>

      <ConfirmDeleteModal
        isOpen={!!deleteModalNoteId}
        onClose={() => setDeleteModalNoteId(null)}
        onConfirm={handleDeleteConfirm}
        noteTitle={deleteModalNoteId ? getNote(deleteModalNoteId)?.title : undefined}
      />
    </div>
  )
}
