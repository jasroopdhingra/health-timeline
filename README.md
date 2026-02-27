# Health Timeline

Submission for Sheer Health's frontend exercise. 

LIVE: https://health-timeline-ashy.vercel.app/ 

## Running the App

```bash
npm install
npm run dev
```

## Tech Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui
- localStorage

## Design Decisions

- localStorage service layer: Wraps all data access in a service module with a clean API (`getEvents`, `addMessage`, `updateAttachment`, etc.). This could be swapped for `fetch` calls to a real backend with no component changes.
- Custom hooks over context: At this scope (single page, single user), custom hooks that call the data service directly are simpler and more explicit than React Context. Context would be warranted if multiple unrelated component trees needed to share and react to the same state.
- Collapsible cards over routing: For a timeline, keeping everything on one page with expand/collapse gives better spatial context than navigating to separate event detail pages.
- Inline editing: Edit icons appear on hover for messages and attachments, keeping the UI clean until the user wants to edit.
