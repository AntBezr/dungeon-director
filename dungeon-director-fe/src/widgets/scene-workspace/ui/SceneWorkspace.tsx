import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  ImagePlus,
  Music2,
  Pause,
  Plus,
  Save,
  SlidersHorizontal,
  UsersRound,
  X,
} from 'lucide-react'
import { useRef, useState } from 'react'

import {
  tokenKindLabels,
  type MapView,
  type Scene,
  type SceneMapSettings,
  type SceneToken,
  type SceneTokenKind,
} from '@entities/game'
import { Badge, Button, Input, Label, Textarea } from 'ui'

import { SceneMapCanvas } from './SceneMapCanvas'

type WorkspaceMode = 'preparation' | 'game' | 'players'

interface SceneWorkspaceProps {
  mode: WorkspaceMode
  scene: Scene
  tokens: SceneToken[]
  view: MapView
  isPlayerPreview?: boolean
  musicVolume?: number
  onSceneChange?: (
    update: Pick<Scene, 'title' | 'description' | 'notes' | 'musicLink'>,
  ) => void
  onMapChange?: (map: SceneMapSettings) => void
  onMakeStartView?: () => void
  onTokensChange?: (tokens: SceneToken[], isFinal: boolean) => void
  onViewChange?: (view: MapView, isFinal: boolean) => void
  onMusicVolumeChange?: (value: number) => void
}

function readNumber(value: string, fallback: number) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

function createToken(kind: SceneTokenKind): SceneToken {
  const withHitPoints = kind !== 'hero' && kind !== 'loot'
  return {
    id: `token-${crypto.randomUUID()}`,
    entityId: `runtime-${crypto.randomUUID()}`,
    kind,
    name: tokenKindLabels[kind],
    icon:
      kind === 'enemy'
        ? '⚔️'
        : kind === 'loot'
          ? '🎒'
          : kind === 'ally'
            ? '✦'
            : '👤',
    avatar: null,
    x: null,
    y: null,
    size: 42,
    rotation: 0,
    isVisible: true,
    travelsWithGroup: kind === 'npc',
    ...(withHitPoints
      ? {
          hitPoints: { current: 10, max: 10 },
          stats: { armorClass: 12, initiative: 0 },
        }
      : {}),
  }
}

