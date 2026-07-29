import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge, Button } from 'ui'

export function SceneEditorHeader({ workspacePath }: { workspacePath: string }) {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-800 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-normal text-slate-100">
          Create scene
        </h1>
        <p className="text-sm font-semibold text-slate-500">
          Build the scene, place its assets, and save it back to the session timeline.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge
          variant="default"
          className="h-8  border-slate-800 bg-slate-950 px-3"
        >
          <span className="mr-2 size-2 rounded-sm bg-teal-400" />
          Autosave active
        </Badge>
        <Button asChild variant="outline" size="sm">
          <Link to={workspacePath}>
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to timeline
          </Link>
        </Button>
      </div>
    </header>
  )
}
