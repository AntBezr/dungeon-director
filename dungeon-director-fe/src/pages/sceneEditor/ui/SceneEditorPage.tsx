import { AssetsLibrary } from './AssetsLibrary'
import { SceneCanvas } from './SceneCanvas'
import { SceneEditorFooter } from './SceneEditorFooter'
import { SceneEditorHeader } from './SceneEditorHeader'
import { ScenePropertiesPanel } from './ScenePropertiesPanel'

export function SceneEditorPage() {
  return (
    <main className="mx-auto min-h-190 w-full max-w-290 overflow-hidden border-2 border-slate-800 bg-(--app-surface) shadow-[8px_8px_0_var(--app-shadow)]">
      <SceneEditorHeader />
      <div className="grid min-h-162 lg:grid-cols-[240px_minmax(0,1fr)_254px]">
        <AssetsLibrary />
        <SceneCanvas />
        <ScenePropertiesPanel />
      </div>
      <SceneEditorFooter />
    </main>
  )
}
