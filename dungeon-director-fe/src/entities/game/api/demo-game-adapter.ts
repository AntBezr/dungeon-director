import { createDemoDatabase, type DemoDatabase } from '../model/demo-data'
import type {
  Game,
  GameRuntime,
  GameRuntimeUpdate,
  GameInput,
  GameSession,
  GameUpdate,
  PaginatedResult,
  PartyToken,
  Scene,
  SceneInput,
  ScenePreset,
  SceneUpdate,
  SceneToken,
  SessionInput,
  SessionScene,
  SessionSceneWithScene,
  SessionUpdate,
} from '../model/types'

const storageKey = 'scenes-demo-database-v3'
const demoContentVersionKey = `${storageKey}-content-version`
const demoContentVersion = '2'
const defaultPageSize = 20
const heroIcons = ['🜁', '⚔️', '✦', '🛡️', '☾', '🗝️']

const demoTextTranslations: Record<string, string> = {
  'Пепел над Ривермарком': 'Ashes over Rivermark',
  'Город на речном тракте медленно задыхается от пепельных бурь и чужих интриг.':
    'A town on the river road slowly suffocates beneath ash storms and foreign intrigue.',
  'Ночь в «Медной лисе»': 'A Night at the Copper Fox',
  'Знакомство с таверной, тревожный разговор и взрыв, меняющий вечер.':
    'A tavern introduction, a tense conversation, and an explosion that changes the night.',
  'Подготовка следующей встречи кампании «Пепел над Ривермарком».':
    'Preparation for the next meeting in the Ashes over Rivermark campaign.',
  Ася: 'Aya',
  Влад: 'Vlad',
  Ира: 'Ira',
  Миша: 'Misha',
  Таверна: 'The Copper Fox Tavern',
  'Шумный вечер в «Медной лисе»: два противника, союзник и скрытый сундук.':
    'A noisy night at the Copper Fox: two enemies, an ally, and a hidden chest.',
  'Начать с живого зала и дать героям время освоиться.':
    'Start with a busy hall and give the party time to settle in.',
  'Начать с живого зала.': 'Start with a busy hall.',
  'Хозяйка таверны': 'Tavern keeper',
  Громила: 'Thug',
  'Запертый сундук': 'Locked chest',
  'Таверна после взрыва': 'The Copper Fox Aftermath',
  'Та же таверна после взрыва. Это отдельная независимая подготовка.':
    'The same tavern after the explosion. This is independent preparation.',
  'Использовать сразу после взрыва.': 'Use immediately after the explosion.',
  'Осколки стола': 'Broken table',
  'Лесная дорога': 'Forest Road',
  'Дорога к Ривермарку, где следы в грязи ведут не туда, куда должны.':
    'The road to Rivermark, where muddy tracks lead somewhere they should not.',
  'Запасной путь, если герои покинут город.':
    'A fallback route if the party leaves town.',
  Волк: 'Wolf',
  'Странные следы': 'Unusual tracks',
  'Вернуться к исходной подготовке для флешбека.':
    'Return to the original preparation for a flashback.',
  'Придорожный лагерь': 'Roadside Camp',
  'Системная заготовка для отдыха, переговоров или ночной тревоги.':
    'A system template for resting, negotiations, or a nighttime alarm.',
  'Системная заготовка': 'System template',
  'Небольшая таверна': 'Small Tavern',
  'Нейтральная заготовка интерьера с местом для разговоров и столкновения.':
    'A neutral interior template with room for conversation and conflict.',
}
const defaultSessionSceneIds = new Set([
  'session-scene-tavern-1',
  'session-scene-tavern-aftermath',
  'session-scene-tavern-2',
  'session-scene-forest-road',
])
const defaultPartyTokenIds = new Set([
  'hero-asya',
  'hero-vlad',
  'hero-ira',
  'hero-misha',
])
const legacyPlayerNames = ['Ася', 'Влад', 'Ира', 'Миша']
const englishPlayerNames = ['Aya', 'Vlad', 'Ira', 'Misha']
const englishSeedScenes = createDemoDatabase().scenes

