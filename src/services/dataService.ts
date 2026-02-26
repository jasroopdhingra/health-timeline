import type {
  Account,
  HealthEvent,
  Message,
  SupportNote,
  Attachment,
  Bill,
  SeedData,
  EventType,
} from '@/types';
import seedData from '@/data/seed.json';

const STORAGE_KEY = 'health_timeline_data';

function generateId(): string {
  return crypto.randomUUID();
}

function loadData(): SeedData {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    return JSON.parse(raw) as SeedData;
  }
  const data = seedData as SeedData;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

function saveData(data: SeedData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getAccount(): Account {
  const data = loadData();
  return data.accounts[0];
}

export function getEvents(): HealthEvent[] {
  const data = loadData();
  return data.events.sort(
    (a, b) => new Date(b.create_time).getTime() - new Date(a.create_time).getTime()
  );
}

export function getEvent(eventId: string): HealthEvent | undefined {
  const data = loadData();
  return data.events.find((e) => e.event_id === eventId);
}

export function createEvent(eventType: EventType, details: string): HealthEvent {
  const data = loadData();
  const account = data.accounts[0];
  const newEvent: HealthEvent = {
    account_id: account.account_id,
    event_id: generateId(),
    create_time: new Date().toISOString(),
    event_type: eventType,
    details,
  };
  data.events.push(newEvent);
  saveData(data);
  return newEvent;
}

export function getMessagesForEvent(eventId: string): Message[] {
  const data = loadData();
  return data.messages
    .filter((m) => m.event_id === eventId)
    .sort((a, b) => new Date(a.create_time).getTime() - new Date(b.create_time).getTime());
}

export function addMessage(eventId: string, text: string): Message {
  const data = loadData();
  const account = data.accounts[0];
  const newMessage: Message = {
    account_id: account.account_id,
    event_id: eventId,
    message_id: generateId(),
    create_time: new Date().toISOString(),
    text,
  };
  data.messages.push(newMessage);
  saveData(data);
  return newMessage;
}

export function updateMessage(messageId: string, text: string): Message {
  const data = loadData();
  const message = data.messages.find((m) => m.message_id === messageId);
  if (!message) throw new Error(`Message ${messageId} not found`);
  message.text = text;
  saveData(data);
  return message;
}

export function getSupportNotesForEvent(eventId: string): SupportNote[] {
  const data = loadData();
  return data.support_notes
    .filter((n) => n.event_id === eventId)
    .sort((a, b) => new Date(a.create_time).getTime() - new Date(b.create_time).getTime());
}

export function getAttachmentsForEvent(eventId: string): Attachment[] {
  const data = loadData();
  return data.attachments
    .filter((a) => a.event_id === eventId)
    .sort((a, b) => new Date(a.create_time).getTime() - new Date(b.create_time).getTime());
}

export function addAttachment(eventId: string, fileName: string): Attachment {
  const data = loadData();
  const account = data.accounts[0];
  const newAttachment: Attachment = {
    account_id: account.account_id,
    event_id: eventId,
    attachment_id: generateId(),
    create_time: new Date().toISOString(),
    file_name: fileName,
  };
  data.attachments.push(newAttachment);
  saveData(data);
  return newAttachment;
}

export function updateAttachment(attachmentId: string, fileName: string): Attachment {
  const data = loadData();
  const attachment = data.attachments.find((a) => a.attachment_id === attachmentId);
  if (!attachment) throw new Error(`Attachment ${attachmentId} not found`);
  attachment.file_name = fileName;
  saveData(data);
  return attachment;
}

export function getBillForEvent(eventId: string): Bill | undefined {
  const data = loadData();
  return data.bill.find((b) => b.event_id === eventId);
}

export function getAllBills(): Bill[] {
  const data = loadData();
  return data.bill;
}

export function resetData(): void {
  localStorage.removeItem(STORAGE_KEY);
  loadData();
}
