import type { CampaignCardType, CampaignType } from './types'

export const campaignCardsMock: CampaignCardType[] = [
  {
    title: 'Ashfall Cartography',
    campaignId: 'daf3e8c0-1b2a-4d3e-9f5a-1c2b3d4e5f60',
    status: 'ACTIVE',
    last_change_date: '2026-12-01T12:34:56Z',
    details: { numScenes: 10, numSessions: 5 },
    participants: ['Alice', 'Bob', 'Charlie'],
  },
  {
    title: 'Goblin Bear',
    campaignId: 'addf3e8c0-1b2a-4d3e-9f5a-1c2b3d4e5f61',
    status: 'PREP MODE',
    last_change_date: '2026-06-01T12:34:56Z',
    details: { numScenes: 3, numSessions: 0 },
    participants: ['Sam', 'Alex', 'Jordan'],
  },
  {
    title: 'Pablo the Great',
    campaignId: 'bddf3e8c0-1b2a-4d3e-9f5a-1c2b3d4e5f62',
    status: 'ON HOLD',
    last_change_date: '2026-01-12T12:34:56Z',
    details: { numScenes: 10, numSessions: 15 },
    participants: ['Sam', 'Alex', 'Jordan'],
  },
  {
    title: 'Homeland Chronicles',
    campaignId: 'cddf3e8c0-1b2a-4d3e-9f5a-1c2b3d4e5f63',
    status: 'ARCHIVED',
    last_change_date: '2025-01-12T12:34:56Z',
    details: { numScenes: 25, numSessions: 20 },
    participants: ['Kate', 'Leo', 'Mia', 'Nina'],
  },
]

type Scene = CampaignType['scenes'][number]
type Session = CampaignType['sessions'][number]
type Note = CampaignType['notes'][number]

function createScenes(card: CampaignCardType, sceneTitles: string[]): Scene[] {
  return Array.from({ length: card.details.numScenes }, (_, index) => {
    const sceneNumber = String(index + 1).padStart(2, '0')
    const title = sceneTitles[index] ?? `Prepared scene ${sceneNumber}`

    return {
      sceneUuid: `${card.campaignId}-scene-${sceneNumber}`,
      title,
      description: `${card.title}: ${title.toLowerCase()}. This prepared beat includes a clear hook, a table decision, and a useful output for the next scene.`,
      approximateDuration: [35, 45, 60, 75][index % 4],
      order: index + 1,
      map: {
        imageUrl: null,
        rotation: 0,
        zoom: 1,
        position: {
          x: 0,
          y: 0,
        },
        grid: {
          enabled: true,
          size: 32,
        },
      },
      music: {
        spotifyUrl:
          index === 0
            ? 'https://open.spotify.com/playlist/37i9dQZF1DXa2PvUpywmrr'
            : '',
      },
      units:
        index === 0
          ? [
              {
                unitId: `${card.campaignId}-scene-${sceneNumber}-npc-mage`,
                unitType: 'NPC',
                character: {
                  source: 'DND_5E_API',
                  resource: 'monsters',
                  index: 'mage',
                },
                loot: [
                  {
                    source: 'DND_5E_API',
                    resource: 'equipment',
                    index: 'longsword',
                  },
                ],
              },
              {
                unitId: `${card.campaignId}-scene-${sceneNumber}-monster-rust-monster`,
                unitType: 'MONSTER',
                character: {
                  source: 'DND_5E_API',
                  resource: 'monsters',
                  index: 'rust-monster',
                },
                loot: [
                  {
                    source: 'DND_5E_API',
                    resource: 'equipment',
                    index: 'light-crossbow',
                  },
                ],
              },
            ]
          : [],
    }
  })
}

function createSessions(
  card: CampaignCardType,
  sessionTitles: string[],
): Session[] {
  return Array.from({ length: card.details.numSessions }, (_, index) => {
    const sessionNumber = String(index + 1).padStart(2, '0')
    const title = sessionTitles[index] ?? `Session ${sessionNumber}`

    return {
      sessionUuid: `${card.campaignId}-session-${sessionNumber}`,
      title,
      description: `${card.title} · Session ${sessionNumber}. Recap, active consequences, and the next prepared scene are ready for the table.`,
    }
  })
}

