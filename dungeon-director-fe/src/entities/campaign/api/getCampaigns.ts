import { queryOptions, useQuery } from '@tanstack/react-query';

import { apiRequest } from '@shared/api';

import type { CampaignType } from '../model/types';

export const campaignQueryKeys = {
  all: ['campaigns'] as const,
};

export const campaignsQueryOptions = () =>
  queryOptions({
    queryKey: campaignQueryKeys.all,
    queryFn: () => apiRequest<CampaignType[]>('/api/campaigns'),
    staleTime: 3 * 60 * 1000,
  });

export function useCampaigns() {
  return useQuery(campaignsQueryOptions());
}
