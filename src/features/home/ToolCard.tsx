import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'

export interface ToolCardProps {
  title: string
  description: string
  icon: LucideIcon | string
  href?: string
  onClick?: () => void
  comingSoon?: boolean
  iconBg?: string
  iconColor?: string
}

export function ToolCard({
  title,
  description,
  icon,
  href,
  onClick,
  comingSoon = false,
  iconBg = 'bg-white/90',
  iconColor = 'text-indigo-600',
}: ToolCardProps) {
  const isEmoji = typeof icon === 'string'
  const Icon = !isEmoji ? icon : null

  const content = (
    <>
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${iconBg} ${iconColor} shadow-md transition-transform duration-200 group-hover:scale-110`}
      >
        {isEmoji ? (
          <span className="text-2xl" aria-hidden="true">
            {icon}
          </span>
        ) : (
          Icon && <Icon className="h-7 w-7" strokeWidth={1.8} />
        )}
      </div>
      <div className="min-w-0 flex-1 text-left">
        <h3 className="text-lg font-semibold leading-tight text-gray-900">
          {title}
          {comingSoon && (
            <span className="ml-2 inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
              Próximamente
            </span>
          )}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-gray-600">{description}</p>
      </div>
    </>
  )

  const baseClass =
    'group flex items-start gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-gray-300/80 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2'

  if (href) {
    return <Link to={href} className={baseClass}>{content}</Link>
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${baseClass} w-full`}>
        {content}
      </button>
    )
  }

  return <div className={baseClass}>{content}</div>
}
