import { ArrowLeft, MapPin, Shield, Sparkles } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from 'ui/8bit'

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
      <Button asChild variant="ghost" size="sm" className="-ml-3 text-xs text-slate-400 hover:text-white">
        <Link to={ROUTES.GLOSSARY.CREATURES.MONSTERS}>
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          All monsters
        </Link>
      </Button>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="warning" className="text-xs text-slate-950">{monster.challenge}</Badge>
              {monster.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs text-slate-300">{tag}</Badge>
              ))}
            </div>
            <CardTitle className="mt-5 text-3xl text-slate-100">{monster.name}</CardTitle>
            <CardDescription className="mt-2 text-sm font-bold text-orange-400">{monster.type}</CardDescription>
            <CardDescription className="mt-4 text-sm leading-6 text-slate-400">{monster.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <p className="inline-flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="size-3.5" aria-hidden="true" />
              {monster.habitat}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-slate-100">
              <Shield className="size-4 text-orange-400" aria-hidden="true" />
              Quick stats
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 pb-6">
            {monster.stats.map((stat) => (
              <div key={stat.label} className="border-2 border-slate-700 bg-slate-950/70 p-3">
                <p className="text-[10px] font-bold uppercase text-slate-500">{stat.label}</p>
                <p className="mt-2 text-lg font-bold text-orange-400">{stat.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
          <Sparkles className="size-3.5 text-orange-400" aria-hidden="true" />
          Play at the table
        </p>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {monster.traits.map((trait) => (
            <Card key={trait.name} className="bg-slate-900/50">
              <CardHeader>
                <CardTitle className="text-base text-slate-100">{trait.name}</CardTitle>
                <CardDescription className="mt-3 text-sm leading-6 text-slate-400">{trait.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
