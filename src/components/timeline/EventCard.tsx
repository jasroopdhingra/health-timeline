import { useState } from 'react';
import type { HealthEvent } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useEventDetail } from '@/hooks/useEventDetail';
import { EventDetail } from './EventDetail';
import { formatDate, formatRelativeDate, formatCurrency, getEventTypeBadgeStyle } from '@/lib/format';
import { ChevronDown, MessageSquare, Paperclip, AlertCircle } from 'lucide-react';

interface EventCardProps {
  event: HealthEvent;
}

export function EventCard({ event }: EventCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, supportNotes, attachments, bill } = useEventDetail(event.event_id);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="transition-shadow hover:shadow-md">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer select-none pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className={getEventTypeBadgeStyle(event.event_type)}
                  >
                    {event.event_type}
                  </Badge>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{event.details}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <time dateTime={event.create_time}>{formatDate(event.create_time)}</time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{formatRelativeDate(event.create_time)}</span>
                </div>
                {!isOpen && (messages.length > 0 || attachments.length > 0) && (
                  <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                    {messages.length > 0 && (
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {messages.length}
                      </span>
                    )}
                    {attachments.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Paperclip className="h-3 w-3" />
                        {attachments.length}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-start gap-3 shrink-0">
                {!isOpen && bill && (
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatCurrency(bill.amount_billed)}</p>
                    <p className="text-xs text-emerald-600 font-medium">
                      Saved {formatCurrency(bill.amount_billed - bill.amount_allowed)}
                    </p>
                  </div>
                )}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 mt-0.5 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        {!isOpen && supportNotes.length > 0 && (
          <div className="px-6 pb-3 -mt-1">
            {supportNotes.map((note) => (
              <div
                key={note.note_id}
                className="flex items-start gap-2 rounded-md bg-amber-50 border border-amber-200 px-3 py-2 mt-1.5"
              >
                <AlertCircle className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-800">{note.text}</p>
              </div>
            ))}
          </div>
        )}

        <CollapsibleContent>
          <CardContent className="pt-0">
            <EventDetail eventId={event.event_id} />
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
