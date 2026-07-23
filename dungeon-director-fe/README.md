# Dungeon Director FE

Frontend for Dungeon Director, built with React, TypeScript, Vite, React Router, Tailwind CSS, and a simplified Feature-Sliced Design structure.

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

## Server state and mocks

TanStack Query is configured once in `src/main.tsx` with the shared client from
`src/shared/api/query-client.ts`. Put a request function and its `useQuery` /
`useMutation` hooks in the relevant entity's `api/` directory.

In development, MSW starts before React renders. Add mock endpoint handlers to
the entity (for example, `src/entities/campaign/api/mockHandlers.ts`) and
register them in `src/app/mocks/handlers.ts`. Hooks keep using `fetch`, so no
component changes are needed when the real backend is connected.
