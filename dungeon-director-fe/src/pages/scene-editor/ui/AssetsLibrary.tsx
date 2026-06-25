import { Search } from 'lucide-react'

import { Card, CardContent, Input } from '@shared/ui'

const npcAssets = [
  {
    name: 'Bandit Archer x2',
    status: 'Hidden',
    color: 'bg-[#d8cbb4]',
    tone: 'text-slate-500',
  },
  {
    name: 'Merchant Cart',
    status: 'Visible',
    color: 'bg-[#a27b60]',
    tone: 'text-teal-400',
  },
] as const

export function AssetsLibrary() {
  return (
    <aside className="border-b border-slate-800 bg-[#0b0f15] p-4 lg:border-r lg:border-b-0">
      <h2 className="text-lg font-bold text-slate-100">Assets Library</h2>

      <div className="relative mt-4">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
        <Input
          aria-label="Search assets"
          className="h-9  border-slate-800 bg-slate-900 pl-9 text-xs"
          placeholder="Search maps, NPCs, monsters, music"
        />
      </div>

      <section className="mt-5">
        <h3 className="mb-2 text-xs font-bold text-slate-500">Maps</h3>
        <Card className=" bg-slate-900/60">
          <CardContent className="p-2">
            <div className="h-20 bg-[#ede9df]" />
            <p className="mt-2 text-xs font-bold text-slate-300">
              Forest Road · 48×32 grid
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-5">
        <h3 className="mb-2 text-xs font-bold text-slate-500">
          NPCs & Monsters
        </h3>
        <div className="space-y-2">
          {npcAssets.map((asset) => (
            <Card key={asset.name} className=" bg-[#11151c]">
              <CardContent className="flex items-center justify-between gap-3 p-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`size-5 shrink-0 rounded-sm ${asset.color}`}
                  />
                  <p className="truncate text-xs font-bold text-slate-300">
                    {asset.name}
                  </p>
                </div>
                <span className={`text-xs font-bold ${asset.tone}`}>
                  {asset.status}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h3 className="mb-2 text-xs font-bold text-slate-500">Music</h3>
        <Card className=" bg-slate-900/60">
          <CardContent className="p-3">
            <p className="text-xs font-bold text-slate-300">
              Low Strings / Tension Loop
            </p>
          </CardContent>
        </Card>
      </section>
    </aside>
  )
}
