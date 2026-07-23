import { createBrowserRouter } from 'react-router-dom'

import { ROUTES } from '@shared/models/routes'

export const router = createBrowserRouter([
  {
    lazy: async () => {
      const [{ App }, { PageNotFound }] = await Promise.all([
        import('../app'),
        import('@pages/error'),
      ])

      return {
        Component: App,
        ErrorBoundary: PageNotFound,
      }
    },
    children: [
      {
        path: ROUTES.LOGIN,
        lazy: async () => {
          const { Login } = await import('@pages/login')
          return { Component: Login }
        },
      },
      {
        path: ROUTES.HOME,
        lazy: async () => {
          const { HomePage } = await import('@pages/home')
          return { Component: HomePage }
        },
      },
      {
        path: ROUTES.CAMPAIGNWORKSPACE.BASE,
        lazy: async () => {
          const { CampaignWorkspacePage } =
            await import('@pages/campaignWorkspace')
          return { Component: CampaignWorkspacePage }
        },
      },
      {
        path: ROUTES.CAMPAIGNWORKSPACE.SCENEEDITOR,
        lazy: async () => {
          const { CampaignWorkspacePage } =
            await import('@pages/campaignWorkspace')
          return { Component: CampaignWorkspacePage }
        },
      },
      {
        path: ROUTES.GLOSSARY.BASE,
        lazy: async () => {
          const { GlossaryLayout } =
            await import('@pages/glossary/ui/GlossaryLayout')
          return { Component: GlossaryLayout }
        },
        children: [
          {
            index: true,
            lazy: async () => {
              const { GlossaryHome } =
                await import('@pages/glossary/ui/GlossaryHome')
              return { Component: GlossaryHome }
            },
          },
          {
            path: 'creatures/monsters',
            lazy: async () => {
              const { MonstersPage } =
                await import('@pages/glossary/ui/MonstersPage')
              return { Component: MonstersPage }
            },
          },
          {
            path: 'creatures/monsters/:monsterId',
            lazy: async () => {
              const { MonsterDetailsPage } =
                await import('@pages/glossary/ui/MonsterDetailsPage')
              return { Component: MonsterDetailsPage }
            },
          },
          {
            path: 'creatures/npcs',
            lazy: async () => {
              const { NPCsPage } = await import('@pages/glossary/ui/NPCsPage')
              return { Component: NPCsPage }
            },
          },
          {
            path: 'creatures/npcs/:npcId',
            lazy: async () => {
              const { NpcDetailsPage } =
                await import('@pages/glossary/ui/NpcDetailsPage')
              return { Component: NpcDetailsPage }
            },
          },
          {
            path: 'equipment/weapons',
            lazy: async () => {
              const { WeaponsPage } = await import('@pages/glossary/ui/WeaponsPage')
              return { Component: WeaponsPage }
            },
          },
        ],
      },
    ],
  },
])
