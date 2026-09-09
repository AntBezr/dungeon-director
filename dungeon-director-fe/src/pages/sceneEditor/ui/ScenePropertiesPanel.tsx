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
    <aside className="bg-muted/50 p-4 sm:p-5">
      <h2 className="text-lg font-semibold text-foreground">Properties</h2>
      <Badge variant="secondary" className="mt-4">
        Draft scene
      </Badge>

      <div className="mt-5 space-y-5">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Scene name</span>
          <Input
            className="mt-2"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">Description</span>
          <Textarea
            className="mt-2 min-h-24"
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">Duration · min</span>
          <Input
            className="mt-2"
            type="number"
            min="1"
            value={approximateDuration}
            onChange={(event) => onDurationChange(Number(event.target.value))}
          />
        </label>

        <div className="border-t border-border pt-5">
          <label className="block">
            <span className="text-sm font-medium text-foreground">Spotify URL</span>
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
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              Paste a public Spotify track, album or playlist link to show the player.
            </p>
          )}
        </div>
      </div>
    </aside>
  )
}
