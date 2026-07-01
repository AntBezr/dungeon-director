import type { ComponentProps, HTMLAttributes } from 'react'

import { cn } from '@shared/lib'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border-2 border-slate-700 bg-slate-950 text-slate-100 shadow-[6px_6px_0_#020617]',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 p-4 has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        className,
      )}
      {...props}
    />
  )
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('font-mono text-base font-bold uppercase', className)}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-sm text-slate-400', className)} {...props} />
}

export function CardAction({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      data-slot="card-action"
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-4 pt-0', className)} {...props} />
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center justify-between p-4 pt-0', className)}
      {...props}
    />
  )
}
