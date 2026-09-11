import { ArrowLeft, FilePlus2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  useCreateSceneFromPreset,
  useScenePresets,
  type Scene,
} from '@entities/game'
import { buildRoute, ROUTES } from '@shared/models/routes'
import { SceneWorkspace } from '@widgets/scene-workspace'
import { Badge, Button } from 'ui'

export function ScenePresetPage() {
  const { gameId, presetId } = useParams()
  const navigate = useNavigate()
  const presetsQuery = useScenePresets()
  const createFromPreset = useCreateSceneFromPreset()
  const preset = presetsQuery.data?.find(
    (candidate) => candidate.id === presetId,
  )
  const libraryPath = gameId
    ? buildRoute(ROUTES.GAME.SCENES, { gameId })
    : ROUTES.GAMES

  async function createCopy() {
    if (!gameId || !presetId) return
    const scene = await createFromPreset.mutateAsync({ gameId, presetId })
    void navigate(
      buildRoute(ROUTES.GAME.SCENE_EDITOR, { gameId, sceneId: scene.id }),
    )
  }

  if (presetsQuery.isPending)
    return (
      <section className="py-10 text-sm text-muted-foreground">
        Loading preset…
      </section>
    )
  if (!preset)
    return (
      <section className="py-10 text-sm text-destructive">
        Preset not found.
      </section>
    )

  const previewScene: Scene = {
    ...preset,
    gameId: gameId ?? '',
    createdAt: '',
    updatedAt: '',
  }

  return (
    <section className="py-6 lg:py-8">
      <header className="flex flex-col gap-4 border-b border-border pb-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="-ml-3 text-muted-foreground"
            onClick={() => void navigate(libraryPath)}
          >
            <ArrowLeft />
            Back to library
          </Button>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">
              {preset.title}
            </h2>
            <Badge variant="outline">View only</Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {preset.description}
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => {
            void createCopy()
          }}
          disabled={!gameId || createFromPreset.isPending}
        >
          <FilePlus2 />
          Create copy
        </Button>
      </header>
      <div className="mt-5">
        <SceneWorkspace
          mode="players"
          scene={previewScene}
          tokens={preset.tokens}
          view={preset.map.startView}
        />
      </div>
    </section>
  )
}
