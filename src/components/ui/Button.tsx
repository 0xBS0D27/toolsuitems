import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'subtle' | 'primary'
  size?: 'sm' | 'md'
  icon?: React.ReactNode
}

export function Button({
  variant = 'ghost',
  size = 'md',
  icon,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 rounded-md transition-colors duration-[150ms] outline-none focus-visible:ring-2 focus-visible:ring-neutral-400'
  const variants = {
    ghost: 'hover:bg-black/5 text-[rgba(55,53,47,0.95)]',
    subtle: 'bg-notion-sidebarHover hover:bg-notion-sidebarActive text-[rgba(55,53,47,0.95)]',
    primary: 'bg-[rgba(55,53,47,0.95)] text-white hover:bg-[rgba(55,53,47,0.85)]',
  }
  const sizes = {
    sm: 'px-2 py-1.5 text-sm',
    md: 'px-3 py-2 text-[15px]',
  }
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
