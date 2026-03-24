import { useState, useEffect, useCallback } from 'react'
import type { Note, NoteCreate } from '@/types'
import { loadNotes, saveNotes } from '@/services/storage'

function createNote(input: Partial<NoteCreate> = {}): Note {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    title: input.title ?? 'Sin título',
    content: input.content ?? '',
    tags: input.tags ?? [],
    favorite: input.favorite ?? false,
    archived: input.archived ?? false,
    createdAt: input.createdAt ?? now,
    updatedAt: input.updatedAt ?? now,
  }
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes())

  useEffect(() => {
    saveNotes(notes)
  }, [notes])

  const addNote = useCallback((input?: Partial<NoteCreate>) => {
    const note = createNote(input)
    setNotes((prev) => [note, ...prev])
    return note
  }, [])

  const updateNote = useCallback((id: string, patch: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, ...patch, updatedAt: new Date().toISOString() }
          : n
      )
    )
  }, [])

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const getNote = useCallback(
    (id: string) => notes.find((n) => n.id === id) ?? null,
    [notes]
  )

  const toggleFavorite = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, favorite: !n.favorite, updatedAt: new Date().toISOString() } : n
      )
    )
  }, [])

  const toggleArchived = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, archived: !n.archived, updatedAt: new Date().toISOString() } : n
      )
    )
  }, [])

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    getNote,
    toggleFavorite,
    toggleArchived,
  }
}
