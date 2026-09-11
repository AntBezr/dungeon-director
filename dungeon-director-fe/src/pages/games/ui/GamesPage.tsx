import { CalendarDays, Plus, Trash2, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  useDeleteGame,
  useGames,
  gameStatusLabels,
  type Game,
} from '@entities/game'
import { buildRoute, ROUTES } from '@shared/models/routes'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'ui'
import { useState } from 'react'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

function GameCard({
  game,
  onDelete,
}: {
  game: Game
  onDelete: (game: Game) => void
}) {
  const sessionsPath = buildRoute(ROUTES.GAME.SESSIONS, { gameId: game.id })
  const editPath = buildRoute(ROUTES.GAME.EDIT, { gameId: game.id })

  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <Badge variant={game.status === 'active' ? 'default' : 'secondary'}>
            {gameStatusLabels[game.status]}
          </Badge>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            {formatDate(game.startDate)}
          </p>
        </div>
        <div>
          <CardTitle className="text-xl">{game.title}</CardTitle>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {game.description}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <UsersRound className="size-4" aria-hidden="true" />
          {game.playerNames.length} players
        </p>
      </CardContent>
      <CardFooter className="mt-auto gap-2">
        <Button asChild size="sm">
          <Link to={sessionsPath}>Open</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link to={editPath}>Edit</Link>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="ml-auto text-destructive hover:text-destructive"
          onClick={() => onDelete(game)}
          aria-label={`Delete ${game.title}`}
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export function GamesPage() {
  const gamesQuery = useGames()
  const deleteGame = useDeleteGame()
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null)

  function confirmDelete() {
    if (!gameToDelete) return

    deleteGame.mutate(gameToDelete.id, {
      onSuccess: () => setGameToDelete(null),
    })
  }

  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Campaigns</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              Prepare your game
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Create campaigns, build sessions, and maintain an independent
              scene library.
            </p>
          </div>
          <Button asChild>
            <Link to={`${ROUTES.GAMES}/new`}>
              <Plus className="size-4" aria-hidden="true" />
              Create campaign
            </Link>
          </Button>
        </header>

        {gameToDelete && (
          <Card className="mt-6 border-destructive/40 bg-destructive/5 py-4">
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">Delete “{gameToDelete.title}”?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Its sessions, plan entries, and private scenes will be
                  permanently deleted.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setGameToDelete(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={confirmDelete}
                  disabled={deleteGame.isPending}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {gamesQuery.isPending && (
          <p className="py-10 text-sm text-muted-foreground">
            Loading campaigns…
          </p>
        )}
        {gamesQuery.isError && (
          <p role="alert" className="py-10 text-sm text-destructive">
            Could not load campaigns.
          </p>
        )}
        {gamesQuery.data?.length === 0 && (
          <Card className="mt-8 border-dashed">
            <CardContent className="py-12 text-center">
              <h2 className="text-lg font-semibold">No campaigns yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Create your first campaign to plan a session.
              </p>
              <Button asChild className="mt-5">
                <Link to={`${ROUTES.GAMES}/new`}>Create campaign</Link>
              </Button>
            </CardContent>
          </Card>
        )}
        <section
          className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          aria-label="Campaign list"
        >
          {gamesQuery.data?.map((game) => (
            <GameCard key={game.id} game={game} onDelete={setGameToDelete} />
          ))}
        </section>
      </div>
    </main>
  )
}
