import { ArrowLeft, Copy, Gamepad2, MonitorUp, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import {
  useCloneScene,
  useGameRuntime,
  useScene,
  useStartGame,
  useUpdateScene,
  type Scene,
} from '@entities/game'
import { buildRoute, ROUTES } from '@shared/models/routes'
import { SceneWorkspace } from '@widgets/scene-workspace'
import { Badge, Button, Card, CardContent } from 'ui'

type SaveState = 'idle' | 'success' | 'error'

interface PreparationContentProps {
  scene: Scene
  backPath: string
  backLabel: string
  sessionId: string | null
  sessionSceneId: string | null
  gameId: string | undefined
  hasActiveGame: boolean
}

function PreparationContent({
  scene,
  backPath,
  backLabel,
  sessionId,
  sessionSceneId,
  gameId,
  hasActiveGame,
}: PreparationContentProps) {
  const navigate = useNavigate()
  const updateScene = useUpdateScene()
  const cloneScene = useCloneScene()
  const startGame = useStartGame()
  const [baseline, setBaseline] = useState(scene)
  const [draft, setDraft] = useState(scene)
  const [view, setView] = useState(scene.map.startView)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [isPlayerPreview, setIsPlayerPreview] = useState(false)
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false)
  const [isStartDialogOpen, setIsStartDialogOpen] = useState(false)
  const hasChanges = JSON.stringify(draft) !== JSON.stringify(baseline)
  const playPath =
    gameId && sessionId
      ? buildRoute(ROUTES.GAME.SESSION_PLAY, { gameId, sessionId })
      : null

  useEffect(() => {
    if (!hasChanges) return
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasChanges])

  async function savePreparation() {
    setSaveState('idle')
    try {
      const updatedScene = await updateScene.mutateAsync({
        sceneId: draft.id,
        update: {
          title: draft.title.trim(),
          description: draft.description.trim(),
          notes: draft.notes.trim(),
          musicLink: draft.musicLink.trim(),
          map: draft.map,
          tokens: draft.tokens,
        },
      })
      setBaseline(updatedScene)
      setDraft(updatedScene)
      setSaveState('success')
      return true
    } catch {
      setSaveState('error')
      return false
    }
  }

  async function launchGame() {
    if (!sessionId || !playPath) return
    await startGame.mutateAsync({
      sessionId,
      sceneId: baseline.id,
      sessionSceneId: sessionSceneId ?? undefined,
    })
    void navigate(playPath)
  }

  async function saveAndLeave() {
    if (await savePreparation()) void navigate(backPath)
  }

  async function saveAndLaunch() {
    if (await savePreparation()) {
      setIsStartDialogOpen(false)
      await launchGame()
    }
  }

  function requestBack() {
    if (hasChanges) {
      setIsLeaveDialogOpen(true)
      return
    }
    void navigate(backPath)
  }

  function requestGame() {
    if (hasActiveGame && playPath) {
      void navigate(playPath)
      return
    }
    if (hasChanges) {
      setIsStartDialogOpen(true)
      return
    }
    void launchGame()
  }

  return (
    <section className="py-6 lg:py-8">
      <header className="flex flex-col gap-4 border-b border-border pb-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="-ml-3 text-muted-foreground"
            onClick={requestBack}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {backLabel}
          </Button>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h2 className="truncate text-2xl font-semibold tracking-tight">
              {draft.title || 'New scene'}
            </h2>
            <Badge variant="secondary">Preparation</Badge>
            {hasChanges && <Badge variant="outline">Unsaved changes</Badge>}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Preparation is stored locally. Panning the map does not change the
            starting view on its own.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsPlayerPreview((value) => !value)}
          >
            <MonitorUp className="size-4" />
            {isPlayerPreview ? 'Return to tools' : 'Player view'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => cloneScene.mutate(scene.id)}
            disabled={cloneScene.isPending}
          >
            <Copy className="size-4" />
            Duplicate
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => {
              void savePreparation()
            }}
            disabled={!hasChanges || updateScene.isPending}
          >
            <Save className="size-4" />
            {updateScene.isPending ? 'Saving…' : 'Save'}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={requestGame}
            disabled={!playPath || startGame.isPending}
          >
            <Gamepad2 className="size-4" />
            {hasActiveGame ? 'Return to game' : 'Start game'}
          </Button>
        </div>
      </header>

      {saveState !== 'idle' && (
        <p
          role="status"
          className={`mt-3 text-sm ${saveState === 'error' ? 'text-destructive' : 'text-emerald-600 dark:text-emerald-400'}`}
        >
          {saveState === 'success'
            ? 'Preparation saved locally.'
            : 'Could not save preparation. The draft remains on screen.'}
        </p>
      )}
      {!playPath && (
        <p className="mt-3 text-sm text-muted-foreground">
          Open this scene from a session plan to start the game.
        </p>
      )}

      <div className="mt-5">
        <SceneWorkspace
          mode={isPlayerPreview ? 'players' : 'preparation'}
          scene={draft}
          tokens={draft.tokens}
          view={view}
          isPlayerPreview={isPlayerPreview}
          onSceneChange={(update) =>
            setDraft((current) => ({ ...current, ...update }))
          }
          onMapChange={(map) => setDraft((current) => ({ ...current, map }))}
          onMakeStartView={() =>
            setDraft((current) => ({
              ...current,
              map: { ...current.map, startView: view },
            }))
          }
          onTokensChange={(tokens) =>
            setDraft((current) => ({ ...current, tokens }))
          }
          onViewChange={(nextView) => setView(nextView)}
        />
      </div>

      {isLeaveDialogOpen && (
        <Dialog
          title="Unsaved changes"
          description="Save preparation before leaving?"
          onClose={() => setIsLeaveDialogOpen(false)}
        >
          <Button
            type="button"
            size="sm"
            onClick={() => {
              void saveAndLeave()
            }}
          >
            Save and leave
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void navigate(backPath)}
          >
            Leave without saving
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsLeaveDialogOpen(false)}
          >
            Stay
          </Button>
        </Dialog>
      )}
      {isStartDialogOpen && (
        <Dialog
          title="Start game?"
          description="You can save and play this draft, or discard changes and use the previously saved preparation."
          onClose={() => setIsStartDialogOpen(false)}
        >
          <Button
            type="button"
            size="sm"
            onClick={() => {
              void saveAndLaunch()
            }}
          >
            Save and start
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setIsStartDialogOpen(false)
              void launchGame()
            }}
          >
            Start without saving
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsStartDialogOpen(false)}
          >
            Cancel
          </Button>
        </Dialog>
      )}
    </section>
  )
}

