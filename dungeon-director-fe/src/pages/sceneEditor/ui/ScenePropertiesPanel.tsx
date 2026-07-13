import { Badge, Input, Textarea } from 'ui'

export function ScenePropertiesPanel() {
  return (
    <aside className="bg-[#0b0f15] p-4">
      <h2 className="text-lg font-bold text-slate-100">Properties</h2>
      <Badge
        variant="warning"
        className="mt-4  border-none bg-orange-500 px-3 py-2 text-white"
      >
        Scene Selected
      </Badge>

      <div className="mt-5 space-y-5">
        <label className="block">
          <span className="text-xs font-bold text-slate-500">Scene Name</span>
          <Input className="mt-2 " value="Bandit Ambush" readOnly />
        </label>

        <label className="block">
          <span className="text-xs font-bold text-slate-500">Description</span>
          <Textarea
            className="mt-2 min-h-24 "
            value="Ambush triggers when party reaches the bridge. Reveal archers after the lead wagon stops."
            readOnly
          />
        </label>

        <label className="block">
          <span className="text-xs font-bold text-slate-500">
            Assigned Music
          </span>
          <Input
            className="mt-2 "
            value="Low Strings / Tension Loop"
            readOnly
          />
        </label>
      </div>
    </aside>
  )
}
