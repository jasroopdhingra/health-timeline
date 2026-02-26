import { useEvents } from '@/hooks/useEvents';
import { EventList } from './EventList';
import { CreateEventDialog } from '@/components/events/CreateEventDialog';
import { Header } from '@/components/layout/Header';
import { getAccount } from '@/services/dataService';

export function TimelinePage() {
  const account = getAccount();
  const { events, createEvent } = useEvents();

  return (
    <div className="min-h-screen bg-background">
      <Header account={account} />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold">Your Health Events</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {events.length} event{events.length !== 1 ? 's' : ''} in your timeline
            </p>
          </div>
          <CreateEventDialog onCreate={createEvent} />
        </div>
        <EventList events={events} />
      </main>
    </div>
  );
}
