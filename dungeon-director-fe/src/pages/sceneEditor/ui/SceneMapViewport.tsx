import { Move, Upload } from 'lucide-react'
import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'

import type { SceneMapSettings } from '@entities/campaign/model/types'

const MAP_POSITION_LIMIT = 100

interface SceneMapViewportProps {
  map: SceneMapSettings
  onMapChange: (map: SceneMapSettings) => void
}

interface DragStart {
  pointerId: number
  clientX: number
  clientY: number
  position: SceneMapSettings['position']
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function SceneMapViewport({
  map,
  onMapChange,
}: SceneMapViewportProps) {
  const [isPanning, setIsPanning] = useState(false)
  const dragStartRef = useRef<DragStart | undefined>(undefined)

  function handleMapUpload(file: File | undefined) {
    if (!file || file.type !== 'image/png') {
      return
    }

    const reader = new FileReader()

    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        onMapChange({ ...map, imageUrl: reader.result })
      }
    })
    reader.readAsDataURL(file)
  }

  function startPanning(event: ReactPointerEvent<HTMLDivElement>) {
    if (!map.imageUrl) {
      return
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    dragStartRef.current = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      position: map.position,
    }
    setIsPanning(true)
  }

  function panMap(event: ReactPointerEvent<HTMLDivElement>) {
    const dragStart = dragStartRef.current

    if (!dragStart || dragStart.pointerId !== event.pointerId) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = clamp(
      dragStart.position.x + ((event.clientX - dragStart.clientX) / rect.width) * 100,
      -MAP_POSITION_LIMIT,
      MAP_POSITION_LIMIT,
    )
    const y = clamp(
      dragStart.position.y + ((event.clientY - dragStart.clientY) / rect.height) * 100,
      -MAP_POSITION_LIMIT,
      MAP_POSITION_LIMIT,
    )

    onMapChange({ ...map, position: { x, y } })
  }

  function stopPanning(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragStartRef.current?.pointerId !== event.pointerId) {
      return
    }

    dragStartRef.current = undefined
    setIsPanning(false)
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return (
    <>
      <div className="mt-4 flex justify-end">
        <label className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 border border-slate-700 bg-slate-900 px-3 text-xs font-bold text-slate-200 transition-colors hover:border-orange-400 hover:text-orange-300">
          <Upload className="size-3.5" aria-hidden="true" />
          Upload PNG
          <input
            type="file"
            accept="image/png"
            className="sr-only"
            onChange={(event) => handleMapUpload(event.target.files?.[0])}
          />
        </label>
      </div>

      <div className="mt-3 overflow-hidden border-2 border-slate-700 bg-slate-950 p-2">
        <div
          className={`relative aspect-4/3 touch-none overflow-hidden bg-[linear-gradient(45deg,#172033_25%,transparent_25%,transparent_75%,#172033_75%),linear-gradient(45deg,#172033_25%,transparent_25%,transparent_75%,#172033_75%)] bg-[size:24px_24px] bg-[position:0_0,12px_12px] ${
            map.imageUrl
              ? isPanning
                ? 'cursor-grabbing'
                : 'cursor-grab'
              : 'cursor-default'
          }`}
          onPointerDown={startPanning}
          onPointerMove={panMap}
          onPointerUp={stopPanning}
          onPointerCancel={stopPanning}
        >
          <div
            className="pointer-events-none absolute -inset-[12%] origin-center transition-transform duration-100"
            style={{
              transform: `translate(${map.position.x}%, ${map.position.y}%) rotate(${map.rotation}deg) scale(${map.zoom})`,
            }}
          >
            {map.imageUrl ? (
              <img
                src={map.imageUrl}
                alt="Scene map"
                className="size-full object-cover"
              />
            ) : (
              <div className="grid size-full place-items-center bg-slate-900/80 p-8 text-center">
                <div>
                  <Upload className="mx-auto size-7 text-orange-400" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-slate-200">
                    Upload a PNG battle map
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Its data URL will be stored in the scene mock on save.
                  </p>
                </div>
              </div>
            )}
            {map.grid.enabled && (
              <div
                className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.3)_1px,transparent_1px)]"
                style={{ backgroundSize: `${map.grid.size}px ${map.grid.size}px` }}
              />
            )}
          </div>
          {map.imageUrl && (
            <div className="pointer-events-none absolute right-2 bottom-2 flex items-center gap-1 bg-slate-950/75 px-2 py-1 text-[10px] font-bold text-slate-300">
              <Move className="size-3 text-orange-400" aria-hidden="true" />
              Drag to pan
            </div>
          )}
        </div>
      </div>
    </>
  )
}