function Dialog({
  title,
  description,
  children,
  onClose,
}: {
  title: string
  description: string
  children: React.ReactNode
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/65 p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            {children}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={onClose}
          >
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export function SceneEditorPage() {
  const { gameId, sceneId } = useParams()
  const [searchParams] = useSearchParams()
  const sceneQuery = useScene(sceneId)
  const sessionId = searchParams.get('sessionId')
  const sessionSceneId = searchParams.get('sessionSceneId')
  const runtimeQuery = useGameRuntime(sessionId ?? undefined)
  const libraryPath = gameId
    ? buildRoute(ROUTES.GAME.SCENES, { gameId })
    : ROUTES.GAMES
  const sessionPath =
    gameId && sessionId
      ? buildRoute(ROUTES.GAME.SESSION, { gameId, sessionId })
      : libraryPath
  const backLabel = sessionId ? 'Session plan' : 'Scene library'

  if (sceneQuery.isPending || runtimeQuery.isPending)
    return (
      <section className="py-10 text-sm text-muted-foreground">
        Loading scene…
      </section>
    )
  if (sceneQuery.isError || !sceneQuery.data)
    return (
      <section className="py-10 text-sm text-destructive">
        Scene not found.
      </section>
    )

  return (
    <PreparationContent
      key={sceneQuery.data.id}
      scene={sceneQuery.data}
      backPath={sessionPath}
      backLabel={backLabel}
      sessionId={sessionId}
      sessionSceneId={sessionSceneId}
      gameId={gameId}
      hasActiveGame={Boolean(runtimeQuery.data)}
    />
  )
}
