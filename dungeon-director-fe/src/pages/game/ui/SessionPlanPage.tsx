import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Pencil,
  Play,
  Plus,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  sessionStatusLabels,
  useAddSceneToSession,
  useCreateScene,
  useDeleteSession,
  useMoveSceneInSession,
  useRemoveSceneFromSession,
  useGameRuntime,
  useScenes,
  useSession,
  useSessionScenes,
  useStartGame,
  useUpdateSession,
  useUpdateSessionScene,
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

export function SessionPlanPage() {
  const { gameId, sessionId } = useParams()
  const navigate = useNavigate()
  const sessionQuery = useSession(sessionId)
  const runtimeQuery = useGameRuntime(sessionId)
  const scenesQuery = useScenes(gameId)
  const entriesQuery = useSessionScenes(sessionId)
  const addScene = useAddSceneToSession()
  const createScene = useCreateScene()
  const removeScene = useRemoveSceneFromSession()
  const moveScene = useMoveSceneInSession()
  const updateSession = useUpdateSession()
  const updateSessionScene = useUpdateSessionScene()
  const deleteSession = useDeleteSession()
  const startGame = useStartGame()
  const [selectedSceneId, setSelectedSceneId] = useState('')
  const [isCreatingScene, setIsCreatingScene] = useState(false)
  const [newSceneTitle, setNewSceneTitle] = useState('')
  const [isEditingSession, setIsEditingSession] = useState(false)
  const [editingTitle, setEditingTitle] = useState('')
  const [editingDescription, setEditingDescription] = useState('')
  const [isDeletePending, setIsDeletePending] = useState(false)

  const session = sessionQuery.data
  const sessionPath = gameId
    ? buildRoute(ROUTES.GAME.SESSIONS, { gameId })
    : ROUTES.GAMES
  const playPath =
    gameId && sessionId
      ? buildRoute(ROUTES.GAME.SESSION_PLAY, { gameId, sessionId })
      : ROUTES.GAMES

  async function openGame(entryId?: string) {
    if (!gameId || !sessionId) return

    const entries = entriesQuery.data ?? []
    const entry =
      entries.find((candidate) => candidate.id === entryId) ?? entries[0]
    if (!entry) return

    if (!runtimeQuery.data) {
      await startGame.mutateAsync({
        sessionId,
        sceneId: entry.scene.id,
        sessionSceneId: entry.id,
      })
    }

    void navigate(`${playPath}?scene=${encodeURIComponent(entry.id)}`)
  }

  async function addSelectedScene() {
    if (!sessionId || !selectedSceneId) return
    await addScene.mutateAsync({ sessionId, sceneId: selectedSceneId })
    setSelectedSceneId('')
  }

  async function createAndAddScene(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!gameId || !sessionId || !newSceneTitle.trim()) return

    // Plan entries reference a scene, so removing one does not affect the library.
    const scene = await createScene.mutateAsync({
      gameId,
      input: { title: newSceneTitle.trim(), description: '', musicLink: '' },
    })
    await addScene.mutateAsync({ sessionId, sceneId: scene.id })
    setNewSceneTitle('')
    setIsCreatingScene(false)
  }

  async function saveSession(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!sessionId || !editingTitle.trim()) return

    await updateSession.mutateAsync({
      sessionId,
      update: {
        title: editingTitle.trim(),
        description: editingDescription.trim(),
      },
    })
    setIsEditingSession(false)
  }

  async function deleteCurrentSession() {
    if (!gameId || !sessionId) return
    await deleteSession.mutateAsync({ gameId, sessionId })
    void navigate(sessionPath)
  }

  if (sessionQuery.isPending)
    return (
      <section className="py-10 text-sm text-muted-foreground">
        Loading session…
      </section>
    )
  if (sessionQuery.isError || !session)
    return (
      <section className="py-10 text-sm text-destructive">
        Session not found.
      </section>
    )

  return (
    <section className="py-8 sm:py-10">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="-ml-3 text-muted-foreground"
      >
        <Link to={sessionPath}>
          <ArrowLeft className="size-4" aria-hidden="true" />
          All sessions
        </Link>
      </Button>

      <header className="mt-4 flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="break-words text-2xl font-semibold tracking-tight">
              {session.title}
            </h2>
            <Badge
              variant={session.status === 'active' ? 'default' : 'secondary'}
            >
              {sessionStatusLabels[session.status]}
            </Badge>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {session.description || 'No session description added.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            disabled={
              !entriesQuery.data?.length ||
              startGame.isPending ||
              runtimeQuery.isPending
            }
            onClick={() => {
              void openGame()
            }}
          >
            <Play className="size-4" aria-hidden="true" />
            {startGame.isPending ? 'Starting…' : 'Play session'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setEditingTitle(session.title)
              setEditingDescription(session.description)
              setIsEditingSession(true)
            }}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => setIsDeletePending(true)}
          >
            Delete
          </Button>
        </div>
      </header>

      {isDeletePending && (
        <Card className="mt-5 border-destructive/40 bg-destructive/5 py-4">
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">
              Delete this session and its plan? Its scenes will remain in the
              campaign library.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDeletePending(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  void deleteCurrentSession()
                }}
                disabled={deleteSession.isPending}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isEditingSession && (
        <Card className="mt-5">
          <CardContent className="pt-6">
            <form
              className="grid gap-4"
              onSubmit={(event) => {
                void saveSession(event)
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="edit-session-title">Title</Label>
                <Input
                  id="edit-session-title"
                  value={editingTitle}
                  onChange={(event) => setEditingTitle(event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-session-description">Description</Label>
                <Textarea
                  id="edit-session-description"
                  value={editingDescription}
                  onChange={(event) =>
                    setEditingDescription(event.target.value)
                  }
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditingSession(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={updateSession.isPending}>
                  Save
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">Preparation</p>
              <h3 className="mt-1 text-xl font-semibold">Scene order</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {entriesQuery.data?.length ?? 0} scenes
            </p>
          </div>
          <div className="mt-4 space-y-2">
            {entriesQuery.data?.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  Add a scene from the library or create one for this session.
                </CardContent>
              </Card>
            )}
            {entriesQuery.data?.map((entry, index, entries) => {
              const editorPath = `${buildRoute(ROUTES.GAME.SCENE_EDITOR, { gameId: gameId ?? '', sceneId: entry.scene.id })}?sessionId=${encodeURIComponent(sessionId ?? '')}&sessionSceneId=${encodeURIComponent(entry.id)}`

              return (
                <Card key={entry.id} className="py-3">
                  <CardContent className="flex gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-muted text-xs font-semibold">
                      {entry.position}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="break-words font-semibold">
                          {entry.scene.title}
                        </h4>
                        <Button
                          type="button"
                          size="sm"
                          className="h-7"
                          disabled={
                            startGame.isPending || runtimeQuery.isPending
                          }
                          onClick={() => {
                            void openGame(entry.id)
                          }}
                        >
                          <Play className="size-3.5" aria-hidden="true" />
                          Play
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="h-7"
                        >
                          <Link to={editorPath}>
                            <Pencil className="size-3.5" aria-hidden="true" />
                            Edit
                          </Link>
                        </Button>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {entry.scene.description ||
                          'No scene description added.'}
                      </p>
                      <Label
                        className="sr-only"
                        htmlFor={`scene-note-${entry.id}`}
                      >
                        Game master notes for {entry.scene.title}
                      </Label>
                      <Input
                        id={`scene-note-${entry.id}`}
                        className="mt-2 h-8 text-xs"
                        defaultValue={entry.notes}
                        placeholder="Game master notes"
                        onBlur={(event) => {
                          if (event.target.value !== entry.notes)
                            updateSessionScene.mutate({
                              entryId: entry.id,
                              notes: event.target.value,
                            })
                        }}
                      />
                    </div>
                    <div className="flex shrink-0 flex-col gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        disabled={index === 0 || moveScene.isPending}
                        onClick={() =>
                          moveScene.mutate({ entryId: entry.id, direction: -1 })
                        }
                        aria-label={`Move ${entry.scene.title} up`}
                      >
                        <ChevronUp className="size-3.5" aria-hidden="true" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        disabled={
                          index === entries.length - 1 || moveScene.isPending
                        }
                        onClick={() =>
                          moveScene.mutate({ entryId: entry.id, direction: 1 })
                        }
                        aria-label={`Move ${entry.scene.title} down`}
                      >
                        <ChevronDown className="size-3.5" aria-hidden="true" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeScene.mutate(entry.id)}
                        aria-label={`Remove ${entry.scene.title} from session`}
                      >
                        <Trash2 className="size-3.5" aria-hidden="true" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <aside>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Add a scene</CardTitle>
              <CardDescription>
                You can add the same library scene to a plan more than once.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <select
                  className="h-9 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-sm"
                  value={selectedSceneId}
                  onChange={(event) => setSelectedSceneId(event.target.value)}
                  aria-label="Choose a scene"
                >
                  <option value="">Choose a scene</option>
                  {scenesQuery.data?.map((scene) => (
                    <option key={scene.id} value={scene.id}>
                      {scene.title}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  size="icon"
                  onClick={() => {
                    void addSelectedScene()
                  }}
                  disabled={!selectedSceneId || addScene.isPending}
                  aria-label="Add scene to session"
                >
                  <Plus className="size-4" aria-hidden="true" />
                </Button>
              </div>
              <Button
                asChild
                variant="link"
                size="sm"
                className="mt-3 h-auto px-0"
              >
                <Link
                  to={
                    gameId
                      ? buildRoute(ROUTES.GAME.SCENES, { gameId })
                      : ROUTES.GAMES
                  }
                >
                  Open scene library
                </Link>
              </Button>
              <div className="mt-4 border-t border-border pt-4">
                {isCreatingScene ? (
                  <form
                    className="space-y-3"
                    onSubmit={(event) => {
                      void createAndAddScene(event)
                    }}
                  >
                    <div className="grid gap-2">
                      <Label htmlFor="new-scene-title">New scene title</Label>
                      <Input
                        id="new-scene-title"
                        value={newSceneTitle}
                        onChange={(event) =>
                          setNewSceneTitle(event.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIsCreatingScene(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        size="sm"
                        disabled={createScene.isPending || addScene.isPending}
                      >
                        Create and add
                      </Button>
                    </div>
                  </form>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsCreatingScene(true)}
                  >
                    Create new scene
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </section>
  )
}
