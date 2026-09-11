import { Copy, FilePlus2, Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
  useAddSceneToSession,
  useCloneScene,
  useCreateScene,
  useCreateSceneFromPreset,
  useGameSessions,
  useScenePresets,
  useScenes,
} from '@entities/game'
import { buildRoute, ROUTES } from '@shared/models/routes'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
} from 'ui'

export function SceneLibraryPage() {
  const { gameId } = useParams()
  const [search, setSearch] = useState('')
  const [appliedSearch, setAppliedSearch] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [targetSessionId, setTargetSessionId] = useState('')
  const scenesQuery = useScenes(gameId, appliedSearch)
  const presetsQuery = useScenePresets()
  const sessionsQuery = useGameSessions(gameId, 1, '')
  const createScene = useCreateScene()
  const cloneScene = useCloneScene()
  const createFromPreset = useCreateSceneFromPreset()
  const addScene = useAddSceneToSession()

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!gameId || !title.trim()) return
    await createScene.mutateAsync({
      gameId,
      input: {
        title: title.trim(),
        description: description.trim(),
        musicLink: '',
      },
    })
    setTitle('')
    setDescription('')
    setIsCreating(false)
  }

  function addToSession(sceneId: string) {
    if (!targetSessionId) return
    addScene.mutate({ sessionId: targetSessionId, sceneId })
  }

  return (
    <section className="py-8 sm:py-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Library</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Campaign scenes
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            A scene is independent preparation. A session plan only references
            it, so removing an entry will not delete the scene itself.
          </p>
        </div>
        <Button type="button" onClick={() => setIsCreating((open) => !open)}>
          <Plus className="size-4" aria-hidden="true" />
          Create scene
        </Button>
      </div>
      {isCreating && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>New scene</CardTitle>
            <CardDescription>
              You can configure the map and objects immediately after creation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(event) => {
                void handleCreate(event)
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="scene-title">Title</Label>
                <Input
                  id="scene-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="scene-description">Description</Label>
                <Textarea
                  id="scene-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={createScene.isPending}>
                  Create
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
              if (event.key === 'Enter') setAppliedSearch(search)
            }}
            placeholder="Search scenes"
            aria-label="Search scenes"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setAppliedSearch(search)}
        >
          Search
        </Button>
        <select
          className="h-9 min-w-0 max-w-full rounded-md border border-input bg-background px-3 text-sm"
          value={targetSessionId}
          onChange={(event) => setTargetSessionId(event.target.value)}
          aria-label="Choose a session to add the scene"
        >
          <option value="">Add to session…</option>
          {sessionsQuery.data?.results.map((session) => (
            <option key={session.id} value={session.id}>
              {session.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {scenesQuery.data?.map((scene) => (
          <Card key={scene.id} className="h-full">
            <CardHeader>
              <Badge variant="secondary">Campaign scene</Badge>
              <CardTitle className="mt-3">{scene.title}</CardTitle>
              <CardDescription className="mt-2 leading-6">
                {scene.description || 'No description added'}
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link
                  to={
                    gameId
                      ? buildRoute(ROUTES.GAME.SCENE_EDITOR, {
                          gameId,
                          sceneId: scene.id,
                        })
                      : ROUTES.GAMES
                  }
                >
                  Edit
                </Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => cloneScene.mutate(scene.id)}
                disabled={cloneScene.isPending}
              >
                <Copy className="size-3.5" aria-hidden="true" />
                Duplicate
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!targetSessionId || addScene.isPending}
                onClick={() => addToSession(scene.id)}
              >
                Add to plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-10 border-t border-border pt-8">
        <div>
          <p className="text-sm font-medium text-primary">System presets</p>
          <h2 className="mt-1 text-xl font-semibold">View only</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A preset creates an independent copy in this campaign's library.
          </p>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {presetsQuery.data?.map((preset) => (
            <Card key={preset.id}>
              <CardHeader>
                <Badge variant="outline">{preset.sourceLabel}</Badge>
                <CardTitle className="mt-3">{preset.title}</CardTitle>
                <CardDescription className="mt-2 leading-6">
                  {preset.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button asChild type="button" variant="outline" size="sm">
                  <Link
                    to={
                      gameId
                        ? buildRoute(ROUTES.GAME.SCENE_PRESET, {
                            gameId,
                            presetId: preset.id,
                          })
                        : ROUTES.GAMES
                    }
                  >
                    View
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (gameId)
                      createFromPreset.mutate({ gameId, presetId: preset.id })
                  }}
                  disabled={!gameId || createFromPreset.isPending}
                >
                  <FilePlus2 className="size-4" aria-hidden="true" />
                  Create copy
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
