import { apiRequest } from '@shared/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import type { CampaignType } from '../model/types'

export async function getCampaignById(campaignId: string) {
  const response = await apiRequest<CampaignType>(
    `/api/campaigns/${campaignId}`,
  )
  return response
}

export function campaignQueryOptions(campaignId?: string) {
  return queryOptions<CampaignType>({
    queryKey: ['campaign', campaignId],
    queryFn: () => getCampaignById(campaignId!),
    enabled: Boolean(campaignId),
  })
}

export function useCampaign(campaignId?: string) {
  return useQuery(campaignQueryOptions(campaignId))
}
