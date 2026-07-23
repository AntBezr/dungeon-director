import { Crosshair, Sword } from 'lucide-react'

import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from 'ui/8bit'

import { weapons } from '../data'

export function WeaponsPage() {
  return (
    <section className="px-5 py-7 sm:px-7 sm:py-9">
      <div className="flex flex-col gap-4 border-b-2 border-slate-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-400">Equipment index</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-100 sm:text-3xl">Weapons</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Quick equipment prompts for when the table needs a memorable weapon, a consequence, and a reason to keep it.
          </p>
        </div>
        <Badge variant="outline" className="w-fit text-xs text-slate-300">
          {weapons.length} field-tested items
        </Badge>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {weapons.map((weapon) => (
          <Card key={weapon.name} className="h-full border-slate-800 bg-slate-900/50">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="grid size-10 place-items-center border-2 border-orange-400 bg-orange-500 text-slate-950">
                  <Sword className="size-5" aria-hidden="true" />
                </div>
                <Badge variant="warning" className="text-xs text-slate-950">{weapon.trait}</Badge>
              </div>
              <CardTitle className="mt-5 text-lg text-slate-100">{weapon.name}</CardTitle>
              <CardDescription className="mt-1 text-xs font-bold uppercase tracking-wide text-orange-400">
                {weapon.category}
              </CardDescription>
              <CardDescription className="mt-3 text-sm leading-6 text-slate-400">
                {weapon.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto grid grid-cols-2 gap-3 pb-6">
              <div className="border-2 border-slate-700 bg-slate-950/70 p-3">
                <p className="text-[10px] font-bold uppercase text-slate-500">Damage</p>
                <p className="mt-2 text-lg font-bold text-orange-400">{weapon.damage}</p>
              </div>
              <div className="border-2 border-slate-700 bg-slate-950/70 p-3">
                <p className="flex items-center gap-1 text-[10px] font-bold uppercase text-slate-500">
                  <Crosshair className="size-3" aria-hidden="true" />
                  Range
                </p>
                <p className="mt-2 text-lg font-bold text-orange-400">{weapon.range}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
