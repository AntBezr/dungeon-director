import { useCampaigns } from '@entities/campaign'
import { useState } from 'react'
import { CampaignDashboard } from './CampaignDashboard'
import { HomeHeader } from './HomeHeader'

export function HomePage() {
  const { data: campaigns = [], isPending, isError } = useCampaigns()
  const [searchInput, setSearchInput] = useState('')

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title.toLowerCase().includes(searchInput.toLowerCase()),
  )
  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto min-h-svh w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeHeader
          searchInputChange={setSearchInput}
          searchInput={searchInput}
        />
        <CampaignDashboard
          searchInput={searchInput}
          filteredCampaigns={filteredCampaigns}
          isLoading={isPending}
          isError={isError}
        />
      </div>
    </main>
  )
}
