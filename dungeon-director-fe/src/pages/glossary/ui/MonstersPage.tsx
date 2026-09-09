import { ArrowRight, MapPin, Skull } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from 'ui'

import { monsters } from '../data'

export function MonstersPage() {
  return (
    <section className="px-5 py-7 sm:px-7 sm:py-9">
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Creature index</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Monsters</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Compact encounter notes for creatures that need a role at the table, not just a stat block.
          </p>
        </div>
        <Badge variant="secondary" className="w-fit">
          {monsters.length} ready encounters
        </Badge>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {monsters.map((monster) => (
          <Link
            key={monster.id}
            to={`/glossary/creatures/monsters/${monster.id}`}
            className="block text-inherit no-underline"
          >
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <Skull className="size-5" aria-hidden="true" />
                  </div>
                  <Badge variant="secondary">{monster.challenge}</Badge>
                </div>
                <CardTitle className="mt-5 text-xl">{monster.name}</CardTitle>
                <CardDescription className="mt-1 text-sm font-medium text-primary">
                  {monster.type}
                </CardDescription>
                <CardDescription className="mt-3 text-sm leading-6">
                  {monster.summary}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-wrap items-center justify-between gap-3 pb-6">
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {monster.habitat}
                </span>
                <ArrowRight className="size-4 text-primary" aria-hidden="true" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
