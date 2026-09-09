export type Dnd5eResource = 'monsters' | 'equipment'

export interface Dnd5eReference<Resource extends Dnd5eResource = Dnd5eResource> {
  source: 'DND_5E_API'
  resource: Resource
  index: string
}

export type Dnd5eMonsterReference = Dnd5eReference<'monsters'>
export type Dnd5eEquipmentReference = Dnd5eReference<'equipment'>

export interface Dnd5eCatalogEntry {
  index: string
  name: string
  url: string
}

export interface Dnd5eMonster {
  index: string
  name: string
  sourceUrl: string
  imageUrl?: string
  size?: string
  type?: string
  alignment?: string
  armorClass?: number
  hitPoints?: number
  hitDice?: string
  speed: Record<string, string>
  challengeRating?: number
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}
