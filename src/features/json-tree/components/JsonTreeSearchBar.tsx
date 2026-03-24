import { useCallback, useEffect, useMemo, useState } from 'react'
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useTree } from '@/features/json-tree/store/useTree'
import { classNames } from '@/features/json-tree/utility/classNames'

interface JsonTreeSearchBarProps {
  lightmode: boolean
}

export function JsonTreeSearchBar({ lightmode }: JsonTreeSearchBarProps) {
  const zoomPanPinch = useTree((s) => s.zoomPanPinch)
  const nodes = useTree((s) => s.nodes)
  const [query, setQuery] = useState('')
  const [matchIndex, setMatchIndex] = useState(0)

  const matches = useMemo<HTMLElement[]>(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized || nodes.length === 0 || typeof document === 'undefined') return []
    const root = document.getElementById('tree-editor')
    if (!root) return []
    const spans = Array.from(root.querySelectorAll('span[data-key]')) as HTMLElement[]
    return spans.filter((el) => (el.getAttribute('data-key') ?? '').toLowerCase().includes(normalized))
  }, [nodes, query])

  const cleanupHighlight = () => {
    if (typeof document === 'undefined') return
    document.querySelectorAll('rect.searched_node, .highlight_node').forEach((el) => {
      el.classList.remove('searched_node', 'highlight_node')
    })
  }

  const focusMatch = useCallback((nodeEl: HTMLElement) => {
    if (!zoomPanPinch) return
    const wrapper = zoomPanPinch.instance.wrapperComponent as HTMLElement | undefined
    if (!wrapper) return

    const x = Number(nodeEl.getAttribute('data-x') ?? '0')
    const y = Number(nodeEl.getAttribute('data-y') ?? '0')
    const scale = 0.8
    const newX = (wrapper.offsetLeft - x) * scale + wrapper.clientWidth / 2 - nodeEl.clientWidth
    const newY = (wrapper.offsetTop - y) * scale + wrapper.clientHeight / 5 - nodeEl.clientHeight
    zoomPanPinch.setTransform(newX, newY, scale)
  }, [zoomPanPinch])

  useEffect(() => {
    if (!query.trim() || matches.length === 0) {
      setMatchIndex(0)
      cleanupHighlight()
      return
    }
    setMatchIndex(0)
  }, [query, matches.length])

  useEffect(() => {
    cleanupHighlight()
    if (!query.trim() || matches.length === 0) return

    matches.forEach((nodeEl) => {
      const foreignObject = nodeEl.closest('foreignObject')
      const rect = foreignObject?.previousElementSibling
      rect?.classList.add('searched_node')
    })

    const current = matches[matchIndex]
    if (!current) return
    current.classList.add('highlight_node')
    focusMatch(current)
  }, [focusMatch, matchIndex, matches, query])

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
    cleanupHighlight()
  }

  const frameClass = lightmode
    ? 'border-violet-500/70 bg-white text-gray-900 shadow-sm'
    : 'border-violet-400/80 bg-zinc-900 text-white shadow-[0_0_0_1px_rgba(139,92,246,0.25)]'

  const iconClass = lightmode
    ? 'text-violet-600 hover:bg-violet-50 hover:text-violet-700'
    : 'text-violet-300 hover:bg-violet-500/20 hover:text-violet-200'

  return (
    <div className={classNames('flex items-center gap-1 rounded-xl border px-2 py-1', frameClass)}>
      <Search className={classNames('h-4 w-4 shrink-0', lightmode ? 'text-violet-600' : 'text-violet-300')} />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            goNext()
          }
        }}
        placeholder="Search node"
        className={classNames(
          'min-w-0 flex-1 bg-transparent text-sm outline-none',
          lightmode ? 'placeholder:text-violet-400' : 'placeholder:text-violet-300/70'
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
          <span
            className={classNames(
              'px-1 text-sm font-semibold',
              lightmode ? 'text-violet-700' : 'text-violet-300'
            )}
          >
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
