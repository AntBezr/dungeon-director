export interface GlossaryMonster {
  id: string
  name: string
  type: string
  challenge: string
  habitat: string
  disposition: string
  summary: string
  description: string
  tags: string[]
  traits: Array<{
    name: string
    description: string
  }>
  stats: Array<{
    label: string
    value: string
  }>
}

export interface GlossaryNpc {
  id: string
  name: string
  role: string
  location: string
  allegiance: string
  summary: string
  description: string
  tags: string[]
  hooks: string[]
  stats: Array<{
    label: string
    value: string
  }>
}

export interface GlossaryWeapon {
  name: string
  category: string
  damage: string
  range: string
  trait: string
  description: string
}

export const monsters: GlossaryMonster[] = [
  {
    id: 'ash-crawler',
    name: 'Ash Crawler',
    type: 'Elemental vermin',
    challenge: 'Threat 2',
    habitat: 'Cinder tunnels and old furnaces',
    disposition: 'Hungry, skittish',
    summary: 'A six-legged scavenger that senses heat through the ash.',
    description:
      'Ash crawlers swarm abandoned kilns after dark. Their shell sheds warm grey dust and their pincers leave burns that smoulder long after the creature retreats.',
    tags: ['beast', 'fire', 'swarm'],
    stats: [
      { label: 'Armor', value: '12' },
      { label: 'Vitality', value: '18' },
      { label: 'Speed', value: 'Quick' },
      { label: 'Loot', value: 'Ember gland' },
    ],
    traits: [
      {
        name: 'Heat sense',
        description: 'Tracks living creatures through smoke, walls, and darkness within a short range.',
      },
      {
        name: 'Cinder bite',
        description: 'A target hit twice in one scene must put out a lingering ember before resting.',
      },
    ],
  },
  {
    id: 'mirror-wolf',
    name: 'Mirror Wolf',
    type: 'Fey predator',
    challenge: 'Threat 4',
    habitat: 'Moonlit ruins and still-water groves',
    disposition: 'Territorial, clever',
    summary: 'A silver-coated hunter that steps between nearby reflections.',
    description:
      'A mirror wolf never attacks the strongest prey first. It stalks from a reflected surface, testing a party until someone breaks formation or looks away from the danger.',
    tags: ['fey', 'illusion', 'pack'],
    stats: [
      { label: 'Armor', value: '14' },
      { label: 'Vitality', value: '32' },
      { label: 'Speed', value: 'Swift' },
      { label: 'Loot', value: 'Silver pelt' },
    ],
    traits: [
      {
        name: 'Reflected stride',
        description: 'Moves between two visible reflective surfaces instead of crossing open ground.',
      },
      {
        name: 'Pack memory',
        description: 'Each wolf gains an edge when attacking a target another wolf has already wounded this round.',
      },
    ],
  },
  {
    id: 'rootbound-giant',
    name: 'Rootbound Giant',
    type: 'Ancient guardian',
    challenge: 'Threat 6',
    habitat: 'Forgotten shrines and drowned forests',
    disposition: 'Patient, literal',
    summary: 'A moss-covered sentinel awakened by violence near an old oathstone.',
    description:
      'The giant cannot remember the names of the people it once protected, only the promise it made. Clever travellers can redirect it by presenting a new oath it understands.',
    tags: ['giant', 'nature', 'guardian'],
    stats: [
      { label: 'Armor', value: '15' },
      { label: 'Vitality', value: '74' },
      { label: 'Speed', value: 'Slow' },
      { label: 'Loot', value: 'Oathstone shard' },
    ],
    traits: [
      {
        name: 'Living cover',
        description: 'Allies can shelter behind the giant while it remains rooted in place.',
      },
      {
        name: 'Oathbound',
        description: 'Pauses an attack when shown proof that its original promise is being honoured.',
      },
    ],
  },
  {
    id: 'lantern-wisp',
    name: 'Lantern Wisp',
    type: 'Restless spirit',
    challenge: 'Threat 1',
    habitat: 'Roadside graves and fogbound marshes',
    disposition: 'Lonely, mischievous',
    summary: 'A wandering light carrying the last question of a forgotten traveller.',
    description:
      'Lantern wisps lure the lost, but not always to their doom. Answering a wisp honestly may reveal a shortcut, while lying gives it a new reason to lead the party astray.',
    tags: ['spirit', 'light', 'social'],
    stats: [
      { label: 'Armor', value: '10' },
      { label: 'Vitality', value: '8' },
      { label: 'Speed', value: 'Floating' },
      { label: 'Loot', value: 'Memory flame' },
    ],
    traits: [
      {
        name: 'Flicker away',
        description: 'Cannot be cornered while a flame, lantern, or polished blade remains nearby.',
      },
      {
        name: 'Unanswered question',
        description: 'Offers one cryptic clue to a character who shares a personal truth.',
      },
    ],
  },
]

