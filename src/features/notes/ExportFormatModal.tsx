import type { Note } from '@/types'
import { Modal } from '@/components/ui'
import { exportNote } from './exportNote'

interface ExportFormatModalProps {
  isOpen: boolean
  onClose: () => void
  note: Note | null
}

export function ExportFormatModal({
  isOpen,
  onClose,
  note,
}: ExportFormatModalProps) {
  const handleExport = (format: 'md' | 'txt') => {
    if (note) {
      exportNote(note, format)
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="¿Cómo deseas exportar?">
      <p className="text-[14px] leading-relaxed text-notion-textMuted">
        Elige el formato para descargar la nota.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-[rgba(55,53,47,0.2)] bg-white px-4 py-2.5 text-[14px] font-medium text-notion-text transition-colors hover:bg-[rgba(55,53,47,0.04)]"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={() => handleExport('md')}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Exportar .md
        </button>
        <button
          type="button"
          onClick={() => handleExport('txt')}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Exportar .txt
        </button>
      </div>
    </Modal>
  )
}
