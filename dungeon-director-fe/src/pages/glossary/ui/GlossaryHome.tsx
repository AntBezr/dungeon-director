import { ArrowRight, Skull, Sparkles, Sword, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from 'ui/8bit'

import { glossaryHighlights, monsters, npcs, weapons } from '../data'
import { ROUTES } from '@shared/models/routes'

const sections = [
  {
    title: 'Monsters',
    description: 'Threats with a quick stat block, encounter behaviour, and useful loot.',
    count: monsters.length,
    to: ROUTES.GLOSSARY.CREATURES.MONSTERS,
    icon: Skull,
    tone: 'text-orange-400',
  },
  {
    title: 'NPCs',
    description: 'Contacts and rivals with motivations, rewards, and ready-made scene hooks.',
    count: npcs.length,
    to: ROUTES.GLOSSARY.CREATURES.NPCS,
    icon: UsersRound,
    tone: 'text-orange-400',
  },
  {
    title: 'Weapons',
    description: 'Memorable equipment with a fast mechanical hook and a cost worth putting in the fiction.',
    count: weapons.length,
    to: ROUTES.GLOSSARY.EQUIPMENT.WEAPONS,
    icon: Sword,
    tone: 'text-orange-400',
  },
]

export function GlossaryHome() {
  return (
    <section className="px-5 py-7 sm:px-7 sm:py-9">
      <div className="grid gap-5 lg:grid-cols-[1.45fr_0.55fr]">
        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge variant="warning" className="text-xs text-slate-950">
                  TABLE TOOLKIT
                </Badge>
                <CardTitle className="mt-4 text-2xl leading-tight text-slate-100 sm:text-3xl">
                  Keep the useful bits close.
                </CardTitle>
                <CardDescription className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                  A focused reference for improvising scenes without leaving the table. Each entry is static demo content for now and can later move behind an API hook.
                </CardDescription>
              </div>
              <Sparkles className="size-7 shrink-0 text-orange-400" aria-hidden="true" />
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 pb-6 sm:grid-cols-3">
            {glossaryHighlights.map((highlight) => (
              <div key={highlight.label} className="border-2 border-slate-700 bg-slate-950/70 p-4">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  {highlight.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-orange-400">{highlight.value}</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">{highlight.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-base text-slate-100">GM note</CardTitle>
            <CardDescription className="mt-3 text-sm leading-6 text-slate-400">
              Entries favour prompts over scripts: take one trait, one complication, and one reward into a scene.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <p className="border-l-4 border-orange-500 pl-3 text-sm leading-6 text-slate-200">
              “A glossary entry is a springboard, not a cage.”
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Browse entries</p>
        <div className="mt-3 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sections.map(({ title, description, count, to, icon: Icon, tone }) => (
            <Card key={title} className="bg-slate-900/50 transition-transform hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className={`grid size-11 place-items-center border-2 border-slate-700 bg-slate-950 ${tone}`}>
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <Badge variant="outline" className="text-xs text-slate-300">
                    {count} entries
                  </Badge>
                </div>
                <CardTitle className="mt-5 text-xl text-slate-100">{title}</CardTitle>
                <CardDescription className="mt-2 text-sm leading-6 text-slate-400">{description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <Button asChild variant="outline" size="sm" className="text-xs">
                  <Link to={to}>
                    Open {title}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
