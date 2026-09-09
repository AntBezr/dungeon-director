import { ExternalLink, Skull, UserRound } from 'lucide-react'
import { useState } from 'react'

import {
  dnd5eWebsiteUrl,
  useDnd5eEquipmentIndex,
  useDnd5eMonsterIndex,
  type Dnd5eCatalogEntry,
} from '@entities/dnd5e'
import type { SceneUnit, SceneUnitType } from '@entities/campaign/model/types'
import { Badge, Button, Card, CardContent } from 'ui'

import { SceneUnitCharacterSheet } from './SceneUnitCharacterSheet'

const npcMonsterIndexes = new Set([
  'acolyte',
  'archmage',
  'bandit',
  'commoner',
  'cultist',
  'druid',
  'guard',
  'knight',
  'mage',
  'noble',
  'priest',
  'scout',
  'spy',
  'veteran',
])

interface SceneUnitsPanelProps {
  units: SceneUnit[]
  onAddUnit: (unitType: SceneUnitType, monsterIndex: string) => void
  onRemoveUnit: (unitId: string) => void
  onGiveLoot: (unitId: string, equipmentIndex: string) => void
  onRemoveLoot: (unitId: string, equipmentIndex: string) => void
}

interface UnitPickerProps {
  label: string
  placeholder: string
  icon: typeof UserRound
  options: Dnd5eCatalogEntry[]
  disabled: boolean
  unitType: SceneUnitType
  onAddUnit: (unitType: SceneUnitType, monsterIndex: string) => void
}

function UnitPicker({
  label,
  placeholder,
  icon: Icon,
  options,
  disabled,
  unitType,
  onAddUnit,
}: UnitPickerProps) {
  const [selectedMonsterIndex, setSelectedMonsterIndex] = useState('')

  return (
    <label className="block">
      <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Icon className="size-3.5 text-primary" aria-hidden="true" />
        {label}
      </span>
      <div className="mt-2 flex gap-2">
        <select
          value={selectedMonsterIndex}
          onChange={(event) => setSelectedMonsterIndex(event.target.value)}
          className="h-9 min-w-0 flex-1 rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
          disabled={disabled}
          aria-label={label}
        >
          <option value="">{placeholder}</option>
          {options.map((monster) => (
            <option key={monster.index} value={monster.index}>
              {monster.name}
            </option>
          ))}
        </select>
        <Button
          type="button"
          size="icon"
          className="size-8"
          disabled={disabled || !selectedMonsterIndex}
          onClick={() => {
            onAddUnit(unitType, selectedMonsterIndex)
            setSelectedMonsterIndex('')
          }}
          aria-label={`Add ${label.toLowerCase()}`}
        >
          <Icon className="size-3.5" aria-hidden="true" />
        </Button>
      </div>
    </label>
  )
}

export function SceneUnitsPanel({
  units,
  onAddUnit,
  onRemoveUnit,
  onGiveLoot,
  onRemoveLoot,
}: SceneUnitsPanelProps) {
  const monsterIndexQuery = useDnd5eMonsterIndex()
  const equipmentIndexQuery = useDnd5eEquipmentIndex()
  const monsterEntries = monsterIndexQuery.data ?? []
  const npcEntries = monsterEntries.filter((monster) =>
    npcMonsterIndexes.has(monster.index),
  )
  const creatureEntries = monsterEntries.filter(
    (monster) => !npcMonsterIndexes.has(monster.index),
  )
  const isCatalogUnavailable = monsterIndexQuery.isError || equipmentIndexQuery.isError

  return (
    <section className="border-b border-border px-4 py-6 sm:px-5 sm:py-7">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-foreground">Scene characters</h2>
            <Badge variant="secondary">
              {units.length}
            </Badge>
          </div>
          <p className="mt-2 text-sm leading-5 text-muted-foreground">
            Every stat block is a reference to the D&amp;D 5e API, not a copied snapshot.
          </p>
          <a
            href={dnd5eWebsiteUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Browse source glossary
            <ExternalLink className="size-3" aria-hidden="true" />
          </a>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-2 xl:max-w-150">
          <div className="rounded-lg border border-border bg-card p-3">
            <UnitPicker
              label="Add NPC"
              placeholder={monsterIndexQuery.isPending ? 'Loading stat blocks…' : 'Choose NPC stat block…'}
              icon={UserRound}
              options={npcEntries}
              disabled={monsterIndexQuery.isPending || monsterIndexQuery.isError}
              unitType="NPC"
              onAddUnit={onAddUnit}
            />
          </div>
          <div className="rounded-lg border border-border bg-card p-3">
            <UnitPicker
              label="Add monster"
              placeholder={monsterIndexQuery.isPending ? 'Loading stat blocks…' : 'Choose monster…'}
              icon={Skull}
              options={creatureEntries}
              disabled={monsterIndexQuery.isPending || monsterIndexQuery.isError}
              unitType="MONSTER"
              onAddUnit={onAddUnit}
            />
          </div>
        </div>
      </div>

      {isCatalogUnavailable && (
        <p className="mt-4 text-sm leading-5 text-destructive">
          The D&amp;D 5e API is unavailable. Existing scene references remain intact.
        </p>
      )}

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {units.length === 0 ? (
          <Card className="border-dashed lg:col-span-2">
            <CardContent className="p-4 text-sm leading-5 text-muted-foreground">
              The scene has no characters yet.
            </CardContent>
          </Card>
        ) : (
          units.map((unit) => (
            <SceneUnitCharacterSheet
              key={unit.unitId}
              unit={unit}
              equipment={equipmentIndexQuery.data ?? []}
              onRemove={() => onRemoveUnit(unit.unitId)}
              onGiveLoot={(equipmentIndex) => onGiveLoot(unit.unitId, equipmentIndex)}
              onRemoveLoot={(equipmentIndex) => onRemoveLoot(unit.unitId, equipmentIndex)}
            />
          ))
        )}
      </div>
    </section>
  )
}
