import type {
  Game,
  GameRuntime,
  GameSession,
  PartyToken,
  Scene,
  SceneMapSettings,
  ScenePreset,
  SceneToken,
  SessionScene,
} from './types'

export interface DemoDatabase {
  games: Game[]
  partyTokens: PartyToken[]
  sessions: GameSession[]
  scenes: Scene[]
  sessionScenes: SessionScene[]
  scenePresets: ScenePreset[]
  gameRuntimes: GameRuntime[]
}

const demoGameId = 'game-rivermark'
const mainSessionId = 'session-copper-fox'
const demoDate = '2026-09-11T10:00:00.000Z'

function svgMap(background: string, stroke: string, title: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="${background}"/><path d="M100 130H1100V670H100Z" fill="none" stroke="${stroke}" stroke-width="20" opacity=".65"/><path d="M400 130V670M800 130V670M100 400H1100" stroke="${stroke}" stroke-width="8" opacity=".35"/><circle cx="600" cy="400" r="130" fill="none" stroke="${stroke}" stroke-width="12" opacity=".45"/><text x="600" y="420" text-anchor="middle" font-family="sans-serif" font-size="42" fill="${stroke}" opacity=".75">${title}</text></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const tavernImage = svgMap('#6b4226', '#f4d6a6', 'The Copper Fox')
const forestImage = svgMap('#254f3a', '#c9e7aa', 'Forest Road')

function createMap(backgroundImage: string): SceneMapSettings {
  return {
    backgroundImage,
    rotation: 0,
    startView: { x: 0, y: 0, zoom: 0.78 },
    grid: { isEnabled: true, cellSize: 50, offsetX: 0, offsetY: 0 },
  }
}

function hero(
  id: string,
  name: string,
  icon: string,
  x: number | null,
  y: number | null,
): SceneToken {
  return {
    id: `token-${id}`,
    entityId: id,
    kind: 'hero',
    name,
    icon,
    avatar: null,
    x,
    y,
    size: 42,
    rotation: 0,
    isVisible: true,
    travelsWithGroup: true,
  }
}

function creature(
  id: string,
  kind: 'npc' | 'enemy' | 'ally',
  name: string,
  icon: string,
  x: number,
  y: number,
  hitPoints: number,
  maxHitPoints: number,
): SceneToken {
  return {
    id,
    entityId: id,
    kind,
    name,
    icon,
    avatar: null,
    x,
    y,
    size: 44,
    rotation: 0,
    isVisible: true,
    travelsWithGroup: kind === 'npc',
    hitPoints: { current: hitPoints, max: maxHitPoints },
    stats: { armorClass: 12, initiative: 0 },
  }
}

function loot(
  id: string,
  name: string,
  icon: string,
  x: number,
  y: number,
): SceneToken {
  return {
    id,
    entityId: id,
    kind: 'loot',
    name,
    icon,
    avatar: null,
    x,
    y,
    size: 36,
    rotation: 0,
    isVisible: true,
    travelsWithGroup: false,
  }
}

function createDemoSessions(): GameSession[] {
  return Array.from({ length: 126 }, (_, index) => {
    const number = index + 1
    const id = number === 1 ? mainSessionId : `session-rivermark-${number}`
    const title =
      number === 1 ? 'A Night at the Copper Fox' : `Session ${number}`
    const description =
      number === 1
        ? 'A tavern introduction, a tense conversation, and an explosion that changes the night.'
        : 'Preparation for the next meeting in the Ashes over Rivermark campaign.'

    return {
      id,
      gameId: demoGameId,
      title,
      description,
      date:
        number <= 4 ? `2026-09-${String(10 + number).padStart(2, '0')}` : null,
      status: 'planned',
      createdAt: new Date(
        Date.parse(demoDate) - index * 86_400_000,
      ).toISOString(),
      updatedAt: demoDate,
    }
  })
}

export function createDemoDatabase(): DemoDatabase {
  const party = [
    hero('hero-asya', 'Aya', '🜁', 320, 300),
    hero('hero-vlad', 'Vlad', '⚔️', 390, 300),
    hero('hero-ira', 'Ira', '✦', 320, 370),
    hero('hero-misha', 'Misha', '🛡️', 390, 370),
  ]
  const scenes: Scene[] = [
    {
      id: 'scene-copper-fox',
      gameId: demoGameId,
      title: 'The Copper Fox Tavern',
      description:
        'A noisy night at the Copper Fox: two enemies, an ally, and a hidden chest.',
      notes: 'Start with a busy hall and give the party time to settle in.',
      thumbnail: tavernImage,
      musicLink: '',
      map: createMap(tavernImage),
      tokens: [
        ...party,
        creature(
          'npc-innkeeper',
          'npc',
          'Tavern keeper',
          '🍺',
          590,
          290,
          18,
          18,
        ),
        creature('enemy-thug-1', 'enemy', 'Thug', '🗡️', 760, 310, 22, 22),
        creature('enemy-thug-2', 'enemy', 'Thug', '🗡️', 810, 360, 22, 22),
        loot('loot-locked-chest', 'Locked chest', '🧰', 910, 520),
      ],
      createdAt: demoDate,
      updatedAt: demoDate,
    },
    {
      id: 'scene-copper-fox-aftermath',
      gameId: demoGameId,
      title: 'The Copper Fox Aftermath',
      description:
        'The same tavern after the explosion. This is independent preparation.',
      notes: 'Use immediately after the explosion.',
      thumbnail: tavernImage,
      musicLink: '',
      map: { ...createMap(tavernImage), rotation: 0 },
      tokens: [
        ...party,
        creature(
          'npc-innkeeper',
          'npc',
          'Tavern keeper',
          '🍺',
          590,
          290,
          12,
          18,
        ),
        creature('enemy-thug-1', 'enemy', 'Thug', '🗡️', 760, 310, 22, 22),
        loot('loot-broken-table', 'Broken table', '🪵', 740, 510),
      ],
      createdAt: demoDate,
      updatedAt: demoDate,
    },
    {
      id: 'scene-forest-road',
      gameId: demoGameId,
      title: 'Forest Road',
      description:
        'The road to Rivermark, where muddy tracks lead somewhere they should not.',
      notes: 'A fallback route if the party leaves town.',
      thumbnail: forestImage,
      musicLink: '',
      map: createMap(forestImage),
      tokens: [
        ...party.map((token) => ({ ...token, x: null, y: null })),
        creature('enemy-wolf-1', 'enemy', 'Wolf', '🐺', 730, 300, 11, 11),
        creature('enemy-wolf-2', 'enemy', 'Wolf', '🐺', 780, 370, 11, 11),
        loot('loot-tracks', 'Unusual tracks', '👣', 600, 480),
      ],
      createdAt: demoDate,
      updatedAt: demoDate,
    },
  ]

  return {
    games: [
      {
        id: demoGameId,
        title: 'Ashes over Rivermark',
        description:
          'A town on the river road slowly suffocates beneath ash storms and foreign intrigue.',
        startDate: '2026-09-01',
        status: 'active',
        playerNames: ['Aya', 'Vlad', 'Ira', 'Misha'],
        createdAt: demoDate,
        updatedAt: demoDate,
      },
    ],
    partyTokens: [
      { id: 'hero-asya', gameId: demoGameId, name: 'Aya', icon: '🜁' },
      { id: 'hero-vlad', gameId: demoGameId, name: 'Vlad', icon: '⚔️' },
      { id: 'hero-ira', gameId: demoGameId, name: 'Ira', icon: '✦' },
      { id: 'hero-misha', gameId: demoGameId, name: 'Misha', icon: '🛡️' },
    ],
    sessions: createDemoSessions(),
    scenes,
    sessionScenes: [
      {
        id: 'session-scene-tavern-1',
        sessionId: mainSessionId,
        sceneId: 'scene-copper-fox',
        position: 1,
        notes: 'Start with a busy hall.',
      },
      {
        id: 'session-scene-tavern-aftermath',
        sessionId: mainSessionId,
        sceneId: 'scene-copper-fox-aftermath',
        position: 2,
        notes: 'Use immediately after the explosion.',
      },
      {
        id: 'session-scene-tavern-2',
        sessionId: mainSessionId,
        sceneId: 'scene-copper-fox',
        position: 3,
        notes: 'Return to the original preparation for a flashback.',
      },
      {
        id: 'session-scene-forest-road',
        sessionId: mainSessionId,
        sceneId: 'scene-forest-road',
        position: 4,
        notes: 'A fallback route if the party leaves town.',
      },
    ],
    scenePresets: [
      {
        id: 'preset-roadside-camp',
        title: 'Roadside Camp',
        description:
          'A system template for resting, negotiations, or a nighttime alarm.',
        notes: '',
        thumbnail: forestImage,
        musicLink: '',
        map: createMap(forestImage),
        tokens: [],
        sourceLabel: 'System template',
      },
      {
        id: 'preset-small-tavern',
        title: 'Small Tavern',
        description:
          'A neutral interior template with room for conversation and conflict.',
        notes: '',
        thumbnail: tavernImage,
        musicLink: '',
        map: createMap(tavernImage),
        tokens: [],
        sourceLabel: 'System template',
      },
    ],
    gameRuntimes: [],
  }
}
