import { CalendarDays, Film, Info, UsersRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link, NavLink, Outlet, useParams } from 'react-router-dom'

import { gameStatusLabels, useGame } from '@entities/game'
import { buildRoute, ROUTES } from '@shared/models/routes'
import { Badge, Button } from 'ui'

interface GameTab {
  label: string
  icon: LucideIcon
  buildPath: (gameId: string) => string
}

const tabs: GameTab[] = [
  {
    label: 'Sessions',
    icon: CalendarDays,
    buildPath: (gameId) => buildRoute(ROUTES.GAME.SESSIONS, { gameId }),
  },
  {
    label: 'Scenes',
    icon: Film,
    buildPath: (gameId) => buildRoute(ROUTES.GAME.SCENES, { gameId }),
  },
  {
    label: 'About',
    icon: Info,
    buildPath: (gameId) => buildRoute(ROUTES.GAME.ABOUT, { gameId }),
  },
]

export function GameLayoutPage() {
  const { gameId } = useParams()
  const gameQuery = useGame(gameId)

  if (gameQuery.isPending)
    return (
      <main className="p-8 text-sm text-muted-foreground">
        Loading campaign…
      </main>
    )
  if (gameQuery.isError || !gameQuery.data || !gameId)
    return (
      <main className="p-8 text-sm text-destructive">Campaign not found.</main>
    )

  const game = gameQuery.data

  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="-ml-3 text-muted-foreground"
        >
          <Link to={ROUTES.GAMES}>Campaigns</Link>
        </Button>
        <header className="mt-4 border-b border-border pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {game.title}
                </h1>
                <Badge
                  variant={game.status === 'active' ? 'default' : 'secondary'}
                >
                  {gameStatusLabels[game.status]}
                </Badge>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                {game.description}
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <UsersRound className="size-4" aria-hidden="true" />
                {game.playerNames.length} players
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to={buildRoute(ROUTES.GAME.EDIT, { gameId })}>
                Edit campaign
              </Link>
            </Button>
          </div>
          <nav
            className="mt-6 flex flex-wrap gap-2"
            aria-label="Campaign sections"
          >
            {tabs.map(({ label, icon: Icon, buildPath }) => (
              <NavLink
                key={label}
                to={buildPath(gameId)}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'border border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`
                }
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>
        </header>
        <Outlet />
      </div>
    </main>
  )
}
