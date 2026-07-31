import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

import {
  updateCampaignSceneOrder,
  type CampaignType,
  type UpdateCampaignSceneOrderParams,
} from '@entities/campaign'
import { queryClient } from '@shared/api'

const SCENE_ORDER_SAVE_DELAY_MS = 5_000

export function useSceneOrderAutosave(campaignId: string) {
  const sceneOrderSaveTimeoutRef = useRef<
    ReturnType<typeof setTimeout> | undefined
  >(undefined)
  const pendingSceneOrderUpdateRef = useRef<
    UpdateCampaignSceneOrderParams | undefined
  >(undefined)
  const mutation = useMutation({
    mutationFn: updateCampaignSceneOrder,
    onSuccess: (updatedCampaign) => {
      queryClient.setQueryData(
        ['campaign', updatedCampaign.campaignId],
        updatedCampaign,
      )
    },
    onError: (_error, variables) => {
      void queryClient.invalidateQueries({
        queryKey: ['campaign', variables.campaignId],
      })
    },
  })
  const mutationMutateRef = useRef(mutation.mutate)

  useEffect(() => {
    mutationMutateRef.current = mutation.mutate
  }, [mutation.mutate])

  useEffect(() => {
    function takePendingSceneOrderUpdate() {
      if (sceneOrderSaveTimeoutRef.current !== undefined) {
        clearTimeout(sceneOrderSaveTimeoutRef.current)
        sceneOrderSaveTimeoutRef.current = undefined
      }

      const pendingSceneOrderUpdate = pendingSceneOrderUpdateRef.current
      pendingSceneOrderUpdateRef.current = undefined

      return pendingSceneOrderUpdate
    }

    function flushOnPageHide() {
      const pendingSceneOrderUpdate = takePendingSceneOrderUpdate()

      if (!pendingSceneOrderUpdate) {
        return
      }

      const path = `/api/campaigns/${pendingSceneOrderUpdate.campaignId}/scenes/order`

      void fetch(path, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenes: pendingSceneOrderUpdate.scenes }),
        keepalive: true,
      })
    }

    window.addEventListener('pagehide', flushOnPageHide)

    return () => {
      window.removeEventListener('pagehide', flushOnPageHide)

      const pendingSceneOrderUpdate = takePendingSceneOrderUpdate()

      if (pendingSceneOrderUpdate) {
        mutationMutateRef.current(pendingSceneOrderUpdate)
      }
    }
  }, [campaignId])

  function scheduleSceneOrderSave(scenes: UpdateCampaignSceneOrderParams['scenes']) {
    queryClient.setQueryData<CampaignType>(
      ['campaign', campaignId],
      (currentCampaign) => {
        if (!currentCampaign) {
          return currentCampaign
        }

        const ordersBySceneUuid = new Map(
          scenes.map(({ sceneUuid, order }) => [sceneUuid, order]),
        )

        return {
          ...currentCampaign,
          scenes: currentCampaign.scenes.map((scene) => ({
            ...scene,
            order: ordersBySceneUuid.get(scene.sceneUuid) ?? scene.order,
          })),
        }
      },
    )

    if (sceneOrderSaveTimeoutRef.current !== undefined) {
      clearTimeout(sceneOrderSaveTimeoutRef.current)
    }

    pendingSceneOrderUpdateRef.current = { campaignId, scenes }
    sceneOrderSaveTimeoutRef.current = setTimeout(() => {
      const pendingSceneOrderUpdate = pendingSceneOrderUpdateRef.current
      pendingSceneOrderUpdateRef.current = undefined
      sceneOrderSaveTimeoutRef.current = undefined

      if (pendingSceneOrderUpdate) {
        mutation.mutate(pendingSceneOrderUpdate)
      }
    }, SCENE_ORDER_SAVE_DELAY_MS)
  }

  return {
    scheduleSceneOrderSave,
    isSavingSceneOrder: mutation.isPending,
  }
}
