import type { HealthEvent } from '@/types';
import { EventCard } from './EventCard';
import { getMonthYear } from '@/lib/format';

interface EventListProps {
  events: HealthEvent[];
}

export function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No events yet. Create one to get started.</p>
      </div>
    );
  }

  const grouped = events.reduce<Record<string, HealthEvent[]>>((acc, event) => {
    const key = getMonthYear(event.create_time);
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([monthYear, groupEvents]) => (
        <section key={monthYear}>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
              {monthYear}
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="relative pl-8">
            <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-border rounded-full" />
            <div className="space-y-3">
              {groupEvents.map((event) => (
                <div key={event.event_id} className="relative">
                  <div className="absolute left-[-26px] top-5 h-3 w-3 rounded-full border-2 border-primary bg-background z-10" />
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
