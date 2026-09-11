import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Providers } from '@app/providers'
import { router } from '@app/router'
import { applyTheme, getInitialTheme } from '@shared/lib/theme'
import '@app/styles/index.css'
import { RouterProvider } from 'react-router-dom'

applyTheme(getInitialTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
)
