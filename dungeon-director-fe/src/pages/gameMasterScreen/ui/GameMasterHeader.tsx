import { ArrowLeft, Maximize2, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from 'ui'

interface GameMasterHeaderProps {
  workspacePath: string
  playerScreenPath: string
}

export function GameMasterHeader({
  workspacePath,
  playerScreenPath,
}: GameMasterHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-800 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-normal text-slate-100">
          Ashfall Campaign
        </h1>
        <p className="text-sm font-semibold text-slate-500">
          Session 08 · Bandit Ambush
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline" size="sm">
          <Link to={workspacePath}>
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Timeline
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link to={playerScreenPath} target="_blank" rel="noreferrer">
            Open Player Screen
          </Link>
        </Button>
        <Button size="sm" className="bg-orange-500 text-slate-950 hover:bg-orange-600">
          Save Session
        </Button>
        <Button variant="outline" size="sm">
          End Session
        </Button>
        <Button variant="outline" size="sm">
          <Maximize2 className="size-3.5" />
          Fullscreen
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="size-3.5" />
          Settings
        </Button>
      </div>
    </header>
  )
}
