import { Crosshair, Sword } from 'lucide-react'

import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from 'ui'

import { weapons } from '../data'

export function WeaponsPage() {
  return (
    <section className="px-5 py-7 sm:px-7 sm:py-9">
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Equipment index</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Weapons</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Quick equipment prompts for when the table needs a memorable weapon, a consequence, and a reason to keep it.
          </p>
        </div>
        <Badge variant="secondary" className="w-fit">
          {weapons.length} field-tested items
        </Badge>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {weapons.map((weapon) => (
          <Card key={weapon.name} className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <Sword className="size-5" aria-hidden="true" />
                </div>
                <Badge variant="secondary">{weapon.trait}</Badge>
              </div>
              <CardTitle className="mt-5 text-lg">{weapon.name}</CardTitle>
              <CardDescription className="mt-1 text-sm font-medium text-primary">
                {weapon.category}
              </CardDescription>
              <CardDescription className="mt-3 text-sm leading-6">
                {weapon.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto grid grid-cols-2 gap-3 pb-6">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs font-medium text-muted-foreground">Damage</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{weapon.damage}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <Crosshair className="size-3" aria-hidden="true" />
                  Range
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">{weapon.range}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
