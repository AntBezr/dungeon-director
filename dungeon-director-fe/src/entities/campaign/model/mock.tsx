import type { CampaignType } from './types'

export const campaignsMock: CampaignType[] = [
  {
    title: 'Ashfall Cartography',
    gameUuid: 'daf3e8c0-1b2a-4d3e-9f5a-1c2b3d4e5f60',
    status: 'ACTIVE',
    last_change_date: '2026-12-01T12:34:56Z',
    details: {
      numScenes: 10,
      numSessions: 5,
    },
    participants: ['Alice', 'Bob', 'Charlie'],
  },
  {
    title: 'Goblin bear',
    gameUuid: 'addf3e8c0-1b2a-4d3e-9f5a-1c2b3d4e5f61',
    status: 'PREP MODE',
    last_change_date: '2026-06-01T12:34:56Z',
    details: {
      numScenes: 3,
      numSessions: 0,
    },
    participants: ['Sam', 'Alex', 'Jordan'],
  },
  {
    title: 'Pablo the Great',
    gameUuid: 'bddf3e8c0-1b2a-4d3e-9f5a-1c2b3d4e5f62',
    status: 'ON HOLD',
    last_change_date: '2026-01-12T12:34:56Z',
    details: {
      numScenes: 10,
      numSessions: 15,
    },
    participants: ['Sam', 'Alex', 'Jordan'],
  },
  {
    title: 'Homeland Chronicles',
    gameUuid: 'cddf3e8c0-1b2a-4d3e-9f5a-1c2b3d4e5f63',
    status: 'ARCHIVED',
    last_change_date: '2025-01-12T12:34:56Z',
    details: {
      numScenes: 125,
      numSessions: 20,
    },
    participants: ['Kate', 'Leo', 'Mia', 'Nina'],
  },
]
