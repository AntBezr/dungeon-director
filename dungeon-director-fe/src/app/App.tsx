import { Outlet, useMatch } from 'react-router-dom'

import { ROUTES } from '@shared/models/routes'
import { AppSidebar } from '@widgets/app-sidebar'

export function App() {
  const isLoginPage = Boolean(useMatch(ROUTES.LOGIN))
  const isRegisterPage = Boolean(useMatch(ROUTES.REGISTER))
  const isPlayerPage = Boolean(useMatch(ROUTES.GAME.PLAYER_VIEW))

  if (isLoginPage || isRegisterPage || isPlayerPage) {
    return <Outlet />
  }

  return (
    <div className="min-h-svh bg-background font-sans text-foreground antialiased">
      <div className="mx-auto min-h-svh w-full lg:flex">
        <AppSidebar />
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
