import { queryClient } from '@shared/api'
import { QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from 'components/ui/tooltip'
import type React from 'react'

import { ThemeProvider } from './theme-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
