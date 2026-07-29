import { Search } from 'lucide-react'
import { useState } from 'react'

import { Badge, Card, CardContent, Input } from 'ui'

const actors = [
  {
    group: 'Players',
    items: [
      {
        name: 'Merchant',
        hp: '12/12 HP',
        isVisible: true,
        color: 'bg-[#d9c49e]',
        actions: ['Hide', 'Focus', 'Edit HP'],
      },
      {
        name: 'Guard',
        hp: '14/14 HP',
        isVisible: false,
        color: 'bg-[#c6c0af]',
        actions: ['Show', 'Focus', 'Edit HP'],
      },
    ],
  },
  {
    group: 'Monsters',
    items: [
      {
        name: 'Goblin #1',
        hp: '8/8 HP',
        isVisible: false,
        color: 'bg-[#9d7057]',
        actions: ['Show', 'Focus', '-1', '+1', 'Edit'],
      },
      {
        name: 'Goblin Boss',
        hp: '20/20 HP',
        isVisible: true,
        color: 'bg-[#7d6a54]',
        actions: ['Hide', 'Focus', '-5', '+5', 'Edit'],
      },
    ],
  },
]

function ActorCard({
  actor,
  isVisible,
  onVisibilityChange,
}: {
  actor: (typeof actors)[number]['items'][number]
  isVisible: boolean
  onVisibilityChange: () => void
}) {
  return (
    <Card className="bg-slate-900/60">
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <span className={`size-7 shrink-0 rounded-sm ${actor.color}`} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-bold text-slate-200">
                {actor.name}
              </p>
              <p className="shrink-0 text-xs font-semibold text-slate-500">
                {isVisible ? 'Visible' : 'Hidden'} · {actor.hp}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onVisibilityChange}
                className="text-xs font-semibold text-orange-400 hover:text-orange-500"
              >
                {isVisible ? 'Hide' : 'Show'}
              </button>
              <button type="button" className="text-xs font-semibold text-slate-300 hover:text-slate-100">
                Focus
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ActorsSidebar() {
  const [visibility, setVisibility] = useState(() =>
    Object.fromEntries(
      actors.flatMap((group) =>
        group.items.map((actor) => [actor.name, actor.isVisible]),
      ),
    ),
  )

  return (
    <aside className="border-b border-slate-800 bg-slate-950 lg:border-r lg:border-b-0">
      <div className="border-b border-slate-800 p-3">
        <h2 className="text-lg font-bold text-slate-100">Actors</h2>
        <p className="mt-1 text-xs font-medium text-slate-500">
          Reveal, hide, focus, and update HP in 1 click.
        </p>
        <div className="relative mt-3">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
          <Input
            aria-label="Search actors"
            className="h-9  border-slate-800 bg-slate-900 pl-9 text-xs"
            placeholder="Search actors, tags, statuses"
          />
        </div>
      </div>

      <div className="space-y-4 p-3">
        {actors.map((group) => (
          <section key={group.group}>
            <h3 className="mb-2 text-xs font-bold text-slate-500">
              {group.group}
            </h3>
            <div className="space-y-2">
              {group.items.map((actor) => (
                <ActorCard
                  key={actor.name}
                  actor={actor}
                  isVisible={visibility[actor.name]}
                  onVisibilityChange={() =>
                    setVisibility((currentVisibility) => ({
                      ...currentVisibility,
                      [actor.name]: !currentVisibility[actor.name],
                    }))
                  }
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="border-t border-slate-800 bg-slate-900/40 p-3">
        <Badge
          variant="warning"
          className="border-none bg-transparent px-0 py-0 text-[11px] font-bold"
        >
          Combat Active
        </Badge>
        <h2 className="mt-2 text-lg font-bold text-slate-100">Combat Panel</h2>
        <div className="mt-4 space-y-4 text-xs leading-4 text-slate-300">
          <p>
            Active monsters
            <br />
            Goblin Boss · 20/20 HP
            <br />
            Goblin #1 · 8/8 HP
          </p>
          <p>
            Combat notes
            <br />
            Reveal archers after wagon stop.
          </p>
          <p className="text-slate-500">
            No initiative, dice, or automation here. Keep this panel immediate.
          </p>
        </div>
      </section>
    </aside>
  )
}
