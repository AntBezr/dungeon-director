import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Providers } from '@app/providers'
import { router } from '@app/router'
import '@app/styles/index.css'
import { RouterProvider } from 'react-router-dom'

document.body.className = 'bg-zinc-950'

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return
  }

  const { worker } = await import('@app/mocks/browser')

  return worker.start({
    onUnhandledRequest: 'bypass',
  })
}
// eslint-disable-next-line
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </StrictMode>,
  )
})
