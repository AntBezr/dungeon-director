import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useGameRuntime, useScene } from '@entities/game'
import { SceneWorkspace } from '@widgets/scene-workspace'

export function PlayerViewPage() {
  const { sessionId } = useParams()
  const runtimeQuery = useGameRuntime(sessionId)
  const sceneQuery = useScene(runtimeQuery.data?.activeSceneId)

  useEffect(() => {
    const interval = window.setInterval(() => {
      void runtimeQuery.refetch()
      void sceneQuery.refetch()
    }, 1000)
    return () => window.clearInterval(interval)
  }, [runtimeQuery, sceneQuery])

  if (runtimeQuery.isPending || (runtimeQuery.data && sceneQuery.isPending))
    return (
      <main className="grid min-h-svh place-items-center bg-background p-6 text-sm text-muted-foreground">
        Connecting player screen…
      </main>
    )
  if (!runtimeQuery.data || !sceneQuery.data)
    return (
      <main className="grid min-h-svh place-items-center bg-background p-6 text-center">
        <div>
          <h1 className="text-xl font-semibold">The game has not started</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The active scene will appear here when the game master starts play.
          </p>
        </div>
      </main>
    )

  return (
    <main className="min-h-svh bg-slate-950">
      <SceneWorkspace
        mode="players"
        scene={sceneQuery.data}
        tokens={runtimeQuery.data.tokens}
        view={runtimeQuery.data.camera}
      />
    </main>
  )
}
