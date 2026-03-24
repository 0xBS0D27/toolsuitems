import type { Note } from '@/types'

export function exportNoteToMarkdown(note: Note): string {
  const lines = [`# ${note.title}`, '', note.content]
  if (note.tags.length) {
    lines.push('', `Etiquetas: ${note.tags.join(', ')}`)
  }
  lines.push('', `Última edición: ${note.updatedAt}`)
  return lines.join('\n')
}

export function exportNoteToTxt(note: Note): string {
  const lines = [note.title, '', note.content]
  if (note.tags.length) {
    lines.push('', `Etiquetas: ${note.tags.join(', ')}`)
  }
  return lines.join('\n')
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function exportNote(note: Note, format: 'md' | 'txt') {
  const content =
    format === 'md' ? exportNoteToMarkdown(note) : exportNoteToTxt(note)
  const ext = format === 'md' ? 'md' : 'txt'
  const safeTitle = note.title.replace(/[^a-z0-9-_]/gi, '-').slice(0, 50)
  const filename = `${safeTitle || 'nota'}.${ext}`
  const blob = new Blob([content], { type: format === 'md' ? 'text/markdown' : 'text/plain' })
  downloadBlob(blob, filename)
}
