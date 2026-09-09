import { useState } from 'react'

export function BattleMapPanel() {
  const [isGridVisible, setIsGridVisible] = useState(true)

  return (
    <section className="min-w-0 border-b border-border p-4 lg:border-r lg:border-b-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Battle Map</h2>
          <p className="text-sm text-muted-foreground">
            Combat view · Grid {isGridVisible ? 'on' : 'off'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span>Zoom 125%</span>
          <button type="button" className="hover:text-foreground">
            Pan
          </button>
          <button type="button" className="hover:text-foreground">
            Select Actor
          </button>
          <button
            type="button"
            onClick={() => setIsGridVisible((isVisible) => !isVisible)}
            className="hover:text-foreground"
          >
            Grid Toggle
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="relative aspect-4/3 w-full max-w-152.5 overflow-hidden rounded-lg border border-border bg-[#eee9df] shadow-sm">
          {isGridVisible && <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(15,23,42,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.15)_1px,transparent_1px)] bg-size-[24px_24px]" />}
          <div className="absolute inset-5 bg-[#d8d0bf]" />
          <div className="absolute top-5 left-7 z-10 h-12 w-44 rounded-md bg-white/85 px-4 py-3 text-xs font-medium text-slate-500 shadow-sm">
            Selected Actor
          </div>
          <div className="absolute top-11.25 left-22 z-10 h-23.5 w-34.5 rounded-sm bg-[#9bb084]" />
          <div className="absolute right-17 bottom-14.5 z-10 h-21 w-31.5 rounded-sm bg-[#93a97b]" />
          <div className="absolute top-28 left-8.5 h-19.5 w-130 origin-left rotate-[-20deg] bg-[#bd9e68]" />
          <div className="absolute top-42 left-75.5 h-6 w-24 bg-[#685039]" />
          <span className="absolute top-39 left-78.75 size-5 rounded-full bg-[#ded0b7]" />
          <span className="absolute top-55 left-65 size-5 rounded-full bg-[#ded0b7]" />
          <span className="absolute top-62 left-60.5 size-5 rounded-full bg-black" />
          <span className="absolute top-59 left-52.5 size-8 rounded-full border-4 border-primary" />
          <span className="absolute top-26 right-29 size-5 rounded-full bg-[#8d614d]" />
          <span className="absolute top-31.5 right-23 size-5 rounded-full bg-[#6f6253]" />
        </div>
      </div>
    </section>
  )
}
