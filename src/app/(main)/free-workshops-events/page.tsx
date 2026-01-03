import type { Metadata } from 'next';
import { getUpcomingEvents } from '@/lib/events';
import { EventsPageClient } from './EventsPageClient';

export const metadata: Metadata = {
  title: 'Free Workshops & Events | Wings Institute Vadodara',
  description: 'Join free aviation, hospitality, and culinary workshops at Wings Institute. Experience our A330 mock cabin, fine dining restaurant, and commercial kitchen. Register now!',
  alternates: {
    canonical: 'https://wingsinstitute.com/free-workshops-events',
  },
  openGraph: {
    title: 'Free Workshops & Events | Wings Institute Vadodara',
    description: 'Join free aviation, hospitality, and culinary workshops at Wings Institute. Experience our A330 mock cabin, fine dining restaurant, and commercial kitchen.',
    url: 'https://wingsinstitute.com/free-workshops-events',
    type: 'website',
    images: [
      {
        url: '/images/events/workshop-event.jpg',
        width: 1200,
        height: 630,
        alt: 'Free workshops and events at Wings Institute Vadodara',
      },
    ],
  },
};

export default async function EventsPage() {
  const { events, allEvents, pastEvents, windowStart, windowEnd } = await getUpcomingEvents();

  return (
    <EventsPageClient
      initialEvents={events}
      allEvents={allEvents}
      pastEvents={pastEvents}
      windowStart={windowStart.toISOString()}
      windowEnd={windowEnd.toISOString()}
    />
  );
}

