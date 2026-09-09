import { Grid2X2, RotateCcw } from 'lucide-react'
import type { KeyboardEvent } from 'react'

import type { SceneMapSettings } from '@entities/campaign/model/types'
import type { SceneMapControls as SceneMapControlsState } from '../model/useSceneMapControls'
import { Button } from 'ui/8bit'

interface NumericMapControlProps {
  label: string
  inputValue: string
  rangeValue: number
  min: number
  max: number
  step?: number
  suffix: string
  disabled?: boolean
  ariaLabel: string
  onInputChange: (value: string) => void
  onInputBlur: () => void
  onRangeChange: (value: number) => void
}

function NumericMapControl({
  label,
  inputValue,
  rangeValue,
  min,
  max,
  step,
  suffix,
  disabled = false,
  ariaLabel,
  onInputChange,
  onInputBlur,
  onRangeChange,
}: NumericMapControlProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.currentTarget.blur()
    }
  }

  return (
    <label className="block">
      <span className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
        {label}
        <span className="flex items-center gap-1 text-slate-300 normal-case tracking-normal">
          <input
            type="text"
            inputMode="decimal"
            value={inputValue}
            disabled={disabled}
            onChange={(event) => onInputChange(event.target.value)}
            onBlur={onInputBlur}
            onKeyDown={handleKeyDown}
            className="w-12 border border-slate-700 bg-slate-900 px-1 py-0.5 text-right text-[11px] outline-none focus:border-orange-400 disabled:opacity-40"
            aria-label={ariaLabel}
          />
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={rangeValue}
        disabled={disabled}
        onChange={(event) => onRangeChange(Number(event.target.value))}
        className="mt-2 w-full accent-orange-500 disabled:opacity-40"
      />
    </label>
  )
}

interface SceneMapControlsProps {
  map: SceneMapSettings
  controls: SceneMapControlsState
}

export function SceneMapControls({ map, controls }: SceneMapControlsProps) {
  return (
    <div className="mt-4 grid gap-4 border-t border-slate-800 pt-4 sm:grid-cols-2 2xl:grid-cols-4">
      <NumericMapControl
        label="Rotation"
        inputValue={controls.rotationInput}
        rangeValue={map.rotation}
        min={-180}
        max={180}
        suffix="°"
        ariaLabel="Map rotation in degrees"
        onInputChange={controls.setRotationInput}
        onInputBlur={controls.commitRotation}
        onRangeChange={controls.setRotation}
      />
      <NumericMapControl
        label="Map zoom"
        inputValue={controls.zoomInput}
        rangeValue={map.zoom}
        min={0.5}
        max={2}
        step={0.1}
        suffix="×"
        ariaLabel="Map zoom"
        onInputChange={controls.setZoomInput}
        onInputBlur={controls.commitZoom}
        onRangeChange={controls.setZoom}
      />
      <NumericMapControl
        label="Grid scale"
        inputValue={controls.gridSizeInput}
        rangeValue={map.grid.size}
        min={16}
        max={64}
        step={4}
        suffix="px"
        disabled={!map.grid.enabled}
        ariaLabel="Grid scale in pixels"
        onInputChange={controls.setGridSizeInput}
        onInputBlur={controls.commitGridSize}
        onRangeChange={controls.setGridSize}
      />
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
          Map tools
        </span>
        <div className="mt-2 flex gap-2">
          <Button
            type="button"
            variant={map.grid.enabled ? 'default' : 'outline'}
            size="icon"
            className="size-8"
            onClick={controls.toggleGrid}
            aria-label={map.grid.enabled ? 'Hide grid' : 'Show grid'}
            aria-pressed={map.grid.enabled}
            title={map.grid.enabled ? 'Hide grid' : 'Show grid'}
          >
            <Grid2X2 className="size-3.5" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={controls.reset}
            aria-label="Reset map controls"
            title="Reset map controls"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}
