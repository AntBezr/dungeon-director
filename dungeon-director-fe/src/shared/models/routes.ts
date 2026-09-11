export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DEMO: '/demo',
  COMPENDIUM: '/compendium',
  GAMES: '/games',
  GAME: {
    BASE: '/games/:gameId',
    EDIT: '/games/:gameId/edit',
    SESSIONS: '/games/:gameId/sessions',
    SESSION: '/games/:gameId/sessions/:sessionId',
    SESSION_PLAY: '/games/:gameId/sessions/:sessionId/play',
    PLAYER_VIEW: '/games/:gameId/sessions/:sessionId/players',
    SCENES: '/games/:gameId/scenes',
    SCENE_PRESET: '/games/:gameId/scenes/presets/:presetId',
    SCENE_EDITOR: '/games/:gameId/scenes/:sceneId/edit',
    ABOUT: '/games/:gameId/about',
  },
  PROFILE: '/profile',
} as const

export function buildRoute(template: string, params: Record<string, string>) {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, encodeURIComponent(value)),
    template,
  )
}
