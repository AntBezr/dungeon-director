import { ActorsSidebar } from './ActorsSidebar'
import { BattleMapPanel } from './BattleMapPanel'
import { DirectorRail } from './DirectorRail'
import { GameMasterHeader } from './GameMasterHeader'

export function GameMasterScreenPage() {
  return (
    <main className="mx-auto min-h-[760px] w-full max-w-[1200px] overflow-hidden border-2 border-slate-800 bg-[#090c12] shadow-[8px_8px_0_#020617]">
      <GameMasterHeader />
      <div className="grid min-h-[704px] lg:grid-cols-[264px_minmax(0,1fr)_300px]">
        <ActorsSidebar />
        <BattleMapPanel />
        <DirectorRail />
      </div>
    </main>
  )
}
