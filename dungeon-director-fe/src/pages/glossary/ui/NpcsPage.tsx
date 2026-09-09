import { ArrowRight, MapPin, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'ui'

import { npcs } from '../data'

export function NpcsPage() {
  return (
    <section className="px-5 py-7 sm:px-7 sm:py-9">
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">
            Contact index
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            NPCs
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            People with leverage, a point of view, and at least one reason to
            involve the party.
          </p>
        </div>
        <Badge variant="secondary" className="w-fit">
          {npcs.length} active contacts
        </Badge>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {npcs.map((npc) => (
          <Link
            key={npc.id}
            to={`/glossary/creatures/npcs/${npc.id}`}
            className="block text-inherit no-underline"
          >
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <UsersRound className="size-5" aria-hidden="true" />
                  </div>
                  <Badge variant="secondary">
                    {npc.allegiance}
                  </Badge>
                </div>
                <CardTitle className="mt-5 text-xl">
                  {npc.name}
                </CardTitle>
                <CardDescription className="mt-1 text-sm font-medium text-primary">
                  {npc.role}
                </CardDescription>
                <CardDescription className="mt-3 text-sm leading-6">
                  {npc.summary}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-wrap items-center justify-between gap-3 pb-6">
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {npc.location}
                </span>
                <ArrowRight
                  className="size-4 text-primary"
                  aria-hidden="true"
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
