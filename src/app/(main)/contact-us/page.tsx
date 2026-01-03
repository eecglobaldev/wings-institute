import { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Wings Institute Vadodara | Enquiry & Campus Visit Booking',
  description: 'Get in touch with Wings Institute Alkapuri, Vadodara. Book a free counselling session, schedule campus visit, or call +91-8758754444 for admission enquiries.',
  alternates: {
    canonical: 'https://wingsinstitute.com/contact-us',
  },
  openGraph: {
    title: 'Contact Wings Institute Vadodara | Enquiry & Campus Visit Booking',
    description: 'Get in touch with Wings Institute Alkapuri, Vadodara. Book a free counselling session, schedule campus visit.',
    url: 'https://wingsinstitute.com/contact-us',
    type: 'website',
    images: [
      {
        url: '/images/contact/wings-campus.jpg',
        width: 1200,
        height: 630,
        alt: 'Wings Institute Vadodara campus location in Alkapuri',
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
