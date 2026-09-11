# Scenes

Frontend for preparing in-person D&D sessions: campaigns, sessions, session plans, and a scene library.

## Scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

## Architecture

Source code lives in `src` and is split into lightweight FSD layers:

```text
src/
  app/       app setup, router, providers, global styles
  pages/     route-level screens
  widgets/   large page sections
  features/  user actions and business flows
  entities/  domain models and domain-owned UI
  shared/    reusable UI, utilities, assets, config, API clients
```

Path aliases are configured in `vite.config.ts` and `tsconfig.app.json`:

```ts
import { HomePage } from '@pages/home'
import { cn } from '@shared/lib'
```

See `src/README.md` for the project rules and examples.

## Styling

Components are styled with Tailwind utility classes. The only CSS file is `src/app/styles/index.css`, which imports Tailwind.

## Demo data and server layer

TanStack Query is configured once in `src/main.tsx` with the shared client from
`src/shared/api/query-client.ts`. Put a request function and its `useQuery` /
`useMutation` hooks in the relevant entity's `api/` directory.

Until Django is connected, the project uses the typed asynchronous adapter at
`src/entities/game/api/demo-game-adapter.ts`. It stores the demo campaign in
`localStorage`, while components use only the hooks in
`src/entities/game/api/hooks.ts`. The adapter can be replaced with a backend
implementation without changing the hook contract.

Map, grid, and tokens are intentionally not implemented yet. The scene editor
is a clean foundation for the next stage.
