import type { SupportNote } from '@/types';
import { formatDateTime } from '@/lib/format';
import { StickyNote } from 'lucide-react';

interface SupportNoteListProps {
  notes: SupportNote[];
}

export function SupportNoteList({ notes }: SupportNoteListProps) {
  if (notes.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">
        No support notes for this event.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div
          key={note.note_id}
          className="rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30 px-4 py-3"
        >
          <div className="flex items-start gap-2">
            <StickyNote className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-sm">{note.text}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDateTime(note.create_time)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
