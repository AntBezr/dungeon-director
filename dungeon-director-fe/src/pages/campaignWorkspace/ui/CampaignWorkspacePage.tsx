import { WorkspaceTimeline } from './WorkspaceTimeline'

export function CampaignWorkspacePage() {
  return (
    <main className="min-h-svh bg-(--app-background) p-3 text-slate-100 sm:p-6">
      <div className="min-h-[calc(100svh-24px)] overflow-hidden border-2 border-slate-800 bg-(--app-surface) shadow-[8px_8px_0_var(--app-shadow)] sm:min-h-[calc(100svh-48px)]">
        <WorkspaceTimeline />
      </div>
    </main>
  )
}
