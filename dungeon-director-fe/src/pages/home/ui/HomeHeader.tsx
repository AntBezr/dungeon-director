import { Search } from 'lucide-react'

import { Input } from 'ui/8bit'

interface HomeHeaderProps {
  searchInput: string
  searchInputChange: (value: string) => void
}

export function HomeHeader({
  searchInputChange,
  searchInput,
}: HomeHeaderProps) {
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
            value={searchInput}
            onChange={(event) => searchInputChange(event.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2"></div>
    </header>
  )
}
