export interface CampaignType {
  gameUuid: string
  status: 'ACTIVE' | 'PREP MODE' | 'ON HOLD' | 'ARCHIVED'
  title: string
  details: {
    numScenes: number
    numSessions: number
  }
  last_change_date: string
  participants: string[]
}
