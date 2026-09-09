import { Link } from 'react-router-dom'

import { Button } from 'ui'

interface SceneEditorFooterProps {
  workspacePath: string
  onSave: () => void
  isSaving: boolean
  canSave: boolean
}

export function SceneEditorFooter({
  workspacePath,
  onSave,
  isSaving,
  canSave,
}: SceneEditorFooterProps) {
  return (
    <footer className="flex flex-col gap-3 border-t border-slate-800 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs font-semibold text-slate-500">
        {canSave
          ? 'Save writes map, grid, Spotify and units into the campaign mock.'
          : 'Choose an existing scene from the timeline to save changes.'}
      </p>
      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" onClick={onSave} disabled={!canSave || isSaving}>
          {isSaving ? 'Saving…' : 'Save Scene'}
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
