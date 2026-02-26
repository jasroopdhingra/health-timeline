import { useState } from 'react';
import type { Attachment } from '@/types';
import { formatDateTime } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, FileSpreadsheet, FileImage, File, Pencil, Check, X, Download } from 'lucide-react';

function getFileIcon(fileName: string) {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return <FileText className="h-4 w-4 text-red-500 shrink-0" />;
    case 'doc':
    case 'docx':
      return <FileSpreadsheet className="h-4 w-4 text-blue-500 shrink-0" />;
    case 'png':
    case 'jpg':
    case 'jpeg':
      return <FileImage className="h-4 w-4 text-green-500 shrink-0" />;
    default:
      return <File className="h-4 w-4 text-muted-foreground shrink-0" />;
  }
}

function AttachmentItem({
  attachment,
  onUpdate,
}: {
  attachment: Attachment;
  onUpdate: (attachmentId: string, fileName: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(attachment.file_name);
  const [showToast, setShowToast] = useState(false);

  function handleSave() {
    const trimmed = editName.trim();
    if (!trimmed || trimmed === attachment.file_name) {
      setEditing(false);
      setEditName(attachment.file_name);
      return;
    }
    onUpdate(attachment.attachment_id, trimmed);
    setEditing(false);
  }

  function handleCancel() {
    setEditName(attachment.file_name);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  function handleDownload() {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }

  return (
    <div className="group flex items-center gap-3 rounded-lg border bg-muted/30 px-4 py-2.5 relative">
      {showToast && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap z-20">
          Download not available in prototype
        </div>
      )}
      {getFileIcon(editing ? editName : attachment.file_name)}
      {editing ? (
        <div className="flex gap-2 flex-1 min-w-0">
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 text-sm h-8"
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
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{attachment.file_name}</p>
            <p className="text-xs text-muted-foreground">
              {formatDateTime(attachment.create_time)}
            </p>
          </div>
          <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={handleDownload}
              title="Download file"
            >
              <Download className="h-3 w-3" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={() => setEditing(true)}
              title="Rename file"
            >
              <Pencil className="h-3 w-3" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

interface AttachmentListProps {
  attachments: Attachment[];
  onUpdate: (attachmentId: string, fileName: string) => void;
}

export function AttachmentList({ attachments, onUpdate }: AttachmentListProps) {
  if (attachments.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">
        No attachments yet. Add one below.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {attachments.map((attachment) => (
        <AttachmentItem
          key={attachment.attachment_id}
          attachment={attachment}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
