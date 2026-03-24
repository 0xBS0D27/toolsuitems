/** Maps tag (lowercase) to pastel chip style: ideas = green, prioridad/alta = lila/rosa, default = gray */
function chipStyle(tag: string): { bg: string; text: string } {
  const t = tag.toLowerCase()
  if (t.includes('idea')) return { bg: 'bg-green-100', text: 'text-green-800' }
  if (t.includes('prioridad') || t === 'alta') return { bg: 'bg-purple-100', text: 'text-purple-800' }
  return { bg: 'bg-zinc-100', text: 'text-zinc-600' }
}

interface TagChipProps {
  tag: string
}

export function TagChip({ tag }: TagChipProps) {
  const { bg, text } = chipStyle(tag)
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${bg} ${text}`}
    >
      {tag}
    </span>
  )
}
