# React + Vite + Tailwind CSS Project

## Overview
A React single-page application built with Vite and Tailwind CSS v4. It appears to be a professional services website (Italian language) with an admin panel, team, blog, chatbot, and WhatsApp button features.

## Tech Stack
- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Other**: `lucide-react` icons, `clsx`, `tailwind-merge`, `vite-plugin-singlefile`

## Project Structure
- `src/App.tsx` - Root component with routing between public site and admin panel
- `src/components/` - Public-facing UI components (Header, Hero, Stats, Team, Reviews, Blog, Footer, Chatbot, WhatsApp button, Admin login)
- `src/admin/` - Admin panel components
- `src/context/` - React context (AppContext)
- `src/data/` - Static data files
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions
- `index.html` - HTML entry point
- `vite.config.ts` - Vite configuration

## Development
- **Run**: `npm run dev` (starts on port 5000)
- **Build**: `npm run build` (outputs to `dist/`)

## Deployment
- Configured as a **static** deployment
- Build command: `npm run build`
- Public directory: `dist`

## Configuration Notes
- Vite dev server configured for Replit: `host: "0.0.0.0"`, `port: 5000`, `allowedHosts: true`
