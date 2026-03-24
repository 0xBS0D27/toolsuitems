import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { HomePage } from '@/features/home'
import { NotesPage } from '@/features/notes/NotesPage'
import { BoardsPage } from '@/features/boards'
import { JsonTreePage } from '@/features/json-tree'
import { PasswordGeneratorPage } from '@/features/password-generator'
import { useEffect } from 'react'

function useDocumentTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === '/' || pathname === '') document.title = 'ToolSuitems'
    else if (pathname.startsWith('/notas')) document.title = 'Notas - ToolSuitems'
    else if (pathname === '/tablero') document.title = 'Tablero - ToolSuitems'
    else if (pathname.startsWith('/json-tree')) document.title = 'JSON Tree - ToolSuitems'
    else if (pathname.startsWith('/generador-contrasenas'))
      document.title = 'Generador de contraseñas - ToolSuitems'
    else document.title = 'ToolSuitems'
  }, [pathname])
}

export default function App() {
  useDocumentTitle()
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/notas" element={<NotesPage />} />
      <Route path="/notas/*" element={<NotesPage />} />
      <Route path="/tablero" element={<BoardsPage />} />
      <Route path="/json-tree" element={<JsonTreePage />} />
      <Route path="/generador-contrasenas" element={<PasswordGeneratorPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
