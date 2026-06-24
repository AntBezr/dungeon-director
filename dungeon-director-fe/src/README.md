# Simplified Feature-Sliced Design

This project uses a lightweight FSD layout. Keep layers small and add a deeper structure only when the code needs it.

## Layers

- `app` - application setup: providers, router, global styles, app entry composition.
- `pages` - route-level screens. A page may compose widgets, features, entities, and shared UI.
- `widgets` - large page blocks that combine multiple features or entities.
- `features` - user actions and business flows, for example `create-session` or `move-token`.
- `entities` - domain models and their UI, for example `character`, `map`, `encounter`.
- `shared` - reusable code without project business knowledge: UI primitives, utilities, assets, API client, config.

## Import Rules

- Import between layers through public `index.ts` files.
- Keep imports inside one slice relative when it is clearer.
- Do not import from higher layers into lower layers.
- Prefer aliases over long parent traversals:

```ts
import { HomePage } from '@pages/home'
import { cn } from '@shared/lib/cn'
```

## Suggested Slice Shape

Start with only what you need:

```text
features/create-room/
  index.ts
  ui/
  model/
  api/
```

Avoid creating empty `ui`, `model`, or `api` folders until there is real code for them.

## Styling

Use Tailwind classes in components. Keep custom CSS out of slices; `app/styles/index.css` exists only as the Tailwind entrypoint.

Shared shadcn-style primitives live in `shared/ui` and are imported through the public API:

```ts
import { Button, Card, Input } from '@shared/ui'
```
