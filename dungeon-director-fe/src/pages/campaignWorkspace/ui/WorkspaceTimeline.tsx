import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import {
  useCampaign,
  type CampaignSceneOrder,
} from '@entities/campaign'
import { ROUTES } from '@shared/models/routes'
import { Card } from 'ui'

import { useSceneOrderAutosave } from '../model/useSceneOrderAutosave'
import { SceneActions } from './SceneActions'
import { SceneCard } from './SceneCard'

export function WorkspaceTimeline() {
  const { campaignId } = useParams()
  const safeCampaignId = campaignId ?? 'demo-campaign'
  const sceneEditorPath = ROUTES.CAMPAIGNWORKSPACE.SCENEEDITOR.replace(
    ':campaignId',
    safeCampaignId,
  )
  const masterScreenPath = ROUTES.ACTIVEGAME.MASTERSCREEN.replace(
    ':gameId',
    safeCampaignId,
  )
  const { data: campaign, isLoading, isError } = useCampaign(safeCampaignId)
  const { scheduleSceneOrderSave, isSavingSceneOrder } = useSceneOrderAutosave(
    safeCampaignId,
  )

  const orderedScenes = useMemo(() => {
    if (!campaign) return []

    return [...campaign.scenes].sort((a, b) => a.order - b.order)
  }, [campaign])

  function reorderScenes(index: number, direction: -1 | 1) {
    const nextIndex = index + direction

    if (nextIndex < 0 || nextIndex >= orderedScenes.length) {
      return
    }

    const nextScenes = [...orderedScenes]
    const [movedScene] = nextScenes.splice(index, 1)

    if (!movedScene) {
      return
    }

    nextScenes.splice(nextIndex, 0, movedScene)

    const scenes: CampaignSceneOrder[] = nextScenes.map((scene, index) => ({
      sceneUuid: scene.sceneUuid,
      order: index + 1,
    }))
    scheduleSceneOrderSave(scenes)
  }

  if (isLoading) {
    return (
      <section className="flex min-w-0 flex-1 flex-col px-4 py-5 sm:px-6 lg:px-8">
        <Card className="p-5 text-sm text-muted-foreground">
          Loading campaign data...
        </Card>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="flex min-w-0 flex-1 flex-col px-4 py-5 sm:px-6 lg:px-8">
        <Card className="p-5 text-sm text-muted-foreground">
          Error loading campaign data.
        </Card>
      </section>
    )
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col py-8 sm:py-10">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary">
            Campaign Workspace / Scene Timeline
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Scene Timeline
          </h1>
          <p className="mt-3 max-w-150 text-sm leading-6 text-muted-foreground">
            Reorder beats, keep encounter prep visible, and stage exactly what
            the table needs next.
          </p>
        </div>
        <SceneActions sceneEditorPath={sceneEditorPath} />
      </header>

      <div className="mt-6">
        <div className="space-y-4">
          <Card className="flex min-h-10 items-center justify-between px-4 py-3">
            <h2 className="text-base font-semibold text-foreground">
              Next session run order
            </h2>
            <p className="text-sm text-muted-foreground">
              {orderedScenes.length} scenes in this campaign
            </p>
          </Card>

          {orderedScenes.length === 0 ? (
            <Card className="p-5 text-sm text-muted-foreground">
              Scenes will appear here when the campaign data hook is connected.
            </Card>
          ) : (
            <div className="space-y-4">
              {orderedScenes.map((scene, index) => (
                <SceneCard
                  key={scene.sceneUuid}
                  scene={scene}
                  index={index}
                  total={orderedScenes.length}
                  editScenePath={`${sceneEditorPath}?sceneUuid=${encodeURIComponent(scene.sceneUuid)}`}
                  startGamePath={`${masterScreenPath}?sceneUuid=${encodeURIComponent(scene.sceneUuid)}`}
                  onMove={
                    isSavingSceneOrder
                      ? undefined
                      : (direction) => reorderScenes(index, direction)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
