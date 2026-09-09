import { useMutation } from '@tanstack/react-query'

import { apiRequest, queryClient } from '@shared/api'

import type { CampaignScene, CampaignType } from '../model/types'

export type CampaignSceneUpdate = Pick<
  CampaignScene,
  'title' | 'description' | 'approximateDuration' | 'map' | 'music' | 'units'
>

export interface UpdateCampaignSceneParams {
  campaignId: string
  sceneUuid: string
  scene: CampaignSceneUpdate
}

export function updateCampaignScene({
  campaignId,
  sceneUuid,
  scene,
}: UpdateCampaignSceneParams) {
  return apiRequest<CampaignScene>(
    `/api/campaigns/${campaignId}/scenes/${sceneUuid}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scene),
    },
  )
}

export function useUpdateCampaignScene() {
  return useMutation({
    mutationFn: updateCampaignScene,
    onSuccess: (updatedScene, { campaignId }) => {
      queryClient.setQueryData<CampaignType>(
        ['campaign', campaignId],
        (campaign) => {
          if (!campaign) {
            return campaign
          }

          return {
            ...campaign,
            scenes: campaign.scenes.map((scene) =>
              scene.sceneUuid === updatedScene.sceneUuid ? updatedScene : scene,
            ),
          }
        },
      )
    },
    onError: (_error, { campaignId }) => {
      void queryClient.invalidateQueries({ queryKey: ['campaign', campaignId] })
    },
  })
}
