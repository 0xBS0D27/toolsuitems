import { useEffect } from 'react'
import { JsonTreeNavbar } from '@/features/json-tree/components/JsonTreeNavbar'
import { MonacoEditor } from '@/features/json-tree/components/MonacoEditor'
import { TreeEditor } from '@/features/json-tree/components/TreeEditor'
import { EditorInfobar } from '@/features/json-tree/components/EditorInfobar'
import { useApp } from '@/features/json-tree/store/useApp'
import { useTree } from '@/features/json-tree/store/useTree'
import { useStored } from '@/features/json-tree/store/useStored'
import { JSON_TEMPLATE } from '@/features/json-tree/constants/json'

export function JsonTreePage() {
  const setContents = useApp((s) => s.setContents)
  const fullscreen = useTree((s) => s.fullscreen)
  const lightmode = useStored((s) => s.lightmode)

  useEffect(() => {
    setContents({ contents: JSON_TEMPLATE, hasChanges: false })
  }, [setContents])

  const showEditor = !fullscreen

  return (
    <div
      className={`flex h-[100dvh] flex-col ${
        lightmode ? 'bg-gray-50' : 'bg-zinc-900'
      }`}
    >
      <JsonTreeNavbar />
      <main className="flex min-h-0 flex-1">
        {showEditor && (
          <section
            className={`flex shrink-0 flex-col border-r ${
              lightmode
                ? 'border-gray-200 bg-white'
                : 'border-zinc-700 bg-zinc-800'
            }`}
            style={{ width: 'min(100%, 450px)', minWidth: 320 }}
          >
            <MonacoEditor />
          </section>
        )}
        <section className="relative min-w-0 flex-1">
          <TreeEditor />
        </section>
      </main>
      <EditorInfobar />
    </div>
  )
}
