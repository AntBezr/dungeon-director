import { useParams, useSearchParams } from 'react-router-dom'

import { useCampaign } from '@entities/campaign'
import { ROUTES } from '@shared/models/routes'

import { ActorsSidebar } from './ActorsSidebar'
import { BattleMapPanel } from './BattleMapPanel'
import { DirectorRail } from './DirectorRail'
import { GameMasterHeader } from './GameMasterHeader'

export function GameMasterScreenPage() {
  const { gameId } = useParams()
  const [searchParams] = useSearchParams()
  const safeGameId = gameId ?? 'demo-game'
  const { data: campaign } = useCampaign(safeGameId)
  const sceneUuid = searchParams.get('sceneUuid')
  const activeScene = campaign?.scenes.find(
    (scene) => scene.sceneUuid === sceneUuid,
  )
  const workspacePath = ROUTES.CAMPAIGNWORKSPACE.BASE.replace(
    ':campaignId',
    safeGameId,
  )
  const playerScreenPath = ROUTES.ACTIVEGAME.PLAYERSSCREEN.replace(
    ':gameId',
    safeGameId,
  )

  return (
    <main className="min-h-svh bg-(--app-background) p-3 text-slate-100 sm:p-6">
      <section className="mx-auto min-h-[calc(100svh-24px)] w-full max-w-300 overflow-hidden border-2 border-slate-800 bg-(--app-surface) shadow-[8px_8px_0_var(--app-shadow)] sm:min-h-[calc(100svh-48px)]">
        <GameMasterHeader
          workspacePath={workspacePath}
          playerScreenPath={playerScreenPath}
          campaignTitle={campaign?.title ?? 'Campaign'}
          activeSceneTitle={activeScene?.title}
        />
        <div className="grid min-h-176 lg:grid-cols-[264px_minmax(0,1fr)_300px]">
          <ActorsSidebar />
          <BattleMapPanel />
          <DirectorRail />
        </div>
      </section>
    </main>
  )
}
