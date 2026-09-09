import {
  BookOpen,
  ChevronRight,
  Home,
  Skull,
  Sword,
  UsersRound,
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

import { Button } from 'ui'

import { ROUTES } from '@shared/models/routes'

const navigation = [
  { label: 'Overview', to: ROUTES.GLOSSARY.BASE, end: true, icon: BookOpen },
  { label: 'Monsters', to: ROUTES.GLOSSARY.CREATURES.MONSTERS, icon: Skull },
  { label: 'NPCs', to: ROUTES.GLOSSARY.CREATURES.NPCS, icon: UsersRound },
  { label: 'Weapons', to: ROUTES.GLOSSARY.EQUIPMENT.WEAPONS, icon: Sword },
]

export function GlossaryLayout() {
  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto min-h-svh w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="border-b border-border py-8 sm:py-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <BookOpen className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">Dungeon Director</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">Campaign Glossary</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Session-ready creatures, contacts, and story hooks.
                </p>
              </div>
            </div>

            <Button asChild variant="outline" size="sm" className="w-fit">
              <NavLink to={ROUTES.HOME}>
                <Home className="size-4" aria-hidden="true" />
                Campaigns
              </NavLink>
            </Button>
          </div>

          <nav className="mt-7 flex flex-wrap gap-2" aria-label="Glossary sections">
            {navigation.map(({ label, to, end, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'border border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`
                }
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
                <ChevronRight className="size-3.5" aria-hidden="true" />
              </NavLink>
            ))}
          </nav>
        </header>

        <Outlet />
      </div>
    </main>
  )
}
