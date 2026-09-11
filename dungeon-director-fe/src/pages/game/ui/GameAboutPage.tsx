import { Plus, Save, X } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  gameStatusLabels,
  useGame,
  usePartyTokens,
  useUpdateGame,
  useUpdatePartyToken,
  type Game,
} from '@entities/game'
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

const icons = ['🜁', '⚔️', '✦', '🛡️', '☾', '🗝️']

function GameAboutContent({ game }: { game: Game }) {
  const tokensQuery = usePartyTokens(game.id)
  const updateGame = useUpdateGame()
  const updatePartyToken = useUpdatePartyToken()
  const [description, setDescription] = useState(game.description)
  const [playerNames, setPlayerNames] = useState(game.playerNames)
  const [newPlayerName, setNewPlayerName] = useState('')

  function addPlayer() {
    const name = newPlayerName.trim()
    if (!name || playerNames.includes(name)) return
    setPlayerNames((current) => [...current, name])
    setNewPlayerName('')
  }

  async function saveGame() {
    await updateGame.mutateAsync({
      gameId: game.id,
      update: { description: description.trim(), playerNames },
    })
  }

  return (
    <section className="grid gap-5 py-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-3">
            <CardTitle className="text-xl">About campaign</CardTitle>
            <Badge variant={game.status === 'active' ? 'default' : 'secondary'}>
              {gameStatusLabels[game.status]}
            </Badge>
          </div>
          <CardDescription>
            Players are campaign names. Their party tokens and icons are stored
            separately.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-2">
            <Label htmlFor="about-description">Setting</Label>
            <Textarea
              id="about-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="min-h-36"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => {
                void saveGame()
              }}
              disabled={updateGame.isPending}
            >
              <Save className="size-4" aria-hidden="true" />
              {updateGame.isPending ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Players and party tokens</CardTitle>
          <CardDescription>
            Removing a player name also removes its corresponding demo token.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newPlayerName}
              onChange={(event) => setNewPlayerName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  addPlayer()
                }
              }}
              placeholder="Player name"
              aria-label="New player name"
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
          {playerNames.map((name) => {
            const token = tokensQuery.data?.find(
              (candidate) => candidate.name === name,
            )
            return (
              <div
                key={name}
                className="flex items-center gap-2 rounded-lg border border-border p-2"
              >
                <span className="grid size-9 place-items-center rounded-full bg-muted text-lg">
                  {token?.icon ?? '✦'}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium">
                  {name}
                </span>
                {token && (
                  <select
                    className="h-8 rounded-md border border-input bg-background px-2 text-sm"
                    value={token.icon}
                    onChange={(event) =>
                      updatePartyToken.mutate({
                        tokenId: token.id,
                        icon: event.target.value,
                      })
                    }
                    aria-label={`Choose player icon for ${name}`}
                  >
                    {icons.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  className="text-destructive hover:text-destructive"
                  onClick={() =>
                    setPlayerNames((current) =>
                      current.filter((playerName) => playerName !== name),
                    )
                  }
                  aria-label={`Remove ${name}`}
                >
                  <X className="size-3.5" aria-hidden="true" />
                </Button>
              </div>
            )
          })}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              void saveGame()
            }}
            disabled={updateGame.isPending}
          >
            Save player list
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}

export function GameAboutPage() {
  const { gameId } = useParams()
  const gameQuery = useGame(gameId)

  if (gameQuery.isPending)
    return (
      <section className="py-10 text-sm text-muted-foreground">
        Loading campaign…
      </section>
    )
  if (!gameQuery.data)
    return (
      <section className="py-10 text-sm text-destructive">
        Campaign not found.
      </section>
    )

  return <GameAboutContent key={gameQuery.data.id} game={gameQuery.data} />
}
