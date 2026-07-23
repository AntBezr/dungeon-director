import { BookOpen, ChevronDown, Home, LayoutPanelTop, Moon, Radio, ScrollText, Skull, Sun, Sword, UsersRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'

import { Badge, Button } from 'ui/8bit'

import { ROUTES } from '@shared/models/routes'
import { useTheme } from '@shared/lib/theme'

interface NavigationItem {
  label: string
  to: string
  icon: LucideIcon
  end?: boolean
}

function NavigationLink({ label, to, icon: Icon, end }: NavigationItem) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 border-2 px-3 py-2.5 text-xs font-bold transition-colors ${
          isActive
            ? 'border-orange-500 bg-orange-500 text-slate-950'
            : 'border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-900 hover:text-slate-100'
        }`
      }
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </NavLink>
  )
}

export function AppSidebar() {
  const { campaignId } = useParams()
  const { theme, setTheme } = useTheme()
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(true)
  const workspacePath = campaignId
    ? ROUTES.CAMPAIGNWORKSPACE.BASE.replace(':campaignId', campaignId)
    : undefined

  const navigation: NavigationItem[] = [
    { label: 'Campaigns', to: ROUTES.HOME, icon: Home, end: true },
    ...(workspacePath
      ? [{ label: 'Workspace', to: workspacePath, icon: LayoutPanelTop, end: true }]
      : []),
  ]

  const glossaryNavigation: NavigationItem[] = [
    { label: 'Monsters', to: ROUTES.GLOSSARY.CREATURES.MONSTERS, icon: Skull },
    { label: 'NPCs', to: ROUTES.GLOSSARY.CREATURES.NPCS, icon: UsersRound },
    { label: 'Weapons', to: ROUTES.GLOSSARY.EQUIPMENT.WEAPONS, icon: Sword },
  ]

  return (
    <aside className="sticky top-0 hidden h-svh w-60 shrink-0 flex-col overflow-hidden border-r-2 border-slate-800 bg-slate-950/70 lg:flex">
      <div className="border-b-2 border-slate-800 p-5">
        <Link to={ROUTES.HOME} className="flex items-center gap-3 text-inherit no-underline">
          <span className="grid size-9 place-items-center border-2 border-orange-400 bg-orange-500 text-slate-950 shadow-[3px_3px_0_var(--app-shadow)]">
            <LayoutPanelTop className="size-4" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-xs font-bold text-slate-100">Dungeon Director</span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-orange-400">
              Campaign tools
            </span>
          </span>
        </Link>
      </div>

      <nav className="p-3" aria-label="Main navigation">
        <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
          Navigate
        </p>
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavigationLink key={item.label} {...item} />
          ))}
          <div className="pt-1">
            <div className="flex items-stretch">
              <NavLink
                to={ROUTES.GLOSSARY.BASE}
                className={({ isActive }) =>
                  `flex min-w-0 flex-1 items-center gap-3 border-2 border-r-0 px-3 py-2.5 text-xs font-bold transition-colors ${
                    isActive
                      ? 'border-orange-500 bg-orange-500 text-slate-950'
                      : 'border-slate-700 text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                  }`
                }
              >
                <BookOpen className="size-4" aria-hidden="true" />
                Glossary
              </NavLink>
              <button
                type="button"
                aria-label="Toggle glossary navigation"
                aria-expanded={isGlossaryOpen}
                onClick={() => setIsGlossaryOpen((isOpen) => !isOpen)}
                className="grid w-9 place-items-center border-2 border-slate-700 text-slate-400 transition-colors hover:bg-slate-900 hover:text-slate-100"
              >
                <ChevronDown
                  className={`size-4 transition-transform ${isGlossaryOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {isGlossaryOpen && (
              <div className="mt-1 space-y-1 border-l-2 border-slate-800 py-1 pl-3">
                {glossaryNavigation.map(({ label, to, icon: Icon }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 text-[11px] font-bold transition-colors ${
                        isActive
                          ? 'bg-orange-500 text-slate-950'
                          : 'text-slate-500 hover:bg-slate-900 hover:text-slate-100'
                      }`
                    }
                  >
                    <Icon className="size-3.5" aria-hidden="true" />
                    {label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="mt-auto border-t-2 border-slate-800 p-4">
        <Badge variant="warning" className="text-[10px] text-slate-950">
          SESSION 18
        </Badge>
        <p className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-200">
          <Radio className="size-3.5 text-orange-400" aria-hidden="true" />
          Prep mode active
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          Timeline changes are ready to send to the GM screen.
        </p>
        <Button variant="outline" size="sm" className="mt-4 w-full text-xs">
          <ScrollText className="size-3.5" aria-hidden="true" />
          Open session notes
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="mt-3 w-full border-slate-700 bg-slate-900/50 text-xs text-slate-300 hover:bg-slate-900 hover:text-slate-100"
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? (
            <Sun className="size-3.5" aria-hidden="true" />
          ) : (
            <Moon className="size-3.5" aria-hidden="true" />
          )}
          {theme === 'dark' ? 'Light theme' : 'Dark theme'}
        </Button>
      </div>
    </aside>
  )
}
