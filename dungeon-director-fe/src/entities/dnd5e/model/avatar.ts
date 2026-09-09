import type { Dnd5eMonster } from './types'

const avatarBackgrounds = ['#172033', '#1c2638', '#24213b', '#1b2a2d']
const avatarAccents = ['#f59e0b', '#ef4444', '#2dd4bf', '#a78bfa']
const avatarSkinTones = ['#f6c28b', '#d89a68', '#9f5e43', '#6f3a32']

function getSeed(value: string) {
  return Array.from(value).reduce(
    (seed, character) => (seed * 31 + character.charCodeAt(0)) >>> 0,
    0,
  )
}

function getColor(colors: string[], seed: number, offset: number) {
  return colors[(seed + offset) % colors.length] ?? colors[0]
}

function createPixelPortrait(monster: Pick<Dnd5eMonster, 'index' | 'type'>) {
  const seed = getSeed(monster.index)
  const background = getColor(avatarBackgrounds, seed, 0)
  const accent = getColor(avatarAccents, seed, 1)
  const skin = getColor(avatarSkinTones, seed, 2)
  const isHumanoid = monster.type?.toLowerCase() === 'humanoid'
  const face = isHumanoid
    ? `
      <rect x="18" y="14" width="28" height="12" fill="${accent}" />
      <rect x="14" y="24" width="36" height="22" fill="${skin}" />
      <rect x="18" y="46" width="28" height="8" fill="${accent}" />
      <rect x="20" y="30" width="5" height="5" fill="#0f172a" />
      <rect x="39" y="30" width="5" height="5" fill="#0f172a" />
      <rect x="27" y="40" width="10" height="3" fill="#0f172a" />
    `
    : `
      <rect x="14" y="22" width="36" height="28" fill="${accent}" />
      <rect x="18" y="16" width="10" height="8" fill="${accent}" />
      <rect x="36" y="16" width="10" height="8" fill="${accent}" />
      <rect x="20" y="30" width="7" height="7" fill="#f8fafc" />
      <rect x="37" y="30" width="7" height="7" fill="#f8fafc" />
      <rect x="23" y="32" width="3" height="3" fill="#0f172a" />
      <rect x="38" y="32" width="3" height="3" fill="#0f172a" />
      <rect x="26" y="42" width="12" height="4" fill="#0f172a" />
    `
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" shape-rendering="crispEdges">
      <rect width="64" height="64" fill="${background}" />
      <rect x="6" y="6" width="52" height="52" fill="none" stroke="${accent}" stroke-width="4" />
      ${face}
    </svg>
  `

  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export function getDnd5eAvatarUrl(
  monster: Pick<Dnd5eMonster, 'imageUrl' | 'index'>,
) {
  if (monster.imageUrl) {
    return monster.imageUrl
  }

  return createPixelPortrait(monster)
}
