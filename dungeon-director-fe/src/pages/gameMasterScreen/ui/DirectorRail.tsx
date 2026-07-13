import { Badge, Button } from 'ui'

const sceneQueue = [
  ['01 Chapel Interior', 'Armed', 'text-orange-500'],
  ['02 Roof Chase', 'SFX ready', 'text-teal-400'],
  ['03 Vault Reveal', 'Pending', 'text-slate-500'],
] as const

const quickAssets = [
  ['1', 'map_overlay_grid', 'Ready', 'text-teal-400'],
  ['2', 'npc_cards_suspects', 'Pinned', 'text-orange-500'],
  ['3', 'handout_seal_fragment', 'Hidden', 'text-slate-500'],
  ['4', 'battle_cam_02', 'Standby', 'text-slate-500'],
] as const

function CurrentScenePanel() {
  return (
    <section className="border-b border-slate-800 p-4">
      <div className="border-l-4 border-orange-500 pl-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">
              Current Scene
            </p>
            <h2 className="mt-1 text-lg font-bold text-slate-100">
              Gatehouse Breach
            </h2>
          </div>
          <Badge
            variant="warning"
            className="border-none bg-transparent px-0 py-0 text-[11px] font-bold uppercase"
          >
            Live 21:14
          </Badge>
        </div>
        <p className="mt-3 text-sm leading-5 text-slate-300">
          3 hostile actors active. Fog layer locked. Party split detected on
          east corridor.
        </p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button className="bg-orange-500 text-white hover:bg-orange-600">
          Cut to map
        </Button>
        <Button variant="outline">Hold</Button>
      </div>
    </section>
  )
}

function SceneQueuePanel() {
  return (
    <section className="border-b border-slate-800 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold tracking-wide text-slate-500 uppercase">
          Scene Queue
        </h2>
        <span className="text-xs font-bold text-slate-500">Next 03</span>
      </div>
      <div className="mt-4 space-y-4">
        {sceneQueue.map(([scene, state, tone]) => (
          <div
            key={scene}
            className="flex items-center justify-between gap-4 text-xs font-bold uppercase"
          >
            <span className="text-slate-300">{scene}</span>
            <span className={tone}>{state}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function MusicPanel() {
  return (
    <section className="border-b border-slate-800 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold tracking-wide text-slate-500 uppercase">
          Music Panel
        </h2>
        <span className="text-xs font-bold text-slate-500">
          Bus A / -14 LUFS
        </span>
      </div>
      <h3 className="mt-3 text-base font-bold text-slate-200">
        Lower Crypt Tension Bed
      </h3>
      <p className="mt-2 text-xs font-semibold text-slate-500">
        looping · cue point B · 68%
      </p>
      <div className="mt-3 flex h-2 gap-1">
        <span className="flex-1 bg-slate-100" />
        <span className="flex-1 bg-slate-100" />
        <span className="flex-1 bg-slate-100" />
        <span className="flex-1 bg-orange-500" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button variant="outline">Duck</Button>
        <Button>Trigger Sting</Button>
      </div>
    </section>
  )
}

function QuickAssetsPanel() {
  return (
    <section className="border-b border-slate-800 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold tracking-wide text-slate-500 uppercase">
          Quick Assets
        </h2>
        <span className="text-xs font-bold text-slate-500">Hotkey 1-4</span>
      </div>
      <div className="mt-4 space-y-4">
        {quickAssets.map(([index, asset, state, tone]) => (
          <div
            key={asset}
            className="flex items-center justify-between gap-4 text-xs font-bold uppercase"
          >
            <span className="truncate text-slate-300">
              {index} {asset}
            </span>
            <span className={tone}>{state}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function SessionNotesPanel() {
  return (
    <section className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold tracking-wide text-slate-500 uppercase">
          Session Notes
        </h2>
        <span className="text-xs font-bold text-teal-400">Auto-save</span>
      </div>
      <div className="mt-4 space-y-3 text-xs leading-4 text-slate-300">
        <p>21:09 Cult emissary accepted parley after torch blackout.</p>
        <p>
          21:12 Rogue now isolated above nave. Trigger rain FX only if pursuit
          escalates.
        </p>
        <p>
          Prep vault reveal on next silence beat. Keep suspect cards visible
          after seal handout. <strong>SYNCED</strong>
        </p>
      </div>
    </section>
  )
}

export function DirectorRail() {
  return (
    <aside className="bg-[#0b0f15]">
      <CurrentScenePanel />
      <SceneQueuePanel />
      <MusicPanel />
      <QuickAssetsPanel />
      <SessionNotesPanel />
    </aside>
  )
}
