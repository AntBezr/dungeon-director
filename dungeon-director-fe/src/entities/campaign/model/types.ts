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

export interface CampaignType extends CampaignCardType {
  scenes: {
    sceneUuid: string
    title: string
    description: string
    order: number
    approximateDuration: number
  }[]
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
