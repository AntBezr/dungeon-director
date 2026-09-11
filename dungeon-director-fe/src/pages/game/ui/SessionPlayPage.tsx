import {
  ArrowLeft,
  Check,
  Gamepad2,
  MonitorUp,
  Pencil,
  Settings2,
  Square,
  Waypoints,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import {
  useEndGame,
  useGameRuntime,
  useSession,
  useSessionScenes,
  useStartGame,
  useTransitionGame,
  useUpdateGameRuntime,
  type GameRuntime,
  type Scene,
  type SceneToken,
  type SessionSceneWithScene,
} from '@entities/game'
import { buildRoute, ROUTES } from '@shared/models/routes'
import { SceneWorkspace } from '@widgets/scene-workspace'
import { Badge, Button, Card, CardContent } from 'ui'

interface GameContentProps {
  runtime: GameRuntime
  scene: Scene
  sessionId: string
  gameId: string
  entries: SessionSceneWithScene[]
}

function GameContent({
  runtime,
  scene,
  sessionId,
  gameId,
  entries,
}: GameContentProps) {
  const navigate = useNavigate()
  const updateRuntime = useUpdateGameRuntime()
  const transitionGame = useTransitionGame()
  const endGame = useEndGame()
  const [tokens, setTokens] = useState(runtime.tokens)
  const [view, setView] = useState(runtime.camera)
  const [transitionTarget, setTransitionTarget] =
    useState<SessionSceneWithScene | null>(null)
  const [isEndDialogOpen, setIsEndDialogOpen] = useState(false)
  const planPath = buildRoute(ROUTES.GAME.SESSION, { gameId, sessionId })
  const playerPath = buildRoute(ROUTES.GAME.PLAYER_VIEW, { gameId, sessionId })
  const editScenePath = `${buildRoute(ROUTES.GAME.SCENE_EDITOR, { gameId, sceneId: scene.id })}?sessionId=${encodeURIComponent(sessionId)}${runtime.activeSessionSceneId ? `&sessionSceneId=${encodeURIComponent(runtime.activeSessionSceneId)}` : ''}`

  function updateTokens(nextTokens: SceneToken[], isFinal: boolean) {
    setTokens(nextTokens)
    if (isFinal)
      updateRuntime.mutate({ sessionId, update: { tokens: nextTokens } })
  }

  function updateView(nextView: GameRuntime['camera'], isFinal: boolean) {
    setView(nextView)
    if (isFinal)
      updateRuntime.mutate({ sessionId, update: { camera: nextView } })
  }

  async function transition(keepPositions: boolean) {
    if (!transitionTarget || transitionGame.isPending) return
    const nextRuntime = await transitionGame.mutateAsync({
      sessionId,
      nextSessionSceneId: transitionTarget.id,
      keepPositions,
    })
    setTransitionTarget(null)
    void navigate(
      `${buildRoute(ROUTES.GAME.SESSION_PLAY, { gameId, sessionId })}?scene=${encodeURIComponent(nextRuntime.activeSessionSceneId ?? '')}`,
    )
  }

  async function finishGame() {
    await endGame.mutateAsync(sessionId)
    void navigate(planPath)
  }

  return (
    <section className="py-6 lg:py-8">
      <header className="flex flex-col gap-4 border-b border-border pb-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="-ml-3 text-muted-foreground"
          >
            <Link to={planPath}>
              <ArrowLeft />
              Session plan
            </Link>
          </Button>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">
              {scene.title}
            </h2>
            <Badge>Play</Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Runtime state is stored separately from preparation.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to={planPath}>
              <Settings2 />
              Session plan
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to={editScenePath}>
              <Pencil />
              Edit scene
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to={playerPath} target="_blank">
              <MonitorUp />
              Player screen
            </Link>
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => setIsEndDialogOpen(true)}
          >
            <Square />
            End play
          </Button>
        </div>
      </header>

      <div className="mt-5 grid gap-4 xl:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="space-y-2">
          <p className="px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Session scenes
          </p>
          {entries.map((candidate) => (
            <Button
              key={candidate.id}
              type="button"
              variant={
                candidate.id === runtime.activeSessionSceneId
                  ? 'default'
                  : 'outline'
              }
              className="h-auto w-full justify-start px-3 py-2.5 text-left"
              onClick={() => {
                if (candidate.id !== runtime.activeSessionSceneId)
                  setTransitionTarget(candidate)
              }}
            >
              <span className="truncate">
                {candidate.position}. {candidate.scene.title}
              </span>
            </Button>
          ))}
        </aside>
        <SceneWorkspace
          mode="game"
          scene={scene}
          tokens={tokens}
          view={view}
          musicVolume={runtime.musicVolume}
          onTokensChange={updateTokens}
          onViewChange={updateView}
          onMusicVolumeChange={(musicVolume) =>
            updateRuntime.mutate({ sessionId, update: { musicVolume } })
          }
        />
      </div>

      {transitionTarget && (
        <TransitionDialog
          title={transitionTarget.scene.title}
          isPending={transitionGame.isPending}
          onCancel={() => setTransitionTarget(null)}
          onTransition={(keepPositions) => {
            void transition(keepPositions)
          }}
        />
      )}
      {isEndDialogOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/65 p-4">
          <Card className="w-full max-w-lg">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold">End play?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The runtime copy of this scene will be deleted. Preparation will
                stay unchanged.
              </p>
              <div className="mt-5 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEndDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={endGame.isPending}
                  onClick={() => {
                    void finishGame()
                  }}
                >
                  End play
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  )
}

function TransitionDialog({
  title,
  isPending,
  onCancel,
  onTransition,
}: {
  title: string
  isPending: boolean
  onCancel: () => void
  onTransition: (keepPositions: boolean) => void
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/65 p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <Waypoints className="size-5 text-primary" />
            <h3 className="text-lg font-semibold">Show “{title}”</h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            A regular transition moves the group to the placement tray. Keep
            positions only for maps with the same geometry.
          </p>
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => onTransition(false)}
            >
              Transition
            </Button>
            <Button
              type="button"
              disabled={isPending}
              onClick={() => onTransition(true)}
            >
              <Check />
              Keep positions
            </Button>
            <Button
              type="button"
              variant="ghost"
              disabled={isPending}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function SessionPlayPage() {
  const { gameId, sessionId } = useParams()
  const [searchParams] = useSearchParams()
  const sessionQuery = useSession(sessionId)
  const entriesQuery = useSessionScenes(sessionId)
  const runtimeQuery = useGameRuntime(sessionId)
  const startGame = useStartGame()
  const planPath =
    gameId && sessionId
      ? buildRoute(ROUTES.GAME.SESSION, { gameId, sessionId })
      : ROUTES.GAMES
  const entries = entriesQuery.data ?? []
  const requestedEntryId = searchParams.get('scene')
  const runtime = runtimeQuery.data
  const activeEntry = runtime
    ? (entries.find((entry) => entry.id === runtime.activeSessionSceneId) ??
      entries.find((entry) => entry.scene.id === runtime.activeSceneId))
    : undefined
  const activeScene = activeEntry?.scene

  async function startFirstScene() {
    if (!sessionId) return
    const entry =
      entries.find((candidate) => candidate.id === requestedEntryId) ??
      entries[0]
    if (!entry) return
    await startGame.mutateAsync({
      sessionId,
      sceneId: entry.scene.id,
      sessionSceneId: entry.id,
    })
  }

  if (
    sessionQuery.isPending ||
    entriesQuery.isPending ||
    runtimeQuery.isPending
  )
    return (
      <section className="py-10 text-sm text-muted-foreground">
        Loading game…
      </section>
    )
  if (sessionQuery.isError || !sessionQuery.data)
    return (
      <section className="py-10 text-sm text-destructive">
        Session not found.
      </section>
    )
  if (!runtime)
    return (
      <section className="py-10">
        <Card className="mx-auto max-w-xl">
          <CardContent className="pt-6 text-center">
            <Gamepad2 className="mx-auto size-8 text-primary" />
            <h2 className="mt-3 text-xl font-semibold">Game has not started</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A runtime copy of the selected scene will be created. It will not
              modify saved preparation.
            </p>
            <div className="mt-5 flex justify-center gap-2">
              <Button asChild variant="outline">
                <Link to={planPath}>Go to plan</Link>
              </Button>
              <Button
                type="button"
                disabled={!entries[0] || startGame.isPending}
                onClick={() => {
                  void startFirstScene()
                }}
              >
                Start game
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    )
  if (!activeScene || !gameId || !sessionId)
    return (
      <section className="py-10 text-sm text-destructive">
        Active scene not found.
      </section>
    )

  return (
    <GameContent
      key={`${runtime.id}-${runtime.activeSessionSceneId ?? runtime.activeSceneId}`}
      runtime={runtime}
      scene={activeScene}
      sessionId={sessionId}
      gameId={gameId}
      entries={entries}
    />
  )
}
