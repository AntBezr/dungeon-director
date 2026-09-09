import { useState } from 'react'

import type { SceneMapSettings } from '@entities/campaign/model/types'

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function isCompleteNumber(value: string) {
  return (
    value !== '' &&
    value !== '-' &&
    !value.endsWith('.') &&
    Number.isFinite(Number(value))
  )
}

export interface SceneMapControls {
  rotationInput: string
  zoomInput: string
  gridSizeInput: string
  setRotationInput: (value: string) => void
  setZoomInput: (value: string) => void
  setGridSizeInput: (value: string) => void
  commitRotation: () => void
  commitZoom: () => void
  commitGridSize: () => void
  setRotation: (value: number) => void
  setZoom: (value: number) => void
  setGridSize: (value: number) => void
  toggleGrid: () => void
  reset: () => void
}

export function useSceneMapControls(
  map: SceneMapSettings,
  onMapChange: (map: SceneMapSettings) => void,
): SceneMapControls {
  const [rotationInput, setRotationInputValue] = useState(String(map.rotation))
  const [zoomInput, setZoomInputValue] = useState(String(map.zoom))
  const [gridSizeInput, setGridSizeInputValue] = useState(String(map.grid.size))

  function setRotation(value: number) {
    const rotation = clamp(value, -180, 180)

    setRotationInputValue(String(rotation))
    onMapChange({ ...map, rotation })
  }

  function setZoom(value: number) {
    const zoom = clamp(value, 0.5, 2)

    setZoomInputValue(String(zoom))
    onMapChange({ ...map, zoom })
  }

  function setGridSize(value: number) {
    const size = Math.round(clamp(value, 16, 64))

    setGridSizeInputValue(String(size))
    onMapChange({ ...map, grid: { ...map.grid, size } })
  }

  function commitNumericInput(
    value: string,
    fallback: number,
    updateValue: (nextValue: number) => void,
  ) {
    const nextValue = Number(value)

    updateValue(Number.isFinite(nextValue) ? nextValue : fallback)
  }

  function setRotationInput(value: string) {
    setRotationInputValue(value)

    if (isCompleteNumber(value)) {
      setRotation(Number(value))
    }
  }

  function setZoomInput(value: string) {
    setZoomInputValue(value)

    if (isCompleteNumber(value)) {
      setZoom(Number(value))
    }
  }

  function setGridSizeInput(value: string) {
    setGridSizeInputValue(value)

    if (isCompleteNumber(value)) {
      setGridSize(Number(value))
    }
  }

  return {
    rotationInput,
    zoomInput,
    gridSizeInput,
    setRotationInput,
    setZoomInput,
    setGridSizeInput,
    commitRotation: () =>
      commitNumericInput(rotationInput, map.rotation, setRotation),
    commitZoom: () => commitNumericInput(zoomInput, map.zoom, setZoom),
    commitGridSize: () =>
      commitNumericInput(gridSizeInput, map.grid.size, setGridSize),
    setRotation,
    setZoom,
    setGridSize,
    toggleGrid: () =>
      onMapChange({
        ...map,
        grid: { ...map.grid, enabled: !map.grid.enabled },
      }),
    reset: () => {
      setRotationInputValue('0')
      setZoomInputValue('1')
      setGridSizeInputValue('32')
      onMapChange({
        ...map,
        rotation: 0,
        zoom: 1,
        position: { x: 0, y: 0 },
        grid: { ...map.grid, size: 32 },
      })
    },
  }
}
