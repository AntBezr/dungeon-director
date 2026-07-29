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
    <main className="min-h-svh bg-(--app-background) p-3 font-mono text-slate-100 sm:p-6">
      <section className="mx-auto flex min-h-[calc(100svh-24px)] max-w-375 flex-col overflow-hidden border-2 border-slate-700 bg-(--app-surface) shadow-[8px_8px_0_var(--app-shadow)] sm:min-h-[calc(100svh-48px)]">
        <header className="flex items-center justify-between border-b-2 border-slate-700 px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center border-2 border-orange-400 bg-orange-500 text-slate-950">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-400">
                Live table
              </p>
              <h1 className="mt-1 text-sm font-bold text-slate-100 sm:text-base">
                Ashfall Cartography
              </h1>
            </div>
          </div>
          <p className="text-right text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Session 18
            <span className="mt-1 block text-orange-400">Connected</span>
          </p>
        </header>

        <div className="grid flex-1 lg:grid-cols-[minmax(0,1fr)_280px]">
          <section className="relative min-h-125 overflow-hidden border-b-2 border-slate-700 bg-[#d8d0bf] lg:border-r-2 lg:border-b-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.15)_1px,transparent_1px)] bg-size-[32px_32px]" />
            <div className="absolute top-[15%] left-[11%] h-[24%] w-[29%] bg-[#9cac8e]" />
            <div className="absolute right-[12%] bottom-[18%] h-[25%] w-[27%] bg-[#94a87c]" />
            <div className="absolute top-[43%] left-[4%] h-[15%] w-[94%] rotate-[-20deg] bg-[#bd9e68]" />
            <div className="absolute top-[35%] left-[48%] size-8 border-4 border-orange-500 bg-[#ded0b7] shadow-[3px_3px_0_#5b412e]" />
            <div className="absolute top-[55%] left-[58%] size-7 bg-slate-950 shadow-[3px_3px_0_#5b412e]" />
            <div className="absolute right-5 bottom-5 flex items-center gap-2 border-2 border-slate-950 bg-[#f7f6f2] px-3 py-2 text-xs font-bold text-slate-950">
              <Map className="size-3.5" aria-hidden="true" />
              East road · Grid on
            </div>
          </section>

          <aside className="flex flex-col p-5 sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-400">
              Current scene
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-100">
              Gatehouse Breach
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              A storm shutters the outer gates as the party reaches the old
              watch road. Something is moving beneath the flooded bridge.
            </p>

            <div className="mt-8 border-l-4 border-orange-500 pl-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                Table prompt
              </p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-100">
                Choose a route: force the gate, cross the bridge, or find a
                way through the flooded culvert.
              </p>
            </div>

            <div className="mt-auto pt-10">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <Eye className="size-3.5 text-orange-400" aria-hidden="true" />
                Director channel: {gameId ? 'live' : 'preview'}
              </div>
              <div className="mt-4 space-y-2">
                {party.map(([name, role, state]) => (
                  <div key={name} className="flex items-center justify-between border-2 border-slate-700 bg-slate-900/50 px-3 py-2 text-xs">
                    <span className="font-bold text-slate-100">{name}</span>
                    <span className="text-slate-400">{role}</span>
                    <span className="font-bold text-orange-400">{state}</span>
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
