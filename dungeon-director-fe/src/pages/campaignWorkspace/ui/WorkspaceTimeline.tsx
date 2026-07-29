import { ChevronDown, ChevronUp, CirclePlus, Clapperboard, Plus, Radio, ScreenShare } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ROUTES } from '@shared/models/routes'
import { Badge, Button, Card, CardContent, CardHeader } from 'ui/8bit'

interface Scene {
  number: string
  title: string
  duration: string
  body: string
  output: string
}

const initialScenes: Scene[] = [
  {
    number: 'SCENE 01',
    title: 'Cold open in the brass observatory',
    duration: '12 min',
    body: 'Re-establish the city, show the ash weather system, and let the players notice the missing survey crew before the first hard prompt.',
    output: 'city map + storm ambience + first clue card',
  },
  {
    number: 'SCENE 02',
    title: 'Dockside negotiation with the relay broker',
    duration: '22 min',
    body: "A controlled social scene with one fast escalation path. Keep the broker's offer visible and surface the consequence if the crew refuses.",
    output: 'broker portrait + debt tracker + negotiation beats',
  },
  {
    number: 'SCENE 03',
    title: 'Power failure across the lower archive',
    duration: '16 min',
    body: 'Transition into pressure. Trigger the blackout, reveal the false elevator route, and give the table a clean decision before initiative starts.',
    output: 'blackout overlay + encounter board + fallback route note',
  },
]

const preparedScene: Scene = {
  number: 'SCENE 04',
  title: 'Witness in the rain market',
  duration: '10 min',
  body: 'A prepared social beat that can bridge the current mystery and the next combat encounter when the table needs a softer landing.',
  output: 'market ambience + witness portrait + one lead card',
}

function SceneCard({
  scene,
  index,
  total,
  onMove,
}: {
  scene: Scene
  index: number
  total: number
  onMove: (direction: -1 | 1) => void
}) {
  return (
    <Card className="border-slate-800 bg-slate-900/50 transition-transform hover:-translate-y-0.5 hover:border-slate-600">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between gap-4">
          <Badge
            variant="secondary"
            className="border-none bg-transparent px-0 py-0 text-[11px] font-bold tracking-wide text-orange-400"
          >
            {scene.number}
          </Badge>
          <span className="text-xs font-bold text-slate-500">
            {scene.duration}
          </span>
        </div>
        <h3 className="text-lg font-bold tracking-normal text-slate-100">
          {scene.title}
        </h3>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <p className="text-sm leading-5 text-slate-400">{scene.body}</p>
        <p className="mt-4 text-xs font-semibold text-slate-300">
          Output: {scene.output}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
            Run order {index + 1} of {total}
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-6"
              onClick={() => onMove(-1)}
              disabled={index === 0}
              aria-label={`Move ${scene.title} earlier`}
            >
              <ChevronUp className="size-3.5" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-6"
              onClick={() => onMove(1)}
              disabled={index === total - 1}
              aria-label={`Move ${scene.title} later`}
            >
              <ChevronDown className="size-3.5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SceneActions({
  sceneEditorPath,
  onAddPreparedScene,
}: {
  sceneEditorPath: string
  onAddPreparedScene: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative shrink-0">
      <Button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="bg-orange-500 text-slate-950 hover:bg-orange-400"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <Plus className="size-4" aria-hidden="true" />
        Add scene
        <ChevronDown className="size-3.5" aria-hidden="true" />
      </Button>
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-60 border-2 border-slate-700 bg-slate-950 p-1 shadow-[5px_5px_0_var(--app-shadow)]"
        >
          <Link
            to={sceneEditorPath}
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-3 text-xs font-bold text-slate-100 transition-colors hover:bg-slate-900"
          >
            <CirclePlus className="size-4 text-orange-400" aria-hidden="true" />
            Create a new scene
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              onAddPreparedScene()
              setIsOpen(false)
            }}
            className="flex w-full items-center gap-3 px-3 py-3 text-left text-xs font-bold text-slate-300 transition-colors hover:bg-slate-900 hover:text-slate-100"
          >
            <Plus className="size-4 text-orange-400" aria-hidden="true" />
            Add prepared scene
          </button>
        </div>
      )}
    </div>
  )
}

