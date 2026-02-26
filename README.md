# Health Timeline

A prototype health insurance event timeline built for Sheer Health's frontend exercise.

## Running the App

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

- **Vite + React 19 + TypeScript** — Fast dev server, strict type checking
- **Tailwind CSS v4 + shadcn/ui** — Utility-first styling with accessible component primitives (Radix UI)
- **localStorage** — Data persistence without a backend; seeded from `data.json` on first load

## Architecture

```
src/
  types/           # TypeScript interfaces mirroring the JSON schema
  services/        # Data service abstracting localStorage (swappable for real API)
  hooks/           # Custom React hooks (useEvents, useEventDetail)
  components/
    ui/            # shadcn/ui primitives (Button, Card, Tabs, Dialog, etc.)
    layout/        # App header
    timeline/      # TimelinePage, EventList, EventCard, EventDetail
    events/        # CreateEventDialog
    messages/      # MessageList, AddMessageForm
    attachments/   # AttachmentList, AddAttachmentForm
    support-notes/ # SupportNoteList (read-only)
    bills/         # BillSummary (read-only)
  lib/             # Formatting utilities (dates, currency, event type badges)
```

## Features

- **Timeline view** — Events sorted newest-first, grouped by month
- **Expand/collapse** — Click any event card to see its details
- **Messages** — View, add, and edit messages (inline editing with hover-to-reveal pencil icon)
- **Attachments** — View, add, and rename file attachments
- **Support Notes** — Read-only display with visual distinction (dashed borders)
- **Bills** — Read-only billing summary showing amount billed, amount allowed, and savings
- **Create Event** — Modal dialog with event type dropdown and details textarea
- **Data persistence** — All changes saved to localStorage; survives page refreshes

## Design Decisions

- **localStorage service layer**: Wraps all data access in a service module with a clean API (`getEvents`, `addMessage`, `updateAttachment`, etc.). This could be swapped for `fetch` calls to a real backend with no component changes.
- **Custom hooks over context**: At this scope (single page, single user), custom hooks that call the data service directly are simpler and more explicit than React Context. Context would be warranted if multiple unrelated component trees needed to share and react to the same state.
- **Collapsible cards over routing**: For a timeline, keeping everything on one page with expand/collapse gives better spatial context than navigating to separate event detail pages.
- **Inline editing**: Edit icons appear on hover for messages and attachments, keeping the UI clean until the user intends to edit.
