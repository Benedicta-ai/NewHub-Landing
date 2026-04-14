# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Artifacts

### MatchGlee Landing Page (`artifacts/matchglee-landing`)
- **Type:** React + Vite (static, no backend)
- **Preview Path:** `/` (root)
- **Description:** Full landing page for MatchGlee networking app
- **Features:** Hero section, brand story, mission, 5-feature grid, UI showcase, working "Get Updates" form (email/phone validation), footer
- **Assets:** `public/images/matchglee-logo.jpeg`, `public/images/matchglee-app-ui.png`
- **Design:** Dark theme, purple→pink→blue gradients, glassmorphism cards, scroll animations

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

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
