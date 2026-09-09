import type { SceneMapSettings } from '@entities/campaign/model/types'

import { useSceneMapControls } from '../model/useSceneMapControls'
import { SceneMapControls } from './SceneMapControls'
import { SceneMapViewport } from './SceneMapViewport'

interface SceneCanvasProps {
  sceneName: string
  map: SceneMapSettings
  onMapChange: (map: SceneMapSettings) => void
}

export function SceneCanvas({ sceneName, map, onMapChange }: SceneCanvasProps) {
  const controls = useSceneMapControls(map, onMapChange)

  return (
    <section className="min-w-0 border-b border-slate-800 p-4 sm:p-5 xl:border-r xl:border-b-0">
      <div>
        <h2 className="text-lg font-bold text-slate-100">
          {sceneName || 'Untitled scene'}
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Upload, position and prepare the battle map.
        </p>
      </div>
      <SceneMapViewport map={map} onMapChange={onMapChange} />
      <SceneMapControls map={map} controls={controls} />
    </section>
  )
}
