import { ArrowLeft, MapPin, Shield, Sparkles } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from 'ui'

import { monsters } from '../data'
import { ROUTES } from '@shared/models/routes'

export function MonsterDetailsPage() {
  const { monsterId } = useParams()
  const monster = monsters.find((entry) => entry.id === monsterId)

  if (!monster) {
    return <Navigate to={ROUTES.GLOSSARY.CREATURES.MONSTERS} replace />
  }

  return (
    <section className="px-5 py-7 sm:px-7 sm:py-9">
      <Button asChild variant="ghost" size="sm" className="-ml-3 text-muted-foreground">
        <Link to={ROUTES.GLOSSARY.CREATURES.MONSTERS}>
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          All monsters
        </Link>
      </Button>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{monster.challenge}</Badge>
              {monster.tags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            <CardTitle className="mt-5 text-3xl">{monster.name}</CardTitle>
            <CardDescription className="mt-2 text-sm font-medium text-primary">{monster.type}</CardDescription>
            <CardDescription className="mt-4 text-sm leading-6">{monster.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-3.5" aria-hidden="true" />
              {monster.habitat}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="size-4 text-primary" aria-hidden="true" />
              Quick stats
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 pb-6">
            {monster.stats.map((stat) => (
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
          <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
          Play at the table
        </p>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {monster.traits.map((trait) => (
            <Card key={trait.name}>
              <CardHeader>
                <CardTitle className="text-base">{trait.name}</CardTitle>
                <CardDescription className="mt-3 text-sm leading-6">{trait.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
