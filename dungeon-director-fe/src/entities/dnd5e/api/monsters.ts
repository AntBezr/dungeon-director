import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import type { Dnd5eCatalogEntry, Dnd5eMonster } from '../model/types'

import { dnd5eRequest, getDnd5eResourceUrl } from './request'

const resourceReferenceSchema = z.object({
  index: z.string(),
  name: z.string(),
  url: z.string(),
})

const monsterListSchema = z.object({
  results: z.array(resourceReferenceSchema),
})

const armorClassSchema = z.union([
  z.number(),
  z.array(
    z.object({
      value: z.number(),
    }),
  ),
])

const monsterSchema = z
  .object({
    index: z.string(),
    name: z.string(),
    url: z.string(),
    image: z.string().nullable().optional(),
    size: z.string().optional(),
    type: z.string().optional(),
    alignment: z.string().optional(),
    armor_class: armorClassSchema.optional(),
    hit_points: z.number().optional(),
    hit_dice: z.string().optional(),
    speed: z.record(z.string(), z.string()).default({}),
    challenge_rating: z.number().optional(),
    strength: z.number(),
    dexterity: z.number(),
    constitution: z.number(),
    intelligence: z.number(),
    wisdom: z.number(),
    charisma: z.number(),
  })
  .transform((monster): Dnd5eMonster => ({
    index: monster.index,
    name: monster.name,
    sourceUrl: getDnd5eResourceUrl(monster.url),
    imageUrl: monster.image
      ? getDnd5eResourceUrl(monster.image)
      : undefined,
    size: monster.size,
    type: monster.type,
    alignment: monster.alignment,
    armorClass: Array.isArray(monster.armor_class)
      ? monster.armor_class[0]?.value
      : monster.armor_class,
    hitPoints: monster.hit_points,
    hitDice: monster.hit_dice,
    speed: monster.speed,
    challengeRating: monster.challenge_rating,
    strength: monster.strength,
    dexterity: monster.dexterity,
    constitution: monster.constitution,
    intelligence: monster.intelligence,
    wisdom: monster.wisdom,
    charisma: monster.charisma,
  }))

const oneDay = 24 * 60 * 60 * 1000

export async function getDnd5eMonsters(): Promise<Dnd5eCatalogEntry[]> {
  const { results } = await dnd5eRequest('monsters', monsterListSchema)

  return results
}

export async function getDnd5eMonster(index: string): Promise<Dnd5eMonster> {
  return dnd5eRequest(`monsters/${encodeURIComponent(index)}`, monsterSchema)
}

export function useDnd5eMonsterIndex() {
  return useQuery({
    queryKey: ['dnd5e', 'monsters'],
    queryFn: getDnd5eMonsters,
    staleTime: oneDay,
  })
}

export function useDnd5eMonster(index: string) {
  return useQuery({
    queryKey: ['dnd5e', 'monsters', index],
    queryFn: () => getDnd5eMonster(index),
    staleTime: oneDay,
  })
}
