import { CampaignDashboard } from './CampaignDashboard';
import { HomeHeader } from './HomeHeader';

export function HomePage() {
  return (
    <main className="mx-auto min-h-190 w-full max-w-300 overflow-hidden border-2 border-slate-800 bg-[#090c12] shadow-[8px_8px_0_#020617]">
      <HomeHeader />
      <CampaignDashboard />
    </main>
  )
}
