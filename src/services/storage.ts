import type { Note } from '@/types'

const STORAGE_KEY = 'notion-notes-data'
const NOTES_KEY = 'notes'

export interface StoredNotes {
  notes: Note[]
}

export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data = JSON.parse(raw) as StoredNotes
    return data[NOTES_KEY] ?? []
  } catch {
    return []
  }
}

export function saveNotes(notes: Note[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ [NOTES_KEY]: notes }))
  } catch (e) {
    console.error('Failed to save notes', e)
  }
}
