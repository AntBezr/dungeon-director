export type Dnd5eResource = 'monsters' | 'equipment' | 'spells'

export interface Dnd5eCatalogEntry {
  index: string
  name: string
}

export interface Dnd5eMonster {
  kind: 'monster'
  index: string
  name: string
  size?: string
  type?: string
  alignment?: string
  armorClass?: number
  hitPoints?: number
  hitDice?: string
  speed: Record<string, string>
  challengeRating?: number
  abilities: Record<'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA', number>
}

export interface Dnd5eEquipment {
  kind: 'equipment'
  index: string
  name: string
  category?: string
  weaponCategory?: string
  armorCategory?: string
  cost?: string
  weight?: number
  damage?: string
  armorClass?: string
  properties: string[]
}

export interface Dnd5eSpell {
  kind: 'spell'
  index: string
  name: string
  level: number
  school?: string
  castingTime?: string
  range?: string
  components: string[]
  duration?: string
  description: string[]
}

export type Dnd5eEntry = Dnd5eMonster | Dnd5eEquipment | Dnd5eSpell

export const dnd5eResourceLabels: Record<Dnd5eResource, string> = {
  monsters: 'Bestiary',
  equipment: 'Equipment',
  spells: 'Spells',
}
