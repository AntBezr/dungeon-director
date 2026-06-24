import type { HTMLAttributes } from 'react'

import { cn } from '@shared/lib'

type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning'

type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  variant?: BadgeVariant
}

const variantClassName: Record<BadgeVariant, string> = {
  default: 'border-slate-700 bg-slate-900 text-slate-300',
  secondary: 'border-slate-800 bg-slate-950 text-slate-500',
  success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
  warning: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold',
        variantClassName[variant],
        className,
      )}
      {...props}
    />
  )
}
