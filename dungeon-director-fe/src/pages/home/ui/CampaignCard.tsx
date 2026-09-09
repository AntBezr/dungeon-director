import type { CampaignCardType } from '@entities/campaign/model/types';
import { ROUTES } from '@shared/models/routes';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Badge, Card, CardFooter, CardHeader } from 'ui';

export function CampaignCard({ campaign }: { campaign: CampaignCardType }) {
  if (!campaign) {
    return (
      <Card className="flex min-h-43.5 flex-col justify-between">
        <CardHeader>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
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
      <Card className="flex h-full min-h-43.5 flex-col justify-between transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-ring/30">
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
            className="w-fit"
          >
            {campaign.status}
          </Badge>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {campaign.title}
            </h3>
            <p className="mt-2 text-sm leading-5 text-muted-foreground">
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
          <span className="text-sm text-muted-foreground">
            {dayjs(campaign.last_change_date).format('DD MMM YYYY')}
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
