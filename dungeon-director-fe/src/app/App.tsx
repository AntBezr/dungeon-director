import { Outlet, useMatch } from 'react-router-dom'

import { ROUTES } from '@shared/models/routes'
import { AppSidebar } from '@widgets/app-sidebar'

export function App() {
  const isPlayerScreen = useMatch(ROUTES.ACTIVEGAME.PLAYERSSCREEN)

  if (isPlayerScreen) {
    return <Outlet />
  }

  return (
    <div className="min-h-svh bg-(--app-background) font-mono text-slate-100 antialiased">
      <div className="mx-auto flex min-h-svh w-full max-w-375">
        <AppSidebar />
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
