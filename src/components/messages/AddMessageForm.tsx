import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizontal } from 'lucide-react';

interface AddMessageFormProps {
  onAdd: (text: string) => void;
}

export function AddMessageForm({ onAdd }: AddMessageFormProps) {
  const [text, setText] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1"
      />
      <Button type="submit" size="sm" disabled={!text.trim()}>
        <SendHorizontal className="h-4 w-4" />
      </Button>
    </form>
  );
}
