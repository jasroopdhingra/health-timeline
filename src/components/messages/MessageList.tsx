import { useState } from 'react';
import type { Message } from '@/types';
import { formatDateTime } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Check, X } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  onUpdate: (messageId: string, text: string) => void;
}

function MessageItem({
  message,
  onUpdate,
}: {
  message: Message;
  onUpdate: (messageId: string, text: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(message.text);

  function handleSave() {
    const trimmed = editText.trim();
    if (!trimmed || trimmed === message.text) {
      setEditing(false);
      setEditText(message.text);
      return;
    }
    onUpdate(message.message_id, trimmed);
    setEditing(false);
  }

  function handleCancel() {
    setEditText(message.text);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <div className="group rounded-lg bg-muted/50 px-4 py-3">
      {editing ? (
        <div className="flex gap-2">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 text-sm"
            autoFocus
          />
          <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={handleSave}>
            <Check className="h-3.5 w-3.5" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={handleCancel}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm">{message.text}</p>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setEditing(true)}
            >
              <Pencil className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatDateTime(message.create_time)}
          </p>
        </>
      )}
    </div>
  );
}

export function MessageList({ messages, onUpdate }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">
        No messages yet. Start the conversation below.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <MessageItem key={message.message_id} message={message} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
