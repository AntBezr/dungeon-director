import type { HTMLAttributes } from 'react'

import { cn } from '@shared/lib'

type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning'

type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  variant?: BadgeVariant
}

const variantClassName: Record<BadgeVariant, string> = {
  default: 'border-slate-600 bg-slate-950 text-slate-300',
  secondary: 'border-slate-700 bg-slate-900 text-slate-500',
  success: 'border-emerald-400 bg-emerald-950 text-emerald-300',
  warning: 'border-orange-400 bg-orange-950 text-orange-300',
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center border-2 px-3 py-1 font-mono text-xs font-black tracking-wide uppercase',
        variantClassName[variant],
        className,
      )}
      {...props}
    />
  )
}
