import 'react-router-dom'

export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  CAMPAIGNWORKSPACE: {
    BASE: '/campaignWorkspace/:campaignId',
    SCENEEDITOR: '/campaignWorkspace/:campaignId/sceneEditor',
  },
  ACTIVEGAME: {
    MASTERSCREEN: '/game/:gameId',
    PLAYERSSCREEN: '/game/:gameId/players',
  },
  GLOSSARY: {
    BASE: '/glossary',
    CREATURES: {
      MONSTERS: '/glossary/creatures/monsters',
      MONSTER: '/glossary/creatures/monsters/:monsterId',
      NPCS: '/glossary/creatures/npcs',
      NPC: '/glossary/creatures/npcs/:npcId',
    },
    EQUIPMENT: {
      WEAPONS: '/glossary/equipment/weapons',
    },
  },
} as const

export type PathParams = {
  [ROUTES.CAMPAIGNWORKSPACE.BASE]: {
    campaignId: string
  }
  [ROUTES.CAMPAIGNWORKSPACE.SCENEEDITOR]: {
    campaignId: string
  }
  [ROUTES.ACTIVEGAME.MASTERSCREEN]: {
    gameId: string
  }
  [ROUTES.ACTIVEGAME.PLAYERSSCREEN]: {
    gameId: string
  }
  [ROUTES.GLOSSARY.CREATURES.MONSTERS]: {
    monsterId: string
  }
  [ROUTES.GLOSSARY.CREATURES.NPCS]: {
    npcId: string
  }
}

declare module 'react-router-dom' {
  interface Register {
    params: PathParams
  }
}
