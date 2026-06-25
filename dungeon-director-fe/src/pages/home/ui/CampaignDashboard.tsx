import { Archive, FolderOpen, Plus } from 'lucide-react';

import { Badge, Button, Card, CardFooter, CardHeader } from '@shared/ui';

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

function CampaignCard({ campaign }: { campaign: (typeof campaigns)[number] }) {
  return (
    <Card className="flex min-h-43.5 flex-col justify-between ">
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
  )
}

function ArchivedCampaignsEmptyState() {
  return (
    <Card className="mt-5 flex min-h-44 flex-col items-center justify-center  px-6 py-6 text-center">
      <div className="max-w-105">
        <h2 className="text-base font-bold text-slate-200">
          No archived campaigns
        </h2>
        <p className="mt-2 text-sm leading-5 text-slate-400">
          Finished worlds, retired arcs, and imported experiments will appear
          here once you move them out of active prep.
        </p>
        <FolderOpen className="mx-auto mt-4 size-5 text-slate-500" />
        <Button className="mt-4">
          <Archive className="size-4" />
          Move finished arcs
        </Button>
        <p className="mt-4 text-xs font-medium text-slate-600">
          Archived campaigns stay searchable and can be restored in one click.
        </p>
      </div>
    </Card>
  )
}

export function CampaignDashboard() {
  return (
    <section className="px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-117.5">
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
              className="rounded-sm"
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
          <CampaignCard key={campaign.title} campaign={campaign} />
        ))}
      </div>

      <ArchivedCampaignsEmptyState />
    </section>
  )
}
