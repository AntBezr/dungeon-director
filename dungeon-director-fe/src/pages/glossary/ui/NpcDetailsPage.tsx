import { ArrowLeft, MapPin, ScrollText, UsersRound } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from 'ui'

import { npcs } from '../data'
import { ROUTES } from '@shared/models/routes'

export function NpcDetailsPage() {
  const { npcId } = useParams()
  const npc = npcs.find((entry) => entry.id === npcId)

  if (!npc) {
    return <Navigate to={ROUTES.GLOSSARY.CREATURES.NPCS} replace />
  }

  return (
    <section className="px-5 py-7 sm:px-7 sm:py-9">
      <Button asChild variant="ghost" size="sm" className="-ml-3 text-muted-foreground">
        <Link to={ROUTES.GLOSSARY.CREATURES.NPCS}>
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          All NPCs
        </Link>
      </Button>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{npc.allegiance}</Badge>
              {npc.tags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            <CardTitle className="mt-5 text-3xl">{npc.name}</CardTitle>
            <CardDescription className="mt-2 text-sm font-medium text-primary">{npc.role}</CardDescription>
            <CardDescription className="mt-4 text-sm leading-6">{npc.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-3.5" aria-hidden="true" />
              {npc.location}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UsersRound className="size-4 text-primary" aria-hidden="true" />
              At a glance
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 pb-6">
            {npc.stats.map((stat) => (
              <div key={stat.label} className="rounded-lg bg-muted p-3">
                <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{stat.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <ScrollText className="size-3.5 text-primary" aria-hidden="true" />
          Scene hooks
        </p>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {npc.hooks.map((hook, index) => (
            <Card key={hook}>
              <CardHeader>
                <CardDescription className="text-sm font-medium text-primary">Hook 0{index + 1}</CardDescription>
                <CardTitle className="mt-3 text-sm leading-6">{hook}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
