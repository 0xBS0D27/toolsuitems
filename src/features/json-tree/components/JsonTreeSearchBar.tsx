import { useEffect, useMemo, useState } from 'react'
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useTree } from '@/features/json-tree/store/useTree'
import type { NodeData } from '@/features/json-tree/core/type'
import { classNames } from '@/features/json-tree/utility/classNames'

interface JsonTreeSearchBarProps {
  lightmode: boolean
}

function toNodeText(node: NodeData): string {
  const text = node.text
  if (typeof text === 'string') return text
  if (Array.isArray(text)) {
    return text
      .map((item) => {
        const key = item?.[0] ?? ''
        const value = item?.[1] ?? ''
        return `${key} ${value}`
      })
      .join(' ')
  }
  return ''
}

export function JsonTreeSearchBar({ lightmode }: JsonTreeSearchBarProps) {
  const nodes = useTree((s) => s.nodes)
  const centerOnNode = useTree((s) => s.centerOnNode)
  const setHoveredNodeId = useTree((s) => s.setHoveredNodeId)
  const [query, setQuery] = useState('')
  const [matchIndex, setMatchIndex] = useState(0)

  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return []
    return nodes.filter((node) => toNodeText(node).toLowerCase().includes(normalized))
  }, [nodes, query])

  useEffect(() => {
    if (!query.trim() || matches.length === 0) {
      setMatchIndex(0)
      setHoveredNodeId(null)
      return
    }
    setMatchIndex(0)
  }, [query, matches.length, setHoveredNodeId])

  useEffect(() => {
    if (!query.trim() || matches.length === 0) return
    const current = matches[matchIndex]
    if (!current) return
    setHoveredNodeId(current.id)
    centerOnNode(current.id)
  }, [centerOnNode, matchIndex, matches, query, setHoveredNodeId])

  const goPrev = () => {
    if (matches.length === 0) return
    setMatchIndex((prev) => (prev - 1 + matches.length) % matches.length)
  }

  const goNext = () => {
    if (matches.length === 0) return
    setMatchIndex((prev) => (prev + 1) % matches.length)
  }

  const clear = () => {
    setQuery('')
    setMatchIndex(0)
    setHoveredNodeId(null)
  }

  const frameClass = lightmode
    ? 'border-gray-300 bg-white text-gray-900'
    : 'border-amber-300 bg-zinc-900 text-white'

  const iconClass = lightmode
    ? 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
    : 'text-zinc-300 hover:bg-zinc-700 hover:text-white'

  return (
    <div className={classNames('flex items-center gap-1 rounded-xl border px-2 py-1', frameClass)}>
      <Search className={classNames('h-4 w-4 shrink-0', lightmode ? 'text-gray-500' : 'text-zinc-300')} />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search node"
        className={classNames(
          'min-w-0 flex-1 bg-transparent text-sm outline-none',
          lightmode ? 'placeholder:text-gray-400' : 'placeholder:text-zinc-400'
        )}
      />
      {query.trim() && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className={classNames('rounded p-1 transition', iconClass)}
            aria-label="Previous match"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className={classNames('rounded p-1 transition', iconClass)}
            aria-label="Next match"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <span className={classNames('px-1 text-sm font-semibold', lightmode ? 'text-gray-600' : 'text-amber-300')}>
            {matches.length === 0 ? '0/0' : `${matchIndex + 1}/${matches.length}`}
          </span>
          <button
            type="button"
            onClick={clear}
            className={classNames('rounded p-1 transition', iconClass)}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  )
}
