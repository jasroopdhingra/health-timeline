import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { EVENT_TYPES, type EventType } from '@/types';
import { Plus } from 'lucide-react';

interface CreateEventDialogProps {
  onCreate: (eventType: EventType, details: string) => void;
}

export function CreateEventDialog({ onCreate }: CreateEventDialogProps) {
  const [open, setOpen] = useState(false);
  const [eventType, setEventType] = useState<EventType | ''>('');
  const [details, setDetails] = useState('');

  const canSubmit = eventType !== '' && details.trim() !== '';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onCreate(eventType as EventType, details.trim());
    setEventType('');
    setDetails('');
    setOpen(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setEventType('');
      setDetails('');
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Add a new health event to your timeline.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="event-type">
                Event Type
              </label>
              <Select
                value={eventType}
                onValueChange={(v) => setEventType(v as EventType)}
              >
                <SelectTrigger id="event-type">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="details">
                Details
              </label>
              <Textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe the event..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              Create Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
