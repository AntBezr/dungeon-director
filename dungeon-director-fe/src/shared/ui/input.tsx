import type { InputHTMLAttributes } from 'react'

import { cn } from '@shared/lib'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-9 w-full border-2 border-slate-700 bg-slate-950 px-3 font-mono text-sm text-slate-200 shadow-[4px_4px_0_#020617] transition-colors placeholder:text-slate-500 focus-visible:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  )
}
