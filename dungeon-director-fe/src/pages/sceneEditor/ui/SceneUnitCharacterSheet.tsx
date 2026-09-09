import { ExternalLink, PackagePlus, Trash2 } from 'lucide-react'
import { useState } from 'react'

import {
  getDnd5eAvatarUrl,
  useDnd5eMonster,
  type Dnd5eCatalogEntry,
} from '@entities/dnd5e'
import type { SceneUnit } from '@entities/campaign/model/types'
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from 'ui'
import { Progress } from 'ui/progress'

interface SceneUnitCharacterSheetProps {
  unit: SceneUnit
  equipment: Dnd5eCatalogEntry[]
  onRemove: () => void
  onGiveLoot: (equipmentIndex: string) => void
  onRemoveLoot: (equipmentIndex: string) => void
}

function getChallengeRating(challengeRating: number | undefined) {
  return challengeRating === undefined ? '—' : String(challengeRating)
}

function getSpeed(speed: Record<string, string>) {
  const value = Object.entries(speed)
    .map(([movement, distance]) => `${movement} ${distance}`)
    .join(' · ')

  return value || '—'
}

export function SceneUnitCharacterSheet({
  unit,
  equipment,
  onRemove,
  onGiveLoot,
  onRemoveLoot,
}: SceneUnitCharacterSheetProps) {
  const [selectedEquipmentIndex, setSelectedEquipmentIndex] = useState('')
  const { data: monster, isPending, isError } = useDnd5eMonster(
    unit.character.index,
  )
  const equipmentNames = new Map(
    equipment.map((item) => [item.index, item.name]),
  )

  if (isPending) {
    return (
      <Card className="h-full">
        <CardContent className="p-4 text-sm text-muted-foreground">
          Loading <span className="font-medium text-foreground">{unit.character.index}</span> from the D&amp;D 5e API…
        </CardContent>
      </Card>
    )
  }

  if (isError || !monster) {
    return (
      <Card className="h-full border-destructive/40">
        <CardContent className="flex items-center justify-between gap-3 p-4">
          <p className="text-sm text-muted-foreground">
            Could not load <span className="font-medium text-foreground">{unit.character.index}</span> from the D&amp;D 5e API.
          </p>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="shrink-0 text-destructive hover:text-destructive"
            onClick={onRemove}
            aria-label={`Remove ${unit.character.index}`}
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </Button>
        </CardContent>
      </Card>
    )
  }

  const stats = [
    ['STR', monster.strength],
    ['DEX', monster.dexterity],
    ['CON', monster.constitution],
  ] as const

  return (
    <Card className="h-full gap-4 py-4">
      <CardHeader className="px-4">
        <div className="flex items-start gap-3">
          <img
            src={getDnd5eAvatarUrl(monster)}
            alt=""
            className="size-12 shrink-0 rounded-lg border border-border object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <CardTitle className="truncate text-base">{monster.name}</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  {[monster.size, monster.type].filter(Boolean).join(' · ')}
                </p>
              </div>
              <Badge variant="secondary" className="shrink-0">
                {unit.unitType === 'NPC' ? 'NPC' : 'Monster'}
              </Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {monster.alignment ?? 'Unaligned'} · CR {getChallengeRating(monster.challengeRating)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-4">
        {monster.hitPoints !== undefined && (
          <div>
            <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
              <span>Hit points</span>
              <span>{monster.hitPoints}</span>
            </div>
            <Progress value={100} />
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-md bg-muted px-2 py-2 text-center">
              <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
              <p className="mt-0.5 text-sm font-semibold">{value ?? '—'}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>AC {monster.armorClass ?? '—'} · {getSpeed(monster.speed)}</span>
          <a
            href={monster.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
          >
            D&amp;D 5e API
            <ExternalLink className="size-3" aria-hidden="true" />
          </a>
        </div>

        <div className="border-t border-border pt-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs font-medium">Equipment</p>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              className="text-destructive hover:text-destructive"
              onClick={onRemove}
            >
              <Trash2 className="size-3.5" aria-hidden="true" />
              Remove
            </Button>
          </div>
          {unit.loot.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {unit.loot.map((loot) => (
                <button
                  key={loot.index}
                  type="button"
                  className="rounded-md border border-border bg-muted px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
                  onClick={() => onRemoveLoot(loot.index)}
                  title="Remove equipment"
                >
                  {equipmentNames.get(loot.index) ?? loot.index} ×
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <select
              value={selectedEquipmentIndex}
              onChange={(event) => setSelectedEquipmentIndex(event.target.value)}
              className="h-8 min-w-0 flex-1 rounded-md border border-input bg-background px-2 text-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              aria-label={`Choose equipment for ${monster.name}`}
            >
              <option value="">Give D&amp;D equipment…</option>
              {equipment.map((item) => (
                <option key={item.index} value={item.index}>{item.name}</option>
              ))}
            </select>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              disabled={
                !selectedEquipmentIndex ||
                unit.loot.some((loot) => loot.index === selectedEquipmentIndex)
              }
              onClick={() => {
                onGiveLoot(selectedEquipmentIndex)
                setSelectedEquipmentIndex('')
              }}
              aria-label={`Give equipment to ${monster.name}`}
            >
              <PackagePlus className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
