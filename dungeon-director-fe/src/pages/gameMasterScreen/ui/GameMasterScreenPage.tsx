import { ActorsSidebar } from './ActorsSidebar'
import { BattleMapPanel } from './BattleMapPanel'
import { DirectorRail } from './DirectorRail'
import { GameMasterHeader } from './GameMasterHeader'

export function GameMasterScreenPage() {
  return (
    <main className="mx-auto min-h-190 w-full max-w-300 overflow-hidden border-2 border-slate-800 bg-(--app-surface) shadow-[8px_8px_0_var(--app-shadow)]">
      <GameMasterHeader />
      <div className="grid min-h-176 lg:grid-cols-[264px_minmax(0,1fr)_300px]">
        <ActorsSidebar />
        <BattleMapPanel />
        <DirectorRail />
      </div>
    </main>
  )
}
