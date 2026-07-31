import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useCampaign, type CampaignType } from '@entities/campaign'
import { ROUTES } from '@shared/models/routes'

import { AssetsLibrary } from './AssetsLibrary'
import { SceneCanvas } from './SceneCanvas'
import { SceneEditorFooter } from './SceneEditorFooter'
import { SceneEditorHeader } from './SceneEditorHeader'
import { ScenePropertiesPanel } from './ScenePropertiesPanel'

type CampaignScene = CampaignType['scenes'][number]

interface SceneEditorWorkspaceProps {
  initialScene?: CampaignScene
  workspacePath: string
  onSave: () => void
}

function SceneEditorWorkspace({
  initialScene,
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
  const [music, setMusic] = useState('Low Strings / Tension Loop')

  return (
    <>
      <div className="grid min-h-162 lg:grid-cols-[240px_minmax(0,1fr)_254px]">
        <AssetsLibrary />
        <SceneCanvas sceneName={title} />
        <ScenePropertiesPanel
          title={title}
          description={description}
          music={music}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onMusicChange={setMusic}
        />
      </div>
      <SceneEditorFooter workspacePath={workspacePath} onSave={onSave} />
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
    <main className="min-h-svh bg-(--app-background) p-3 text-slate-100 sm:p-6">
      <section className="mx-auto min-h-[calc(100svh-24px)] w-full max-w-290 overflow-hidden border-2 border-slate-800 bg-(--app-surface) shadow-[8px_8px_0_var(--app-shadow)] sm:min-h-[calc(100svh-48px)]">
        <SceneEditorHeader
          workspacePath={workspacePath}
          editedSceneTitle={editedScene?.title}
        />
        <SceneEditorWorkspace
          key={editedScene?.sceneUuid ?? 'new-scene'}
          initialScene={editedScene}
          workspacePath={workspacePath}
          onSave={() => {
            void navigate(workspacePath)
          }}
        />
      </section>
    </main>
  )
}
