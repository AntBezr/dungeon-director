import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import type { Dnd5eCatalogEntry } from '../model/types'

import { dnd5eRequest } from './request'

const equipmentListSchema = z.object({
  results: z.array(
    z.object({
      index: z.string(),
      name: z.string(),
      url: z.string(),
    }),
  ),
})

const oneDay = 24 * 60 * 60 * 1000

export async function getDnd5eEquipment(): Promise<Dnd5eCatalogEntry[]> {
  const { results } = await dnd5eRequest('equipment', equipmentListSchema)

  return results
}

export function useDnd5eEquipmentIndex() {
  return useQuery({
    queryKey: ['dnd5e', 'equipment'],
    queryFn: getDnd5eEquipment,
    staleTime: oneDay,
  })
}
