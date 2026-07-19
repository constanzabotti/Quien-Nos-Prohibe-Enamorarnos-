# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── quien-nos-prohibe/  # "¿Quién nos prohíbe enamorarnos?" React web app
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## Main Web App: ¿Quién nos prohíbe enamorarnos?

A Journal-Experience web app for the LGBTQ+ poetry and history book launch.

### Aesthetic: "Elegancia Guerrillera"
- Colors: Crema Antiguo #F5F5DC, Negro Carbón #1A1A1B, Rojo Borgoña Profundo #800020
- Fonts: Playfair Display (serif titles) + Inter (sans-serif body) + Caveat (handwriting)
- Effects: film grain overlay, torn paper edges, newspaper cutout collage style, parallax scroll

### Sections
1. **Hero** — Full-screen Golden Gate Bridge B&W, animated title, CTA "Sumate a la Resistencia Poética"
2. **La Autora** — Magazine-layout biography of Constanza (immigrant poet in SF)
3. **Comunidad** — "Buzón de Cartas No Enviadas" (anonymous letter form) + "Cadáver Exquisito" (community verse grid)
4. **Historia y Lucha** — Archive cards of LGBTQ+ milestones in San Francisco
5. **El Libro** — CSS 3D book mockup + newsletter subscription

### API Endpoints
- `POST /api/letters` — submit anonymous letter `{ content, mood? }`
- `GET /api/letters?limit=N` — get recent letters
- `POST /api/verses` — submit verse `{ verse, author? }`
- `GET /api/verses?limit=N` — get verses
- `POST /api/newsletter` — subscribe `{ email, name? }`

### Database Schema
- `letters` — anonymous letters with mood (amor/duelo/esperanza/rabia/nostalgia)
- `verses` — community verses for Cadáver Exquisito
- `newsletter_subscribers` — newsletter email list

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; sub-routers for health, letters, verses, newsletter
- Depends on: `@workspace/db`, `@workspace/api-zod`

### `artifacts/quien-nos-prohibe` (`@workspace/quien-nos-prohibe`)

React + Vite frontend. Full single-page app with all sections.

- Framer Motion for scroll animations and entrance effects
- React Hook Form + Zod for form validation
- Sonner for toast notifications
- All fonts loaded from Google Fonts (Playfair Display, Inter, Caveat)

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

- `src/schema/letters.ts` — letters table
- `src/schema/verses.ts` — verses table
- `src/schema/newsletter.ts` — newsletter_subscribers table

Production migrations are handled by Replit when publishing. In development, use `pnpm --filter @workspace/db run push`.
