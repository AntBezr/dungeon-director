import { Button } from 'ui'

export function SceneEditorFooter() {
  return (
    <footer className="flex flex-col gap-3 border-t border-slate-800 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs font-semibold text-slate-500">Last edited 2m ago</p>
      <div className="flex flex-wrap gap-2">
        <Button variant="ghost" size="sm">
          Save Scene
        </Button>
        <Button variant="ghost" size="sm">
          Preview Scene
        </Button>
        <Button variant="ghost" size="sm">
          Duplicate Scene
        </Button>
        <Button variant="ghost" size="sm">
          Activate Scene
        </Button>
      </div>
    </footer>
  )
}
