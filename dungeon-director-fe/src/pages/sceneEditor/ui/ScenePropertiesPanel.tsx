import { Badge, Input, Textarea } from 'ui'

interface ScenePropertiesPanelProps {
  title: string
  description: string
  approximateDuration: number
  spotifyUrl: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onDurationChange: (value: number) => void
  onSpotifyUrlChange: (value: string) => void
}

function getSpotifyEmbedUrl(spotifyUrl: string) {
  try {
    const url = new URL(spotifyUrl)
    const [, type, id] = url.pathname.split('/').filter(Boolean)

    if (
      url.hostname === 'open.spotify.com' &&
      ['album', 'playlist', 'track'].includes(type) &&
      id
    ) {
      return `https://open.spotify.com/embed/${type}/${id}`
    }
  } catch {
    return null
  }

  return null
}

export function ScenePropertiesPanel({
  title,
  description,
  approximateDuration,
  spotifyUrl,
  onTitleChange,
  onDescriptionChange,
  onDurationChange,
  onSpotifyUrlChange,
}: ScenePropertiesPanelProps) {
  const spotifyEmbedUrl = getSpotifyEmbedUrl(spotifyUrl)

  return (
    <aside className="bg-slate-950 p-4 sm:p-5">
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
          <span className="text-xs font-bold text-slate-500">Duration · min</span>
          <Input
            className="mt-2"
            type="number"
            min="1"
            value={approximateDuration}
            onChange={(event) => onDurationChange(Number(event.target.value))}
          />
        </label>

        <div className="border-t border-slate-800 pt-5">
          <label className="block">
            <span className="text-xs font-bold text-slate-500">Spotify URL</span>
            <Input
              className="mt-2"
              value={spotifyUrl}
              placeholder="https://open.spotify.com/track/..."
              onChange={(event) => onSpotifyUrlChange(event.target.value)}
            />
          </label>
          {spotifyEmbedUrl ? (
            <iframe
              className="mt-3 h-38 w-full border-0"
              src={spotifyEmbedUrl}
              title="Spotify scene music"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          ) : (
            <p className="mt-3 text-xs leading-5 text-slate-600">
              Paste a public Spotify track, album or playlist link to show the player.
            </p>
          )}
        </div>
      </div>
    </aside>
  )
}
