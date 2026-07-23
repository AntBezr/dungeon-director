import type { CampaignType } from '@entities/campaign'
import { Archive, FolderOpen, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, Card } from 'ui/8bit'
import { CampaignCard } from './CampaignCard'

const filters = ['All campaigns', 'Drafts', 'Recent']

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

interface CampaignDashboardProps {
  campaigns: CampaignType[]
  isLoading: boolean
  isError: boolean
}

export function CampaignDashboard({
  campaigns,
  isLoading,
  isError,
}: CampaignDashboardProps) {
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
          <Button variant="outline" size="sm" className="rounded-sm" asChild>
            <Link to="/glossary">Glossary</Link>
          </Button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-100">
          Current campaigns
        </h2>
        <p className="text-xs font-medium text-slate-500">3 pinned · 9 total</p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {isLoading &&
          Array.from({ length: 3 }, (_, index) => (
            <Card
              key={index}
              aria-label="Loading campaigns"
              className="min-h-43.5 animate-pulse bg-slate-900/50"
            />
          ))}
        {isError && (
          <Card className="min-h-43.5 p-5 text-sm text-rose-300">
            Could not load campaigns. Please try again.
          </Card>
        )}
        {!isLoading &&
          !isError &&
          campaigns.map((campaign) => (
            <CampaignCard key={campaign.gameUuid} campaign={campaign} />
          ))}
      </div>

      <ArchivedCampaignsEmptyState />
    </section>
  )
}
