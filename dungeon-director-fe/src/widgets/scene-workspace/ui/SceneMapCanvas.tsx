import { EyeOff, GripVertical } from 'lucide-react'
import { useRef } from 'react'

import type { MapView, SceneMapSettings, SceneToken } from '@entities/game'

interface Point {
  x: number
  y: number
}

interface SceneMapCanvasProps {
  map: SceneMapSettings
  tokens: SceneToken[]
  selectedTokenId: string | null
  view: MapView
  isReadOnly: boolean
  hideInvisibleTokens: boolean
  onSelectToken: (tokenId: string | null) => void
  onTokenMove: (tokenId: string, position: Point, isFinal: boolean) => void
  onViewChange: (view: MapView, isFinal: boolean) => void
}

const mapWidth = 1200
const mapHeight = 800

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getMapPoint(
  event: React.PointerEvent<HTMLDivElement>,
  view: MapView,
  rotation: number,
): Point {
  const bounds = event.currentTarget.getBoundingClientRect()
  const screenX = event.clientX - bounds.left - bounds.width / 2 - view.x
  const screenY = event.clientY - bounds.top - bounds.height / 2 - view.y
  const radians = (-rotation * Math.PI) / 180
  const rotatedX = screenX * Math.cos(radians) - screenY * Math.sin(radians)
  const rotatedY = screenX * Math.sin(radians) + screenY * Math.cos(radians)

  return {
    x: clamp(rotatedX / view.zoom + mapWidth / 2, 0, mapWidth),
    y: clamp(rotatedY / view.zoom + mapHeight / 2, 0, mapHeight),
  }
}

export function SceneMapCanvas({
  map,
  tokens,
  selectedTokenId,
  view,
  isReadOnly,
  hideInvisibleTokens,
  onSelectToken,
  onTokenMove,
  onViewChange,
}: SceneMapCanvasProps) {
  const dragRef = useRef<{
    tokenId?: string
    startX: number
    startY: number
    view: MapView
  } | null>(null)

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (isReadOnly) return
    onSelectToken(null)
    dragRef.current = { startX: event.clientX, startY: event.clientY, view }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handleTokenPointerDown(
    event: React.PointerEvent<HTMLButtonElement>,
    tokenId: string,
  ) {
    if (isReadOnly) return
    event.stopPropagation()
    onSelectToken(tokenId)
    dragRef.current = {
      tokenId,
      startX: event.clientX,
      startY: event.clientY,
      view,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag || isReadOnly) return

    if (drag.tokenId) {
      onTokenMove(drag.tokenId, getMapPoint(event, view, map.rotation), false)
      return
    }

    onViewChange(
      {
        ...drag.view,
        x: drag.view.x + event.clientX - drag.startX,
        y: drag.view.y + event.clientY - drag.startY,
      },
      false,
    )
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (drag?.tokenId && !isReadOnly) {
      onTokenMove(drag.tokenId, getMapPoint(event, view, map.rotation), true)
    }
    if (drag && !drag.tokenId && !isReadOnly) {
      onViewChange(
        {
          ...drag.view,
          x: drag.view.x + event.clientX - drag.startX,
          y: drag.view.y + event.clientY - drag.startY,
        },
        true,
      )
    }
    dragRef.current = null
  }

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    event.preventDefault()
    const factor = event.deltaY > 0 ? 0.9 : 1.1
    onViewChange({ ...view, zoom: clamp(view.zoom * factor, 0.35, 2.5) }, true)
  }

  const visibleTokens = tokens.filter(
    (token) => !hideInvisibleTokens || token.isVisible,
  )
  const gridStyle = map.grid.isEnabled
    ? {
        backgroundImage:
          'linear-gradient(to right, rgb(255 255 255 / 28%) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 28%) 1px, transparent 1px)',
        backgroundPosition: `${map.grid.offsetX}px ${map.grid.offsetY}px`,
        backgroundSize: `${map.grid.cellSize}px ${map.grid.cellSize}px`,
      }
    : undefined

  return (
    <div
      className="relative min-h-112 overflow-hidden rounded-xl border border-border bg-slate-950 touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      role="application"
      aria-label="Scene map"
    >
      <div
        className="absolute left-1/2 top-1/2 h-[800px] w-[1200px] overflow-hidden shadow-2xl"
        style={{
          transform: `translate(-50%, -50%) translate(${view.x}px, ${view.y}px) scale(${view.zoom}) rotate(${map.rotation}deg)`,
        }}
      >
        {map.backgroundImage ? (
          <img
            src={map.backgroundImage}
            alt="Scene map"
            className="absolute inset-0 h-full w-full select-none object-cover"
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 bg-slate-800" />
        )}
        <div className="absolute inset-0" style={gridStyle} />
        {visibleTokens.map((token) => {
          if (token.x === null || token.y === null) return null
          const isSelected = token.id === selectedTokenId
          const className = `absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 text-base shadow-lg transition-shadow ${
            isSelected
              ? 'border-primary ring-4 ring-primary/30'
              : 'border-background/80'
          } ${token.isVisible ? 'bg-card' : 'bg-card/55 opacity-60'}`
          const style = {
            left: token.x,
            top: token.y,
            width: token.size,
            height: token.size,
            transform: `translate(-50%, -50%) rotate(${token.rotation}deg)`,
          }
          const content = (
            <>
              {token.avatar ? (
                <img
                  src={token.avatar}
                  alt=""
                  className="size-full rounded-full object-cover"
                />
              ) : (
                token.icon
              )}
              {!token.isVisible && (
                <EyeOff
                  className="absolute -right-2 -top-2 size-4 rounded-full bg-card p-0.5 text-muted-foreground"
                  aria-hidden="true"
                />
              )}
            </>
          )

          if (isReadOnly) {
            return (
              <span
                key={token.id}
                className={className}
                style={style}
                aria-label={token.name}
              >
                {content}
              </span>
            )
          }

          return (
            <button
              key={token.id}
              type="button"
              className={className}
              style={style}
              onPointerDown={(event) => handleTokenPointerDown(event, token.id)}
              onClick={(event) => {
                event.stopPropagation()
                onSelectToken(token.id)
              }}
              aria-label={`Select ${token.name}`}
            >
              {content}
            </button>
          )
        })}
      </div>

      {!isReadOnly && (
        <p className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-md bg-background/85 px-2 py-1 text-xs text-muted-foreground">
          <GripVertical className="size-3" aria-hidden="true" />
          Scroll to zoom, drag to pan
        </p>
      )}
    </div>
  )
}
