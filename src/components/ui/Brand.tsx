import { Link } from 'react-router-dom'
import logo from '@/assets/logo-all-notes.svg'

export function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-notion-sidebarHover transition-colors">
      <img src={logo} alt="ToolSuitems" className="h-6 w-6 shrink-0" />
      <span className="text-sm font-semibold text-notion-text">ToolSuitems</span>
    </Link>
  )
}
