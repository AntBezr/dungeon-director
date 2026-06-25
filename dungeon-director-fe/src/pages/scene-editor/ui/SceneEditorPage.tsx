import { AssetsLibrary } from './AssetsLibrary'
import { SceneCanvas } from './SceneCanvas'
import { SceneEditorFooter } from './SceneEditorFooter'
import { SceneEditorHeader } from './SceneEditorHeader'
import { ScenePropertiesPanel } from './ScenePropertiesPanel'

export function SceneEditorPage() {
  return (
    <main className="mx-auto min-h-[760px] w-full max-w-[1160px] overflow-hidden border-2 border-slate-800 bg-[#090c12] shadow-[8px_8px_0_#020617]">
      <SceneEditorHeader />
      <div className="grid min-h-[648px] lg:grid-cols-[240px_minmax(0,1fr)_254px]">
        <AssetsLibrary />
        <SceneCanvas />
        <ScenePropertiesPanel />
      </div>
      <SceneEditorFooter />
    </main>
  )
}
