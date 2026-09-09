import { http, HttpResponse } from 'msw'
import { z } from 'zod'

import { campaignCardsMock, campaignDetailsMock } from '../model/mock'
import type { CampaignType } from '../model/types'

const sceneOrderSchema = z.object({
  scenes: z.array(
    z.object({
      sceneUuid: z.string(),
      order: z.number().int().positive(),
    }),
  ),
})

const sceneUpdateSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string(),
  approximateDuration: z.number().int().positive(),
  map: z.object({
    imageUrl: z.string().nullable(),
    rotation: z.number().min(-180).max(180),
    zoom: z.number().min(0.5).max(2),
    position: z.object({
      x: z.number().min(-100).max(100),
      y: z.number().min(-100).max(100),
    }),
    grid: z.object({
      enabled: z.boolean(),
      size: z.number().int().min(16).max(64),
    }),
  }),
  music: z.object({
    spotifyUrl: z.string(),
  }),
  units: z.array(
    z.object({
      unitId: z.string(),
      unitType: z.enum(['NPC', 'MONSTER']),
      character: z.object({
        source: z.literal('DND_5E_API'),
        resource: z.literal('monsters'),
        index: z.string(),
      }),
      loot: z.array(
        z.object({
          source: z.literal('DND_5E_API'),
          resource: z.literal('equipment'),
          index: z.string(),
        }),
      ),
    }),
  ),
})

export const campaignMockHandlers = [
  http.get('/api/campaigns', () => HttpResponse.json(campaignCardsMock)),
  http.get('/api/campaigns/:campaignId/scenes/:sceneUuid', ({ params }) => {
    const campaign = campaignDetailsMock[String(params.campaignId)]
    const scene = campaign?.scenes.find(
      (candidate) => candidate.sceneUuid === String(params.sceneUuid),
    )

    if (!scene) {
      return HttpResponse.json({ message: 'Scene not found' }, { status: 404 })
    }

    return HttpResponse.json(scene)
  }),
  http.get('/api/campaigns/:campaignId', ({ params }) => {
    const campaign = campaignDetailsMock[String(params.campaignId)]

    if (!campaign) {
      return HttpResponse.json(
        { message: 'Campaign not found' },
        { status: 404 },
      )
    }

    return HttpResponse.json(campaign)
  }),
  http.patch(
    '/api/campaigns/:campaignId/scenes/:sceneUuid',
    async ({ params, request }) => {
      const campaignId = String(params.campaignId)
      const sceneUuid = String(params.sceneUuid)
      const campaign = campaignDetailsMock[campaignId]
      const sceneIndex = campaign?.scenes.findIndex(
        (scene) => scene.sceneUuid === sceneUuid,
      )

      if (!campaign || sceneIndex === undefined || sceneIndex < 0) {
        return HttpResponse.json(
          { message: 'Scene not found' },
          { status: 404 },
        )
      }

      const parsedScene = sceneUpdateSchema.safeParse(await request.json())

      if (!parsedScene.success) {
        return HttpResponse.json(
          { message: 'Invalid scene update', issues: parsedScene.error.issues },
          { status: 400 },
        )
      }

      const updatedScene: CampaignType['scenes'][number] = {
        ...campaign.scenes[sceneIndex],
        ...parsedScene.data,
      }
      const updatedCampaign: CampaignType = {
        ...campaign,
        scenes: campaign.scenes.map((scene) =>
          scene.sceneUuid === sceneUuid ? updatedScene : scene,
        ),
      }

      campaignDetailsMock[campaignId] = updatedCampaign

      return HttpResponse.json(updatedScene)
    },
  ),
  http.patch(
    '/api/campaigns/:campaignId/scenes/order',
    async ({ params, request }) => {
      const campaignId = String(params.campaignId)
      const campaign = campaignDetailsMock[campaignId]

      if (!campaign) {
        return HttpResponse.json(
          { message: 'Campaign not found' },
          { status: 404 },
        )
      }

      const parsedOrder = sceneOrderSchema.safeParse(await request.json())

      if (!parsedOrder.success) {
        return HttpResponse.json(
          { message: 'Invalid scene order' },
          { status: 400 },
        )
      }

      const { scenes } = parsedOrder.data

      const ordersBySceneUuid = new Map(
        scenes.map(({ sceneUuid, order }) => [sceneUuid, order]),
      )
      const containsEveryScene = campaign.scenes.every((scene) =>
        ordersBySceneUuid.has(scene.sceneUuid),
      )

      if (
        scenes.length !== campaign.scenes.length ||
        ordersBySceneUuid.size !== campaign.scenes.length ||
        !containsEveryScene
      ) {
        return HttpResponse.json(
          { message: 'Invalid scene order' },
          { status: 400 },
        )
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
    },
  ),
]
