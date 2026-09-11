import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '@shared/api'

import { demoGameAdapter } from './demo-game-adapter'
import type {
  GameInput,
  GameRuntimeUpdate,
  GameUpdate,
  SceneInput,
  SceneUpdate,
  SessionInput,
  SessionUpdate,
} from '../model/types'

export const gameQueryKeys = {
  all: ['games'] as const,
  detail: (gameId: string) => ['games', gameId] as const,
  partyTokens: (gameId: string) => ['games', gameId, 'party-tokens'] as const,
  sessions: (gameId: string, page: number, search: string) =>
    ['games', gameId, 'sessions', page, search] as const,
  session: (sessionId: string) => ['sessions', sessionId] as const,
  scenes: (gameId: string, search: string) =>
    ['games', gameId, 'scenes', search] as const,
  scene: (sceneId: string) => ['scenes', sceneId] as const,
  presets: ['scene-presets'] as const,
  sessionScenes: (sessionId: string) =>
    ['sessions', sessionId, 'scene-entries'] as const,
  gameRuntime: (sessionId: string) =>
    ['sessions', sessionId, 'game-runtime'] as const,
}

function invalidateSessions(gameId: string) {
  return queryClient.invalidateQueries({
    queryKey: ['games', gameId, 'sessions'],
  })
}

function invalidateScenes(gameId: string) {
  return queryClient.invalidateQueries({
    queryKey: ['games', gameId, 'scenes'],
  })
}

export function useGames() {
  return useQuery({
    queryKey: gameQueryKeys.all,
    queryFn: () => demoGameAdapter.listGames(),
  })
}

export function useGame(gameId: string | undefined) {
  return useQuery({
    queryKey: gameQueryKeys.detail(gameId ?? ''),
    queryFn: () => demoGameAdapter.getGame(gameId ?? ''),
    enabled: Boolean(gameId),
  })
}

export function usePartyTokens(gameId: string | undefined) {
  return useQuery({
    queryKey: gameQueryKeys.partyTokens(gameId ?? ''),
    queryFn: () => demoGameAdapter.listPartyTokens(gameId ?? ''),
    enabled: Boolean(gameId),
  })
}

export function useGameSessions(
  gameId: string | undefined,
  page: number,
  search: string,
) {
  return useQuery({
    queryKey: gameQueryKeys.sessions(gameId ?? '', page, search),
    queryFn: () => demoGameAdapter.listSessions(gameId ?? '', { page, search }),
    enabled: Boolean(gameId),
  })
}

export function useSession(sessionId: string | undefined) {
  return useQuery({
    queryKey: gameQueryKeys.session(sessionId ?? ''),
    queryFn: () => demoGameAdapter.getSession(sessionId ?? ''),
    enabled: Boolean(sessionId),
  })
}

export function useScenes(gameId: string | undefined, search = '') {
  return useQuery({
    queryKey: gameQueryKeys.scenes(gameId ?? '', search),
    queryFn: () => demoGameAdapter.listScenes(gameId ?? '', search),
    enabled: Boolean(gameId),
  })
}

export function useScene(sceneId: string | undefined) {
  return useQuery({
    queryKey: gameQueryKeys.scene(sceneId ?? ''),
    queryFn: () => demoGameAdapter.getScene(sceneId ?? ''),
    enabled: Boolean(sceneId),
  })
}

export function useScenePresets() {
  return useQuery({
    queryKey: gameQueryKeys.presets,
    queryFn: () => demoGameAdapter.listScenePresets(),
  })
}

export function useSessionScenes(sessionId: string | undefined) {
  return useQuery({
    queryKey: gameQueryKeys.sessionScenes(sessionId ?? ''),
    queryFn: () => demoGameAdapter.listSessionScenes(sessionId ?? ''),
    enabled: Boolean(sessionId),
  })
}

export function useGameRuntime(sessionId: string | undefined) {
  return useQuery({
    queryKey: gameQueryKeys.gameRuntime(sessionId ?? ''),
    queryFn: () => demoGameAdapter.getGameRuntime(sessionId ?? ''),
    enabled: Boolean(sessionId),
  })
}

export function useCreateGame() {
  return useMutation({
    mutationFn: (input: GameInput) => demoGameAdapter.createGame(input),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: gameQueryKeys.all }),
  })
}

export function useUpdateGame() {
  return useMutation({
    mutationFn: ({ gameId, update }: { gameId: string; update: GameUpdate }) =>
      demoGameAdapter.updateGame(gameId, update),
    onSuccess: (game) => {
      queryClient.setQueryData(gameQueryKeys.detail(game.id), game)
      void queryClient.invalidateQueries({ queryKey: gameQueryKeys.all })
      void queryClient.invalidateQueries({
        queryKey: gameQueryKeys.partyTokens(game.id),
      })
    },
  })
}

export function useDeleteGame() {
  return useMutation({
    mutationFn: (gameId: string) => demoGameAdapter.deleteGame(gameId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: gameQueryKeys.all }),
  })
}

export function useUpdatePartyToken() {
  return useMutation({
    mutationFn: ({ tokenId, icon }: { tokenId: string; icon: string }) =>
      demoGameAdapter.updatePartyToken(tokenId, { icon }),
    onSuccess: (token) =>
      queryClient.invalidateQueries({
        queryKey: gameQueryKeys.partyTokens(token.gameId),
      }),
  })
}

export function useCreateSession() {
  return useMutation({
    mutationFn: ({ gameId, input }: { gameId: string; input: SessionInput }) =>
      demoGameAdapter.createSession(gameId, input),
    onSuccess: (session) => invalidateSessions(session.gameId),
  })
}

