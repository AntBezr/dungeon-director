import { Plus, Radio, ScreenShare } from 'lucide-react';

import { Badge, Button, Card, CardContent, CardHeader } from '@shared/ui';

const navItems = ['Overview', 'Scene Timeline', 'Assets', 'Session Notes']

const scenes = [
  {
    number: 'SCENE 01',
    title: 'Cold open in the brass observatory',
    duration: '12 min',
    body: 'Re-establish the city, show the ash weather system, and let the players notice the missing survey crew before the first hard prompt.',
    output: 'city map + storm ambience + first clue card',
  },
  {
    number: 'SCENE 02',
    title: 'Dockside negotiation with the relay broker',
    duration: '22 min',
    body: "A controlled social scene with one fast escalation path. Keep the broker's offer visible and surface the consequence if the crew refuses.",
    output: 'broker portrait + debt tracker + negotiation beats',
  },
  {
    number: 'SCENE 03',
    title: 'Power failure across the lower archive',
    duration: '16 min',
    body: 'Transition into pressure. Trigger the blackout, reveal the false elevator route, and give the table a clean decision before initiative starts.',
    output: 'blackout overlay + encounter board + fallback route note',
  },
]

export function CampaignWorkspacePage() {
  return (
    <main className="mx-auto flex min-h-[760px] w-full overflow-hidden border border-slate-900 bg-[#070a0f] shadow-2xl">
      <aside className="hidden w-[196px] shrink-0 border-r border-slate-800 bg-[#0a0f16] px-4 py-5 md:block">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-sm bg-orange-500" />
          <span className="text-sm font-semibold text-slate-200">
            Dungeon Director
          </span>
        </div>

        <Card className="mt-5 rounded-xl bg-slate-950/30">
          <CardHeader className="p-3">
            <p className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">
              Active Campaign
            </p>
            <p className="text-sm font-bold text-slate-100">
              Ashfall Cartography
            </p>
          </CardHeader>
        </Card>

        <nav className="mt-5 space-y-1">
          {navItems.map((item) => (
            <Button
              key={item}
              variant={item === 'Scene Timeline' ? 'secondary' : 'ghost'}
              className="h-9 w-full justify-start px-3 text-xs"
            >
              {item}
            </Button>
          ))}
        </nav>

        <Card className="mt-6 rounded-xl bg-slate-950/20">
          <CardHeader className="p-3">
            <p className="text-xs font-bold text-slate-200">
              Broadcast state clean
            </p>
            <p className="mt-2 text-xs leading-4 text-slate-400">
              No missing assets. Timeline changes are synced to the GM screen.
            </p>
          </CardHeader>
        </Card>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              Campaign Workspace / Scene Timeline
            </p>
            <h1 className="mt-7 text-3xl font-bold tracking-normal text-slate-100">
              Scene Timeline
            </h1>
            <p className="mt-2 max-w-[600px] text-sm leading-5 text-slate-400">
              Reorder beats, keep encounter prep visible, and stage exactly
              what the table needs next.
            </p>
          </div>
          <Button className="shrink-0">
            <Plus className="size-4" />
            Add scene
          </Button>
        </header>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="space-y-4">
            <Card className="flex min-h-10 items-center justify-between rounded-xl px-4 py-3">
              <h2 className="text-base font-bold text-slate-100">
                Next session run order
              </h2>
              <p className="text-xs font-semibold text-slate-500">
                6 scenes · 1 break · 2 unresolved hooks
              </p>
            </Card>

            <div className="space-y-4">
              {scenes.map((scene) => (
                <Card key={scene.number} className="rounded-xl">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <Badge
                        variant="secondary"
                        className="border-none bg-transparent px-0 py-0 text-[11px] font-bold tracking-wide text-slate-500"
                      >
                        {scene.number}
                      </Badge>
                      <span className="text-xs font-bold text-slate-500">
                        {scene.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold tracking-normal text-slate-100">
                      {scene.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <p className="text-sm leading-5 text-slate-400">
                      {scene.body}
                    </p>
                    <p className="mt-4 text-xs font-semibold text-slate-300">
                      Output: {scene.output}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                Focus mode
              </Button>
              <Button variant="outline" size="sm">
                Push to GM screen
              </Button>
            </div>

            <Card className="rounded-xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Radio className="size-4 text-slate-400" />
                  <h2 className="text-base font-bold text-slate-100">
                    Live output
                  </h2>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-5 text-slate-400">
                  The GM overlay is currently showing Scene 2. Promote any
                  scene to live output without changing timeline order.
                </p>
                <p className="mt-4 text-xs font-bold text-slate-300">
                  Live now: Scene 02 / Dockside negotiation
                </p>
                <p className="mt-2 text-xs font-semibold text-slate-500">
                  Queued next: Scene 03 / Power failure
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ScreenShare className="size-4 text-slate-400" />
                  <h2 className="text-base font-bold text-slate-100">
                    Director notes
                  </h2>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-5 text-slate-400">
                  Keep key reveals, NPC pivots, and timing cues here. This panel
                  stays visible while you reorder scenes.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  )
}
