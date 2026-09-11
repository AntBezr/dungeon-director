import { ArrowLeft, Plus, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  gameStatusLabels,
  useCreateGame,
  useGame,
  useUpdateGame,
  type GameInput,
  type GameStatus,
} from '@entities/game'
import { buildRoute, ROUTES } from '@shared/models/routes'
import {
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

const emptyDraft: GameInput = {
  title: '',
  description: '',
  startDate: new Date().toISOString().slice(0, 10),
  status: 'draft',
  playerNames: [],
}
const statuses = Object.entries(gameStatusLabels) as [GameStatus, string][]

interface GameFormProps {
  gameId?: string
  initialDraft: GameInput
}

function GameForm({ gameId, initialDraft }: GameFormProps) {
  const navigate = useNavigate()
  const createGame = useCreateGame()
  const updateGame = useUpdateGame()
  const [draft, setDraft] = useState<GameInput>(initialDraft)
  const [newPlayerName, setNewPlayerName] = useState('')
  const isEditing = Boolean(gameId)
  const isSaving = createGame.isPending || updateGame.isPending

  function addPlayer() {
    const name = newPlayerName.trim()
    if (!name || draft.playerNames.includes(name)) return
    setDraft((current) => ({
      ...current,
      playerNames: [...current.playerNames, name],
    }))
    setNewPlayerName('')
  }

  function removePlayer(name: string) {
    setDraft((current) => ({
      ...current,
      playerNames: current.playerNames.filter(
        (playerName) => playerName !== name,
      ),
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!draft.title.trim()) return

    if (gameId) {
      const game = await updateGame.mutateAsync({ gameId, update: draft })
      void navigate(buildRoute(ROUTES.GAME.ABOUT, { gameId: game.id }))
      return
    }

    const game = await createGame.mutateAsync(draft)
    void navigate(buildRoute(ROUTES.GAME.SESSIONS, { gameId: game.id }))
  }

  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="-ml-3 text-muted-foreground"
        >
          <Link to={ROUTES.GAMES}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Campaigns
          </Link>
        </Button>
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="text-2xl">
              {isEditing ? 'Edit campaign' : 'New campaign'}
            </CardTitle>
            <CardDescription>
              Player names and party icons are stored separately. Icons are
              configured in the campaign.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-5"
              onSubmit={(event) => {
                void handleSubmit(event)
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="game-title">Title</Label>
                <Input
                  id="game-title"
                  value={draft.title}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="game-description">
                  Setting and description
                </Label>
                <Textarea
                  id="game-description"
                  value={draft.description}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  className="min-h-28"
                  required
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="game-date">Start date</Label>
                  <Input
                    id="game-date"
                    type="date"
                    value={draft.startDate}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        startDate: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="game-status">Status</Label>
                  <select
                    id="game-status"
                    className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                    value={draft.status}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        status: event.target.value as GameStatus,
                      }))
                    }
                  >
                    {statuses.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="player-name">Players</Label>
                <div className="flex gap-2">
                  <Input
                    id="player-name"
                    value={newPlayerName}
                    onChange={(event) => setNewPlayerName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault()
                        addPlayer()
                      }
                    }}
                    placeholder="Player name"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={addPlayer}
                    aria-label="Add player"
                  >
                    <Plus className="size-4" aria-hidden="true" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {draft.playerNames.map((name) => (
                    <span
                      key={name}
                      className="inline-flex items-center gap-1 rounded-full bg-muted py-1 pr-1 pl-3 text-sm"
                    >
                      {name}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => removePlayer(name)}
                        aria-label={`Remove ${name}`}
                      >
                        <X className="size-3" aria-hidden="true" />
                      </Button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button asChild type="button" variant="outline">
                  <Link to={ROUTES.GAMES}>Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving…' : 'Save campaign'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export function GameFormPage() {
  const { gameId } = useParams()
  const gameQuery = useGame(gameId)

  if (gameId && gameQuery.isPending)
    return (
      <main className="p-8 text-sm text-muted-foreground">
        Loading campaign…
      </main>
    )
  if (gameId && (!gameQuery.data || gameQuery.isError))
    return (
      <main className="p-8 text-sm text-destructive">Campaign not found.</main>
    )

  const initialDraft = gameQuery.data
    ? {
        title: gameQuery.data.title,
        description: gameQuery.data.description,
        startDate: gameQuery.data.startDate,
        status: gameQuery.data.status,
        playerNames: gameQuery.data.playerNames,
      }
    : emptyDraft

  return (
    <GameForm
      key={gameId ?? 'new-game'}
      gameId={gameId}
      initialDraft={initialDraft}
    />
  )
}
