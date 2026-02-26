import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip } from 'lucide-react';

interface AddAttachmentFormProps {
  onAdd: (fileName: string) => void;
}

export function AddAttachmentForm({ onAdd }: AddAttachmentFormProps) {
  const [fileName, setFileName] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = fileName.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setFileName('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <Input
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Enter file name (e.g. report.pdf)"
        className="flex-1"
      />
      <Button type="submit" size="sm" disabled={!fileName.trim()}>
        <Paperclip className="h-4 w-4" />
      </Button>
    </form>
  );
}
