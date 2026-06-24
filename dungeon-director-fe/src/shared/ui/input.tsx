import type { InputHTMLAttributes } from 'react'

import { cn } from '@shared/lib'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-9 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 text-sm text-slate-200 shadow-sm transition-colors placeholder:text-slate-500 focus-visible:border-slate-700 focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  )
}