function createNotes(card: CampaignCardType, noteTitles: string[]): Note[] {
  return noteTitles.map((title, index) => ({
    id: `${card.campaignId}-note-${String(index + 1).padStart(2, '0')}`,
    title,
    description: `${card.title}: reminder for the next session.`,
  }))
}

function createCampaignDetails(
  card: CampaignCardType,
  sceneTitles: string[],
  sessionTitles: string[],
  noteTitles: string[],
): CampaignType {
  return {
    ...card,
    scenes: createScenes(card, sceneTitles),
    sessions: createSessions(card, sessionTitles),
    notes: createNotes(card, noteTitles),
  }
}

export const campaignDetailsMock: Record<string, CampaignType> = {
  [campaignCardsMock[0].campaignId]: createCampaignDetails(
    campaignCardsMock[0],
    [
      'Cold open at the brass observatory',
      'Ash weather over District Nine',
      'The surveyor trail',
      'Clockwork tram to Glasshouse',
      'Signal in the buried archive',
      'The undercity map room',
      "Archivist's impossible bargain",
      'Beacon wake protocol',
      'The atlas chamber',
      "Cartographer's oath",
    ],
    [
      'Ash over District Nine',
      'The missing survey crew',
      'Glasshouse transmission',
      'Beneath the archive',
      'The beacon wakes',
    ],
    [
      'Keep the storm clock visible',
      'Broker knows the missing crew',
      'Beacon needs a human map',
    ],
  ),
  [campaignCardsMock[1].campaignId]: createCampaignDetails(
    campaignCardsMock[1],
    [
      'Bear tracks in the orchard',
      'The cave that hums',
      'A bargain under snow',
    ],
    [],
    ['Choose the goblin clan motive', 'Prepare a winter travel complication'],
  ),
  [campaignCardsMock[2].campaignId]: createCampaignDetails(
    campaignCardsMock[2],
    [
      'Pablo enters the city',
      'A duel for the moon key',
      'The theatre of masks',
      'Feast at the river palace',
      'The stolen encore',
      'Fireworks over Old Town',
      'The mirror orchestra',
      'A dragon in the balcony',
      'Finale beneath the stage',
      'Curtain call at dawn',
    ],
    [
      'A stranger takes the stage',
      'Moon key rehearsal',
      'Masks in the audience',
      'The palace invitation',
      'Encore for the missing',
      'Fireworks and false clues',
      'Intermission in the mirror hall',
      'The balcony dragon',
      'A broken final act',
      'Pablo chooses a side',
      'The audience remembers',
      'After the applause',
      'A new patron arrives',
      'The last rehearsal',
      'Curtain call',
    ],
    ['Pablo owes the orchestra a favour', 'Moon key reacts to applause'],
  ),
  [campaignCardsMock[3].campaignId]: createCampaignDetails(
    campaignCardsMock[3],
    [
      'Homecoming to Greywatch',
      'The old well speaks',
      'Market day rumours',
      'A letter from the frontier',
      'Wolves at the south road',
      'The chapel bell',
      'Winter stores are missing',
      'Ghost lights in the moor',
      'The miller’s secret',
      'Ferry across black water',
      'The barrow door',
      'A crown of reeds',
      'The lost patrol',
      'Council at Greywatch',
      'Fire in the granary',
      'The traitor’s map',
      'Road to the homeland',
      'The border fort',
      'A promise kept',
      'The last winter feast',
      'Spring thaw',
      'A new banner',
      'The remembered road',
      'Home at last',
      'Chronicle epilogue',
    ],
    [
      'Return to Greywatch',
      'Rumours by the well',
      'South road patrol',
      'The chapel warning',
      'Moor lights',
      'Black water crossing',
      'The barrow opens',
      'Council decision',
      'Granary fire',
      'The traitor is named',
      'Border fort siege',
      'A hard winter',
      'The old promise',
      'Thaw and return',
      'Banner of Greywatch',
      'Road home',
      'The final patrol',
      'Winter feast',
      'The chronicle closes',
      'Epilogue',
    ],
    [
      'Greywatch needs a new council',
      'Keep the border fort map',
      'Resolve the old well mystery',
    ],
  ),
}
