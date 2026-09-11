import { Navigate, useParams } from 'react-router-dom'

import { buildRoute, ROUTES } from '@shared/models/routes'

export function GameIndexRedirect() {
  const { gameId } = useParams()
  return (
    <Navigate
      to={buildRoute(ROUTES.GAME.SESSIONS, { gameId: gameId ?? '' })}
      replace
    />
  )
}
