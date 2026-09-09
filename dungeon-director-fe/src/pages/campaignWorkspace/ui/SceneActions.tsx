import { ChevronDown, CirclePlus, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'ui'

interface SceneActionsProps {
  sceneEditorPath: string
}

export function SceneActions({ sceneEditorPath }: SceneActionsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative shrink-0">
      <Button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <Plus className="size-4" aria-hidden="true" />
        Add scene
        <ChevronDown className="size-3.5" aria-hidden="true" />
      </Button>
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-60 rounded-lg border border-border bg-popover p-1 shadow-lg"
        >
          <Link
            to={sceneEditorPath}
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-popover-foreground transition-colors hover:bg-accent"
          >
            <CirclePlus className="size-4 text-primary" aria-hidden="true" />
            Create a new scene
          </Link>
        </div>
      )}
    </div>
  )
}