function translateDefaultText(value: string) {
  return demoTextTranslations[value] ?? value
}

function hasLegacyMapTitle(image: string | null, title: string) {
  return image?.includes(encodeURIComponent(title)) ?? false
}

function hasLegacyPlayerNames(playerNames: string[]) {
  return (
    playerNames.length === legacyPlayerNames.length &&
    playerNames.every((name, index) => name === legacyPlayerNames[index])
  )
}

function migrateDemoScene(scene: Scene): Scene {
  const isTavern =
    scene.id === 'scene-copper-fox' || scene.id === 'scene-copper-fox-aftermath'
  const isForest = scene.id === 'scene-forest-road'
  if (!isTavern && !isForest) return scene

  const replacementImage = isTavern
    ? (englishSeedScenes[0]?.thumbnail ?? null)
    : isForest
      ? (englishSeedScenes[2]?.thumbnail ?? null)
      : null
  const legacyMapTitle = isTavern ? 'Медная лисица' : 'Лесная дорога'

  return {
    ...scene,
    title: translateDefaultText(scene.title),
    description: translateDefaultText(scene.description),
    notes: translateDefaultText(scene.notes),
    thumbnail: hasLegacyMapTitle(scene.thumbnail, legacyMapTitle)
      ? replacementImage
      : scene.thumbnail,
    map: hasLegacyMapTitle(scene.map.backgroundImage, legacyMapTitle)
      ? { ...scene.map, backgroundImage: replacementImage }
      : scene.map,
    tokens: scene.tokens.map((token) => ({
      ...token,
      name: translateDefaultText(token.name),
    })),
  }
}

function migrateDemoContent(database: DemoDatabase): DemoDatabase {
  if (localStorage.getItem(demoContentVersionKey) === demoContentVersion)
    return database

  const demoGame = database.games.find((game) => game.id === 'game-rivermark')
  if (!demoGame) return database

  return {
    ...database,
    games: database.games.map((game) =>
      game.id === demoGame.id
        ? {
            ...game,
            title: translateDefaultText(game.title),
            description: translateDefaultText(game.description),
            playerNames: hasLegacyPlayerNames(game.playerNames)
              ? englishPlayerNames
              : game.playerNames,
          }
        : game,
    ),
    partyTokens: database.partyTokens.map((token) =>
      defaultPartyTokenIds.has(token.id)
        ? { ...token, name: translateDefaultText(token.name) }
        : token,
    ),
    sessions: database.sessions.map((session) =>
      session.id === 'session-copper-fox' ||
      session.id.startsWith('session-rivermark-')
        ? {
            ...session,
            title:
              session.id === 'session-copper-fox'
                ? translateDefaultText(session.title)
                : session.title.replace(/^Сессия (\d+)$/, 'Session $1'),
            description: translateDefaultText(session.description),
          }
        : session,
    ),
    scenes: database.scenes.map(migrateDemoScene),
    sessionScenes: database.sessionScenes.map((entry) =>
      defaultSessionSceneIds.has(entry.id)
        ? { ...entry, notes: translateDefaultText(entry.notes) }
        : entry,
    ),
    scenePresets: database.scenePresets.map((preset) => ({
      ...preset,
      title: translateDefaultText(preset.title),
      description: translateDefaultText(preset.description),
      sourceLabel: translateDefaultText(preset.sourceLabel),
    })),
  }
}

function delay() {
  return new Promise<void>((resolve) => window.setTimeout(resolve, 120))
}

function clone<T>(value: T) {
  return structuredClone(value)
}

