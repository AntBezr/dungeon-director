import type { CampaignCardType } from '@entities/campaign/model/types';
import { ROUTES } from '@shared/models/routes';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Badge, Card, CardFooter, CardHeader } from 'ui/8bit';

export function CampaignCard({ campaign }: { campaign: CampaignCardType }) {
  if (!campaign) {
    return (
      <Card className="flex min-h-43.5 flex-col justify-between transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-slate-900/50 hover:shadow-[8px_8px_0_var(--app-shadow)] focus-within:border-cyan-400">
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
      to={ROUTES.CAMPAIGNWORKSPACE.BASE.replace(
        ':campaignId',
        campaign.campaignId,
      )}
      aria-label={`Open ${campaign.title} campaign workspace`}
      className="block text-inherit no-underline"
    >
      <Card className="flex min-h-43.5 flex-col justify-between transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-slate-900/50 hover:shadow-[8px_8px_0_var(--app-shadow)] focus-within:border-cyan-400 h-full">
        <CardHeader>
          <Badge
            variant={
              campaign.status === 'ACTIVE'
                ? 'success'
                : campaign.status === 'PREP MODE'
                  ? 'warning'
                  : campaign.status === 'ON HOLD'
                    ? 'secondary'
                    : 'destructive'
            }
            className="w-fit  px-0 py-0 text-[10px] leading-2 font-bold pt-0.5"
          >
            {campaign.status}
          </Badge>
          <div>
            <h3 className="text-lg font-bold tracking-normal text-slate-100">
              {campaign.title}
            </h3>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              {campaign.details.numScenes} scenes |{' '}
              {campaign.details.numSessions} games
              <br />
              {campaign.participants.length > 0
                ? `Players: ${campaign.participants.join(', ')}`
                : 'No players yet'}
            </p>
          </div>
        </CardHeader>
        <CardFooter>
          <span className="text-xs font-semibold text-slate-300">
            {dayjs(campaign.last_change_date).format('DD MMM YYYY')}
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
