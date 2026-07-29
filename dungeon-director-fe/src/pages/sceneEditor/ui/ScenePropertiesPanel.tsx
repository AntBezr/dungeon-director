import { Badge, Input, Textarea } from 'ui'

interface ScenePropertiesPanelProps {
  title: string
  description: string
  music: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onMusicChange: (value: string) => void
}

export function ScenePropertiesPanel({
  title,
  description,
  music,
  onTitleChange,
  onDescriptionChange,
  onMusicChange,
}: ScenePropertiesPanelProps) {
  return (
    <aside className="bg-slate-950 p-4">
      <h2 className="text-lg font-bold text-slate-100">Properties</h2>
      <Badge
        variant="warning"
        className="mt-4 border-none bg-orange-500 px-3 py-2 text-slate-950"
      >
        Draft scene
      </Badge>

      <div className="mt-5 space-y-5">
        <label className="block">
          <span className="text-xs font-bold text-slate-500">Scene Name</span>
          <Input
            className="mt-2"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-xs font-bold text-slate-500">Description</span>
          <Textarea
            className="mt-2 min-h-24"
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-xs font-bold text-slate-500">
            Assigned Music
          </span>
          <Input
            className="mt-2"
            value={music}
            onChange={(event) => onMusicChange(event.target.value)}
          />
        </label>
      </div>
    </aside>
  )
}
