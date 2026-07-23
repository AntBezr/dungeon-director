import {
  BookOpen,
  ChevronRight,
  Home,
  Skull,
  Sword,
  UsersRound,
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

import { Button } from 'ui/8bit'

import { ROUTES } from '@shared/models/routes'

const navigation = [
  {
    label: 'Overview',
    to: ROUTES.GLOSSARY.BASE,
    end: true,
    icon: BookOpen,
  },
  {
    label: 'Monsters',
    to: ROUTES.GLOSSARY.CREATURES.MONSTERS,
    icon: Skull,
  },
  {
    label: 'NPCs',
    to: ROUTES.GLOSSARY.CREATURES.NPCS,
    icon: UsersRound,
  },
  {
    label: 'Weapons',
    to: ROUTES.GLOSSARY.EQUIPMENT.WEAPONS,
    icon: Sword,
  },
]

export function GlossaryLayout() {
  return (
    <main className="min-h-svh bg-(--app-background) px-3 py-3 text-slate-100 sm:px-6 sm:py-6">
      <div className="min-h-[calc(100svh-24px)] overflow-hidden border-2 border-slate-800 bg-(--app-surface) shadow-[8px_8px_0_var(--app-shadow)] sm:min-h-[calc(100svh-48px)]">
        <header className="border-b border-slate-800 px-5 py-5 sm:px-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 grid size-10 shrink-0 place-items-center border-2 border-orange-400 bg-orange-500 text-slate-950 shadow-[3px_3px_0_var(--app-shadow)]">
                <BookOpen className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-400">
                  Dungeon Director
                </p>
                <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
                  Campaign Glossary
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  Session-ready creatures, contacts, and story hooks.
                </p>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-fit text-xs"
            >
              <NavLink to={ROUTES.HOME}>
                <Home className="size-3.5" aria-hidden="true" />
                Campaigns
              </NavLink>
            </Button>
          </div>

          <nav
            className="mt-6 flex flex-wrap gap-2"
            aria-label="Glossary sections"
          >
            {navigation.map(({ label, to, end, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 border-2 px-3 py-2 text-xs font-bold transition-colors ${
                    isActive
                      ? 'border-orange-500 bg-orange-500 text-slate-950'
                      : 'border-slate-700 bg-slate-900/50 text-slate-300 hover:border-slate-500 hover:bg-slate-900 hover:text-white'
                  }`
                }
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
                <ChevronRight className="size-3" aria-hidden="true" />
              </NavLink>
            ))}
          </nav>
        </header>

        <Outlet />
      </div>
    </main>
  )
}
