import { ChevronLeft, ChevronRight, Play, Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

import {
  sessionStatusLabels,
  useCreateSession,
  useGameSessions,
} from '@entities/game'
import { buildRoute, ROUTES } from '@shared/models/routes'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
} from 'ui'

function getPage(value: string | null) {
  const page = Number(value)
  return Number.isInteger(page) && page > 0 ? page : 1
}

export function GameSessionsPage() {
  const { gameId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [isCreating, setIsCreating] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const page = getPage(searchParams.get('page'))
  const sessionsQuery = useGameSessions(
    gameId,
    page,
    searchParams.get('search') ?? '',
  )
  const createSession = useCreateSession()

  function updatePage(
    nextPage: number,
    nextSearch = searchParams.get('search') ?? '',
  ) {
    setSearchParams({
      ...(nextSearch ? { search: nextSearch } : {}),
      ...(nextPage > 1 ? { page: String(nextPage) } : {}),
    })
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!gameId || !title.trim()) return
    await createSession.mutateAsync({
      gameId,
      input: {
        title: title.trim(),
        description: description.trim(),
        date: date || null,
        status: 'planned',
      },
    })
    setTitle('')
    setDescription('')
    setDate('')
    setIsCreating(false)
    updatePage(1)
  }

  return (
    <section className="py-8 sm:py-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Campaign sessions</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Sessions
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Preparation and play are separate, but you can edit any session
            scene at any time.
          </p>
        </div>
        <Button type="button" onClick={() => setIsCreating((open) => !open)}>
          <Plus className="size-4" aria-hidden="true" />
          New session
        </Button>
      </div>
      {isCreating && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>New session</CardTitle>
            <CardDescription>
              Add and order scenes after creating the session.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(event) => {
                void handleCreate(event)
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="session-title">Title</Label>
                <Input
                  id="session-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="session-date">Date</Label>
                <Input
                  id="session-date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="session-description">Description</Label>
                <Textarea
                  id="session-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2 sm:col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={createSession.isPending}>
                  {createSession.isPending ? 'Creating…' : 'Create session'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative max-w-md flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            className="pl-9"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') updatePage(1, search)
            }}
            placeholder="Search sessions"
            aria-label="Search sessions"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => updatePage(1, search)}
        >
          Search
        </Button>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        {sessionsQuery.data
          ? `${sessionsQuery.data.count} sessions`
          : 'Loading sessions…'}
      </p>
      <div className="mt-3 space-y-3">
        {sessionsQuery.data?.results.map((session) => (
          <Card key={session.id} className="py-4">
            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="break-words font-semibold">{session.title}</h3>
                  <Badge
                    variant={
                      session.status === 'active' ? 'default' : 'secondary'
                    }
                  >
                    {sessionStatusLabels[session.status]}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {session.description || 'No description added'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link
                    to={buildRoute(ROUTES.GAME.SESSION, {
                      gameId: session.gameId,
                      sessionId: session.id,
                    })}
                  >
                    Plan
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link
                    to={buildRoute(ROUTES.GAME.SESSION_PLAY, {
                      gameId: session.gameId,
                      sessionId: session.id,
                    })}
                  >
                    <Play className="size-3.5" aria-hidden="true" />
                    Play
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {sessionsQuery.data && (
        <div className="mt-6 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => updatePage(sessionsQuery.data?.previous ?? 1)}
            disabled={!sessionsQuery.data.previous}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            Previous
          </Button>
          <p className="text-sm text-muted-foreground">Page {page}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => updatePage(sessionsQuery.data?.next ?? page)}
            disabled={!sessionsQuery.data.next}
          >
            Next
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      )}
    </section>
  )
}
