import type { ReactNode } from 'react'
import { clsx } from '@utils/helpers'

interface CardProps {
  hover?: boolean
  pad?: boolean
  className?: string
  children: ReactNode
  [key: string]: unknown
}

export function Card({ hover, pad, className, children, ...rest }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-surface rounded-lg shadow-sm border border-border',
        hover && 'transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md',
        pad && 'p-[clamp(24px,3vw,36px)]',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
