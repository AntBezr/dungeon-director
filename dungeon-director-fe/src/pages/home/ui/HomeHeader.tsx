import { Search } from 'lucide-react'

import { Input } from 'ui'

interface HomeHeaderProps {
  searchInput: string
  searchInputChange: (value: string) => void
}

export function HomeHeader({
  searchInputChange,
  searchInput,
}: HomeHeaderProps) {
  return (
    <header className="flex min-h-16 items-center justify-between border-b border-border">
      <div className="flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-primary" />
        <span className="text-sm font-semibold text-foreground">
          Dungeon Director
        </span>
      </div>

      <div className="hidden w-full max-w-85 items-center md:flex">
        <div className="relative w-full">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Search"
            className="h-9 pl-9"
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
