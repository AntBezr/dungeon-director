import { useCampaigns } from '@entities/campaign'
import { CampaignDashboard } from './CampaignDashboard'
import { HomeHeader } from './HomeHeader'

export function HomePage() {
  const { data: campaigns = [], isPending, isError } = useCampaigns()

  return (
    <main className="min-h-svh bg-(--app-background) p-3 sm:p-6">
      <div className="min-h-[calc(100svh-24px)] overflow-hidden border-2 border-slate-800 bg-(--app-surface) shadow-[8px_8px_0_var(--app-shadow)] sm:min-h-[calc(100svh-48px)]">
        <HomeHeader />
        <CampaignDashboard
          campaigns={campaigns}
          isLoading={isPending}
          isError={isError}
        />
      </div>
    </main>
  )
}
