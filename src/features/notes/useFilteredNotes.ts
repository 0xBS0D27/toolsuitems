import { useMemo, useState, useCallback } from 'react'
import type { Note } from '@/types'

export type FilterView = 'all' | 'favorites' | 'archived'

export function useFilteredNotes(
  notes: Note[],
  view: FilterView,
  searchQuery: string,
  tagFilter: string | null
) {
  const filtered = useMemo(() => {
    let list = notes

    if (view === 'favorites') list = list.filter((n) => n.favorite && !n.archived)
    else if (view === 'archived') list = list.filter((n) => n.archived)
    else list = list.filter((n) => !n.archived)

    if (tagFilter) {
      list = list.filter((n) => n.tags.includes(tagFilter))
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    return [...list].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
  }, [notes, view, searchQuery, tagFilter])

  return filtered
}

export function useSearchAndTagFilter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [tagFilter, setTagFilter] = useState<string | null>(null)
  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setTagFilter(null)
  }, [])
  return { searchQuery, setSearchQuery, tagFilter, setTagFilter, clearSearch }
}
