import { Link } from 'react-router-dom'

import { Button } from 'ui'

interface SceneEditorFooterProps {
  workspacePath: string
  onSave: () => void
}

export function SceneEditorFooter({
  workspacePath,
  onSave,
}: SceneEditorFooterProps) {
  return (
    <footer className="flex flex-col gap-3 border-t border-slate-800 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs font-semibold text-slate-500">
        Scene is local until it is connected to the API.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" onClick={onSave}>
          Save Scene
        </Button>
        <Button variant="outline" size="sm">
          Preview Scene
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link to={workspacePath}>Cancel</Link>
        </Button>
      </div>
    </footer>
  )
}
