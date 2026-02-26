import { useState, useCallback, useMemo } from 'react';
import type { HealthEvent, EventType } from '@/types';
import * as dataService from '@/services/dataService';

export function useEvents() {
  const [version, setVersion] = useState(0);

  const events = useMemo(() => {
    void version;
    return dataService.getEvents();
  }, [version]);

  const createEvent = useCallback((eventType: EventType, details: string): HealthEvent => {
    const event = dataService.createEvent(eventType, details);
    setVersion((v) => v + 1);
    return event;
  }, []);

  const refresh = useCallback(() => {
    setVersion((v) => v + 1);
  }, []);

  return { events, createEvent, refresh };
}
