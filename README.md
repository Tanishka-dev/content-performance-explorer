# Content Performance Experience UI

React + TypeScript app for content performance dashboards, built with Vite and MUI.

## Prerequisites

- **Node.js** — use a current LTS release (Node 20 or newer). [nodejs.org](https://nodejs.org/)
- **npm** — included with Node.js (this repo uses `package-lock.json`)

## Install

Clone the repository, then install dependencies from the project root:

```bash
npm install
```

## Run (development)

Start the Vite dev server with hot reload:

```bash
npm run dev
```

Open the URL printed in the terminal (typically `http://localhost:5173`).

In development, [MSW](https://mswjs.io/) mocks API responses so the UI works without a live backend.

## Build (production)

Type-check and produce an optimized bundle in `dist/`:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Other scripts

| Command        | Description        |
| -------------- | ------------------ |
| `npm run lint` | Run ESLint on the codebase |
