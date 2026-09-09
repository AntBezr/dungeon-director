import { ArrowRight, Skull, Sparkles, Sword, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from 'ui'

import { glossaryHighlights, monsters, npcs, weapons } from '../data'
import { ROUTES } from '@shared/models/routes'

const sections = [
  {
    title: 'Monsters',
    description: 'Threats with a quick stat block, encounter behaviour, and useful loot.',
    count: monsters.length,
    to: ROUTES.GLOSSARY.CREATURES.MONSTERS,
    icon: Skull,
    tone: 'text-primary',
  },
  {
    title: 'NPCs',
    description: 'Contacts and rivals with motivations, rewards, and ready-made scene hooks.',
    count: npcs.length,
    to: ROUTES.GLOSSARY.CREATURES.NPCS,
    icon: UsersRound,
    tone: 'text-primary',
  },
  {
    title: 'Weapons',
    description: 'Memorable equipment with a fast mechanical hook and a cost worth putting in the fiction.',
    count: weapons.length,
    to: ROUTES.GLOSSARY.EQUIPMENT.WEAPONS,
    icon: Sword,
    tone: 'text-primary',
  },
]

export function GlossaryHome() {
  return (
    <section className="px-5 py-7 sm:px-7 sm:py-9">
      <div className="grid gap-5 lg:grid-cols-[1.45fr_0.55fr]">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge variant="secondary">
                  TABLE TOOLKIT
                </Badge>
                <CardTitle className="mt-4 text-2xl leading-tight sm:text-3xl">
                  Keep the useful bits close.
                </CardTitle>
                <CardDescription className="mt-3 max-w-xl text-sm leading-6">
                  A focused reference for improvising scenes without leaving the table. Each entry is static demo content for now and can later move behind an API hook.
                </CardDescription>
              </div>
              <Sparkles className="size-7 shrink-0 text-primary" aria-hidden="true" />
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 pb-6 sm:grid-cols-3">
            {glossaryHighlights.map((highlight) => (
              <div key={highlight.label} className="rounded-lg bg-muted p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  {highlight.label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-foreground">{highlight.value}</p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{highlight.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">GM note</CardTitle>
            <CardDescription className="mt-3 text-sm leading-6">
              Entries favour prompts over scripts: take one trait, one complication, and one reward into a scene.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <p className="border-l-4 border-primary pl-3 text-sm leading-6 text-foreground">
              “A glossary entry is a springboard, not a cage.”
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <p className="text-sm font-medium text-muted-foreground">Browse entries</p>
        <div className="mt-3 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sections.map(({ title, description, count, to, icon: Icon, tone }) => (
            <Card key={title} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className={`grid size-11 place-items-center rounded-lg bg-muted ${tone}`}>
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <Badge variant="secondary">
                    {count} entries
                  </Badge>
                </div>
                <CardTitle className="mt-5 text-xl">{title}</CardTitle>
                <CardDescription className="mt-2 text-sm leading-6">{description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <Button asChild variant="outline" size="sm">
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
