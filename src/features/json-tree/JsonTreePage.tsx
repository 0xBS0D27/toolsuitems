import { useEffect, useState } from 'react'
import { JsonTreeNavbar } from '@/features/json-tree/components/JsonTreeNavbar'
import { MonacoEditor } from '@/features/json-tree/components/MonacoEditor'
import { TreeEditor } from '@/features/json-tree/components/TreeEditor'
import { EditorInfobar } from '@/features/json-tree/components/EditorInfobar'
import { useApp } from '@/features/json-tree/store/useApp'
import { useTree } from '@/features/json-tree/store/useTree'
import { useStored } from '@/features/json-tree/store/useStored'
import { JSON_TEMPLATE } from '@/features/json-tree/constants/json'
import { useIsMobile } from '@/hooks/useIsMobile'
import { classNames } from '@/features/json-tree/utility/classNames'

type MobileTab = 'editor' | 'graph'

export function JsonTreePage() {
  const setContents = useApp((s) => s.setContents)
  const fullscreen = useTree((s) => s.fullscreen)
  const centerView = useTree((s) => s.centerView)
  const lightmode = useStored((s) => s.lightmode)
  const isMobile = useIsMobile()
  const [mobileTab, setMobileTab] = useState<MobileTab>('editor')

  useEffect(() => {
    setContents({ contents: JSON_TEMPLATE, hasChanges: false })
  }, [setContents])

  const showEditor = !fullscreen

  useEffect(() => {
    if (isMobile && mobileTab === 'graph' && !fullscreen) {
      const t = window.setTimeout(() => centerView(), 120)
      return () => window.clearTimeout(t)
    }
  }, [isMobile, mobileTab, fullscreen, centerView])

  const editorShell = (withRightBorder: boolean) =>
    classNames(
      'flex min-h-0 flex-1 flex-col',
      withRightBorder && 'border-r',
      lightmode ? 'border-gray-200 bg-white' : 'border-zinc-700 bg-zinc-800'
    )

  const graphSectionClass = classNames('relative min-h-0 min-w-0 flex-1')

  return (
    <div
      className={`flex h-[100dvh] flex-col ${
        lightmode ? 'bg-gray-50' : 'bg-zinc-900'
      }`}
    >
      <JsonTreeNavbar />
      {isMobile && !fullscreen && (
        <div
          className={classNames(
            'flex shrink-0 border-b',
            lightmode ? 'border-gray-200 bg-white' : 'border-zinc-700 bg-zinc-800'
          )}
          role="tablist"
          aria-label="Vista JSON Tree"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mobileTab === 'editor'}
            className={classNames(
              'min-h-[48px] flex-1 touch-manipulation px-3 py-3 text-sm font-semibold transition-colors',
              mobileTab === 'editor'
                ? lightmode
                  ? 'border-b-2 border-indigo-600 text-indigo-700'
                  : 'border-b-2 border-indigo-400 text-white'
                : lightmode
                  ? 'text-gray-600'
                  : 'text-zinc-400'
            )}
            onClick={() => setMobileTab('editor')}
          >
            Editor
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mobileTab === 'graph'}
            className={classNames(
              'min-h-[48px] flex-1 touch-manipulation px-3 py-3 text-sm font-semibold transition-colors',
              mobileTab === 'graph'
                ? lightmode
                  ? 'border-b-2 border-indigo-600 text-indigo-700'
                  : 'border-b-2 border-indigo-400 text-white'
                : lightmode
                  ? 'text-gray-600'
                  : 'text-zinc-400'
            )}
            onClick={() => setMobileTab('graph')}
          >
            Gráfico
          </button>
        </div>
      )}
      <main className="flex min-h-0 flex-1 flex-col md:flex-row">
        {!isMobile && (
          <>
            {showEditor && (
              <section
                className={classNames(editorShell(true), 'shrink-0')}
                style={{ width: 'min(100%, 450px)', minWidth: 320 }}
              >
                <MonacoEditor />
              </section>
            )}
            <section className={graphSectionClass}>
              <TreeEditor />
            </section>
          </>
        )}
        {isMobile && !fullscreen && (
          <>
            <section
              className={classNames(editorShell(false), mobileTab !== 'editor' && 'hidden')}
            >
              <MonacoEditor />
            </section>
            <section
              className={classNames(graphSectionClass, mobileTab !== 'graph' && 'hidden')}
            >
              <TreeEditor />
            </section>
          </>
        )}
        {isMobile && fullscreen && (
          <section className={graphSectionClass}>
            <TreeEditor />
          </section>
        )}
      </main>
      <EditorInfobar />
    </div>
  )
}
