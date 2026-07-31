import { ChevronDown, CirclePlus, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'ui/8bit'

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
        className="bg-orange-500 text-slate-950 hover:bg-orange-400"
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
          className="absolute right-0 z-20 mt-2 w-60 border-2 border-slate-700 bg-slate-950 p-1 shadow-[5px_5px_0_var(--app-shadow)]"
        >
          <Link
            to={sceneEditorPath}
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-3 text-xs font-bold text-slate-100 transition-colors hover:bg-slate-900"
          >
            <CirclePlus className="size-4 text-orange-400" aria-hidden="true" />
            Create a new scene
          </Link>
        </div>
      )}
    </div>
  )
}
