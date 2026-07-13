import type { CampaignType } from '@entities/campaign'
import { Badge, Card, CardFooter, CardHeader } from 'ui/8bit'
import { Link } from 'react-router-dom'

export function CampaignCard({ campaign }: { campaign: CampaignType }) {
  if (!campaign) {
    return (
      <Card className="flex min-h-43.5 flex-col justify-between transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-slate-900/50 hover:shadow-[8px_8px_0_#020617] focus-within:border-cyan-400">
        <CardHeader>
          <div>
            <h3 className="text-lg font-bold tracking-normal text-slate-100">
              Campaign data is missing
            </h3>
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Link
      to={`/campaign-workspace/${campaign.gameUuid}`}
      aria-label={`Open ${campaign.title} campaign workspace`}
      className="block text-inherit no-underline"
    >
      <Card className="flex min-h-43.5 flex-col justify-between transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-slate-900/50 hover:shadow-[8px_8px_0_#020617] focus-within:border-cyan-400">
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
    </Link>
  )
}
