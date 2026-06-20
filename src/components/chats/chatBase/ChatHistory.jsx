import { useChatContext } from "./ChatBase";
import HistoryItem from "./HistoryItem";

export default function ChatHistory() {
   const {  } = useChatContext();

   return (
      <div className="chat-history">
         <HistoryItem message={{ content: 'Hello, how can I help you?', role: 'assistant', createdAt: new Date() }} />
         <HistoryItem message={{ content: 'Hi, I need some help with my account.', role: 'user', createdAt: new Date() }} />
         <HistoryItem message={{ content: 'Sure, I can help with that.', role: 'assistant', createdAt: new Date() }} />
         <HistoryItem message={{ content: `
# BotStore Frontend

Next.js frontend for CandlePilot/BotStore.

## Overview

This project is a Next.js 14 App Router application used to render:

- Public marketing pages (home, pricing, how-it-works)
- Authenticated dashboard flows (bots, profile, master accounts)
- Admin area (restricted to master role)
- Stripe-based subscription checkout

The app uses Material UI and Sass for UI, and integrates with the backend through the \`4hands-api\` client package.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Material UI (MUI)
- Sass
- Stripe (\`@stripe/react-stripe-js\`, \`@stripe/stripe-js\`)
- \`4hands-api\` client SDK

## Scripts

From \`package.json\`:

- \`npm run dev\` -> starts Next on port \`80\`
- \`npm run dev-ssl\` -> starts Next on port \`443\` with experimental HTTPS
- \`npm run build\` -> production build
- \`npm run start\` -> serve production build (default Next port)
- \`npm run stg\` -> serve production build on port \`80\`
- \`npm run lint\` -> run ESLint

Important:

- On Windows, ports \`80\` and \`443\` may require elevated privileges.
- If needed, change ports in \`package.json\` to non-privileged ports (for example \`3000\`/\`3443\`).

## Requirements

- Node.js 18.17+ (recommended: current Node 20 LTS)
- npm 9+
- Backend API available (for auth/data)
- Files bucket service available (for upload/download)

## Installation

\`\`\`bash
npm install
\`\`\`

## Configuration

### 1) API host mapping

Main API host values are in:

- \`src/config.json\`

Current values:

- \`DEV\`: \`https://localhost\`
- \`STG\`: \`https://192.168.15.4\`
- \`PROD\`: \`https://api.candlepilot.com\`
`, role: 'assistant', createdAt: new Date() }} />
      </div>
   );
}
