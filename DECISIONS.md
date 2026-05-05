# Architecture & Technical Decisions

This document explains how **content-performance-exp-ui** is structured, why major choices were made, and what I would do tighten it for production.

---

## Architecture

### High-level layout

The app uses a **thin root** (`App`) that wraps the main dashboard shell `**ContentExplorer`**, which renders the page: header with date range picker + refresh button, summary metrics, the content table, and detail panel.

- `**src/App.tsx**` — Top-level composition; renders `ContentExplorer` inside page-level layout from `App.styles.ts`.
- `**src/main.tsx**` — Bootstrapping: `**QueryClientProvider**` (TanStack Query), and in `**import.meta.env.DEV**` conditional loading of the MSW worker so mocks only run locally.

### Component hierarchy (`src/components/`)

Feature UI lives under `**src/components/**` with small, composable slices:


| Area                                                              | Role                                                                     |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `**ContentExplorer/**`                                            | Dashboard shell; wires child sections and consumes orchestration hooks.  |
| `**Header/**`                                                     | Date range UI (including MUI X Date Pickers where used), refresh button. |
| `**Metrics/**`, `**MetricCard/**`                                 | Summary metric cards fed from summary API.                               |
| `**ContentTable/**`, `**TableToolbar/**`, `**PaginationFooter/**` | Table, filtering/sorting/toolbar chrome, pagination.                     |
| `**DetailPanel/**`, `**DetailRow/**`, `**EmptyState/**`           | Selected row detail view and empty states.                               |


### Styles

- `**styled-components**` for **streamlined presentation**: each major component uses a companion `**styled.ts`**
- **MUI (`@mui/material`)** handles **heavy UI primitives** (layout helpers, alerts, inputs, icons) for a clean, dashboard-appropriate baseline; MUI internally uses **Emotion**, which aligns with `@emotion/react` / `@emotion/styled` as dependencies rather than authoring all layout in raw Emotion by hand.

### State & orchestration (`src/hooks/`)

Heavy lifting of logics and UI coupling (date range → refetch behavior, pagination, selection, combining summary + pages + optional timeseries concerns) lives in **custom hooks** (e.g. `**useContentData`**, `**useTableData**`, `**useDateChange**`, `**useSummaryQuery**`, `**usePageTimeseriesQuery**`) so **components remain mostly declarative** and props stay focused.

### Data fetching (`src/api/`)

- `**services.ts`** — All `**fetch**`-based calls to REST-style paths (`/api/summary`, `/api/pages`, and page timeseries) with typed responses and consistent error handling.
- `**types.ts**` — Request/response and query param types used by services and hooks.
- `**queryClient.ts**` — Shared TanStack Query client configuration.

### Mocking (`src/mocks/`)

- `**handlers/**` — MSW request handlers composing mock HTTP behavior -summary, pages, timeseries.
- `**browser.ts**` — Service worker bootstrap for browser dev usage.
- `**utils.ts**` — **Mock data derivation** helping handlers by keeping them lightweight and clean with “fixture logic”.

### Types, utilities, constants

- `**src/types/`** — Shared application types.
- `**src/utils/**` — Helpers (e.g. URL building consumed by `**api/services**`).
- `**src/constants/**` — Centralized constants used across hooks/components.

---

## Library choices & trade-offs


| Choice                                    | Why I use it                                                                                                                              | Trade-offs                                                                   |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **MUI (+ MUI Icons, MUI X Date Pickers)** | Fast path to consistent, minimal dashboard UX; accessibility and spacing conventions.                                                     | Larger bundle size; Lesser control on design                                 |
| **styled-components**                     | Colocated `styled.ts` files per component; clear separation between component logic and layout.                                           | Runtime CSS injection cost vs zero-runtime solutions (Linaria, Panda, etc.). |
| **Emotion (`@emotion/*`)**                | Required with **MUI’s styling engine**.                                                                                                   | -                                                                            |
| **TanStack Query (React Query)**          | Caching, loading/error states, refetch semantics, and deduping server state across hooks without Redux boilerplate.                       | -                                                                            |
| **MSW**                                   | Intercepts `fetch` in development; **straightforward swap** from mocked handlers to real backends while keeping `**services`** unchanged. | Must keep mocks in sync with real contracts; drift is easy without tests.    |
| **Vite + React 19 + TypeScript**          | Fast dev UX and strict typing for API surfaces.                                                                                           | None unusual for this app size.                                              |
| **dayjs**                                 | Small date manipulation for ranges used with pickers/queries.                                                                             | Less ecosystem than Moment (which is largely legacy)                         |


---

## Trade-offs (what we optimized for)

- **Optimized for**: fast iteration on a coherent dashboard UX, clear folder boundaries (**components / api / hooks / mocks / types / utils**), typed API boundaries, and **server-shaped state via TanStack Query** with **thin, pure-ish components**.
- **Deferred with limited time**: **automated tests** (unit/integration/MSW-backed).
- **Alternative considered**: `**Redux`** (or similar global store) instead of coordinating everything through composable hooks and query cache—for this surface area, hooks + TanStack Query were enough; Redux would centralize cross-cutting concerns.

---

## Improvements for production

- **Testing**: Jest + Cypress for unit and component testing;
- **Code-Splitting**: To load the application componnents dynamicaly on demand using `**React.lazy`**
- **Charts**: Dedicated **time-series / trend visualizations** (e.g. for page performance over the selected window) atop existing timeseries-ready API shape—library choice could be lightweight (e.g. Recharts / ECharts / visx) once bundle and accessibility requirements are confirmed.
- **Observability & resilience**: error boundaries, retry/backoff polish, empty vs error UX consistency. Exception handling is for truly exceptional scenarios, testing and assertions to be further enhanced to handle errors gracefull wherever possible
- **API hardening**: environment-based base URLs, auth headers, versioning.
- AI Integration: Charts and other methods of visualizations to infer data easily is not where the industry is at. Today these dashboards and monitoring sites are AI powered. All the user does is fire a natural language query which performs Text2SQL or any other operations necessary and returns only the data needed by the user> Faster turnaround times always.

