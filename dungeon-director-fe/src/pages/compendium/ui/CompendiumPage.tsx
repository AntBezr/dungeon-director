import {
  BookOpenText,
  Search,
  Shield,
  Skull,
  Sparkles,
  Sword,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import {
  dnd5eResourceLabels,
  useDnd5eCatalog,
  useDnd5eEntry,
  type Dnd5eEntry,
  type Dnd5eResource,
} from '@entities/dnd5e'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from 'ui'

const resources: {
  value: Dnd5eResource
  icon: typeof Skull
  description: string
}[] = [
  {
    value: 'monsters',
    icon: Skull,
    description: 'Creature stats, challenge rating, armor class, and speed.',
  },
  {
    value: 'equipment',
    icon: Sword,
    description: 'Weapons, armor, and useful adventuring gear.',
  },
  {
    value: 'spells',
    icon: Sparkles,
    description: 'Spell level, school, components, and description.',
  },
]

function getResource(value: string | null): Dnd5eResource {
  return value === 'equipment' || value === 'spells' ? value : 'monsters'
}

function DetailPanel({ entry }: { entry: Dnd5eEntry }) {
  if (entry.kind === 'monster') {
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">CR {entry.challengeRating ?? '—'}</Badge>
          <Badge variant="outline">AC {entry.armorClass ?? '—'}</Badge>
          <Badge variant="outline">HP {entry.hitPoints ?? '—'}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {[entry.size, entry.type, entry.alignment]
            .filter(Boolean)
            .join(' · ') || 'No creature details available'}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(entry.abilities).map(([label, value]) => (
            <div key={label} className="rounded-lg bg-muted p-2 text-center">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="mt-1 font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <Details
          title="Speed"
          values={Object.entries(entry.speed).map(
            ([kind, value]) => `${kind}: ${value}`,
          )}
        />
        <Details
          title="Hit dice"
          values={entry.hitDice ? [entry.hitDice] : []}
        />
      </div>
    )
  }

  if (entry.kind === 'equipment') {
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {entry.category && (
            <Badge variant="secondary">{entry.category}</Badge>
          )}
          {entry.weaponCategory && (
            <Badge variant="outline">{entry.weaponCategory}</Badge>
          )}
          {entry.armorCategory && (
            <Badge variant="outline">{entry.armorCategory}</Badge>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Info label="Cost" value={entry.cost} />
          <Info
            label="Weight"
            value={
              entry.weight === undefined ? undefined : `${entry.weight} lb`
            }
          />
          <Info label="Damage" value={entry.damage} />
          <Info label="Armor class" value={entry.armorClass} />
        </div>
        <Details title="Properties" values={entry.properties} />
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">
          {entry.level === 0 ? 'Cantrip' : `Level ${entry.level}`}
        </Badge>
        {entry.school && <Badge variant="outline">{entry.school}</Badge>}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Info label="Casting time" value={entry.castingTime} />
        <Info label="Range" value={entry.range} />
        <Info label="Components" value={entry.components.join(', ')} />
        <Info label="Duration" value={entry.duration} />
      </div>
      <Details title="Description" values={entry.description} />
    </div>
  )
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium">{value || 'Not specified'}</p>
    </div>
  )
}

function Details({ title, values }: { title: string; values: string[] }) {
  if (values.length === 0) return null
  return (
    <div>
      <p className="text-sm font-medium">{title}</p>
      <div className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
        {values.map((value, index) => (
          <p key={`${title}-${index}`}>{value}</p>
        ))}
      </div>
    </div>
  )
}

export function CompendiumPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const resource = getResource(searchParams.get('tab'))
  const selectedIndex = searchParams.get('entry')
  const catalogQuery = useDnd5eCatalog(resource)
  const entryQuery = useDnd5eEntry(resource, selectedIndex)
  const search = searchParams.get('search') ?? ''
  const visibleEntries =
    catalogQuery.data
      ?.filter((entry) =>
        entry.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      )
      .slice(0, 80) ?? []

  function updateParams(update: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams)
    Object.entries(update).forEach(([key, value]) =>
      value ? next.set(key, value) : next.delete(key),
    )
    setSearchParams(next)
  }

  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="border-b border-border pb-7">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
              <BookOpenText className="size-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-primary">D&D 5e</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                Game Master Compendium
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Search the bestiary, equipment, and spells while you prepare.
                The catalog and search experience is inspired by dnd.su; data
                comes from the public D&D 5e API.
              </p>
            </div>
          </div>
        </header>
        <div className="mt-6 grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)_minmax(300px,0.8fr)]">
          <aside className="space-y-2">
            {resources.map(({ value, icon: Icon, description }) => (
              <Button
                key={value}
                type="button"
                variant={resource === value ? 'default' : 'outline'}
                className="h-auto w-full justify-start px-3 py-3 text-left"
                onClick={() =>
                  updateParams({ tab: value, entry: null, search: null })
                }
              >
                <Icon className="mt-0.5 size-4 shrink-0" />
                <span>
                  <span className="block">{dnd5eResourceLabels[value]}</span>
                  <span className="mt-1 block text-xs font-normal opacity-70">
                    {description}
                  </span>
                </span>
              </Button>
            ))}
          </aside>
          <section>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) =>
                  updateParams({ search: event.target.value, entry: null })
                }
                className="pl-9"
                placeholder={`Search ${dnd5eResourceLabels[resource]}`}
                aria-label={`Search ${dnd5eResourceLabels[resource]}`}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {catalogQuery.data
                  ? `${catalogQuery.data.length} entries`
                  : 'Loading catalog…'}
              </span>
              {search && <span>Showing: {visibleEntries.length}</span>}
            </div>
            {catalogQuery.isError && (
              <Card className="mt-4 border-destructive/40">
                <CardContent className="py-5">
                  <p className="text-sm text-destructive">
                    Could not load the compendium.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => {
                      void catalogQuery.refetch()
                    }}
                  >
                    Retry
                  </Button>
                </CardContent>
              </Card>
            )}
            <div
              key={`${resource}-${search}`}
              className="mt-3 max-h-[calc(100svh-290px)] space-y-1 overflow-y-auto rounded-xl border border-border p-2"
            >
              {visibleEntries.map((entry) => (
                <button
                  key={entry.index}
                  type="button"
                  onClick={() => updateParams({ entry: entry.index })}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${entry.index === selectedIndex ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                >
                  <span className="truncate font-medium">{entry.name}</span>
                  <span className="shrink-0 text-xs opacity-70">
                    {entry.index}
                  </span>
                </button>
              ))}
              {catalogQuery.data && visibleEntries.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No entries found.
                </p>
              )}
            </div>
          </section>
          <aside>
            <Card className="sticky top-5">
              <CardHeader>
                <CardTitle className="text-lg">
                  {entryQuery.data?.name ??
                    `${dnd5eResourceLabels[resource]} entry`}
                </CardTitle>
                <CardDescription>
                  {selectedIndex
                    ? 'D&D 5e API data'
                    : 'Choose an entry to view its details.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedIndex && entryQuery.isPending && (
                  <p className="text-sm text-muted-foreground">
                    Loading entry…
                  </p>
                )}
                {selectedIndex && entryQuery.isError && (
                  <p className="text-sm text-destructive">
                    Could not load the entry.
                  </p>
                )}
                {entryQuery.data && <DetailPanel entry={entryQuery.data} />}
                {!selectedIndex && (
                  <div className="rounded-lg border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
                    <Shield className="mx-auto size-5 text-primary" />{' '}
                    <p className="mt-2">Choose a creature, item, or spell.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  )
}
