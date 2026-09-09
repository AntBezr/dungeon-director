import {
  BookOpen,
  ChevronDown,
  Clapperboard,
  Home,
  LayoutPanelTop,
  Moon,
  Radio,
  ScrollText,
  Skull,
  Sun,
  Sword,
  UsersRound,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'

import { Badge, Button } from 'ui'

import { useTheme } from '@shared/lib/theme'
import { ROUTES } from '@shared/models/routes'

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
        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
        }`
      }
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </NavLink>
  )
}

export function AppSidebar() {
  const { campaignId, gameId } = useParams()
  const { theme, setTheme } = useTheme()
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(true)
  const activeCampaignId = campaignId ?? gameId
  const workspacePath = activeCampaignId
    ? ROUTES.CAMPAIGNWORKSPACE.BASE.replace(':campaignId', activeCampaignId)
    : undefined
  const masterScreenPath = gameId
    ? ROUTES.ACTIVEGAME.MASTERSCREEN.replace(':gameId', gameId)
    : undefined

  const navigation: NavigationItem[] = [
    { label: 'Campaigns', to: ROUTES.HOME, icon: Home, end: true },
    ...(workspacePath
      ? [{ label: 'Workspace', to: workspacePath, icon: LayoutPanelTop, end: true }]
      : []),
    ...(masterScreenPath
      ? [{ label: 'Live session', to: masterScreenPath, icon: Clapperboard, end: true }]
      : []),
  ]

  const glossaryNavigation: NavigationItem[] = [
    { label: 'Monsters', to: ROUTES.GLOSSARY.CREATURES.MONSTERS, icon: Skull },
    { label: 'NPCs', to: ROUTES.GLOSSARY.CREATURES.NPCS, icon: UsersRound },
    { label: 'Weapons', to: ROUTES.GLOSSARY.EQUIPMENT.WEAPONS, icon: Sword },
  ]

  return (
    <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="border-b border-sidebar-border p-5">
        <Link to={ROUTES.HOME} className="flex items-center gap-3 text-inherit no-underline">
          <span className="grid size-9 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
            <LayoutPanelTop className="size-4" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-sidebar-foreground">Dungeon Director</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">Campaign tools</span>
          </span>
        </Link>
      </div>

      <nav className="p-3" aria-label="Main navigation">
        <p className="px-2 pb-2 text-xs font-medium text-muted-foreground">Navigate</p>
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavigationLink key={item.label} {...item} />
          ))}
          <div className="pt-1">
            <div className="flex items-center">
              <NavLink
                to={ROUTES.GLOSSARY.BASE}
                className={({ isActive }) =>
                  `flex min-w-0 flex-1 items-center gap-3 rounded-l-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
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
                className="grid size-9 place-items-center rounded-r-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <ChevronDown
                  className={`size-4 transition-transform ${isGlossaryOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {isGlossaryOpen && (
              <div className="mt-1 space-y-1 border-l border-sidebar-border py-1 pl-3">
                {glossaryNavigation.map(({ label, to, icon: Icon }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
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

      <div className="mt-auto border-t border-sidebar-border p-4">
        <Badge variant="secondary" className="w-fit">Session 18</Badge>
        <p className="mt-4 flex items-center gap-2 text-sm font-medium text-sidebar-foreground">
          <Radio className="size-3.5 text-primary" aria-hidden="true" />
          Prep mode active
        </p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Timeline changes are ready to send to the GM screen.
        </p>
        <Button variant="outline" size="sm" className="mt-4 w-full">
          <ScrollText className="size-3.5" aria-hidden="true" />
          Open session notes
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="mt-3 w-full"
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
