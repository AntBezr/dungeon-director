import { RefreshCw, Search } from 'lucide-react'

import { Button, Input } from 'ui/8bit'

export function HomeHeader() {
  return (
    <header className="flex h-10 items-center justify-between border-b border-slate-800 px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <span className="size-3 rounded-sm bg-orange-500" />
        <span className="text-sm font-semibold text-slate-200">
          Dungeon Director
        </span>
      </div>

      <div className="hidden w-full max-w-85 items-center md:flex">
        <div className="relative w-full">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
          <Input
            aria-label="Search"
            className="h-8  pl-9 text-xs"
            placeholder="Jump to campaign, NPC, session note..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="hidden sm:inline-flex">
          <RefreshCw className="size-3.5" />
          Sync all
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <span className="flex size-5 items-center justify-center rounded-sm bg-slate-100 text-[10px] font-bold text-slate-900">
            AD
          </span>
          <span className="hidden sm:inline">Anton</span>
        </Button>
      </div>
    </header>
  )
}
