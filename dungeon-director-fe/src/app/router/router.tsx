import { createBrowserRouter } from 'react-router-dom'

import { ROUTES } from '@shared/models/routes'

export const router = createBrowserRouter([
  {
    hydrateFallbackElement: (
      <main className="grid min-h-svh place-items-center bg-background text-sm text-muted-foreground">
        Loading…
      </main>
    ),
    lazy: async () => {
      const [{ App }, { PageNotFound }] = await Promise.all([
        import('../app'),
        import('@pages/error'),
      ])
      return { Component: App, ErrorBoundary: PageNotFound }
    },
    children: [
      {
        path: ROUTES.LOGIN,
        lazy: async () => {
          const { AuthPage } = await import('@pages/auth')
          return { Component: AuthPage }
        },
      },
      {
        path: ROUTES.REGISTER,
        lazy: async () => {
          const { AuthPage } = await import('@pages/auth')
          return { Component: AuthPage }
        },
      },
      {
        path: ROUTES.DEMO,
        lazy: async () => {
          const { DemoRedirectPage } = await import('@pages/auth')
          return { Component: DemoRedirectPage }
        },
      },
      {
        path: ROUTES.COMPENDIUM,
        lazy: async () => {
          const { CompendiumPage } = await import('@pages/compendium')
          return { Component: CompendiumPage }
        },
      },
      {
        path: ROUTES.GAMES,
        lazy: async () => {
          const { GamesPage } = await import('@pages/games')
          return { Component: GamesPage }
        },
      },
      {
        path: `${ROUTES.GAMES}/new`,
        lazy: async () => {
          const { GameFormPage } = await import('@pages/games')
          return { Component: GameFormPage }
        },
      },
      {
        path: ROUTES.GAME.PLAYER_VIEW,
        lazy: async () => {
          const { PlayerViewPage } = await import('@pages/game')
          return { Component: PlayerViewPage }
        },
      },
      {
        path: ROUTES.GAME.BASE,
        lazy: async () => {
          const { GameLayoutPage } = await import('@pages/game')
          return { Component: GameLayoutPage }
        },
        children: [
          {
            index: true,
            lazy: async () => {
              const { GameIndexRedirect } = await import('@pages/game')
              return { Component: GameIndexRedirect }
            },
          },
          {
            path: 'edit',
            lazy: async () => {
              const { GameFormPage } = await import('@pages/games')
              return { Component: GameFormPage }
            },
          },
          {
            path: 'sessions',
            lazy: async () => {
              const { GameSessionsPage } = await import('@pages/game')
              return { Component: GameSessionsPage }
            },
          },
          {
            path: 'sessions/:sessionId',
            lazy: async () => {
              const { SessionPlanPage } = await import('@pages/game')
              return { Component: SessionPlanPage }
            },
          },
          {
            path: 'sessions/:sessionId/play',
            lazy: async () => {
              const { SessionPlayPage } = await import('@pages/game')
              return { Component: SessionPlayPage }
            },
          },
          {
            path: 'scenes',
            lazy: async () => {
              const { SceneLibraryPage } = await import('@pages/game')
              return { Component: SceneLibraryPage }
            },
          },
          {
            path: 'scenes/presets/:presetId',
            lazy: async () => {
              const { ScenePresetPage } = await import('@pages/game')
              return { Component: ScenePresetPage }
            },
          },
          {
            path: 'scenes/:sceneId/edit',
            lazy: async () => {
              const { SceneEditorPage } = await import('@pages/game')
              return { Component: SceneEditorPage }
            },
          },
          {
            path: 'about',
            lazy: async () => {
              const { GameAboutPage } = await import('@pages/game')
              return { Component: GameAboutPage }
            },
          },
        ],
      },
      {
        path: ROUTES.PROFILE,
        lazy: async () => {
          const { ProfilePage } = await import('@pages/profile')
          return { Component: ProfilePage }
        },
      },
      {
        path: '*',
        lazy: async () => {
          const { PageNotFound } = await import('@pages/error')
          return { Component: PageNotFound }
        },
      },
    ],
  },
])
