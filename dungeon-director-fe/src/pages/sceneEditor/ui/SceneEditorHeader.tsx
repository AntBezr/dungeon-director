import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge, Button } from 'ui'

interface SceneEditorHeaderProps {
  workspacePath: string
  editedSceneTitle?: string
}

export function SceneEditorHeader({
  workspacePath,
  editedSceneTitle,
}: SceneEditorHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-border px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {editedSceneTitle ? 'Edit scene' : 'Create scene'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {editedSceneTitle
            ? `Editing: ${editedSceneTitle}`
            : 'Build the scene, place its assets, and save it back to the session timeline.'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge
          variant="default"
          className="h-8 px-3"
        >
          <span className="mr-2 size-2 rounded-full bg-emerald-500" />
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
