export interface Account {
  account_id: string;
  first_name: string;
  last_name: string;
}

export type EventType =
  | 'Follow-up Appointment'
  | 'General Checkup'
  | 'Diagnostic Testing'
  | 'Consultation'
  | 'Therapy Session';

export const EVENT_TYPES: EventType[] = [
  'Follow-up Appointment',
  'General Checkup',
  'Diagnostic Testing',
  'Consultation',
  'Therapy Session',
];

export interface HealthEvent {
  account_id: string;
  event_id: string;
  create_time: string;
  event_type: EventType;
  details: string;
}

export interface Message {
  account_id: string;
  event_id: string;
  message_id: string;
  create_time: string;
  text: string;
}

export interface SupportNote {
  account_id: string;
  event_id: string;
  note_id: string;
  create_time: string;
  text: string;
}

export interface Attachment {
  account_id: string;
  event_id: string;
  attachment_id: string;
  create_time: string;
  file_name: string;
}

export interface Bill {
  account_id: string;
  event_id: string;
  bill_id: string;
  create_time: string;
  amount_billed: number;
  amount_allowed: number;
}

export interface SeedData {
  accounts: Account[];
  events: HealthEvent[];
  messages: Message[];
  support_notes: SupportNote[];
  attachments: Attachment[];
  bill: Bill[];
}
