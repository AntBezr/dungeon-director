import { Button, Card, CardHeader } from 'ui';

const navItems = ['Overview', 'Scene Timeline', 'Assets', 'Session Notes']

export function WorkspaceSidebar() {
  return (
    <aside className="hidden w-49 shrink-0 border-r border-slate-800 bg-[#0a0f16] px-4 py-5 md:block">
      <div className="flex items-center gap-2">
        <span className="size-3 rounded-sm bg-orange-500" />
        <span className="text-sm font-semibold text-slate-200">
          Dungeon Director
        </span>
      </div>

      <Card className="mt-5  bg-slate-950/30">
        <CardHeader className="p-3">
          <p className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">
            Active Campaign
          </p>
          <p className="text-sm font-bold text-slate-100">
            Ashfall Cartography
          </p>
        </CardHeader>
      </Card>

      <nav className="mt-5 space-y-1">
        {navItems.map((item) => (
          <Button
            key={item}
            variant={item === 'Scene Timeline' ? 'secondary' : 'ghost'}
            className="h-9 w-full justify-start px-3 text-xs"
          >
            {item}
          </Button>
        ))}
      </nav>

      <Card className="mt-6  bg-slate-950/20">
        <CardHeader className="p-3">
          <p className="text-xs font-bold text-slate-200">
            Broadcast state clean
          </p>
          <p className="mt-2 text-xs leading-4 text-slate-400">
            No missing assets. Timeline changes are synced to the GM screen.
          </p>
        </CardHeader>
      </Card>
    </aside>
  )
}
