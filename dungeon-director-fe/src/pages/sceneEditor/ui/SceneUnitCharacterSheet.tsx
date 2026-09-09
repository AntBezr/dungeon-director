import { ExternalLink, PackagePlus, Trash2 } from 'lucide-react'
import { useState } from 'react'

import {
  getDnd5eAvatarUrl,
  useDnd5eMonster,
  type Dnd5eCatalogEntry,
} from '@entities/dnd5e'
import type { SceneUnit } from '@entities/campaign/model/types'
import {
  CharacterSheet,
  type CustomSection,
} from 'ui/8bit/blocks/character-sheet'
import { Button, Card, CardContent } from 'ui/8bit'

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
      <Card className="border-slate-700 bg-slate-900/70">
        <CardContent className="p-4 text-xs leading-5 text-slate-400">
          Loading <span className="font-bold text-slate-200">{unit.character.index}</span>{' '}
          from the D&amp;D 5e API…
        </CardContent>
      </Card>
    )
  }

  if (isError || !monster) {
    return (
      <Card className="border-red-900 bg-slate-900/70">
        <CardContent className="flex items-center justify-between gap-3 p-4">
          <p className="text-xs leading-5 text-slate-400">
            Could not load <span className="font-bold text-slate-200">{unit.character.index}</span>{' '}
            from the D&amp;D 5e API.
          </p>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 text-slate-400 hover:text-red-400"
            onClick={onRemove}
            aria-label={`Remove ${unit.character.index}`}
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
          </Button>
        </CardContent>
      </Card>
    )
  }

  const customSections: CustomSection[] = [
    {
      title: 'Scene kit',
      content: (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">
              {unit.unitType === 'NPC' ? 'NPC stat block' : 'Monster stat block'} ·{' '}
              AC {monster.armorClass ?? '—'} · {getSpeed(monster.speed)}
            </span>
            <a
              href={monster.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-orange-400 hover:text-orange-300"
            >
              D&amp;D 5e API
              <ExternalLink className="size-3" aria-hidden="true" />
            </a>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-slate-400 hover:text-red-400"
            onClick={onRemove}
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
            Remove from scene
          </Button>
          {unit.loot.length === 0 ? (
            <p className="text-xs text-muted-foreground">No equipment assigned.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {unit.loot.map((loot) => (
                <button
                  key={loot.index}
                  type="button"
                  className="border border-orange-500/40 bg-orange-500/10 px-2 py-1 text-[10px] font-bold text-orange-300 hover:border-red-400 hover:text-red-300"
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
              className="min-w-0 flex-1 border border-slate-700 bg-slate-950 px-2 py-1.5 text-[11px] font-semibold text-slate-200 outline-none focus:border-orange-400"
              aria-label={`Choose equipment for ${monster.name}`}
            >
              <option value="">Give D&amp;D equipment…</option>
              {equipment.map((item) => (
                <option key={item.index} value={item.index}>
                  {item.name}
                </option>
              ))}
            </select>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-7"
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
              <PackagePlus className="size-3.5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      ),
    },
  ]

  return (
    <CharacterSheet
      className="h-full min-w-0 border-slate-700 bg-slate-900/70 text-slate-100"
      characterName={monster.name}
      characterClass={[monster.size, monster.type].filter(Boolean).join(' · ')}
      characterTitle={`${monster.alignment ?? 'Unaligned'} · CR ${getChallengeRating(monster.challengeRating)}`}
      avatarSrc={getDnd5eAvatarUrl(monster)}
      avatarFallback={monster.name.slice(0, 2)}
      primaryAttributes={[
        { name: 'Strength', shortName: 'STR', value: monster.strength },
        { name: 'Dexterity', shortName: 'DEX', value: monster.dexterity },
        { name: 'Constitution', shortName: 'CON', value: monster.constitution },
      ]}
      health={
        monster.hitPoints === undefined
          ? undefined
          : { current: monster.hitPoints, max: monster.hitPoints }
      }
      customSections={customSections}
      compact
      showLevel={false}
      showHealth={monster.hitPoints !== undefined}
      showMana={false}
      showExperience={false}
      showSecondaryStats={false}
      showEquipment={false}
    />
  )
}
