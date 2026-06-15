# BotStore Frontend

Next.js frontend for CandlePilot/BotStore.

## Overview

This project is a Next.js 14 App Router application used to render:

- Public marketing pages (home, pricing, how-it-works)
- Authenticated dashboard flows (bots, profile, master accounts)
- Admin area (restricted to master role)
- Stripe-based subscription checkout

The app uses Material UI and Sass for UI, and integrates with the backend through the `4hands-api` client package.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Material UI (MUI)
- Sass
- Stripe (`@stripe/react-stripe-js`, `@stripe/stripe-js`)
- `4hands-api` client SDK

## Scripts

From `package.json`:

- `npm run dev` -> starts Next on port `80`
- `npm run dev-ssl` -> starts Next on port `443` with experimental HTTPS
- `npm run build` -> production build
- `npm run start` -> serve production build (default Next port)
- `npm run stg` -> serve production build on port `80`
- `npm run lint` -> run ESLint

Important:

- On Windows, ports `80` and `443` may require elevated privileges.
- If needed, change ports in `package.json` to non-privileged ports (for example `3000`/`3443`).

## Requirements

- Node.js 18.17+ (recommended: current Node 20 LTS)
- npm 9+
- Backend API available (for auth/data)
- Files bucket service available (for upload/download)

## Installation

```bash
npm install
```

## Configuration

### 1) API host mapping

Main API host values are in:

- `src/config.json`

Current values:

- `DEV`: `https://localhost`
- `STG`: `https://192.168.15.4`
- `PROD`: `https://api.candlepilot.com`

The API provider currently initializes with `config.apiHost.DEV` in:

- `src/contexts/4HandsAPI.jsx`

If you need environment-based selection, update this file accordingly.

### 2) Public environment variables

Create `.env.local` in project root with:

```bash
NEXT_PUBLIC_FILE_BUCKET_HOST=https://localhost:1000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

Used by:

- `src/hooks/useFilesBucket.jsx`
- `src/components/payment/SubscriptionCheckout/SubscriptionCheckout.jsx`

### 3) Next image configuration

Remote image loading is currently allowed for:

- protocol: `https`
- host: `localhost`
- port: `1000`

Defined in:

- `next.config.mjs`

## Run Locally

### Development

```bash
npm run dev
```

or HTTPS dev mode:

```bash
npm run dev-ssl
```

### Production-like local run

```bash
npm run build
npm run start
```

## Application Structure

High-level structure:

```text
src/
	app/                # App Router routes and layouts
	components/         # Reusable UI and page-specific content blocks
	contexts/           # API/Auth/Query context providers
	providers/          # Root provider composition
	templates/          # Base page wrappers (public/auth/admin)
	hooks/              # Domain hooks (files, plans, subscriptions, user)
	style/              # Theme and SCSS styling
	helpers/            # Formatting, parsing, and shared helpers
```

### Route groups

Public routes:

- `/`
- `/pricing`
- `/how-it-works`
- `/how-it-works/pilots`
- `/how-it-works/positions`
- `/how-it-works/slots`
- `/how-it-works/wallets`
- `/how-it-works/what-is-candlepilot`

Authenticated dashboard routes:

- `/dashboard`
- `/dashboard/login`
- `/dashboard/email-confirmation`
- `/dashboard/reset-password`
- `/dashboard/user/my-profile`
- `/dashboard/user/my-pilots`
- `/dashboard/master-accounts`
- `/dashboard/master-accounts/[index]`
- `/dashboard/bots/pilot-store`
- `/dashboard/bots/[index]`
- `/subscribe-plan`

Admin route:

- `/admin`

## Auth and Access Rules

Auth handling is centralized in:

- `src/contexts/AuthUser.jsx`

Behavior includes:

- Validates session with backend (`instance.auth.checkUser()`)
- Redirects unauthenticated users to `/dashboard/login`
- Redirects users without billing address to `/dashboard/user/my-profile`
- Redirects users without active plan to `/subscribe-plan`
- Redirects users with active plan away from `/subscribe-plan` (unless `updatePlan=true`)

Provider composition:

- Public pages: `BasePage` + `APIProvider`
- Auth pages: `RootAuthProvider` (API + AuthUser)
- Admin pages: `RootAuthProvider` with `rules=['master']`

## Styling and Theme

Theme setup:

- `src/style/darkTheme.js`

Global style entry:

- `src/style/scss/style.scss` imported in `src/app/layout.jsx`

Typography uses Montserrat via `next/font/google`.

## Stripe Subscription Flow

Checkout entry point:

- `src/components/payment/SubscriptionCheckout/SubscriptionCheckout.jsx`

Relevant backend endpoints called by frontend:

- `POST /plans/stripe/create-subscription`
- `POST /plans/stripe/confirm-subscription`

When coupon/payment logic indicates no payment is required, frontend confirms subscription directly and redirects to dashboard.

## Linting

```bash
npm run lint
```

No automated unit/integration test setup is currently present in this repository.

## Troubleshooting

### App cannot start on port 80/443

- Run terminal as Administrator, or
- Update `dev` / `dev-ssl` script ports in `package.json`.

### Login keeps redirecting

Check:

- API availability and base host (`src/config.json`, `src/contexts/4HandsAPI.jsx`)
- Auth cookies/session domain setup in backend

### Images from files bucket are blocked

Check `next.config.mjs` `images.remotePatterns` and ensure host/port/protocol match your files bucket URL.

### Stripe elements do not load

Check `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in `.env.local`.

## Version

- Current package version: `0.1.0`
