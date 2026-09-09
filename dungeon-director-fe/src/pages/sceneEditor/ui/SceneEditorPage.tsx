import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import {
  useCampaign,
  useUpdateCampaignScene,
  type CampaignScene,
  type SceneMapSettings,
  type SceneUnit,
  type SceneUnitType,
} from '@entities/campaign'
import { ROUTES } from '@shared/models/routes'

import { SceneCanvas } from './SceneCanvas'
import { SceneEditorFooter } from './SceneEditorFooter'
import { SceneEditorHeader } from './SceneEditorHeader'
import { ScenePropertiesPanel } from './ScenePropertiesPanel'
import { SceneUnitsPanel } from './SceneUnitsPanel'

const defaultMap: SceneMapSettings = {
  imageUrl: null,
  rotation: 0,
  zoom: 1,
  position: {
    x: 0,
    y: 0,
  },
  grid: {
    enabled: true,
    size: 32,
  },
}

interface SceneEditorWorkspaceProps {
  initialScene?: CampaignScene
  campaignId?: string
  workspacePath: string
  onSave: () => void
}

function SceneEditorWorkspace({
  initialScene,
  campaignId,
  workspacePath,
  onSave,
}: SceneEditorWorkspaceProps) {
  const [title, setTitle] = useState(
    initialScene?.title ?? 'Untitled bridge encounter',
  )
  const [description, setDescription] = useState(
    initialScene?.description ??
      'Add the situation, what changes when the party arrives, and the decision that moves the session forward.',
  )
  const [approximateDuration, setApproximateDuration] = useState(
    initialScene?.approximateDuration ?? 45,
  )
  const [map, setMap] = useState<SceneMapSettings>(
    initialScene?.map ?? defaultMap,
  )
  const [spotifyUrl, setSpotifyUrl] = useState(initialScene?.music.spotifyUrl ?? '')
  const [units, setUnits] = useState<SceneUnit[]>(initialScene?.units ?? [])
  const updateSceneMutation = useUpdateCampaignScene()
  const canSave = Boolean(initialScene && campaignId)

  function addUnit(unitType: SceneUnitType, monsterIndex: string) {
    setUnits((currentUnits) => [
      ...currentUnits,
      {
        unitId: crypto.randomUUID(),
        unitType,
        character: {
          source: 'DND_5E_API',
          resource: 'monsters',
          index: monsterIndex,
        },
        loot: [],
      },
    ])
  }

  function removeUnit(unitId: string) {
    setUnits((currentUnits) =>
      currentUnits.filter((unit) => unit.unitId !== unitId),
    )
  }

  function giveLoot(unitId: string, equipmentIndex: string) {
    setUnits((currentUnits) =>
      currentUnits.map((unit) =>
        unit.unitId === unitId
          ? {
              ...unit,
              loot: [
                ...unit.loot,
                {
                  source: 'DND_5E_API',
                  resource: 'equipment',
                  index: equipmentIndex,
                },
              ],
            }
          : unit,
      ),
    )
  }

  function removeLoot(unitId: string, equipmentIndex: string) {
    setUnits((currentUnits) =>
      currentUnits.map((unit) =>
        unit.unitId === unitId
          ? {
              ...unit,
              loot: unit.loot.filter((loot) => loot.index !== equipmentIndex),
            }
          : unit,
      ),
    )
  }

  function saveScene() {
    if (!initialScene || !campaignId) {
      return
    }

    updateSceneMutation.mutate(
      {
        campaignId,
        sceneUuid: initialScene.sceneUuid,
        scene: {
          title: title.trim() || initialScene.title,
          description,
          approximateDuration: Math.max(1, approximateDuration),
          map,
          music: { spotifyUrl },
          units,
        },
      },
      { onSuccess: onSave },
    )
  }

  return (
    <>
      <div className="grid xl:grid-cols-[minmax(0,1fr)_minmax(320px,360px)]">
        <SceneCanvas sceneName={title} map={map} onMapChange={setMap} />
        <ScenePropertiesPanel
          title={title}
          description={description}
          approximateDuration={approximateDuration}
          spotifyUrl={spotifyUrl}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onDurationChange={setApproximateDuration}
          onSpotifyUrlChange={setSpotifyUrl}
        />
      </div>
      <SceneUnitsPanel
        units={units}
        onAddUnit={addUnit}
        onRemoveUnit={removeUnit}
        onGiveLoot={giveLoot}
        onRemoveLoot={removeLoot}
      />
      <SceneEditorFooter
        workspacePath={workspacePath}
        onSave={saveScene}
        isSaving={updateSceneMutation.isPending}
        canSave={canSave}
      />
    </>
  )
}

export function SceneEditorPage() {
  const { campaignId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { data: campaign } = useCampaign(campaignId)
  const sceneUuid = searchParams.get('sceneUuid')
  const editedScene = campaign?.scenes.find(
    (scene) => scene.sceneUuid === sceneUuid,
  )
  const workspacePath = ROUTES.CAMPAIGNWORKSPACE.BASE.replace(
    ':campaignId',
    campaignId ?? 'demo-campaign',
  )

  return (
    <main className="min-h-svh bg-background py-4 sm:py-6">
      <section className="mx-auto w-full max-w-7xl overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <SceneEditorHeader
          workspacePath={workspacePath}
          editedSceneTitle={editedScene?.title}
        />
        <SceneEditorWorkspace
          key={editedScene?.sceneUuid ?? 'new-scene'}
          initialScene={editedScene}
          campaignId={campaignId}
          workspacePath={workspacePath}
          onSave={() => {
            void navigate(workspacePath)
          }}
        />
      </section>
    </main>
  )
}
