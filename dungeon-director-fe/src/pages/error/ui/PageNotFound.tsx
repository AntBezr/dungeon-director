import { Link } from 'react-router-dom'

import { Button } from 'ui'

import { ROUTES } from '@shared/models/routes'

export function PageNotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-muted p-6 text-center">
      <div className="max-w-md">
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          This address does not lead to a campaign, session, or scene.
        </p>
        <Button asChild className="mt-6">
          <Link to={ROUTES.GAMES}>Go to campaigns</Link>
        </Button>
      </div>
    </main>
  )
}
