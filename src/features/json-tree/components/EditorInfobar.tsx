import { useApp } from '@/features/json-tree/store/useApp'
import { useStored } from '@/features/json-tree/store/useStored'
import { Check, AlertCircle } from 'lucide-react'
import { JsonTreeHelp } from './JsonTreeHelp'

export function EditorInfobar() {
  const error = useApp((s) => s.error)
  const lightmode = useStored((s) => s.lightmode)

  return (
    <div
      className={`flex h-7 w-full items-center justify-between gap-4 border-t px-4 text-xs ${
        lightmode
          ? 'border-gray-200 bg-gray-50'
          : 'border-zinc-700 bg-zinc-800 text-gray-300'
      }`}
    >
      <span className={lightmode ? 'text-gray-600' : 'text-gray-400'}>
        JSON Tree - ToolSuitems
      </span>
      <div className="flex items-center gap-2">
        {error ? (
          <>
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-red-400">JSON inválido</span>
            <JsonTreeHelp lightmode={lightmode} compact />
          </>
        ) : (
          <>
            <Check className="h-4 w-4 text-green-500" />
            <span
              className={
                lightmode ? 'font-medium text-green-600' : 'font-medium text-green-400'
              }
            >
              JSON válido
            </span>
            <JsonTreeHelp lightmode={lightmode} compact />
          </>
        )}
      </div>
    </div>
  )
}
