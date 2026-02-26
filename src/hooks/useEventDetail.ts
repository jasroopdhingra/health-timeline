import { useState, useCallback, useMemo } from 'react';
import type { Message, SupportNote, Attachment, Bill } from '@/types';
import * as dataService from '@/services/dataService';

export function useEventDetail(eventId: string) {
  const [version, setVersion] = useState(0);

  const messages: Message[] = useMemo(() => {
    void version;
    return dataService.getMessagesForEvent(eventId);
  }, [eventId, version]);

  const supportNotes: SupportNote[] = useMemo(() => {
    void version;
    return dataService.getSupportNotesForEvent(eventId);
  }, [eventId, version]);

  const attachments: Attachment[] = useMemo(() => {
    void version;
    return dataService.getAttachmentsForEvent(eventId);
  }, [eventId, version]);

  const bill: Bill | undefined = useMemo(() => {
    void version;
    return dataService.getBillForEvent(eventId);
  }, [eventId, version]);

  const addMessage = useCallback(
    (text: string): Message => {
      const msg = dataService.addMessage(eventId, text);
      setVersion((v) => v + 1);
      return msg;
    },
    [eventId]
  );

  const updateMessage = useCallback(
    (messageId: string, text: string): Message => {
      const msg = dataService.updateMessage(messageId, text);
      setVersion((v) => v + 1);
      return msg;
    },
    []
  );

  const addAttachment = useCallback(
    (fileName: string): Attachment => {
      const att = dataService.addAttachment(eventId, fileName);
      setVersion((v) => v + 1);
      return att;
    },
    [eventId]
  );

  const updateAttachment = useCallback(
    (attachmentId: string, fileName: string): Attachment => {
      const att = dataService.updateAttachment(attachmentId, fileName);
      setVersion((v) => v + 1);
      return att;
    },
    []
  );

  return {
    messages,
    supportNotes,
    attachments,
    bill,
    addMessage,
    updateMessage,
    addAttachment,
    updateAttachment,
  };
}