function WorkspaceRightRail({ masterScreenPath }: { masterScreenPath: string }) {
  return (
    <aside className="space-y-4">
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" className="text-xs">
          Focus mode
        </Button>
        <Button asChild variant="outline" size="sm" className="text-xs">
          <Link to={masterScreenPath}>
            <Clapperboard className="size-3.5" aria-hidden="true" />
            Start game
          </Link>
        </Button>
      </div>

      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Radio className="size-4 text-orange-400" />
            <h2 className="text-base font-bold text-slate-100">
              Live output
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-5 text-slate-400">
            The GM overlay is currently showing Scene 2. Promote any scene to
            live output without changing timeline order.
          </p>
          <p className="mt-4 text-xs font-bold text-slate-300">
            Live now: Scene 02 / Dockside negotiation
          </p>
          <p className="mt-2 text-xs font-semibold text-slate-500">
            Queued next: Scene 03 / Power failure
          </p>
        </CardContent>
      </Card>

      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ScreenShare className="size-4 text-orange-400" />
            <h2 className="text-base font-bold text-slate-100">
              Director notes
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-5 text-slate-400">
            Keep key reveals, NPC pivots, and timing cues here. This panel stays
            visible while you reorder scenes.
          </p>
        </CardContent>
      </Card>
    </aside>
  )
}

export function WorkspaceTimeline() {
  const { campaignId } = useParams()
  const [scenes, setScenes] = useState(initialScenes)
  const safeCampaignId = campaignId ?? 'demo-campaign'
  const sceneEditorPath = ROUTES.CAMPAIGNWORKSPACE.SCENEEDITOR.replace(
    ':campaignId',
    safeCampaignId,
  )
  const masterScreenPath = ROUTES.ACTIVEGAME.MASTERSCREEN.replace(
    ':gameId',
    safeCampaignId,
  )

  const moveScene = (index: number, direction: -1 | 1) => {
    setScenes((currentScenes) => {
      const nextIndex = index + direction

      if (nextIndex < 0 || nextIndex >= currentScenes.length) {
        return currentScenes
      }

      const nextScenes = [...currentScenes]
      ;[nextScenes[index], nextScenes[nextIndex]] = [
        nextScenes[nextIndex],
        nextScenes[index],
      ]

      return nextScenes
    })
  }

  const addPreparedScene = () => {
    setScenes((currentScenes) => {
      if (currentScenes.some((scene) => scene.number === preparedScene.number)) {
        return currentScenes
      }

      return [...currentScenes, preparedScene]
    })
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col px-4 py-5 sm:px-6 lg:px-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange-400">
            Campaign Workspace / Scene Timeline
          </p>
          <h1 className="mt-7 text-3xl font-bold tracking-normal text-slate-100">
            Scene Timeline
          </h1>
          <p className="mt-2 max-w-150 text-sm leading-5 text-slate-400">
            Reorder beats, keep encounter prep visible, and stage exactly what
            the table needs next.
          </p>
        </div>
        <SceneActions
          sceneEditorPath={sceneEditorPath}
          onAddPreparedScene={addPreparedScene}
        />
      </header>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="space-y-4">
          <Card className="flex min-h-10 items-center justify-between border-slate-800 bg-slate-900/50 px-4 py-3">
            <h2 className="text-base font-bold text-slate-100">
              Next session run order
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              {scenes.length} scenes · 1 break · 2 unresolved hooks
            </p>
          </Card>

          <div className="space-y-4">
            {scenes.map((scene, index) => (
              <SceneCard
                key={scene.number}
                scene={scene}
                index={index}
                total={scenes.length}
                onMove={(direction) => moveScene(index, direction)}
              />
            ))}
          </div>
        </div>

        <WorkspaceRightRail masterScreenPath={masterScreenPath} />
      </div>
    </section>
  )
}