export function SceneWorkspace({
  mode,
  scene,
  tokens,
  view,
  isPlayerPreview = false,
  musicVolume = 0.7,
  onSceneChange,
  onMapChange,
  onMakeStartView,
  onTokensChange,
  onViewChange,
  onMusicVolumeChange,
}: SceneWorkspaceProps) {
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null)
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true)
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const selectedToken =
    tokens.find((token) => token.id === selectedTokenId) ?? null
  const isPreparation = mode === 'preparation'
  const isPlayerView = mode === 'players' || isPlayerPreview

  function updateTokens(nextTokens: SceneToken[], isFinal = true) {
    onTokensChange?.(nextTokens, isFinal)
  }

  function updateToken(
    tokenId: string,
    update: Partial<SceneToken>,
    isFinal = true,
  ) {
    updateTokens(
      tokens.map((token) =>
        token.id === tokenId ? { ...token, ...update } : token,
      ),
      isFinal,
    )
  }

  function moveToken(
    tokenId: string,
    position: { x: number; y: number },
    isFinal: boolean,
  ) {
    updateToken(tokenId, position, isFinal)
  }

  function updateMap(update: Partial<SceneMapSettings>) {
    onMapChange?.({ ...scene.map, ...update })
  }

  function updateGrid(update: Partial<SceneMapSettings['grid']>) {
    updateMap({ grid: { ...scene.map.grid, ...update } })
  }

  function handleMapImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string')
        updateMap({ backgroundImage: reader.result })
    }
    reader.readAsDataURL(file)
  }

  function handleTokenAvatar(
    tokenId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string')
        updateToken(tokenId, { avatar: reader.result })
    }
    reader.readAsDataURL(file)
  }

  function toggleMusic() {
    if (!scene.musicLink) return
    if (audioRef.current && isMusicPlaying) {
      audioRef.current.pause()
      setIsMusicPlaying(false)
      return
    }

    const audio = new Audio(scene.musicLink)
    audio.volume = musicVolume
    audio.onended = () => setIsMusicPlaying(false)
    audioRef.current = audio
    void audio
      .play()
      .then(() => setIsMusicPlaying(true))
      .catch(() => setIsMusicPlaying(false))
  }

  const unplacedTokens = tokens.filter(
    (token) => token.x === null || token.y === null,
  )

  if (mode === 'players') {
    return (
      <div className="min-h-svh overflow-hidden bg-slate-950">
        <SceneMapCanvas
          map={scene.map}
          tokens={tokens}
          selectedTokenId={null}
          view={view}
          isReadOnly
          hideInvisibleTokens
          onSelectToken={() => undefined}
          onTokenMove={() => undefined}
          onViewChange={() => undefined}
        />
      </div>
    )
  }

  return (
    <div className="grid min-h-[640px] grid-cols-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-xl border border-border bg-card">
      {isLeftPanelOpen ? (
        <aside className="w-60 border-r border-border bg-muted/25">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-semibold">
              {isPreparation ? 'Scene objects' : 'Party and objects'}
            </p>
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              onClick={() => setIsLeftPanelOpen(false)}
              aria-label="Collapse left panel"
            >
              <ChevronLeft className="size-4" />
            </Button>
          </div>
          <div className="space-y-2 p-3">
            <div className="flex flex-wrap gap-1">
              <Button
                type="button"
                size="xs"
                variant="outline"
                onClick={() => updateTokens([...tokens, createToken('npc')])}
              >
                <Plus />
                NPC
              </Button>
              <Button
                type="button"
                size="xs"
                variant="outline"
                onClick={() => updateTokens([...tokens, createToken('enemy')])}
              >
                <Plus />
                Enemy
              </Button>
              <Button
                type="button"
                size="xs"
                variant="outline"
                onClick={() => updateTokens([...tokens, createToken('ally')])}
              >
                <Plus />
                Ally
              </Button>
              <Button
                type="button"
                size="xs"
                variant="outline"
                onClick={() => updateTokens([...tokens, createToken('loot')])}
              >
                <Plus />
                Item
              </Button>
            </div>
            {unplacedTokens.length > 0 && (
              <div className="rounded-lg border border-dashed border-border p-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Place on map
                </p>
                <div className="mt-2 space-y-1">
                  {unplacedTokens.map((token) => (
                    <button
                      key={token.id}
                      type="button"
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent"
                      onClick={() => setSelectedTokenId(token.id)}
                    >
                      <span>{token.icon}</span>
                      <span className="truncate">{token.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <p className="pt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              On map
            </p>
            {tokens
              .filter((token) => token.x !== null && token.y !== null)
              .map((token) => (
                <button
                  key={token.id}
                  type="button"
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm ${selectedTokenId === token.id ? 'bg-accent text-accent-foreground' : 'hover:bg-accent'}`}
                  onClick={() => setSelectedTokenId(token.id)}
                >
                  <span>{token.icon}</span>
                  <span className="min-w-0 flex-1 truncate">{token.name}</span>
                  {!token.isVisible && (
                    <EyeOff className="size-3.5 text-muted-foreground" />
                  )}
                </button>
              ))}
          </div>
        </aside>
      ) : (
        <div className="flex w-10 border-r border-border bg-muted/25 pt-3">
          <Button
            type="button"
            size="icon-xs"
            variant="ghost"
            className="mx-auto"
            onClick={() => setIsLeftPanelOpen(true)}
            aria-label="Expand left panel"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}

      <main className="min-w-0 p-3">
        <SceneMapCanvas
          map={scene.map}
          tokens={tokens}
          selectedTokenId={selectedTokenId}
          view={view}
          isReadOnly={false}
          hideInvisibleTokens={isPlayerView}
          onSelectToken={setSelectedTokenId}
          onTokenMove={moveToken}
          onViewChange={(nextView, isFinal) =>
            onViewChange?.(nextView, isFinal)
          }
        />
      </main>

      {isRightPanelOpen ? (
        <aside className="w-80 overflow-y-auto border-l border-border bg-muted/25">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-semibold">
              {selectedToken
                ? 'Object properties'
                : isPreparation
                  ? 'Scene properties'
                  : 'Game actions'}
            </p>
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              onClick={() => setIsRightPanelOpen(false)}
              aria-label="Collapse right panel"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <div className="space-y-5 p-4">
            {selectedToken ? (
              <TokenProperties
                token={selectedToken}
                isPreparation={isPreparation}
                onChange={updateToken}
                onAvatarUpload={handleTokenAvatar}
                onRemove={() => {
                  updateTokens(
                    tokens.filter((token) => token.id !== selectedToken.id),
                  )
                  setSelectedTokenId(null)
                }}
              />
            ) : isPreparation ? (
              <PreparationProperties
                scene={scene}
                onSceneChange={onSceneChange}
                onMapChange={updateMap}
                onGridChange={updateGrid}
                onMapImage={handleMapImage}
                onMakeStartView={onMakeStartView}
                isMusicPlaying={isMusicPlaying}
                onMusicToggle={toggleMusic}
              />
            ) : (
              <GameProperties
                scene={scene}
                musicVolume={musicVolume}
                isMusicPlaying={isMusicPlaying}
                onMusicToggle={toggleMusic}
                onMusicVolumeChange={onMusicVolumeChange}
              />
            )}
          </div>
        </aside>
      ) : (
        <div className="flex w-10 border-l border-border bg-muted/25 pt-3">
          <Button
            type="button"
            size="icon-xs"
            variant="ghost"
            className="mx-auto"
            onClick={() => setIsRightPanelOpen(true)}
            aria-label="Expand right panel"
          >
            <ChevronLeft className="size-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

function TokenProperties({
  token,
  isPreparation,
  onChange,
  onAvatarUpload,
  onRemove,
}: {
  token: SceneToken
  isPreparation: boolean
  onChange: (tokenId: string, update: Partial<SceneToken>) => void
  onAvatarUpload: (
    tokenId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void
  onRemove: () => void
}) {
  const canHaveHitPoints = token.kind !== 'hero' && token.kind !== 'loot'

  return (
    <div className="space-y-4">
      <Badge variant="secondary">{tokenKindLabels[token.kind]}</Badge>
      <div className="grid gap-2">
        <Label htmlFor="token-name">Name</Label>
        <Input
          id="token-name"
          value={token.name}
          onChange={(event) => onChange(token.id, { name: event.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-2">
          <Label htmlFor="token-icon">Icon</Label>
          <Input
            id="token-icon"
            maxLength={4}
            value={token.icon}
            onChange={(event) =>
              onChange(token.id, { icon: event.target.value })
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="token-avatar">Portrait</Label>
          <Input
            id="token-avatar"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(event) => onAvatarUpload(token.id, event)}
          />
        </div>
      </div>
      {token.avatar && (
        <div className="flex items-center gap-3 rounded-lg border border-border p-2">
          <img
            src={token.avatar}
            alt=""
            className="size-10 rounded-full object-cover"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange(token.id, { avatar: null })}
          >
            Remove portrait
          </Button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-2">
          <Label htmlFor="token-x">X</Label>
          <Input
            id="token-x"
            type="number"
            value={token.x ?? ''}
            onChange={(event) =>
              onChange(token.id, {
                x: event.target.value
                  ? readNumber(event.target.value, 0)
                  : null,
              })
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="token-y">Y</Label>
          <Input
            id="token-y"
            type="number"
            value={token.y ?? ''}
            onChange={(event) =>
              onChange(token.id, {
                y: event.target.value
                  ? readNumber(event.target.value, 0)
                  : null,
              })
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="token-size">Size</Label>
          <Input
            id="token-size"
            type="number"
            value={token.size}
            onChange={(event) =>
              onChange(token.id, {
                size: readNumber(event.target.value, token.size),
              })
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="token-rotation">Rotation</Label>
          <Input
            id="token-rotation"
            type="number"
            value={token.rotation}
            onChange={(event) =>
              onChange(token.id, {
                rotation: readNumber(event.target.value, token.rotation),
              })
            }
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => onChange(token.id, { isVisible: !token.isVisible })}
        >
          {token.isVisible ? (
            <>
              <EyeOff />
              Hide
            </>
          ) : (
            <>
              <Eye />
              Show
            </>
          )}
        </Button>
        {token.kind === 'npc' && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              onChange(token.id, { travelsWithGroup: !token.travelsWithGroup })
            }
          >
            {token.travelsWithGroup ? 'Travels with party' : 'Stays in place'}
          </Button>
        )}
      </div>
      {canHaveHitPoints && token.hitPoints && (
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="token-hp">Current HP</Label>
            <Input
              id="token-hp"
              type="number"
              value={token.hitPoints.current}
              onChange={(event) =>
                onChange(token.id, {
                  hitPoints: {
                    ...token.hitPoints!,
                    current: readNumber(
                      event.target.value,
                      token.hitPoints!.current,
                    ),
                  },
                })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="token-hp-max">Max HP</Label>
            <Input
              id="token-hp-max"
              type="number"
              value={token.hitPoints.max}
              onChange={(event) =>
                onChange(token.id, {
                  hitPoints: {
                    ...token.hitPoints!,
                    max: readNumber(event.target.value, token.hitPoints!.max),
                  },
                })
              }
            />
          </div>
          {isPreparation && token.stats && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="token-ac">AC</Label>
                <Input
                  id="token-ac"
                  type="number"
                  value={token.stats.armorClass}
                  onChange={(event) =>
                    onChange(token.id, {
                      stats: {
                        ...token.stats!,
                        armorClass: readNumber(
                          event.target.value,
                          token.stats!.armorClass,
                        ),
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="token-init">Initiative</Label>
                <Input
                  id="token-init"
                  type="number"
                  value={token.stats.initiative}
                  onChange={(event) =>
                    onChange(token.id, {
                      stats: {
                        ...token.stats!,
                        initiative: readNumber(
                          event.target.value,
                          token.stats!.initiative,
                        ),
                      },
                    })
                  }
                />
              </div>
            </>
          )}
        </div>
      )}
      <Button
        type="button"
        variant="destructive"
        size="sm"
        className="w-full"
        onClick={onRemove}
      >
        <X />
        Remove object
      </Button>
    </div>
  )
}

function PreparationProperties({
  scene,
  onSceneChange,
  onMapChange,
  onGridChange,
  onMapImage,
  onMakeStartView,
  isMusicPlaying,
  onMusicToggle,
}: {
  scene: Scene
  onSceneChange?: (
    update: Pick<Scene, 'title' | 'description' | 'notes' | 'musicLink'>,
  ) => void
  onMapChange: (update: Partial<SceneMapSettings>) => void
  onGridChange: (update: Partial<SceneMapSettings['grid']>) => void
  onMapImage: (event: React.ChangeEvent<HTMLInputElement>) => void
  onMakeStartView?: () => void
  isMusicPlaying: boolean
  onMusicToggle: () => void
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-2">
        <Label htmlFor="scene-name">Title</Label>
        <Input
          id="scene-name"
          value={scene.title}
          onChange={(event) =>
            onSceneChange?.({
              title: event.target.value,
              description: scene.description,
              notes: scene.notes,
              musicLink: scene.musicLink,
            })
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="scene-description">Description</Label>
        <Textarea
          id="scene-description"
          value={scene.description}
          onChange={(event) =>
            onSceneChange?.({
              title: scene.title,
              description: event.target.value,
              notes: scene.notes,
              musicLink: scene.musicLink,
            })
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="scene-notes">Game master notes</Label>
        <Textarea
          id="scene-notes"
          value={scene.notes}
          onChange={(event) =>
            onSceneChange?.({
              title: scene.title,
              description: scene.description,
              notes: event.target.value,
              musicLink: scene.musicLink,
            })
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="scene-music">Music URL</Label>
        <Input
          id="scene-music"
          value={scene.musicLink}
          onChange={(event) =>
            onSceneChange?.({
              title: scene.title,
              description: scene.description,
              notes: scene.notes,
              musicLink: event.target.value,
            })
          }
          placeholder="https://…"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!scene.musicLink}
          onClick={onMusicToggle}
        >
          {isMusicPlaying ? (
            <>
              <Pause />
              Pause
            </>
          ) : (
            <>
              <Music2 />
              Test music
            </>
          )}
        </Button>
      </div>
      <div className="border-t border-border pt-4">
        <p className="text-sm font-medium">Map</p>
        <Label
          htmlFor="map-file"
          className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-input px-3 py-2 text-sm hover:bg-accent"
        >
          <ImagePlus className="size-4" />
          Upload image
        </Label>
        <Input
          id="map-file"
          className="sr-only"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={onMapImage}
        />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="map-rotation">Rotation</Label>
            <Input
              id="map-rotation"
              type="number"
              value={scene.map.rotation}
              onChange={(event) =>
                onMapChange({
                  rotation: readNumber(event.target.value, scene.map.rotation),
                })
              }
            />
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              onClick={onMakeStartView}
            >
              <Save />
              Current view
            </Button>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="grid gap-1">
            <Label htmlFor="start-x">Start X</Label>
            <Input
              id="start-x"
              type="number"
              value={scene.map.startView.x}
              onChange={(event) =>
                onMapChange({
                  startView: {
                    ...scene.map.startView,
                    x: readNumber(event.target.value, scene.map.startView.x),
                  },
                })
              }
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="start-y">Start Y</Label>
            <Input
              id="start-y"
              type="number"
              value={scene.map.startView.y}
              onChange={(event) =>
                onMapChange({
                  startView: {
                    ...scene.map.startView,
                    y: readNumber(event.target.value, scene.map.startView.y),
                  },
                })
              }
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="start-zoom">Start zoom</Label>
            <Input
              id="start-zoom"
              type="number"
              step="0.05"
              value={scene.map.startView.zoom}
              onChange={(event) =>
                onMapChange({
                  startView: {
                    ...scene.map.startView,
                    zoom: readNumber(
                      event.target.value,
                      scene.map.startView.zoom,
                    ),
                  },
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Grid</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              onGridChange({ isEnabled: !scene.map.grid.isEnabled })
            }
          >
            {scene.map.grid.isEnabled ? 'Enabled' : 'Disabled'}
          </Button>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="grid gap-1">
            <Label htmlFor="grid-size">Cell size</Label>
            <Input
              id="grid-size"
              type="number"
              value={scene.map.grid.cellSize}
              onChange={(event) =>
                onGridChange({
                  cellSize: readNumber(
                    event.target.value,
                    scene.map.grid.cellSize,
                  ),
                })
              }
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="grid-x">X</Label>
            <Input
              id="grid-x"
              type="number"
              value={scene.map.grid.offsetX}
              onChange={(event) =>
                onGridChange({
                  offsetX: readNumber(
                    event.target.value,
                    scene.map.grid.offsetX,
                  ),
                })
              }
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="grid-y">Y</Label>
            <Input
              id="grid-y"
              type="number"
              value={scene.map.grid.offsetY}
              onChange={(event) =>
                onGridChange({
                  offsetY: readNumber(
                    event.target.value,
                    scene.map.grid.offsetY,
                  ),
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function GameProperties({
  scene,
  musicVolume,
  isMusicPlaying,
  onMusicToggle,
  onMusicVolumeChange,
}: {
  scene: Scene
  musicVolume: number
  isMusicPlaying: boolean
  onMusicToggle: () => void
  onMusicVolumeChange?: (value: number) => void
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border p-3">
        <div className="flex items-center gap-2">
          <Music2 className="size-4 text-primary" />
          <span className="text-sm font-medium">Music</span>
        </div>
        <p className="mt-2 truncate text-xs text-muted-foreground">
          {scene.musicLink || 'No URL set'}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={!scene.musicLink}
            onClick={onMusicToggle}
          >
            {isMusicPlaying ? (
              <>
                <Pause />
                Pause
              </>
            ) : (
              <>
                <Music2 />
                Play
              </>
            )}
          </Button>
          <Input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={musicVolume}
            onChange={(event) =>
              onMusicVolumeChange?.(readNumber(event.target.value, musicVolume))
            }
            aria-label="Volume"
          />
        </div>
      </div>
      <div className="rounded-lg border border-border p-3 text-sm text-muted-foreground">
        <SlidersHorizontal className="mr-2 inline size-4" />
        Runtime token changes are saved separately from preparation.
      </div>
      <div className="rounded-lg border border-border p-3 text-sm text-muted-foreground">
        <UsersRound className="mr-2 inline size-4" />
        Hidden and unplaced objects are not visible to players.
      </div>
    </div>
  )
}
