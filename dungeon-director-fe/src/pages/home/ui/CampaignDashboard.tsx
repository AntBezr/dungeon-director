import type { CampaignCardType } from '@entities/campaign/model/types'
import { Button, Card } from 'ui'
import { CampaignCard } from './CampaignCard'

const filters = ['All campaigns', 'Drafts', 'Recent']

interface CampaignDashboardProps {
  filteredCampaigns: CampaignCardType[]
  isLoading: boolean
  isError: boolean
  searchInput?: string
}

export function CampaignDashboard({
  filteredCampaigns,
  isLoading,
  isError,
}: CampaignDashboardProps) {
  return (
    <section className="py-8 sm:py-10">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-117.5">
          <p className="mb-1 text-sm font-medium text-muted-foreground">
            Campaigns
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Campaign Dashboard
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Open any world, resume prep instantly, and keep your table-ready
            work in one place.
          </p>
        </div>

        {/*        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Import JSON
          </Button>
          <Button size="sm">
            <Plus className="size-3.5" />
            New Campaign
          </Button>
        </div> */}
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <Button
              key={filter}
              variant={index === 0 ? 'default' : 'outline'}
              size="sm"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">
          Current campaigns
        </h2>
        <p className="text-sm text-muted-foreground">3 pinned · 9 total</p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3 items-stretch">
        {isLoading &&
          Array.from({ length: 3 }, (_, index) => (
            <Card
              key={index}
              aria-label="Loading campaigns"
              className="min-h-43.5 animate-pulse bg-muted"
            />
          ))}
        {isError && (
          <Card className="min-h-43.5 p-5 text-sm text-destructive">
            Could not load campaigns. Please try again.
          </Card>
        )}
        {!isLoading &&
          !isError &&
          filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.campaignId} campaign={campaign} />
          ))}
      </div>
    </section>
  )
}
