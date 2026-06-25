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
    'border-slate-100 bg-slate-100 text-slate-950 shadow-[4px_4px_0_#0f172a] hover:-translate-y-0.5 hover:bg-white hover:shadow-[6px_6px_0_#0f172a] focus-visible:ring-cyan-400',
  secondary:
    'border-slate-500 bg-slate-800 text-slate-100 shadow-[4px_4px_0_#020617] hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-[6px_6px_0_#020617] focus-visible:ring-cyan-400',
  outline:
    'border-slate-700 bg-slate-950 text-slate-200 shadow-[4px_4px_0_#020617] hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[6px_6px_0_#020617] focus-visible:ring-cyan-400',
  ghost:
    'border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-900 hover:text-cyan-300 focus-visible:ring-cyan-400',
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
        'inline-flex items-center justify-center gap-2 border-2 font-mono font-black tracking-wide uppercase transition-[background-color,border-color,color,box-shadow,transform] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        variantClassName[variant],
        sizeClassName[size],
        className,
      )}
      {...props}
    />
  )
}
