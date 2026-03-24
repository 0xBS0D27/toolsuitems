import { AlertCircle } from 'lucide-react'
import { Modal } from '@/components/ui'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  noteTitle?: string
}

export function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  noteTitle,
}: ConfirmDeleteModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const displayTitle = noteTitle || 'Sin título'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Eliminar nota">
      <div className="flex gap-3">
        <div className="shrink-0 rounded-full bg-red-50 p-1.5">
          <AlertCircle className="h-4 w-4 text-red-500" strokeWidth={2} aria-hidden />
        </div>
        <p className="text-[14px] leading-relaxed text-notion-textMuted">
          ¿Eliminar “{displayTitle}”? Esta acción no se puede deshacer.
        </p>
      </div>
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-[rgba(55,53,47,0.2)] bg-white px-4 py-2.5 text-[14px] font-medium text-notion-text transition-colors hover:bg-[rgba(55,53,47,0.04)]"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="rounded-lg bg-red-600 px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Eliminar
        </button>
      </div>
    </Modal>
  )
}
