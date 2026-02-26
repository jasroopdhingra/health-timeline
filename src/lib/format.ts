import type { EventType } from '@/types';

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatRelativeDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function getMonthYear(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

const eventTypeBadgeStyles: Record<EventType, string> = {
  'Follow-up Appointment': 'bg-blue-100 text-blue-800 border-blue-200',
  'General Checkup': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Diagnostic Testing': 'bg-purple-100 text-purple-800 border-purple-200',
  'Consultation': 'bg-amber-100 text-amber-800 border-amber-200',
  'Therapy Session': 'bg-rose-100 text-rose-800 border-rose-200',
};

export function getEventTypeBadgeStyle(eventType: EventType): string {
  return eventTypeBadgeStyles[eventType] ?? 'bg-gray-100 text-gray-800 border-gray-200';
}
