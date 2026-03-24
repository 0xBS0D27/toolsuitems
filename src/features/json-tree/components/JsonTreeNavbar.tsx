import { Link } from 'react-router-dom'
import { Braces } from 'lucide-react'
import { useTree } from '@/features/json-tree/store/useTree'
import { useStored } from '@/features/json-tree/store/useStored'
import { getNextDirection } from '@/features/json-tree/core/graph/getNextDirection'
import { JsonTreeToolbar } from './JsonTreeToolbar'
import { JsonTreeHelp } from './JsonTreeHelp'
import { JsonTreeSearchBar } from './JsonTreeSearchBar'

export function JsonTreeNavbar() {
  const fullscreen = useTree((s) => s.fullscreen)
  const toggleFullscreen = useTree((s) => s.toggleFullscreen)
  const direction = useTree((s) => s.direction)
  const setDirection = useTree((s) => s.setDirection)
  const centerView = useTree((s) => s.centerView)
  const zoomIn = useTree((s) => s.zoomIn)
  const zoomOut = useTree((s) => s.zoomOut)
  const lightmode = useStored((s) => s.lightmode)
  const setLightTheme = useStored((s) => s.setLightTheme)

  return (
    <header
      className={`flex min-h-14 flex-col gap-2 border-b px-3 py-2 sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3 ${
        lightmode
          ? 'border-gray-200 bg-white'
          : 'border-zinc-700 bg-zinc-800'
      }`}
    >
      <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start">
        <Link
          to="/"
          className={`flex items-center gap-2 rounded-md px-2 py-1 ${
            lightmode ? 'hover:bg-gray-100' : 'hover:bg-zinc-700 text-white'
          }`}
        >
          <Braces className="h-6 w-6 text-indigo-600" />
          <span
            className={`max-w-[120px] truncate font-semibold sm:max-w-none ${
              lightmode ? 'text-gray-900' : 'text-white'
            }`}
          >
            JSON Tree
          </span>
        </Link>
        <JsonTreeHelp lightmode={lightmode} />
      </div>
      <div className="flex w-full items-center gap-2 sm:w-auto">
        <JsonTreeToolbar
          fullscreen={fullscreen}
          toggleFullscreen={toggleFullscreen}
          direction={direction}
          setDirection={() => setDirection(getNextDirection(direction))}
          centerView={centerView}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          lightmode={lightmode}
          setLightTheme={setLightTheme}
        />
      </div>
      <div className="sm:hidden">
        <JsonTreeSearchBar lightmode={lightmode} />
      </div>
    </header>
  )
}