export const npcs: GlossaryNpc[] = [
  {
    id: 'mara-vale',
    name: 'Mara Vale',
    role: 'Cartographer and relic broker',
    location: 'The Brass Compass, Lower Market',
    allegiance: 'Independent',
    summary: 'A meticulous mapmaker who sells routes others would rather erase.',
    description:
      'Mara keeps her shop organised by expedition, not by geography. Every map is annotated with a favour owed, a warning ignored, or a place that should never be found twice.',
    tags: ['contact', 'urban', 'secrets'],
    stats: [
      { label: 'Influence', value: 'High' },
      { label: 'Risk', value: 'Low' },
      { label: 'Trust', value: 'Cautious' },
      { label: 'Reward', value: 'Rare maps' },
    ],
    hooks: [
      'Her newest map changes every dawn and points toward a sealed city gate.',
      'A rival broker claims Mara sold the same ruin to two different crews.',
      'She needs someone to confirm whether a supposedly empty route is still empty.',
    ],
  },
  {
    id: 'brother-orrin',
    name: 'Brother Orrin',
    role: 'Keeper of the Ember Archive',
    location: 'The Shrine of Last Light',
    allegiance: 'Order of the Last Light',
    summary: 'A gentle archivist whose prayers can wake dormant relics.',
    description:
      'Orrin treats every dangerous artefact as a person in need of a better ending. His kindness is genuine, though it has left him with several enemies among practical treasure hunters.',
    tags: ['scholar', 'faith', 'relics'],
    stats: [
      { label: 'Influence', value: 'Medium' },
      { label: 'Risk', value: 'Medium' },
      { label: 'Trust', value: 'Open' },
      { label: 'Reward', value: 'Sacred lore' },
    ],
    hooks: [
      'A relic in the archive has started answering questions in a dead language.',
      'Orrin asks the party to recover a stolen page without harming the thief.',
      'His order is split over whether a buried weapon should be destroyed or used.',
    ],
  },
  {
    id: 'captain-ren-kestrel',
    name: 'Captain Ren Kestrel',
    role: 'Sky-barge captain',
    location: 'Cloudstep Docks',
    allegiance: 'The Free Captains',
    summary: 'A charming smuggler who never flies the same route twice.',
    description:
      'Ren knows every storm wall around the city and has a different story for each one. He is generous with his crew, ruthless with rival captains, and terrified of open water.',
    tags: ['smuggler', 'travel', 'rival'],
    stats: [
      { label: 'Influence', value: 'Medium' },
      { label: 'Risk', value: 'High' },
      { label: 'Trust', value: 'Earned' },
      { label: 'Reward', value: 'Fast passage' },
    ],
    hooks: [
      'One of Ren’s barges returned without its crew but with a full cargo hold.',
      'A storm has trapped a passenger carrying a bounty that attracts dangerous attention.',
      'Ren needs a trustworthy crew for a route he refuses to explain in port.',
    ],
  },
]

export const weapons: GlossaryWeapon[] = [
  {
    name: 'Stormglass Rapier',
    category: 'Finesse blade',
    damage: '1d8',
    range: 'Melee',
    trait: 'Parry',
    description: 'Its translucent edge hums near charged machinery and turns one clean defence into an opening.',
  },
  {
    name: 'Cindercoil Pistol',
    category: 'Arcane firearm',
    damage: '1d10',
    range: 'Near',
    trait: 'Overheat',
    description: 'A hand cannon that trades reliability for a burst of furnace-hot force after a careful wind-up.',
  },
  {
    name: 'Gravetide Axe',
    category: 'Heavy weapon',
    damage: '1d12',
    range: 'Melee',
    trait: 'Sunder',
    description: 'A shipbreaker axe etched with names of drowned captains; it bites especially deep into shields and doors.',
  },
]

export const glossaryHighlights = [
  {
    label: 'Field notes',
    value: '24',
    description: 'Entries ready to drop into a session.',
  },
  {
    label: 'Active rumours',
    value: '7',
    description: 'Hooks connected to current campaign threads.',
  },
  {
    label: 'Unresolved',
    value: '3',
    description: 'Names waiting for a table decision.',
  },
]
