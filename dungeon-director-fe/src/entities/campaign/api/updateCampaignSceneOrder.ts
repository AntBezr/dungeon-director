import { apiRequest } from '@shared/api'

import type { CampaignType } from '../model/types'

export interface CampaignSceneOrder {
  sceneUuid: string
  order: number
}

export interface UpdateCampaignSceneOrderParams {
  campaignId: string
  scenes: CampaignSceneOrder[]
}

export function updateCampaignSceneOrder({
  campaignId,
  scenes,
}: UpdateCampaignSceneOrderParams) {
  return apiRequest<CampaignType>(`/api/campaigns/${campaignId}/scenes/order`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ scenes }),
  })
}
