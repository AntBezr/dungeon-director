import {
    Archive,
    FolderOpen,
    Plus,
    RefreshCw,
    Search
} from 'lucide-react';

import { Badge, Button, Card, CardFooter, CardHeader, Input } from '@shared/ui';

const filters = ['All campaigns', 'Drafts', 'Recent']

const campaigns = [
  {
    status: 'LIVE TABLE',
    statusTone: 'success',
    title: 'Ashfall Cartography',
    details: '12 scenes · 4 active notes',
    description: 'Last session 2h ago',
    footerLeft: 'Session 18 queued',
    footerRight: 'Autosaved',
    footerTone: 'text-emerald-400',
  },
  {
    status: 'PREP MODE',
    statusTone: 'default',
    title: 'Signal Under Glass',
    details: '7 scenes · 22 references',
    description: 'Timeline locked for next session',
    footerLeft: '3 blockers',
    footerRight: 'Need scene beats',
    footerTone: 'text-amber-400',
  },
  {
    status: 'ON HOLD',
    statusTone: 'secondary',
    title: 'The Seventh Relay',
    details: '5 scenes · 1 encounter',
    description: 'draft · Imported from archive branch',
    footerLeft: 'Paused after session 3',
    footerRight: 'Resume when ready',
    footerTone: 'text-slate-500',
  },
] as const

export function HomePage() {
  return (
    <main className="">
      <header className="flex h-10 items-center justify-between border-b border-slate-800 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-sm bg-orange-500" />
          <span className="text-sm font-semibold text-slate-200">
            Dungeon Director
          </span>
        </div>

        <div className="hidden w-full max-w-[340px] items-center md:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
            <Input
              aria-label="Search"
              className="h-8 rounded-lg pl-9 text-xs"
              placeholder="Jump to campaign, NPC, session note..."
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <RefreshCw className="size-3.5" />
            Sync all
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <span className="flex size-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-900">
              AD
            </span>
            <span className="hidden sm:inline">Anton</span>
          </Button>
        </div>
      </header>

      <section className="px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[470px]">
            <p className="mb-1 text-xs font-bold text-slate-500 uppercase">
              Campaigns
            </p>
            <h1 className="text-3xl leading-tight font-bold tracking-normal text-slate-100">
              Campaign Dashboard
            </h1>
            <p className="mt-2 text-sm leading-5 text-slate-400">
              Open any world, resume prep instantly, and keep your table-ready
              work in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Import JSON
            </Button>
            <Button size="sm">
              <Plus className="size-3.5" />
              New Campaign
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <Button
                key={filter}
                variant={index === 0 ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
              >
                {filter}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Badge variant="default">Updated 2h ago</Badge>
            <Badge variant="default">6 active tables</Badge>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-100">
            Current campaigns
          </h2>
          <p className="text-xs font-medium text-slate-500">
            3 pinned · 9 total
          </p>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <Card
              key={campaign.title}
              className="flex min-h-[174px] flex-col justify-between rounded-xl"
            >
              <CardHeader>
                <Badge
                  variant={campaign.statusTone}
                  className="w-fit border-none bg-transparent px-0 py-0 text-[11px] font-bold"
                >
                  {campaign.status}
                </Badge>
                <div>
                  <h3 className="text-lg font-bold tracking-normal text-slate-100">
                    {campaign.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {campaign.details}
                    <br />
                    {campaign.description}
                  </p>
                </div>
              </CardHeader>
              <CardFooter>
                <span className="text-xs font-semibold text-slate-300">
                  {campaign.footerLeft}
                </span>
                <span className={`text-xs font-bold ${campaign.footerTone}`}>
                  {campaign.footerRight}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card className="mt-5 flex min-h-[176px] flex-col items-center justify-center rounded-xl px-6 py-6 text-center">
          <div className="max-w-[420px]">
            <h2 className="text-base font-bold text-slate-200">
              No archived campaigns
            </h2>
            <p className="mt-2 text-sm leading-5 text-slate-400">
              Finished worlds, retired arcs, and imported experiments will
              appear here once you move them out of active prep.
            </p>
            <FolderOpen className="mx-auto mt-4 size-5 text-slate-500" />
            <Button className="mt-4">
              <Archive className="size-4" />
              Move finished arcs
            </Button>
            <p className="mt-4 text-xs font-medium text-slate-600">
              Archived campaigns stay searchable and can be restored in one
              click.
            </p>
          </div>
        </Card>
      </section>
    </main>
  )
}
