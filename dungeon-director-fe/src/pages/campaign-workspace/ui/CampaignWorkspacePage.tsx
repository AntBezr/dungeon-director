import { WorkspaceSidebar } from './WorkspaceSidebar';
import { WorkspaceTimeline } from './WorkspaceTimeline';

export function CampaignWorkspacePage() {
  return (
    <main className="mx-auto flex min-h-190 w-full overflow-hidden border-2 border-slate-900 bg-[#070a0f] shadow-[8px_8px_0_#020617]">
      <WorkspaceSidebar />
      <WorkspaceTimeline />
    </main>
  )
}
