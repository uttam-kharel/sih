import type { ReactNode } from 'react'
import { clsx } from '@utils/helpers'
import { SvgIcon } from '@utils/icon'

interface ChipProps {
  variant?: 'default' | 'solid-navy' | 'danger' | 'gold'
  className?: string
  children: ReactNode
}

export function Chip({ variant = 'default', className, children }: ChipProps) {
  const variants: Record<string, string> = {
    default: 'bg-cyan-100 text-teal-700',
    'solid-navy': 'bg-navy-800 text-cyan-300',
    danger: 'bg-danger text-white',
    gold: 'bg-cyan-300 text-navy-900',
  }
  return (
    <span className={clsx('inline-flex items-center gap-[.4em] text-[.72rem] font-bold tracking-[.04em] px-[.8em] py-[.38em] rounded-pill uppercase', variants[variant], className)}>
      {children}
    </span>
  )
}

interface IconTileProps {
  variant?: 'cyan' | 'navy' | 'white' | 'danger'
  icon: string
  className?: string
}

export function IconTile({ variant = 'cyan', icon, className }: IconTileProps) {
  const variants: Record<string, string> = {
    cyan: 'bg-cyan-100 text-teal-600',
    navy: 'bg-navy-800 text-cyan-300',
    white: 'bg-white text-navy-900 shadow-sm',
    danger: 'bg-danger-bg text-danger',
  }
  return (
    <div className={clsx('w-[52px] h-[52px] rounded-[14px] grid place-items-center flex-none', variants[variant], className)}>
      <SvgIcon name={icon} className="[&_svg]:w-6 [&_svg]:h-6" />
    </div>
  )
}

interface SectionTitleProps {
  eyebrow?: string
  title: string
  lead?: string
  center?: boolean
  dark?: boolean
  className?: string
}

export function SectionTitle({ eyebrow, title, lead, center, dark, className }: SectionTitleProps) {
  return (
    <div className={clsx('max-w-[60ch]', center && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={clsx('font-body font-bold text-[.8rem] tracking-[.18em] uppercase mb-3', dark ? 'text-cyan-300' : 'text-teal-600')}>
          {eyebrow}
        </p>
      )}
      <h2 className={clsx('sec-title', dark && 'text-white')}>{title}</h2>
      {lead && <p className={clsx('text-slate-500 mt-[14px]', center && 'mx-auto', 'max-w-[56ch]')}>{lead}</p>}
    </div>
  )
}
