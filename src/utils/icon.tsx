import type { ReactNode } from 'react'
import { ICONS } from '@constants/icons'

export function SvgIcon({ name, className = '' }: { name: string; className?: string }): ReactNode {
  const svg = ICONS[name]
  if (!svg) return null
  return (
    <span className={`icon${className ? ` ${className}` : ''}`} aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />
  )
}
