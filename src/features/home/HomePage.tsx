import { FileText, LayoutGrid, Wrench, Braces } from 'lucide-react'
import { ToolCard } from './ToolCard'

const TOOLS = [
  {
    title: 'Notas',
    description: 'Crea y organiza notas, etiquetas, favoritos y exporta a Markdown o TXT.',
    icon: FileText,
    href: '/notas',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    title: 'Tablero',
    description: 'Tablero Kanban para organizar tareas en columnas. Próximamente disponible.',
    icon: LayoutGrid,
    href: '/tablero',
    comingSoon: true,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    title: 'JSON Tree',
    description: 'Visualiza y explora JSON en forma de árbol interactivo con editor.',
    icon: Braces,
    href: '/json-tree',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
]

export function HomePage() {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/40">
      <header className="border-b border-gray-200/60 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-200">
              <Wrench className="h-5 w-5" strokeWidth={2} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              ToolSuitems
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="mb-10 text-center sm:mb-14">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Tus herramientas en un solo lugar
          </h2>
          <p className="mt-2 text-base text-gray-600 sm:text-lg">
            Elige una herramienta para empezar
          </p>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          {TOOLS.map((tool) => (
            <ToolCard
              key={tool.title}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              href={tool.href}
              comingSoon={tool.comingSoon}
              iconBg={tool.iconBg}
              iconColor={tool.iconColor}
            />
          ))}
        </section>

        <p className="mt-8 text-center text-sm text-gray-500">
          Más herramientas se irán sumando. Cada una en su propio módulo.
        </p>
      </main>
    </div>
  )
}
