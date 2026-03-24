import { Search } from 'lucide-react'

interface QuickFindProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function QuickFind({
  value,
  onChange,
  placeholder = 'Buscar notas',
}: QuickFindProps) {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg border border-[rgba(55,53,47,0.12)] bg-white px-3 py-2.5 shadow-sm min-h-[48px] transition-[box-shadow,border-color] focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-400/20 sm:min-h-0 sm:py-2">
      <Search className="h-4 w-4 shrink-0 text-notion-textMuted" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[15px] text-notion-text outline-none placeholder:text-notion-textMuted min-h-[24px] touch-manipulation"
      />
    </div>
  )
}
