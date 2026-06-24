import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@shared/lib'

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'default' | 'sm' | 'icon'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClassName: Record<ButtonVariant, string> = {
  default:
    'bg-slate-100 text-slate-950 shadow-sm hover:bg-slate-200 focus-visible:ring-slate-400',
  secondary:
    'bg-slate-800 text-slate-200 shadow-sm hover:bg-slate-700 focus-visible:ring-slate-500',
  outline:
    'border border-slate-800 bg-slate-900/40 text-slate-200 shadow-sm hover:bg-slate-800 focus-visible:ring-slate-500',
  ghost: 'text-slate-300 hover:bg-slate-800 hover:text-slate-100 focus-visible:ring-slate-500',
}

const sizeClassName: Record<ButtonSize, string> = {
  default: 'h-9 px-4 py-2 text-sm',
  sm: 'h-8 px-3 text-xs',
  icon: 'size-9 p-0',
}

export function Button({
  className,
  variant = 'default',
  size = 'default',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        variantClassName[variant],
        sizeClassName[size],
        className,
      )}
      {...props}
    />
  )
}
