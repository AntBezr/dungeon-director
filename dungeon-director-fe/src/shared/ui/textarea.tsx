import type { TextareaHTMLAttributes } from 'react'

import { cn } from '@shared/lib'

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'min-h-24 w-full resize-none border-2 border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-slate-200 shadow-[4px_4px_0_#020617] transition-colors placeholder:text-slate-500 focus-visible:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  )
}
