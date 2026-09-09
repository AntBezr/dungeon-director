import { Eye, Map, Sparkles } from 'lucide-react'
import { useParams } from 'react-router-dom'

const party = [
  ['Mira', 'Scout', 'Ready'],
  ['Orin', 'Warden', 'Guarding'],
  ['Sable', 'Arcanist', 'Channeling'],
] as const

export function PlayerScreenPage() {
  const { gameId } = useParams()

  return (
    <main className="min-h-svh bg-background p-4 font-sans text-foreground sm:p-6">
      <section className="mx-auto flex min-h-[calc(100svh-32px)] max-w-[1500px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm sm:min-h-[calc(100svh-48px)]">
        <header className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-medium text-primary">
                Live table
              </p>
              <h1 className="mt-1 text-sm font-semibold text-foreground sm:text-base">
                Ashfall Cartography
              </h1>
            </div>
          </div>
          <p className="text-right text-xs font-medium text-muted-foreground">
            Session 18
            <span className="mt-1 block text-emerald-600 dark:text-emerald-400">Connected</span>
          </p>
        </header>

        <div className="grid flex-1 lg:grid-cols-[minmax(0,1fr)_280px]">
          <section className="relative min-h-125 overflow-hidden border-b border-border bg-[#d8d0bf] lg:border-r lg:border-b-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.15)_1px,transparent_1px)] bg-size-[32px_32px]" />
            <div className="absolute top-[15%] left-[11%] h-[24%] w-[29%] bg-[#9cac8e]" />
            <div className="absolute right-[12%] bottom-[18%] h-[25%] w-[27%] bg-[#94a87c]" />
            <div className="absolute top-[43%] left-[4%] h-[15%] w-[94%] rotate-[-20deg] bg-[#bd9e68]" />
            <div className="absolute top-[35%] left-[48%] size-8 rounded-full border-4 border-primary bg-[#ded0b7] shadow-md" />
            <div className="absolute top-[55%] left-[58%] size-7 rounded-full bg-slate-950 shadow-md" />
            <div className="absolute right-5 bottom-5 flex items-center gap-2 rounded-md border border-slate-300 bg-[#f7f6f2] px-3 py-2 text-xs font-medium text-slate-950 shadow-sm">
              <Map className="size-3.5" aria-hidden="true" />
              East road · Grid on
            </div>
          </section>

          <aside className="flex flex-col p-5 sm:p-6">
            <p className="text-xs font-medium text-primary">
              Current scene
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-foreground">
              Gatehouse Breach
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              A storm shutters the outer gates as the party reaches the old
              watch road. Something is moving beneath the flooded bridge.
            </p>

            <div className="mt-8 border-l-4 border-primary pl-4">
              <p className="text-xs font-medium text-muted-foreground">
                Table prompt
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-foreground">
                Choose a route: force the gate, cross the bridge, or find a
                way through the flooded culvert.
              </p>
            </div>

            <div className="mt-auto pt-10">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Eye className="size-3.5 text-primary" aria-hidden="true" />
                Director channel: {gameId ? 'live' : 'preview'}
              </div>
              <div className="mt-4 space-y-2">
                {party.map(([name, role, state]) => (
                  <div key={name} className="flex items-center justify-between rounded-md border border-border bg-muted px-3 py-2 text-xs">
                    <span className="font-medium text-foreground">{name}</span>
                    <span className="text-muted-foreground">{role}</span>
                    <span className="font-medium text-primary">{state}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
