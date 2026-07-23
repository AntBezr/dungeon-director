import { ArrowRight, MapPin, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'ui/8bit'

import { npcs } from '../data'

export function NpcsPage() {
  return (
    <section className="px-5 py-7 sm:px-7 sm:py-9">
      <div className="flex flex-col gap-4 border-b-2 border-slate-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-400">
            Contact index
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-100 sm:text-3xl">
            NPCs
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            People with leverage, a point of view, and at least one reason to
            involve the party.
          </p>
        </div>
        <Badge variant="outline" className="w-fit text-xs text-slate-300">
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
            <Card className="h-full bg-slate-900/50 transition-transform hover:-translate-y-1 hover:border-orange-500">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="grid size-10 place-items-center border-2 border-orange-400 bg-orange-500 text-slate-950">
                    <UsersRound className="size-5" aria-hidden="true" />
                  </div>
                  <Badge variant="warning" className="text-xs text-slate-950">
                    {npc.allegiance}
                  </Badge>
                </div>
                <CardTitle className="mt-5 text-xl text-slate-100">
                  {npc.name}
                </CardTitle>
                <CardDescription className="mt-1 text-xs font-bold uppercase tracking-wide text-orange-400">
                  {npc.role}
                </CardDescription>
                <CardDescription className="mt-3 text-sm leading-6 text-slate-400">
                  {npc.summary}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-wrap items-center justify-between gap-3 pb-6">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {npc.location}
                </span>
                <ArrowRight
                  className="size-4 text-orange-400"
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
