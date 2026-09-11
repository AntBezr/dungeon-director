import { BookOpenText, FolderKanban, Moon, Settings, Sun } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import { Button } from 'ui'

import { useTheme } from '@shared/lib/theme'
import { ROUTES } from '@shared/models/routes'

interface NavigationItem {
  label: string
  to: string
  icon: LucideIcon
  end?: boolean
}

const navigation: NavigationItem[] = [
  { label: 'Campaigns', to: ROUTES.GAMES, icon: FolderKanban },
  { label: 'D&D Compendium', to: ROUTES.COMPENDIUM, icon: BookOpenText },
  { label: 'Profile', to: ROUTES.PROFILE, icon: Settings },
]

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
  const { theme, setTheme } = useTheme()

  return (
    <>
      <header className="border-b border-sidebar-border bg-sidebar px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link
            to={ROUTES.GAMES}
            className="flex items-center gap-2 text-inherit no-underline"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <BookOpenText className="size-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-sidebar-foreground">
              Scenes
            </span>
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={
              theme === 'dark'
                ? 'Switch to light theme'
                : 'Switch to dark theme'
            }
          >
            {theme === 'dark' ? (
              <Sun className="size-4" aria-hidden="true" />
            ) : (
              <Moon className="size-4" aria-hidden="true" />
            )}
          </Button>
        </div>
        <nav className="mt-3 flex gap-2" aria-label="Main navigation">
          {navigation.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`
              }
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="border-b border-sidebar-border p-5">
          <Link
            to={ROUTES.GAMES}
            className="flex items-center gap-3 text-inherit no-underline"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
              <BookOpenText className="size-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-sidebar-foreground">
                Scenes
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                Game master tools
              </span>
            </span>
          </Link>
        </div>

        <nav className="p-3" aria-label="Main navigation">
          <p className="px-2 pb-2 text-xs font-medium text-muted-foreground">
            Workspace
          </p>
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavigationLink key={item.to} {...item} />
            ))}
          </div>
        </nav>

        <div className="mt-auto border-t border-sidebar-border p-4">
          <p className="text-sm font-medium text-sidebar-foreground">
            Demo mode
          </p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Data is stored on this device only.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="mt-4 w-full"
            aria-label={
              theme === 'dark'
                ? 'Switch to light theme'
                : 'Switch to dark theme'
            }
          >
            {theme === 'dark' ? (
              <Sun className="size-4" aria-hidden="true" />
            ) : (
              <Moon className="size-4" aria-hidden="true" />
            )}
            {theme === 'dark' ? 'Light theme' : 'Dark theme'}
          </Button>
        </div>
      </aside>
    </>
  )
}
