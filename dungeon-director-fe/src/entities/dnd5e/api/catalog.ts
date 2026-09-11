import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import type {
  Dnd5eCatalogEntry,
  Dnd5eEntry,
  Dnd5eEquipment,
  Dnd5eMonster,
  Dnd5eResource,
  Dnd5eSpell,
} from '../model/types'

import { dnd5eRequest } from './request'

const referenceSchema = z.object({ index: z.string(), name: z.string() })
const catalogSchema = z.object({ results: z.array(referenceSchema) })
const armorClassSchema = z
  .union([z.number(), z.array(z.object({ value: z.number() }))])
  .optional()

const monsterSchema = z
  .object({
    index: z.string(),
    name: z.string(),
    size: z.string().optional(),
    type: z.string().optional(),
    alignment: z.string().optional(),
    armor_class: armorClassSchema,
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
  .transform((entry): Dnd5eMonster => ({
    kind: 'monster',
    index: entry.index,
    name: entry.name,
    size: entry.size,
    type: entry.type,
    alignment: entry.alignment,
    armorClass: Array.isArray(entry.armor_class)
      ? entry.armor_class[0]?.value
      : entry.armor_class,
    hitPoints: entry.hit_points,
    hitDice: entry.hit_dice,
    speed: entry.speed,
    challengeRating: entry.challenge_rating,
    abilities: {
      STR: entry.strength,
      DEX: entry.dexterity,
      CON: entry.constitution,
      INT: entry.intelligence,
      WIS: entry.wisdom,
      CHA: entry.charisma,
    },
  }))

const equipmentSchema = z
  .object({
    index: z.string(),
    name: z.string(),
    equipment_category: referenceSchema.optional(),
    weapon_category: z.string().optional(),
    armor_category: z.string().optional(),
    cost: z.object({ quantity: z.number(), unit: z.string() }).optional(),
    weight: z.number().optional(),
    damage: z
      .object({ damage_dice: z.string(), damage_type: referenceSchema })
      .optional(),
    armor_class: z
      .object({
        base: z.number(),
        dex_bonus: z.boolean(),
        max_bonus: z.number().nullable().optional(),
      })
      .optional(),
    properties: z.array(referenceSchema).default([]),
  })
  .transform((entry): Dnd5eEquipment => ({
    kind: 'equipment',
    index: entry.index,
    name: entry.name,
    category: entry.equipment_category?.name,
    weaponCategory: entry.weapon_category,
    armorCategory: entry.armor_category,
    cost: entry.cost ? `${entry.cost.quantity} ${entry.cost.unit}` : undefined,
    weight: entry.weight,
    damage: entry.damage
      ? `${entry.damage.damage_dice} ${entry.damage.damage_type.name}`
      : undefined,
    armorClass: entry.armor_class
      ? `${entry.armor_class.base}${entry.armor_class.dex_bonus ? ' + DEX' : ''}`
      : undefined,
    properties: entry.properties.map((property) => property.name),
  }))

const spellSchema = z
  .object({
    index: z.string(),
    name: z.string(),
    level: z.number(),
    school: referenceSchema.optional(),
    casting_time: z.string().optional(),
    range: z.string().optional(),
    components: z.array(z.string()).default([]),
    duration: z.string().optional(),
    desc: z.array(z.string()).default([]),
  })
  .transform((entry): Dnd5eSpell => ({
    kind: 'spell',
    index: entry.index,
    name: entry.name,
    level: entry.level,
    school: entry.school?.name,
    castingTime: entry.casting_time,
    range: entry.range,
    components: entry.components,
    duration: entry.duration,
    description: entry.desc,
  }))

const oneDay = 24 * 60 * 60 * 1000

export async function getDnd5eCatalog(
  resource: Dnd5eResource,
): Promise<Dnd5eCatalogEntry[]> {
  return (await dnd5eRequest(resource, catalogSchema)).results
}

export async function getDnd5eEntry(
  resource: Dnd5eResource,
  index: string,
): Promise<Dnd5eEntry> {
  if (resource === 'monsters')
    return dnd5eRequest(`monsters/${encodeURIComponent(index)}`, monsterSchema)
  if (resource === 'equipment')
    return dnd5eRequest(
      `equipment/${encodeURIComponent(index)}`,
      equipmentSchema,
    )
  return dnd5eRequest(`spells/${encodeURIComponent(index)}`, spellSchema)
}

export function useDnd5eCatalog(resource: Dnd5eResource) {
  return useQuery({
    queryKey: ['dnd5e', resource],
    queryFn: () => getDnd5eCatalog(resource),
    staleTime: oneDay,
  })
}

export function useDnd5eEntry(resource: Dnd5eResource, index: string | null) {
  return useQuery({
    queryKey: ['dnd5e', resource, index ?? ''],
    queryFn: () => getDnd5eEntry(resource, index ?? ''),
    enabled: Boolean(index),
    staleTime: oneDay,
  })
}
