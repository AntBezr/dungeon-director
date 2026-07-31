import { http, HttpResponse } from 'msw'

import { campaignCardsMock, campaignDetailsMock } from '../model/mock'
import type { CampaignType } from '../model/types'

type SceneOrderUpdate = Pick<CampaignType['scenes'][number], 'sceneUuid' | 'order'>

function isSceneOrderUpdate(value: unknown): value is SceneOrderUpdate {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const { sceneUuid, order } = value as Record<string, unknown>

  return (
    typeof sceneUuid === 'string' &&
    typeof order === 'number' &&
    Number.isInteger(order) &&
    order > 0
  )
}

function isSceneOrderPayload(
  value: unknown,
): value is { scenes: SceneOrderUpdate[] } {
  if (typeof value !== 'object' || value === null || !('scenes' in value)) {
    return false
  }

  return Array.isArray(value.scenes) && value.scenes.every(isSceneOrderUpdate)
}

export const campaignMockHandlers = [
  http.get('/api/campaigns', () => HttpResponse.json(campaignCardsMock)),
  http.get('/api/campaigns/:campaignId', ({ params }) => {
    const campaign = campaignDetailsMock[String(params.campaignId)]

    if (!campaign) {
      return HttpResponse.json({ message: 'Campaign not found' }, { status: 404 })
    }

    return HttpResponse.json(campaign)
  }),
  http.patch('/api/campaigns/:campaignId/scenes/order', async ({ params, request }) => {
    const campaignId = String(params.campaignId)
    const campaign = campaignDetailsMock[campaignId]

    if (!campaign) {
      return HttpResponse.json({ message: 'Campaign not found' }, { status: 404 })
    }

    const body: unknown = await request.json()

    if (!isSceneOrderPayload(body)) {
      return HttpResponse.json({ message: 'Invalid scene order' }, { status: 400 })
    }

    const ordersBySceneUuid = new Map(
      body.scenes.map(({ sceneUuid, order }) => [sceneUuid, order]),
    )
    const containsEveryScene = campaign.scenes.every((scene) =>
      ordersBySceneUuid.has(scene.sceneUuid),
    )

    if (
      body.scenes.length !== campaign.scenes.length ||
      ordersBySceneUuid.size !== campaign.scenes.length ||
      !containsEveryScene
    ) {
      return HttpResponse.json({ message: 'Invalid scene order' }, { status: 400 })
    }

    const updatedCampaign: CampaignType = {
      ...campaign,
      scenes: campaign.scenes.map((scene) => ({
        ...scene,
        order: ordersBySceneUuid.get(scene.sceneUuid) ?? scene.order,
      })),
    }

    campaignDetailsMock[campaignId] = updatedCampaign

    return HttpResponse.json(updatedCampaign)
  }),
]
