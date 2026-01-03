import { startOfDay, addDays, parseISO, isWithinInterval } from 'date-fns';
import eventData from '@/data/MasterEventSchedule_2026.json';
import type { WingsEvent } from '@/types';

/**
 * Server-side function to get upcoming events within a 30-day window
 * Replaces the useUpcomingEvents hook for SSR
 */
export async function getUpcomingEvents(): Promise<{
  events: WingsEvent[];
  allEvents: WingsEvent[];
  pastEvents: WingsEvent[];
  windowStart: Date;
  windowEnd: Date;
}> {
  const today = startOfDay(new Date());
  const windowEnd = addDays(today, 30);

  const allEventsData = (eventData as WingsEvent[]).filter(e => e.status === 'published');

  // Filter for upcoming events within the 30-day window
  const upcoming = allEventsData.filter(event => {
    const eventDate = parseISO(event.date);
    return isWithinInterval(eventDate, {
      start: today,
      end: windowEnd,
    });
  });

  // Sort chronologically
  const sortedUpcoming = upcoming.sort((a, b) =>
    parseISO(a.date).getTime() - parseISO(b.date).getTime()
  );

  // Sort all events chronologically
  const sortedAll = [...allEventsData].sort((a, b) =>
    parseISO(a.date).getTime() - parseISO(b.date).getTime()
  );

  // Get past events (for archive section)
  const past = allEventsData
    .filter(event => {
      const eventDate = parseISO(event.date);
      return eventDate < today;
    })
    .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime());

  return {
    events: sortedUpcoming,
    allEvents: sortedAll,
    pastEvents: past,
    windowStart: today,
    windowEnd,
  };
}

/**
 * Filter events by month and category
 */
export function filterEvents(
  allEvents: WingsEvent[],
  selectedMonth: number | null,
  selectedCategory: string
): WingsEvent[] {
  let filtered = [...allEvents];

  // Filter by month
  if (selectedMonth !== null) {
    filtered = filtered.filter(event => {
      const eventDate = parseISO(event.date);
      return eventDate.getMonth() === selectedMonth;
    });
  }

  // Filter by category
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(event => event.category === selectedCategory);
  }

  return filtered.sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
}

