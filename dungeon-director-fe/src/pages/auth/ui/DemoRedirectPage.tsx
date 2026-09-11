import { Navigate } from 'react-router-dom'

import { ROUTES } from '@shared/models/routes'

export function DemoRedirectPage() {
  return <Navigate to={ROUTES.GAMES} replace />
}
