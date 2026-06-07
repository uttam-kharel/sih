import type { ReactNode } from 'react'
import { clsx } from '@utils/helpers'

interface ButtonProps {
  variant?: 'primary' | 'navy' | 'ghost' | 'light' | 'cyan' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  className?: string
  children: ReactNode
  [key: string]: unknown
}

export function Button({ variant = 'primary', size = 'md', block, className, children, ...rest }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-[.55em] font-body font-semibold leading-none whitespace-nowrap rounded-pill transition-all duration-[180ms] ease-out active:translate-y-px'
  const variants: Record<string, string> = {
    primary: 'bg-teal-600 text-white shadow-[0_6px_18px_rgba(14,115,115,.28)] hover:bg-teal-700 hover:shadow-[0_10px_24px_rgba(14,115,115,.34)] hover:-translate-y-0.5',
    navy: 'bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5',
    ghost: 'bg-transparent text-ink border border-border-strong hover:border-navy-900',
    light: 'bg-white text-navy-900 shadow-sm hover:shadow-md hover:-translate-y-0.5',
    cyan: 'bg-cyan-200 text-navy-900 hover:bg-cyan-300',
    danger: 'bg-danger text-white hover:brightness-93',
  }
  const sizes: Record<string, string> = {
    sm: 'py-[.58em] px-[1.05em] text-[.85rem]',
    md: 'py-[.82em] px-[1.5em] text-[.95rem]',
    lg: 'py-[1.05em] px-[1.9em] text-[1rem]',
  }
  return (
    <button
      className={clsx(base, variants[variant] || variants.primary, sizes[size] || sizes.md, block && 'w-full', className)}
      {...rest}
    >
      {children}
    </button>
  )
}
