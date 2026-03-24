import { Lightbulb, Plus } from 'lucide-react'
import { Button } from '@/components/ui'

interface EmptyStateProps {
  message?: string
  onNewNote?: () => void
}

export function EmptyState({
  message = 'Aún no hay notas',
  onNewNote,
}: EmptyStateProps) {
  const isPremium = !!onNewNote

  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center py-16 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-500">
          <Lightbulb className="h-9 w-9" strokeWidth={1.5} />
        </div>
        <div className="space-y-1">
          <h2 className="text-[17px] font-semibold leading-snug tracking-tight text-notion-text">
            {message}
          </h2>
          {isPremium && (
            <p className="text-[14px] leading-relaxed text-notion-textMuted">
              Crea tu primera nota para empezar.
            </p>
          )}
        </div>
        {onNewNote && (
          <div className="flex flex-col items-center gap-3 pt-2">
            <Button
              variant="primary"
              icon={<Plus className="h-4 w-4" />}
              onClick={onNewNote}
              className="min-h-[40px] touch-manipulation bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Nueva nota
            </Button>
            <p className="text-[12px] tracking-wide text-notion-textMuted">
              Atajo: Ctrl/Cmd + N
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
