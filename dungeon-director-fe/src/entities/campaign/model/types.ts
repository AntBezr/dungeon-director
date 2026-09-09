import type {
  Dnd5eEquipmentReference,
  Dnd5eMonsterReference,
} from '@entities/dnd5e/model/types'

export interface CampaignCardType {
  campaignId: string
  status: 'ACTIVE' | 'PREP MODE' | 'ON HOLD' | 'ARCHIVED'
  title: string
  details: {
    numScenes: number
    numSessions: number
  }
  last_change_date: string
  participants: string[]
}

export interface SceneGridSettings {
  enabled: boolean
  size: number
}

export interface SceneMapSettings {
  imageUrl: string | null
  rotation: number
  zoom: number
  position: {
    x: number
    y: number
  }
  grid: SceneGridSettings
}

export interface SceneMusicSettings {
  spotifyUrl: string
}

export type SceneUnitType = 'NPC' | 'MONSTER'

export interface SceneUnit {
  unitId: string
  unitType: SceneUnitType
  character: Dnd5eMonsterReference
  loot: Dnd5eEquipmentReference[]
}

export interface CampaignScene {
  sceneUuid: string
  title: string
  description: string
  order: number
  approximateDuration: number
  map: SceneMapSettings
  music: SceneMusicSettings
  units: SceneUnit[]
}

export interface CampaignType extends CampaignCardType {
  scenes: CampaignScene[]
  sessions: {
    sessionUuid: string
    title: string
    description: string
  }[]
  notes: {
    id: string
    title: string
    description: string
  }[]
}
