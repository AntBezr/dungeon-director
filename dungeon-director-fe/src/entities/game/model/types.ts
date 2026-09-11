export type GameStatus = 'draft' | 'active' | 'paused' | 'completed'
export type SessionStatus = 'planned' | 'active' | 'completed'
export type SceneTokenKind = 'hero' | 'npc' | 'enemy' | 'ally' | 'loot'

export interface Game {
  id: string
  title: string
  description: string
  startDate: string
  status: GameStatus
  playerNames: string[]
  createdAt: string
  updatedAt: string
}

export interface PartyToken {
  id: string
  gameId: string
  name: string
  icon: string
  avatar?: string
}

export interface GameSession {
  id: string
  gameId: string
  title: string
  description: string
  date: string | null
  status: SessionStatus
  createdAt: string
  updatedAt: string
}

export interface MapView {
  x: number
  y: number
  zoom: number
}

export interface GridSettings {
  isEnabled: boolean
  cellSize: number
  offsetX: number
  offsetY: number
}

export interface SceneMapSettings {
  backgroundImage: string | null
  rotation: number
  startView: MapView
  grid: GridSettings
}

export interface TokenHitPoints {
  current: number
  max: number
}

export interface TokenStats {
  armorClass: number
  initiative: number
}

export interface SceneToken {
  id: string
  entityId: string
  kind: SceneTokenKind
  name: string
  icon: string
  avatar: string | null
  x: number | null
  y: number | null
  size: number
  rotation: number
  isVisible: boolean
  travelsWithGroup: boolean
  hitPoints?: TokenHitPoints
  stats?: TokenStats
}

export interface Scene {
  id: string
  gameId: string
  title: string
  description: string
  notes: string
  thumbnail: string | null
  musicLink: string
  map: SceneMapSettings
  tokens: SceneToken[]
  createdAt: string
  updatedAt: string
}

export interface ScenePreset {
  id: string
  title: string
  description: string
  notes: string
  thumbnail: string | null
  musicLink: string
  map: SceneMapSettings
  tokens: SceneToken[]
  sourceLabel: string
}

export interface GameRuntime {
  id: string
  gameId: string
  sessionId: string
  activeSceneId: string
  activeSessionSceneId: string | null
  tokens: SceneToken[]
  camera: MapView
  musicVolume: number
  updatedAt: string
}

export interface SessionScene {
  id: string
  sessionId: string
  sceneId: string
  position: number
  notes: string
}

export interface SessionSceneWithScene extends SessionScene {
  scene: Scene
}

export interface PaginatedResult<T> {
  count: number
  next: number | null
  previous: number | null
  results: T[]
}

export interface GameInput {
  title: string
  description: string
  startDate: string
  status: GameStatus
  playerNames: string[]
}

export type GameUpdate = Partial<GameInput>

export interface SessionInput {
  title: string
  description: string
  date: string | null
  status: SessionStatus
}

export type SessionUpdate = Partial<SessionInput>

export interface SceneInput {
  title: string
  description: string
  musicLink: string
}

export type SceneUpdate = Partial<
  Pick<
    Scene,
    'title' | 'description' | 'notes' | 'musicLink' | 'map' | 'tokens'
  >
>
export type GameRuntimeUpdate = Partial<
  Pick<GameRuntime, 'activeSceneId' | 'tokens' | 'camera' | 'musicVolume'>
>

export const gameStatusLabels: Record<GameStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  paused: 'Paused',
  completed: 'Completed',
}

export const sessionStatusLabels: Record<SessionStatus, string> = {
  planned: 'Planned',
  active: 'In progress',
  completed: 'Completed',
}

export const tokenKindLabels: Record<SceneTokenKind, string> = {
  hero: 'Hero',
  npc: 'NPC',
  enemy: 'Enemy',
  ally: 'Ally',
  loot: 'Item',
}
