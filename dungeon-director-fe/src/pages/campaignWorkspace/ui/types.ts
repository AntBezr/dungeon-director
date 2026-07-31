export interface WorkspaceScene {
  sceneUuid: string
  title: string
  description: string
  approximateDuration: number
  order: number
}

export type SceneOrderOverride = {
  campaignId: string
  sceneIds: string[]
}
