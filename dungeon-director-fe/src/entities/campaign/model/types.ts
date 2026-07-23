export interface CampaignType {
  gameUuid: string
  status: 'LIVE TABLE' | 'PREP MODE' | 'ON HOLD' | 'ARCHIVED'
  statusTone: 'default' | 'secondary' | 'success' | 'warning'
  title: string
  details: string
  description: string
  footerLeft: string
  footerRight: string
  footerTone: string
  last_change: string
}
