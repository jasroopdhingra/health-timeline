import { useState } from 'react';
import type { HealthEvent } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useEventDetail } from '@/hooks/useEventDetail';
import { EventDetail } from './EventDetail';
import { formatDate, formatRelativeDate, formatCurrency, getEventTypeBadgeStyle } from '@/lib/format';
import { ChevronDown, MessageSquare, Paperclip, Receipt, StickyNote } from 'lucide-react';

interface EventCardProps {
  event: HealthEvent;
}

export function EventCard({ event }: EventCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, supportNotes, attachments, bill } = useEventDetail(event.event_id);

  const hasMetadata = messages.length > 0 || supportNotes.length > 0 || attachments.length > 0 || bill;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="transition-shadow hover:shadow-md">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer select-none pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
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
                {!isOpen && hasMetadata && (
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
                    {supportNotes.length > 0 && (
                      <span className="flex items-center gap-1">
                        <StickyNote className="h-3 w-3" />
                        {supportNotes.length}
                      </span>
                    )}
                    {bill && (
                      <span className="flex items-center gap-1">
                        <Receipt className="h-3 w-3" />
                        {formatCurrency(bill.amount_allowed)}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <EventDetail eventId={event.event_id} />
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