function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`
}

function readDatabase() {
  const storedValue = localStorage.getItem(storageKey)

  if (!storedValue) {
    const database = createDemoDatabase()
    writeDatabase(database)
    return database
  }

  try {
    const database = migrateDemoContent(JSON.parse(storedValue) as DemoDatabase)
    writeDatabase(database)
    return database
  } catch {
    const database = createDemoDatabase()
    writeDatabase(database)
    return database
  }
}

function writeDatabase(database: DemoDatabase) {
  localStorage.setItem(storageKey, JSON.stringify(database))
  localStorage.setItem(demoContentVersionKey, demoContentVersion)
}

function requireGame(database: DemoDatabase, gameId: string) {
  const game = database.games.find((candidate) => candidate.id === gameId)

  if (!game) {
    throw new Error('Campaign not found.')
  }

  return game
}

function requireSession(database: DemoDatabase, sessionId: string) {
  const session = database.sessions.find(
    (candidate) => candidate.id === sessionId,
  )

  if (!session) {
    throw new Error('Session not found.')
  }

  return session
}

function requireScene(database: DemoDatabase, sceneId: string) {
  const scene = database.scenes.find((candidate) => candidate.id === sceneId)

  if (!scene) {
    throw new Error('Scene not found.')
  }

  return scene
}

function requireGameRuntime(database: DemoDatabase, sessionId: string) {
  const runtime = database.gameRuntimes.find(
    (candidate) => candidate.sessionId === sessionId,
  )

  if (!runtime) {
    throw new Error('Game has not started.')
  }

  return runtime
}

function createPage<T>(
  items: T[],
  page: number,
  pageSize: number,
): PaginatedResult<T> {
  const safePage = Math.max(page, 1)
  const count = items.length
  const start = (safePage - 1) * pageSize

  return {
    count,
    next: start + pageSize < count ? safePage + 1 : null,
    previous: safePage > 1 ? safePage - 1 : null,
    results: items.slice(start, start + pageSize),
  }
}

function synchronisePartyTokens(
  database: DemoDatabase,
  game: Game,
  playerNames: string[],
) {
  const existingTokens = database.partyTokens.filter(
    (token) => token.gameId === game.id,
  )
  const tokensByName = new Map(
    existingTokens.map((token) => [token.name, token]),
  )

  // Players belong to a campaign; hero tokens keep a stable record ID.
  const nextTokens = playerNames.map(
    (name, index) =>
      tokensByName.get(name) ?? {
        id: createId('hero'),
        gameId: game.id,
        name,
        icon: heroIcons[index % heroIcons.length] ?? '✦',
      },
  )

  database.partyTokens = [
    ...database.partyTokens.filter((token) => token.gameId !== game.id),
    ...nextTokens,
  ]
}

function isGroupToken(token: SceneToken) {
  return (
    token.kind === 'hero' || (token.kind === 'npc' && token.travelsWithGroup)
  )
}

export const demoGameAdapter = {
  async listGames(): Promise<Game[]> {
    await delay()
    const database = readDatabase()
    return clone(
      [...database.games].sort((left, right) =>
        right.updatedAt.localeCompare(left.updatedAt),
      ),
    )
  },

  async getGame(gameId: string): Promise<Game> {
    await delay()
    return clone(requireGame(readDatabase(), gameId))
  },

  async createGame(input: GameInput): Promise<Game> {
    await delay()
    const database = readDatabase()
    const now = new Date().toISOString()
    const game: Game = {
      id: createId('game'),
      ...input,
      playerNames: input.playerNames.filter(Boolean),
      createdAt: now,
      updatedAt: now,
    }

    database.games.push(game)
    synchronisePartyTokens(database, game, game.playerNames)
    writeDatabase(database)
    return clone(game)
  },

  async updateGame(gameId: string, update: GameUpdate): Promise<Game> {
    await delay()
    const database = readDatabase()
    const game = requireGame(database, gameId)
    const nextPlayerNames =
      update.playerNames?.filter(Boolean) ?? game.playerNames
    const updatedGame: Game = {
      ...game,
      ...update,
      playerNames: nextPlayerNames,
      updatedAt: new Date().toISOString(),
    }

    database.games = database.games.map((candidate) =>
      candidate.id === gameId ? updatedGame : candidate,
    )
    synchronisePartyTokens(database, updatedGame, nextPlayerNames)
    writeDatabase(database)
    return clone(updatedGame)
  },

  async deleteGame(gameId: string): Promise<void> {
    await delay()
    const database = readDatabase()
    const sessionIds = new Set(
      database.sessions
        .filter((session) => session.gameId === gameId)
        .map((session) => session.id),
    )

    database.games = database.games.filter((game) => game.id !== gameId)
    database.partyTokens = database.partyTokens.filter(
      (token) => token.gameId !== gameId,
    )
    database.scenes = database.scenes.filter((scene) => scene.gameId !== gameId)
    database.sessions = database.sessions.filter(
      (session) => session.gameId !== gameId,
    )
    database.gameRuntimes = database.gameRuntimes.filter(
      (runtime) => runtime.gameId !== gameId,
    )
    database.sessionScenes = database.sessionScenes.filter(
      (entry) => !sessionIds.has(entry.sessionId),
    )
    writeDatabase(database)
  },

  async listPartyTokens(gameId: string): Promise<PartyToken[]> {
    await delay()
    const database = readDatabase()
    requireGame(database, gameId)
    return clone(
      database.partyTokens.filter((token) => token.gameId === gameId),
    )
  },

  async updatePartyToken(
    tokenId: string,
    update: Pick<PartyToken, 'icon' | 'avatar'>,
  ): Promise<PartyToken> {
    await delay()
    const database = readDatabase()
    const token = database.partyTokens.find(
      (candidate) => candidate.id === tokenId,
    )

    if (!token) {
      throw new Error('Party token not found.')
    }

    const updatedToken = { ...token, ...update }
    database.partyTokens = database.partyTokens.map((candidate) =>
      candidate.id === tokenId ? updatedToken : candidate,
    )
    writeDatabase(database)
    return clone(updatedToken)
  },

  async listSessions(
    gameId: string,
    options: { page?: number; pageSize?: number; search?: string } = {},
  ): Promise<PaginatedResult<GameSession>> {
    await delay()
    const database = readDatabase()
    requireGame(database, gameId)
    const search = options.search?.trim().toLocaleLowerCase('ru') ?? ''
    const sessions = database.sessions
      .filter((session) => session.gameId === gameId)
      .filter(
        (session) =>
          !search ||
          `${session.title} ${session.description}`
            .toLocaleLowerCase('ru')
            .includes(search),
      )
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))

    return clone(
      createPage(
        sessions,
        options.page ?? 1,
        options.pageSize ?? defaultPageSize,
      ),
    )
  },

  async getSession(sessionId: string): Promise<GameSession> {
    await delay()
    return clone(requireSession(readDatabase(), sessionId))
  },

  async createSession(
    gameId: string,
    input: SessionInput,
  ): Promise<GameSession> {
    await delay()
    const database = readDatabase()
    requireGame(database, gameId)
    const now = new Date().toISOString()
    const session: GameSession = {
      id: createId('session'),
      gameId,
      ...input,
      createdAt: now,
      updatedAt: now,
    }

    database.sessions.push(session)
    writeDatabase(database)
    return clone(session)
  },

  async updateSession(
    sessionId: string,
    update: SessionUpdate,
  ): Promise<GameSession> {
    await delay()
    const database = readDatabase()
    const session = requireSession(database, sessionId)
    const updatedSession: GameSession = {
      ...session,
      ...update,
      updatedAt: new Date().toISOString(),
    }

    database.sessions = database.sessions.map((candidate) =>
      candidate.id === sessionId ? updatedSession : candidate,
    )
    writeDatabase(database)
    return clone(updatedSession)
  },

  async deleteSession(sessionId: string): Promise<void> {
    await delay()
    const database = readDatabase()
    requireSession(database, sessionId)
    database.sessions = database.sessions.filter(
      (session) => session.id !== sessionId,
    )
    database.sessionScenes = database.sessionScenes.filter(
      (entry) => entry.sessionId !== sessionId,
    )
    database.gameRuntimes = database.gameRuntimes.filter(
      (runtime) => runtime.sessionId !== sessionId,
    )
    writeDatabase(database)
  },

  async listScenes(gameId: string, search = ''): Promise<Scene[]> {
    await delay()
    const database = readDatabase()
    requireGame(database, gameId)
    const normalizedSearch = search.trim().toLocaleLowerCase('ru')
    const scenes = database.scenes
      .filter((scene) => scene.gameId === gameId)
      .filter(
        (scene) =>
          !normalizedSearch ||
          `${scene.title} ${scene.description}`
            .toLocaleLowerCase('ru')
            .includes(normalizedSearch),
      )
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))

    return clone(scenes)
  },

  async getScene(sceneId: string): Promise<Scene> {
    await delay()
    return clone(requireScene(readDatabase(), sceneId))
  },

  async createScene(gameId: string, input: SceneInput): Promise<Scene> {
    await delay()
    const database = readDatabase()
    requireGame(database, gameId)
    const now = new Date().toISOString()
    const scene: Scene = {
      id: createId('scene'),
      gameId,
      ...input,
      notes: '',
      thumbnail: null,
      map: {
        backgroundImage: null,
        rotation: 0,
        startView: { x: 0, y: 0, zoom: 1 },
        grid: { isEnabled: true, cellSize: 50, offsetX: 0, offsetY: 0 },
      },
      tokens: [],
      createdAt: now,
      updatedAt: now,
    }

    database.scenes.push(scene)
    writeDatabase(database)
    return clone(scene)
  },

  async updateScene(sceneId: string, update: SceneUpdate): Promise<Scene> {
    await delay()
    const database = readDatabase()
    const scene = requireScene(database, sceneId)
    const updatedScene: Scene = {
      ...scene,
      ...update,
      updatedAt: new Date().toISOString(),
    }

    database.scenes = database.scenes.map((candidate) =>
      candidate.id === sceneId ? updatedScene : candidate,
    )
    writeDatabase(database)
    return clone(updatedScene)
  },

  async cloneScene(sceneId: string): Promise<Scene> {
    await delay()
    const database = readDatabase()
    const original = requireScene(database, sceneId)
    const now = new Date().toISOString()
    const copy: Scene = {
      ...original,
      id: createId('scene'),
      title: `${original.title} — copy`,
      createdAt: now,
      updatedAt: now,
    }

    database.scenes.push(copy)
    writeDatabase(database)
    return clone(copy)
  },

  async listScenePresets(): Promise<ScenePreset[]> {
    await delay()
    return clone(readDatabase().scenePresets)
  },

  async createSceneFromPreset(
    gameId: string,
    presetId: string,
  ): Promise<Scene> {
    await delay()
    const database = readDatabase()
    requireGame(database, gameId)
    const preset = database.scenePresets.find(
      (candidate) => candidate.id === presetId,
    )

    if (!preset) {
      throw new Error('System preset not found.')
    }

    const now = new Date().toISOString()
    const scene: Scene = {
      id: createId('scene'),
      gameId,
      title: `${preset.title} — copy`,
      description: preset.description,
      thumbnail: preset.thumbnail,
      musicLink: '',
      notes: preset.notes,
      map: clone(preset.map),
      tokens: clone(preset.tokens),
      createdAt: now,
      updatedAt: now,
    }

    database.scenes.push(scene)
    writeDatabase(database)
    return clone(scene)
  },

  async getGameRuntime(sessionId: string): Promise<GameRuntime | null> {
    await delay()
    const database = readDatabase()
    requireSession(database, sessionId)
    const runtime = database.gameRuntimes.find(
      (candidate) => candidate.sessionId === sessionId,
    )
    return runtime ? clone(runtime) : null
  },

  async startGame(
    sessionId: string,
    sceneId: string,
    sessionSceneId?: string,
  ): Promise<GameRuntime> {
    await delay()
    const database = readDatabase()
    const session = requireSession(database, sessionId)
    const existingRuntime = database.gameRuntimes.find(
      (candidate) => candidate.sessionId === sessionId,
    )

    if (existingRuntime) {
      return clone(existingRuntime)
    }

    const scene = requireScene(database, sceneId)
    if (scene.gameId !== session.gameId) {
      throw new Error('The scene does not belong to this session.')
    }
    const sessionScene = sessionSceneId
      ? database.sessionScenes.find(
          (entry) =>
            entry.id === sessionSceneId && entry.sessionId === sessionId,
        )
      : database.sessionScenes.find(
          (entry) => entry.sessionId === sessionId && entry.sceneId === sceneId,
        )
    if (sessionScene && sessionScene.sceneId !== sceneId) {
      throw new Error('The scene is not in this session plan.')
    }

    const now = new Date().toISOString()
    const runtime: GameRuntime = {
      id: createId('runtime'),
      gameId: session.gameId,
      sessionId,
      activeSceneId: sceneId,
      activeSessionSceneId: sessionScene?.id ?? null,
      tokens: clone(scene.tokens),
      camera: clone(scene.map.startView),
      musicVolume: 0.7,
      updatedAt: now,
    }

    database.gameRuntimes.push(runtime)
    database.sessions = database.sessions.map((candidate) =>
      candidate.id === sessionId
        ? { ...candidate, status: 'active', updatedAt: now }
        : candidate,
    )
    writeDatabase(database)
    return clone(runtime)
  },

  async updateGameRuntime(
    sessionId: string,
    update: GameRuntimeUpdate,
  ): Promise<GameRuntime> {
    await delay()
    const database = readDatabase()
    const runtime = requireGameRuntime(database, sessionId)
    const updatedRuntime: GameRuntime = {
      ...runtime,
      ...update,
      updatedAt: new Date().toISOString(),
    }

    database.gameRuntimes = database.gameRuntimes.map((candidate) =>
      candidate.sessionId === sessionId ? updatedRuntime : candidate,
    )
    writeDatabase(database)
    return clone(updatedRuntime)
  },

  async transitionGame(
    sessionId: string,
    nextSessionSceneId: string,
    keepPositions: boolean,
  ): Promise<GameRuntime> {
    await delay()
    const database = readDatabase()
    const runtime = requireGameRuntime(database, sessionId)
    const nextSessionScene = database.sessionScenes.find(
      (entry) =>
        entry.id === nextSessionSceneId && entry.sessionId === sessionId,
    )
    if (!nextSessionScene) {
      throw new Error('The scene is not in this session plan.')
    }
    const nextScene = requireScene(database, nextSessionScene.sceneId)

    // The runtime stays independent from both preparations: carried tokens are
    // copied into the next scene, while stationary tokens come from its setup.
    const groupTokens = runtime.tokens.filter(isGroupToken)
    const nextTokens = nextScene.tokens.map((preparedToken) => {
      const carriedToken = groupTokens.find(
        (token) => token.entityId === preparedToken.entityId,
      )
      if (!carriedToken) return clone(preparedToken)

      return {
        ...clone(carriedToken),
        x: keepPositions ? carriedToken.x : null,
        y: keepPositions ? carriedToken.y : null,
      }
    })
    const unmatchedGroupTokens = groupTokens
      .filter(
        (token) =>
          !nextScene.tokens.some(
            (preparedToken) => preparedToken.entityId === token.entityId,
          ),
      )
      .map((token) => ({
        ...clone(token),
        x: keepPositions ? token.x : null,
        y: keepPositions ? token.y : null,
      }))
    const updatedRuntime: GameRuntime = {
      ...runtime,
      activeSceneId: nextScene.id,
      activeSessionSceneId: nextSessionScene.id,
      tokens: [...nextTokens, ...unmatchedGroupTokens],
      camera: clone(nextScene.map.startView),
      updatedAt: new Date().toISOString(),
    }

    database.gameRuntimes = database.gameRuntimes.map((candidate) =>
      candidate.sessionId === sessionId ? updatedRuntime : candidate,
    )
    writeDatabase(database)
    return clone(updatedRuntime)
  },

  async endGame(sessionId: string): Promise<void> {
    await delay()
    const database = readDatabase()
    const session = requireSession(database, sessionId)
    requireGameRuntime(database, sessionId)
    const now = new Date().toISOString()
    database.gameRuntimes = database.gameRuntimes.filter(
      (runtime) => runtime.sessionId !== sessionId,
    )
    database.sessions = database.sessions.map((candidate) =>
      candidate.id === session.id
        ? { ...candidate, status: 'completed', updatedAt: now }
        : candidate,
    )
    writeDatabase(database)
  },

  async listSessionScenes(sessionId: string): Promise<SessionSceneWithScene[]> {
    await delay()
    const database = readDatabase()
    requireSession(database, sessionId)
    const entries = database.sessionScenes
      .filter((entry) => entry.sessionId === sessionId)
      .sort((left, right) => left.position - right.position)
      .flatMap((entry) => {
        const scene = database.scenes.find(
          (candidate) => candidate.id === entry.sceneId,
        )
        return scene ? [{ ...entry, scene }] : []
      })

    return clone(entries)
  },

  async addSceneToSession(
    sessionId: string,
    sceneId: string,
  ): Promise<SessionScene> {
    await delay()
    const database = readDatabase()
    requireSession(database, sessionId)
    requireScene(database, sceneId)
    const position =
      database.sessionScenes.filter((entry) => entry.sessionId === sessionId)
        .length + 1
    const entry: SessionScene = {
      id: createId('session-scene'),
      sessionId,
      sceneId,
      position,
      notes: '',
    }

    database.sessionScenes.push(entry)
    writeDatabase(database)
    return clone(entry)
  },

  async updateSessionScene(
    entryId: string,
    update: Pick<SessionScene, 'notes'>,
  ): Promise<SessionScene> {
    await delay()
    const database = readDatabase()
    const entry = database.sessionScenes.find(
      (candidate) => candidate.id === entryId,
    )

    if (!entry) {
      throw new Error('Plan entry not found.')
    }

    const updatedEntry = { ...entry, ...update }
    database.sessionScenes = database.sessionScenes.map((candidate) =>
      candidate.id === entryId ? updatedEntry : candidate,
    )
    writeDatabase(database)
    return clone(updatedEntry)
  },

  async removeSceneFromSession(entryId: string): Promise<void> {
    await delay()
    const database = readDatabase()
    const entry = database.sessionScenes.find(
      (candidate) => candidate.id === entryId,
    )

    if (!entry) {
      throw new Error('Plan entry not found.')
    }

    database.sessionScenes = database.sessionScenes
      .filter((candidate) => candidate.id !== entryId)
      .map((candidate) =>
        candidate.sessionId === entry.sessionId &&
        candidate.position > entry.position
          ? { ...candidate, position: candidate.position - 1 }
          : candidate,
      )
    writeDatabase(database)
  },

  async moveSceneInSession(entryId: string, direction: -1 | 1): Promise<void> {
    await delay()
    const database = readDatabase()
    const entry = database.sessionScenes.find(
      (candidate) => candidate.id === entryId,
    )

    if (!entry) {
      throw new Error('Plan entry not found.')
    }

    const neighbour = database.sessionScenes.find(
      (candidate) =>
        candidate.sessionId === entry.sessionId &&
        candidate.position === entry.position + direction,
    )

    if (!neighbour) {
      return
    }

    database.sessionScenes = database.sessionScenes.map((candidate) => {
      if (candidate.id === entry.id)
        return { ...candidate, position: neighbour.position }
      if (candidate.id === neighbour.id)
        return { ...candidate, position: entry.position }
      return candidate
    })
    writeDatabase(database)
  },

  async resetDemoData(): Promise<void> {
    await delay()
    writeDatabase(createDemoDatabase())
  },
}
