import { useEventDetail } from '@/hooks/useEventDetail';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageList } from '@/components/messages/MessageList';
import { AddMessageForm } from '@/components/messages/AddMessageForm';
import { SupportNoteList } from '@/components/support-notes/SupportNoteList';
import { AttachmentList } from '@/components/attachments/AttachmentList';
import { AddAttachmentForm } from '@/components/attachments/AddAttachmentForm';
import { BillSummary } from '@/components/bills/BillSummary';
import { MessageSquare, StickyNote, Paperclip, Receipt } from 'lucide-react';

interface EventDetailProps {
  eventId: string;
}

export function EventDetail({ eventId }: EventDetailProps) {
  const {
    messages,
    supportNotes,
    attachments,
    bill,
    addMessage,
    updateMessage,
    addAttachment,
    updateAttachment,
  } = useEventDetail(eventId);

  return (
    <Tabs defaultValue="messages" className="w-full">
      <TabsList className="w-full grid grid-cols-4">
        <TabsTrigger value="messages" className="text-xs gap-1.5">
          <MessageSquare className="h-3.5 w-3.5" />
          Messages
          {messages.length > 0 && (
            <span className="ml-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium">
              {messages.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="notes" className="text-xs gap-1.5">
          <StickyNote className="h-3.5 w-3.5" />
          Notes
          {supportNotes.length > 0 && (
            <span className="ml-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium">
              {supportNotes.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="attachments" className="text-xs gap-1.5">
          <Paperclip className="h-3.5 w-3.5" />
          Files
          {attachments.length > 0 && (
            <span className="ml-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium">
              {attachments.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="bill" className="text-xs gap-1.5">
          <Receipt className="h-3.5 w-3.5" />
          Bill
        </TabsTrigger>
      </TabsList>

      <TabsContent value="messages" className="mt-4">
        <MessageList messages={messages} onUpdate={updateMessage} />
        <AddMessageForm onAdd={addMessage} />
      </TabsContent>

      <TabsContent value="notes" className="mt-4">
        <SupportNoteList notes={supportNotes} />
      </TabsContent>

      <TabsContent value="attachments" className="mt-4">
        <AttachmentList attachments={attachments} onUpdate={updateAttachment} />
        <AddAttachmentForm onAdd={addAttachment} />
      </TabsContent>

      <TabsContent value="bill" className="mt-4">
        <BillSummary bill={bill} />
      </TabsContent>
    </Tabs>
  );
}
