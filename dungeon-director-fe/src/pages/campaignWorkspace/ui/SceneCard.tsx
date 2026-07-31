import { ChevronDown, ChevronUp, Pencil, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button, Card, CardContent, CardHeader } from 'ui/8bit'

import type { WorkspaceScene } from './types'

interface SceneCardProps {
  scene: WorkspaceScene
  index: number
  total: number
  editScenePath: string
  startGamePath: string
  onMove?: (direction: -1 | 1) => void
}

export function SceneCard({
  scene,
  index,
  total,
  editScenePath,
  startGamePath,
  onMove,
}: SceneCardProps) {
  return (
    <Card className="border-slate-800 bg-slate-900/50 transition-transform hover:-translate-y-0.5 hover:border-slate-600">
      <CardHeader className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
              Scene {index + 1} of {total}
            </span>
            <h3 className="mt-1 text-lg font-bold tracking-normal text-slate-100">
              {scene.title}
            </h3>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              {scene.approximateDuration} min
            </span>
            <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
              <Link
                to={editScenePath}
                aria-label={`Edit ${scene.title}`}
                title={`Edit ${scene.title}`}
              >
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="size-7"
                >
                  <Pencil className="size-3.5" aria-hidden="true" />
                </Button>
              </Link>

              <Link
                to={startGamePath}
                aria-label={`Start ${scene.title}`}
                title={`Start ${scene.title}`}
              >
                <Button
                  asChild
                  size="icon"
                  className="size-7 bg-orange-500 text-slate-950 hover:bg-orange-400"
                >
                  <Play className="size-3.5" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <p className="text-sm leading-5 text-slate-400">{scene.description}</p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
            Reorder timeline
          </span>
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-6"
              onClick={() => onMove?.(-1)}
              disabled={!onMove || index === 0}
              aria-label={`Move ${scene.title} earlier`}
            >
              <ChevronUp className="size-3.5" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-6"
              onClick={() => onMove?.(1)}
              disabled={!onMove || index === total - 1}
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