export function useUpdateSession() {
  return useMutation({
    mutationFn: ({
      sessionId,
      update,
    }: {
      sessionId: string
      update: SessionUpdate
    }) => demoGameAdapter.updateSession(sessionId, update),
    onSuccess: (session) => {
      queryClient.setQueryData(gameQueryKeys.session(session.id), session)
      void invalidateSessions(session.gameId)
    },
  })
}

export function useDeleteSession() {
  return useMutation({
    mutationFn: async ({
      gameId,
      sessionId,
    }: {
      gameId: string
      sessionId: string
    }) => {
      await demoGameAdapter.deleteSession(sessionId)
      return gameId
    },
    onSuccess: (gameId) => invalidateSessions(gameId),
  })
}

export function useCreateScene() {
  return useMutation({
    mutationFn: ({ gameId, input }: { gameId: string; input: SceneInput }) =>
      demoGameAdapter.createScene(gameId, input),
    onSuccess: (scene) => invalidateScenes(scene.gameId),
  })
}

export function useUpdateScene() {
  return useMutation({
    mutationFn: ({
      sceneId,
      update,
    }: {
      sceneId: string
      update: SceneUpdate
    }) => demoGameAdapter.updateScene(sceneId, update),
    onSuccess: (scene) => {
      queryClient.setQueryData(gameQueryKeys.scene(scene.id), scene)
      void invalidateScenes(scene.gameId)
      void queryClient.invalidateQueries({ queryKey: ['sessions'] })
    },
  })
}

export function useCloneScene() {
  return useMutation({
    mutationFn: (sceneId: string) => demoGameAdapter.cloneScene(sceneId),
    onSuccess: (scene) => invalidateScenes(scene.gameId),
  })
}

export function useCreateSceneFromPreset() {
  return useMutation({
    mutationFn: ({ gameId, presetId }: { gameId: string; presetId: string }) =>
      demoGameAdapter.createSceneFromPreset(gameId, presetId),
    onSuccess: (scene) => invalidateScenes(scene.gameId),
  })
}

export function useStartGame() {
  return useMutation({
    mutationFn: ({
      sessionId,
      sceneId,
      sessionSceneId,
    }: {
      sessionId: string
      sceneId: string
      sessionSceneId?: string
    }) => demoGameAdapter.startGame(sessionId, sceneId, sessionSceneId),
    onSuccess: (runtime) => {
      queryClient.setQueryData(
        gameQueryKeys.gameRuntime(runtime.sessionId),
        runtime,
      )
      void queryClient.invalidateQueries({
        queryKey: gameQueryKeys.session(runtime.sessionId),
      })
    },
  })
}

export function useUpdateGameRuntime() {
  return useMutation({
    mutationFn: ({
      sessionId,
      update,
    }: {
      sessionId: string
      update: GameRuntimeUpdate
    }) => demoGameAdapter.updateGameRuntime(sessionId, update),
    onSuccess: (runtime) =>
      queryClient.setQueryData(
        gameQueryKeys.gameRuntime(runtime.sessionId),
        runtime,
      ),
  })
}

export function useTransitionGame() {
  return useMutation({
    mutationFn: ({
      sessionId,
      nextSessionSceneId,
      keepPositions,
    }: {
      sessionId: string
      nextSessionSceneId: string
      keepPositions: boolean
    }) =>
      demoGameAdapter.transitionGame(
        sessionId,
        nextSessionSceneId,
        keepPositions,
      ),
    onSuccess: (runtime) =>
      queryClient.setQueryData(
        gameQueryKeys.gameRuntime(runtime.sessionId),
        runtime,
      ),
  })
}

export function useEndGame() {
  return useMutation({
    mutationFn: (sessionId: string) => demoGameAdapter.endGame(sessionId),
    onSuccess: (_result, sessionId) => {
      queryClient.setQueryData(gameQueryKeys.gameRuntime(sessionId), null)
      void queryClient.invalidateQueries({
        queryKey: gameQueryKeys.session(sessionId),
      })
    },
  })
}

export function useAddSceneToSession() {
  return useMutation({
    mutationFn: ({
      sessionId,
      sceneId,
    }: {
      sessionId: string
      sceneId: string
    }) => demoGameAdapter.addSceneToSession(sessionId, sceneId),
    onSuccess: (entry) =>
      queryClient.invalidateQueries({
        queryKey: gameQueryKeys.sessionScenes(entry.sessionId),
      }),
  })
}

export function useUpdateSessionScene() {
  return useMutation({
    mutationFn: ({ entryId, notes }: { entryId: string; notes: string }) =>
      demoGameAdapter.updateSessionScene(entryId, { notes }),
    onSuccess: (entry) =>
      queryClient.invalidateQueries({
        queryKey: gameQueryKeys.sessionScenes(entry.sessionId),
      }),
  })
}

export function useRemoveSceneFromSession() {
  return useMutation({
    mutationFn: (entryId: string) =>
      demoGameAdapter.removeSceneFromSession(entryId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sessions'] }),
  })
}

export function useMoveSceneInSession() {
  return useMutation({
    mutationFn: ({
      entryId,
      direction,
    }: {
      entryId: string
      direction: -1 | 1
    }) => demoGameAdapter.moveSceneInSession(entryId, direction),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sessions'] }),
  })
}

export function useResetDemoData() {
  return useMutation({
    mutationFn: () => demoGameAdapter.resetDemoData(),
    onSuccess: () => queryClient.invalidateQueries(),
  })
}
