import { useState, useMemo } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { EventList } from './EventList';
import { FinancialSummary } from './FinancialSummary';
import { CreateEventDialog } from '@/components/events/CreateEventDialog';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getAccount } from '@/services/dataService';
import { getEventTypeBadgeStyle } from '@/lib/format';
import { EVENT_TYPES, type EventType } from '@/types';
import { Search, X } from 'lucide-react';

export function TimelinePage() {
  const account = getAccount();
  const { events, createEvent } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<EventType | 'all'>('all');

  const filteredEvents = useMemo(() => {
    let result = events;

    if (activeFilter !== 'all') {
      result = result.filter((e) => e.event_type === activeFilter);
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (e) =>
          e.details.toLowerCase().includes(query) ||
          e.event_type.toLowerCase().includes(query)
      );
    }

    return result;
  }, [events, activeFilter, searchQuery]);

  const isFiltered = activeFilter !== 'all' || searchQuery.trim() !== '';

  function handleFilterClick(type: EventType | 'all') {
    setActiveFilter((prev) => (prev === type ? 'all' : type));
  }

  return (
    <div className="min-h-screen bg-background">
      <Header account={account} />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold">Your Health Events</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isFiltered
                ? `Showing ${filteredEvents.length} of ${events.length} events`
                : `${events.length} event${events.length !== 1 ? 's' : ''} in your timeline`}
            </p>
          </div>
          <CreateEventDialog onCreate={createEvent} />
        </div>

        <div className="space-y-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              className="pl-9 pr-9"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              className="cursor-pointer select-none"
              onClick={() => handleFilterClick('all')}
            >
              All
            </Badge>
            {EVENT_TYPES.map((type) => (
              <Badge
                key={type}
                variant="outline"
                className={`cursor-pointer select-none ${
                  activeFilter === type
                    ? getEventTypeBadgeStyle(type) + ' ring-2 ring-primary/20'
                    : 'opacity-60 hover:opacity-100'
                }`}
                onClick={() => handleFilterClick(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        <FinancialSummary events={events} />
        <EventList events={filteredEvents} isFiltered={isFiltered} />
      </main>
    </div>
  );
}
