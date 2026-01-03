'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/components/Icons';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import type { WingsEvent } from '@/types';
import { ROUTES } from '@/lib/routes';
import { filterEvents } from '@/lib/events';
import {
  MONTHS,
  CATEGORIES,
  formatEventDate,
  getCategoryStyles,
  getCalendarDays,
  getEventsForDay,
} from '@/lib/events-utils';
import { sendOtpMSG91, verifyOtpMSG91 } from '@/services/messageService';
import { registerEventRegistrationUser } from '@/services/userService';
import { sendEventRegistrationEmails, sendEventRegistrationEmailsToUser } from '@/services/emailService';
import { getMonth } from 'date-fns';

// ============================================
// GOOGLE CALENDAR URL GENERATOR
// ============================================

/**
 * Generate Google Calendar URL for an event
 */
const generateGoogleCalendarUrl = (event: WingsEvent): string => {
  const eventDateTime = new Date(`${event.date}T${event.time}`);
  const endDateTime = new Date(eventDateTime.getTime() + event.duration_min * 60000);
  
  const formatDate = (date: Date): string => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
  };
  
  const startStr = formatDate(eventDateTime);
  const endStr = formatDate(endDateTime);
  
  const title = encodeURIComponent(event.title);
  const location = encodeURIComponent(`Wings Institute for Air Hostess and Hotel Management training  
2nd floor RG Square 
14, Nutan Bharat Society  
Opposite Nutan Bharat Club
Alkapuri, Vadodara, Gujarat 390007`);
  const details = encodeURIComponent(
    `${event.description}\n\n` +
    `📍 Location: ${event.location}\n` +
    `⏱️ Duration: ${event.duration_min} minutes\n\n` +
    `What you'll learn:\n${event.learning_outcomes.map(o => `• ${o}`).join('\n')}\n\n` +
    `Important Notes:\n` +
    `• Please arrive 15 minutes before the event\n` +
    `• Bring a valid ID proof\n` +
    `• Dress code: Smart Casual\n\n` +
    `Contact: +91-875 875 4444\n` +
    `Website: https://wingsinstitute.com` +
    `📍 [Open in Google Maps](https://maps.app.goo.gl/Fwh7RzQxuWis5A159)`
  );
  
  return `https://calendar.google.com/calendar/r/eventedit?text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}&ctz=Asia/Kolkata`;
};

// ============================================
// SEO SCHEMA GENERATION FOR EVENTS PAGE
// ============================================

/**
 * Get human-readable category label
 */
const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    'aviation': 'Aviation & Cabin Crew Training',
    'hospitality': 'Hotel Management & Hospitality',
    'culinary': 'Culinary Arts & Baking',
    'airport': 'Airport Management & Ground Handling',
    'tourism': 'Travel & Tourism Management'
  };
  return labels[category] || category;
};

/**
 * Generate Event Schema for a single event
 */
const generateEventSchema = (event: WingsEvent) => {
  const eventDateTime = `${event.date}T${event.time}+05:30`;
  const endDateTime = new Date(new Date(eventDateTime).getTime() + event.duration_min * 60000).toISOString();
  
  return {
    "@type": "Event",
    "@id": `https://wingsinstitute.com/events#${event.id}`,
    "name": event.title,
    "description": event.description,
    "image": `https://wingsinstitute.com${event.image_url}`,
    "startDate": eventDateTime,
    "endDate": endDateTime,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "name": "Wings Institute for Air Hostess and Hotel Management training",
        "streetAddress": "2nd floor RG Square 14, Nutan Bharat Society Opposite Nutan Bharat Club, Alkapuri",
        "addressLocality": "Vadodara",
        "addressRegion": "Gujarat",
        "postalCode": "390007",
        "addressCountry": "IN",
        "hasMap": "https://maps.app.goo.gl/Fwh7RzQxuWis5A159"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 22.3119,
        "longitude": 73.1723
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Wings Institute of Aviation & Hospitality",
      "url": "https://wingsinstitute.com",
      "logo": "https://wingsinstitute.com/images/wings-logo-red.png",
      "sameAs": [
        "https://www.facebook.com/wingsinstitutevadodara",
        "https://www.instagram.com/wingsinstitutevadodara",
        "https://www.youtube.com/@wingsinstitutevadodara"
      ]
    },
    "performer": {
      "@type": "Organization",
      "name": "Wings Institute Faculty"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://wingsinstitute.com/events#${event.id}`,
      "price": "0",
      "priceCurrency": "INR",
      "availability": event.capacity - event.registered_count > 0 
        ? "https://schema.org/InStock" 
        : "https://schema.org/SoldOut",
      "validFrom": new Date().toISOString()
    },
    "maximumAttendeeCapacity": event.capacity,
    "remainingAttendeeCapacity": event.capacity - event.registered_count,
    "isAccessibleForFree": true,
    "inLanguage": ["en", "hi", "gu"],
    "about": {
      "@type": "Thing",
      "name": getCategoryLabel(event.category)
    },
    "keywords": event.tags.join(", ")
  };
};

/**
 * Generate complete schema markup for Events page
 */
const generateEventsPageSchema = (events: WingsEvent[]) => {
  const generateEventListSchema = (events: WingsEvent[]) => ({
    "@type": "ItemList",
    "name": "Free Workshops & Events at Wings Institute Vadodara",
    "description": "Browse free aviation, hospitality, and culinary workshops. Experience hands-on training in our A330 mock cabin, fine dining restaurant, and commercial kitchen.",
    "numberOfItems": events.length,
    "itemListOrder": "https://schema.org/ItemListOrderAscending",
    "itemListElement": events.map((event, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": generateEventSchema(event)
    }))
  });

  const generateOrganizationSchema = () => ({
    "@type": "EducationalOrganization",
    "@id": "https://wingsinstitute.com/#organization",
    "name": "Wings Institute of Aviation & Hospitality",
    "alternateName": "Wings Institute Vadodara",
    "url": "https://wingsinstitute.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://wingsinstitute.com/images/wings-logo-red.png",
      "width": 512,
      "height": 512
    },
    "image": "https://wingsinstitute.com/images/slider-images/meal-service-training.jpg",
    "description": "Gujarat's premier institute for Aviation, Hospitality, and Culinary Arts training with state-of-the-art infrastructure including an Airbus A330 mock cabin.",
    "telephone": "+91-875 875 4444",
    "email": "info@wingsinstitute.com",
    "address": {
      "@type": "PostalAddress",
      "name": "Wings Institute for Air Hostess and Hotel Management training",
      "streetAddress": "2nd floor RG Square 14, Nutan Bharat Society Opposite Nutan Bharat Club, Alkapuri",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "postalCode": "390007",
      "hasMap": "https://maps.app.goo.gl/Fwh7RzQxuWis5A159",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.3119,
      "longitude": 73.1723
    },
    "areaServed": {
      "@type": "State",
      "name": "Gujarat"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Free Workshops & Events",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Aviation Workshops",
          "description": "Free cabin crew training workshops in our A330 mock cabin"
        },
        {
          "@type": "OfferCatalog",
          "name": "Hospitality Workshops",
          "description": "Free hotel management workshops in our fine dining setup"
        },
        {
          "@type": "OfferCatalog",
          "name": "Culinary Workshops",
          "description": "Free cooking and baking workshops in our commercial kitchen"
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/wingsinstitutevadodara",
      "https://www.instagram.com/wingsinstitutevadodara",
      "https://www.youtube.com/@wingsinstitutevadodara",
      "https://www.linkedin.com/company/wingsinstitute"
    ]
  });

  const generateBreadcrumbSchema = () => ({
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://wingsinstitute.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Student Hub",
        "item": "https://wingsinstitute.com/student-hub"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Free Workshops & Events",
        "item": "https://wingsinstitute.com/events"
      }
    ]
  });

  const generateWebPageSchema = (eventsCount: number) => ({
    "@type": "WebPage",
    "@id": "https://wingsinstitute.com/events/#webpage",
    "url": "https://wingsinstitute.com/events",
    "name": "Free Workshops & Events | Wings Institute Vadodara",
    "description": "Join free aviation, hospitality, and culinary workshops at Wings Institute. Experience our A330 mock cabin, fine dining restaurant, and commercial kitchen. Register now!",
    "isPartOf": {
      "@id": "https://wingsinstitute.com/#website"
    },
    "about": {
      "@id": "https://wingsinstitute.com/#organization"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": eventsCount
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".event-title"]
    },
    "datePublished": "2026-01-01T00:00:00+05:30",
    "dateModified": new Date().toISOString(),
    "inLanguage": "en-IN"
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageSchema(events.length),
      generateOrganizationSchema(),
      generateBreadcrumbSchema(),
      generateEventListSchema(events)
    ]
  };
};

/**
 * Custom hook to inject Event schema into page head (client-side only)
 */
const useEventSchema = (events: WingsEvent[]) => {
  useEffect(() => {
    if (typeof window === 'undefined' || events.length === 0) return;

    const schemaId = 'events-page-schema';
    
    const existingSchema = document.getElementById(schemaId);
    if (existingSchema) {
      existingSchema.remove();
    }

    const script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(generateEventsPageSchema(events), null, 0);
    document.head.appendChild(script);

    return () => {
      const schema = document.getElementById(schemaId);
      if (schema) {
        schema.remove();
      }
    };
  }, [events]);
};

// ============================================
// EVENT CARD COMPONENT
// ============================================

const EventCard: React.FC<{
  event: WingsEvent;
  onRegister: (event: WingsEvent) => void;
  language: 'en' | 'hi' | 'gu';
  t: (key: string) => string;
}> = ({ event, onRegister, language, t }) => {
  const dateInfo = formatEventDate(event.date, event.time);
  const styles = getCategoryStyles(event.category);
  
  const title = language === 'hi' ? event.titleHi : language === 'gu' ? event.titleGu : event.title;
  const description = language === 'hi' ? event.descriptionHi : language === 'gu' ? event.descriptionGu : event.description;
  const location = language === 'hi' ? event.locationHi : language === 'gu' ? event.locationGu : event.location;
  const outcomes = language === 'hi' ? event.learning_outcomesHi : language === 'gu' ? event.learning_outcomesGu : event.learning_outcomes;

  const spotsLeft = event.capacity - event.registered_count;
  const isAlmostFull = spotsLeft <= 5;

  return (
    <div 
      id={`event-${event.id}`}
      className="group glass-panel rounded-3xl overflow-hidden border border-zinc-200/50 dark:border-white/10 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 scroll-mt-32"
    >
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={event.image_url} 
          alt={title} 
          width={400}
          height={192}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${styles.bgColor} ${styles.textColor} border ${styles.borderColor} backdrop-blur-sm leading-relaxed`}>
            {event.category}
          </span>
        </div>
        
        <div className="absolute bottom-4 right-4 text-center bg-white dark:bg-zinc-900 rounded-2xl p-3 shadow-xl min-w-[70px]">
          <div className="text-3xl font-black text-zinc-900 dark:text-white leading-none">{dateInfo.day}</div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{dateInfo.month}</div>
        </div>

        {isAlmostFull && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-bold uppercase tracking-wider animate-pulse leading-relaxed">
            {t('events.only')} {spotsLeft} {t('events.spots_left')}
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-relaxed md:leading-[1.5] line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Icons.Clock className="w-4 h-4 shrink-0" />
            <span className="leading-relaxed">{dateInfo.time} IST • {event.duration_min} {t('events.min')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icons.MapPin className="w-4 h-4 shrink-0" />
            <span className="leading-relaxed truncate max-w-[180px]">{location}</span>
          </div>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed md:leading-[1.8] line-clamp-3">
          {description}
        </p>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 leading-relaxed">{t('events.you_will_learn')}</p>
          <ul className="space-y-1">
            {outcomes.slice(0, 3).map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Icons.CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => onRegister(event)}
          className="w-full mt-4 py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 leading-relaxed"
        >
          <Icons.Ticket className="w-5 h-5" />
          {t('events.book_free_seat')}
        </button>
      </div>
    </div>
  );
};

// ============================================
// REGISTRATION MODAL COMPONENT
// ============================================

const RegistrationModal: React.FC<{
  event: WingsEvent | null;
  onClose: () => void;
  language: 'en' | 'hi' | 'gu';
  t: (key: string) => string;
}> = ({ event, onClose, language, t }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    qualification: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [phoneValue, setPhoneValue] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [phoneOtpError, setPhoneOtpError] = useState<string | null>(null);
  const [phoneState, setPhoneState] = useState<'IDLE' | 'SENDING' | 'SENT' | 'VERIFIED'>('IDLE');
  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
  const [isVerifyingPhoneOtp, setIsVerifyingPhoneOtp] = useState(false);
  const [isLoadingform, setIsLoadingform] = useState(false);

  if (!event) return null;

  const title = language === 'hi' ? event.titleHi : language === 'gu' ? event.titleGu : event.title;
  const dateInfo = formatEventDate(event.date, event.time);
  
  const labelClass = `${language === 'hi' || language === 'gu' ? 'text-md' : 'text-xs'} font-bold uppercase tracking-wider text-zinc-500 leading-relaxed`;

  const handleSendOtp = async () => {
    const phoneDigits = phoneValue.replace(/\D/g, '');
    
    if (phoneDigits.length !== 10) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      setPhoneState('IDLE');
      return;
    }

    const fullPhone = "+91" + phoneDigits;
    setPhoneError(null);
    setPhoneOtpError(null);
    setPhoneState('SENDING');
    setIsSendingPhoneOtp(true);

    try {
      const result = await sendOtpMSG91(fullPhone);

      if (result) {
        setPhoneState('SENT');
      } else {
        setPhoneError("Failed to send phone OTP. Try again.");
        setPhoneState('IDLE');
      }
    } catch (err) {
      setPhoneError("Unable to send phone OTP. Try again.");
      setPhoneState('IDLE');
    }

    setIsSendingPhoneOtp(false);
  };

  const handleVerifyOtp = async () => {
    if (phoneOtp.length !== 6) {
      setPhoneOtpError("Enter the 6-digit OTP.");
      return;
    }

    setPhoneOtpError(null);
    setIsVerifyingPhoneOtp(true);

    const phoneDigits = phoneValue.replace(/\D/g, '');
    const fullPhone = "+91" + phoneDigits;

    try {
      const result = await verifyOtpMSG91(fullPhone, phoneOtp);

      if (result.type === "success" || result.message?.toLowerCase().includes("verified")) {
        setPhoneState('VERIFIED');
        setFormData(prev => ({ ...prev, phone: phoneDigits }));
      } else {
        setPhoneOtpError("Invalid OTP.");
        setPhoneOtp("");
      }
    } catch (err) {
      setPhoneOtpError("Failed to verify OTP. Try again.");
    }

    setIsVerifyingPhoneOtp(false);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingform(true);
    setError(null);

    try {
      if (!formData.name || formData.name.length < 2) {
        setError(t('events.error_name'));
        setIsLoadingform(false);
        return;
      }
      
      if (phoneState !== 'VERIFIED') {
        setError("Please verify your phone number to proceed.");
        setIsLoadingform(false);
        return;
      }
      
      if (!formData.name || !formData.phone || !formData.email || !formData.qualification) {
        setError("Please fill in all required fields.");
        setIsLoadingform(false);
        return;
      }

      const userDataToSave = {
        event_id: event.id,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        qualification: formData.qualification,
        event: event.id,
        event_title: event.title,
        event_date: event.date,
        event_time: event.time,
        event_category: event.category,
        event_location: event.location,
      };

      const result = await registerEventRegistrationUser(userDataToSave);

      if (result === "ERROR") {
        setError("Something went wrong. Please try again.");
        setIsLoadingform(false);
        return;
      }
      
      if (result === "EXISTS") {
        setError("You are already registered for this event.");
        setIsLoadingform(false);
        return;
      }
      
      if (result === "CREATED") {
        try {
          await sendEventRegistrationEmails(userDataToSave);
          await sendEventRegistrationEmailsToUser(userDataToSave);
        } catch (emailError) {
          console.error('Failed to send event registration emails:', emailError);
        }
        
        setIsLoadingform(false);
        setIsSuccess(true);
      }

    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error('Event registration form error:', err);
      setIsLoadingform(false);
      setIsSuccess(false);
    }
  };

  // Guard createPortal for client-side only
  if (typeof window === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors z-10"
        >
          <Icons.X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Icons.CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 leading-relaxed">
              {t('events.success_title')}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed md:leading-[1.8]">
              {t('events.success_message')}
            </p>
            <div className="glass-panel p-4 rounded-2xl mb-6 text-left">
              <p className="text-sm font-bold text-zinc-900 dark:text-white leading-relaxed">{title}</p>
              <p className="text-xs text-zinc-500 leading-relaxed">{dateInfo.fullDate} • {dateInfo.time} IST</p>
            </div>
            
            <a
              href={generateGoogleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 mb-3 bg-white dark:bg-zinc-800 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold text-sm uppercase tracking-wider leading-relaxed flex items-center justify-center gap-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
            >
              <Icons.Calendar className="w-5 h-5" />
              {t('events.add_to_calendar') || 'Add to Google Calendar'}
            </a>
            
            <button
              onClick={onClose}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-sm uppercase tracking-wider leading-relaxed"
            >
              {t('events.done')}
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Icons.Ticket className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider opacity-80 leading-relaxed">{t('events.free_registration')}</span>
              </div>
              <h3 className="text-xl font-bold leading-relaxed">{title}</h3>
              <p className="text-sm opacity-80 mt-1 leading-relaxed">{dateInfo.fullDate} • {dateInfo.time} IST</p>
            </div>

            <form onSubmit={handleSubmitForm} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className={labelClass}>{t('events.label_name')}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
                  placeholder={t('events.placeholder_name')}
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>{t('events.label_mobile')}</label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                     <Icons.Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                     <input 
                       type="tel" 
                       required
                       value={phoneValue}
                       onChange={(e) => setPhoneValue(e.target.value)}
                       disabled={phoneState === 'VERIFIED'}
                       className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm disabled:opacity-70"
                       placeholder="+91..."
                     />
                     {phoneState === 'VERIFIED' && <Icons.CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />}
                  </div>
                
                  {phoneState !== 'VERIFIED' && (
                    <button 
                      type="button"
                      onClick={handleSendOtp}
                      disabled={phoneState === 'SENDING' || isSendingPhoneOtp || phoneValue.replace(/\D/g, '').length < 10}
                      className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl whitespace-nowrap min-w-[110px] transition-all active:scale-95 disabled:opacity-50"
                    >
                      {phoneState === 'SENDING' || isSendingPhoneOtp ? <Icons.Loader2 className="w-4 h-4 animate-spin mx-auto" /> : phoneState === 'SENT' ? 'Resend OTP' : 'Send OTP'}
                    </button>
                  )}
                </div>
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{phoneError}</p>
                )}

                {phoneState === 'SENT' && (
                  <div className="mt-3 flex gap-2 animate-in slide-in-from-top-2 duration-300">
                    <input 
                      type="text" 
                      value={phoneOtp}
                      onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-2 bg-white dark:bg-white/5 border border-indigo-500 rounded-lg text-center tracking-[0.5em] font-mono text-sm focus:ring-4 focus:ring-indigo-500/20 outline-none"
                      placeholder="000000"
                      maxLength={6}
                    />
                    <button 
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={isVerifyingPhoneOtp}
                      className="px-6 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isVerifyingPhoneOtp ? <Icons.Loader2 className="w-4 h-4 animate-spin" /> : 'Verify'}
                    </button>
                  </div>
                )}
                {phoneOtpError && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{phoneOtpError}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className={labelClass}>{t('events.label_email')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
                  placeholder={t('events.placeholder_email')}
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>{t('events.label_qualification')}</label>
                <select
                  value={formData.qualification}
                  onChange={(e) => setFormData(prev => ({ ...prev, qualification: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all cursor-pointer"
                >
                  <option value="">{t('events.select_qualification')}</option>
                  <option value="10th">{t('events.qual_10th')}</option>
                  <option value="12th Arts">{t('events.qual_12_arts')}</option>
                  <option value="12th Commerce">{t('events.qual_12_commerce')}</option>
                  <option value="12th Science">{t('events.qual_12_science')}</option>
                  <option value="Graduate">{t('events.qual_graduate')}</option>
                  <option value="Post Graduate">{t('events.qual_pg')}</option>
                </select>
              </div>

              {error && (
                <p className="text-red-500 text-sm font-bold leading-relaxed">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isLoadingform}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 leading-relaxed"
              >
                {isSubmitting || isLoadingform ? (
                  <>
                    <Icons.Loader2 className="w-5 h-5 animate-spin" />
                    {t('events.registering')}
                  </>
                ) : (
                  <>
                    <Icons.Ticket className="w-5 h-5" />
                    {t('events.confirm_registration')}
                  </>
                )}
              </button>

              <p className="text-xs text-center text-zinc-500 leading-relaxed">
                {t('events.privacy_note')}
              </p>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

// ============================================
// EVENT CALENDAR COMPONENT
// ============================================

const EventCalendar: React.FC<{
  events: WingsEvent[];
  onScrollToEvent: (eventId: string, month: number) => void;
  language: 'en' | 'hi' | 'gu';
}> = ({ events, onScrollToEvent, language }) => {
  const [currentMonth, setCurrentMonth] = useState(() => getMonth(new Date()));
  const [currentYear] = useState(2026);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const calendarDays = useMemo(() => 
    getCalendarDays(currentYear, currentMonth), 
    [currentYear, currentMonth]
  );

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekdaysMobile = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handlePrevMonth = () => {
    setCurrentMonth(prev => prev === 0 ? 11 : prev - 1);
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => prev === 11 ? 0 : prev + 1);
    setSelectedDay(null);
  };

  const handleEventClick = (event: WingsEvent) => {
    onScrollToEvent(event.id, currentMonth);
  };

  const handleDayClick = (idx: number, dayEvents: WingsEvent[]) => {
    if (dayEvents.length > 0) {
      setSelectedDay(selectedDay === idx ? null : idx);
    }
  };

  return (
    <div className="glass-panel rounded-3xl overflow-hidden border border-zinc-200/50 dark:border-white/10">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 md:p-6 text-white">
        <div className="flex items-center justify-between">
          <button 
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <Icons.ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <div className="text-center">
            <h3 className="text-lg md:text-2xl font-bold">{MONTHS[currentMonth].label} {currentYear}</h3>
            <p className="text-xs md:text-sm opacity-80 mt-1 hidden sm:block">Click on highlighted dates to view events</p>
          </div>
          <button 
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <Icons.ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      <div className="p-2 md:p-4 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200/50 dark:border-white/5 overflow-x-auto">
        <div className="flex gap-1 justify-start md:justify-center min-w-max px-2">
          {MONTHS.map((month) => (
            <button
              key={month.value}
              onClick={() => { setCurrentMonth(month.value); setSelectedDay(null); }}
              className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition-all whitespace-nowrap ${
                currentMonth === month.value
                  ? 'bg-indigo-600 text-white'
                  : 'text-zinc-500 hover:bg-zinc-200 dark:hover:bg-white/10'
              }`}
            >
              {month.short}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7 bg-zinc-100 dark:bg-zinc-800/50">
        {weekdays.map((day, i) => (
          <div key={day} className="p-2 md:p-3 text-center text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500">
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{weekdaysMobile[i]}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-zinc-200 dark:bg-zinc-700">
        {calendarDays.map((dayData, idx) => {
          const dayEvents = dayData.isCurrentMonth 
            ? getEventsForDay(events, currentYear, currentMonth, dayData.day)
            : [];
          const hasEvents = dayEvents.length > 0;
          const isHovered = hoveredDay === idx && hasEvents;
          const isSelected = selectedDay === idx;

          return (
            <div
              key={idx}
              onClick={() => handleDayClick(idx, dayEvents)}
              className={`relative min-h-[52px] sm:min-h-[80px] md:min-h-[100px] lg:min-h-[120px] p-1 sm:p-2 transition-all duration-200 ${
                dayData.isCurrentMonth 
                  ? 'bg-white dark:bg-zinc-900' 
                  : 'bg-zinc-50 dark:bg-zinc-900/50'
              } ${hasEvents ? 'cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20' : ''} ${
                isSelected ? 'ring-2 ring-indigo-500 ring-inset' : ''
              }`}
              onMouseEnter={() => setHoveredDay(idx)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <div className={`text-xs sm:text-sm font-bold mb-0.5 sm:mb-1 ${
                dayData.isCurrentMonth 
                  ? hasEvents 
                    ? 'text-indigo-600 dark:text-indigo-400' 
                    : 'text-zinc-900 dark:text-white'
                  : 'text-zinc-300 dark:text-zinc-600'
              }`}>
                {dayData.day}
              </div>

              {hasEvents && dayData.isCurrentMonth && (
                <div className="sm:hidden flex flex-wrap gap-0.5 mt-1">
                  {dayEvents.slice(0, 3).map((event, eventIdx) => {
                    const styles = getCategoryStyles(event.category);
                    return (
                      <div
                        key={eventIdx}
                        className={`w-2 h-2 rounded-full ${styles.bgColor} border ${styles.borderColor}`}
                      />
                    );
                  })}
                  {dayEvents.length > 3 && (
                    <span className="text-[8px] text-zinc-400 font-bold">+{dayEvents.length - 3}</span>
                  )}
                </div>
              )}

              {hasEvents && dayData.isCurrentMonth && (
                <div className="hidden sm:block space-y-0.5 md:space-y-1">
                  {dayEvents.slice(0, 2).map((event, eventIdx) => {
                    const styles = getCategoryStyles(event.category);
                    const title = language === 'hi' ? event.titleHi : language === 'gu' ? event.titleGu : event.title;
                    return (
                      <button
                        key={eventIdx}
                        onClick={(e) => { e.stopPropagation(); handleEventClick(event); }}
                        className={`w-full text-left px-1 md:px-2 py-0.5 md:py-1 rounded-md md:rounded-lg text-[9px] md:text-xs font-medium truncate transition-all ${styles.bgColor} ${styles.textColor} hover:scale-[1.02] active:scale-100`}
                      >
                        <span className="hidden lg:inline">{title.substring(0, 15)}...</span>
                        <span className="lg:hidden">{title.substring(0, 8)}...</span>
                      </button>
                    );
                  })}
                  {dayEvents.length > 2 && (
                    <div className="text-[9px] md:text-xs text-zinc-500 font-medium px-1 md:px-2">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              )}

              {isHovered && dayEvents.length > 0 && (
                <div className="hidden md:block absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 w-64 p-3 bg-white dark:bg-zinc-800 rounded-xl shadow-2xl border border-zinc-200 dark:border-white/10 animate-scale-in">
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    {dayEvents.length} Event{dayEvents.length > 1 ? 's' : ''} on {MONTHS[currentMonth].label} {dayData.day}
                  </div>
                  {dayEvents.map((event, i) => {
                    const title = language === 'hi' ? event.titleHi : language === 'gu' ? event.titleGu : event.title;
                    const styles = getCategoryStyles(event.category);
                    return (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); handleEventClick(event); }}
                        className="w-full text-left p-2 mb-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                      >
                        <div className="font-bold text-sm text-zinc-900 dark:text-white truncate">{title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs font-bold uppercase ${styles.textColor}`}>{event.category}</span>
                          <span className="text-xs text-zinc-500">{event.time.substring(0, 5)} IST</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedDay !== null && (
        <div className="sm:hidden bg-indigo-50 dark:bg-indigo-900/20 p-4 border-t border-indigo-200 dark:border-indigo-800 animate-fade-in-up">
          {(() => {
            const dayData = calendarDays[selectedDay];
            const dayEvents = dayData?.isCurrentMonth 
              ? getEventsForDay(events, currentYear, currentMonth, dayData.day)
              : [];
            
            if (dayEvents.length === 0) return null;

            return (
              <>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    {MONTHS[currentMonth].label} {dayData.day} Events
                  </span>
                  <button 
                    onClick={() => setSelectedDay(null)}
                    className="p-1 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800"
                  >
                    <Icons.X className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </button>
                </div>
                <div className="space-y-2">
                  {dayEvents.map((event, i) => {
                    const title = language === 'hi' ? event.titleHi : language === 'gu' ? event.titleGu : event.title;
                    const styles = getCategoryStyles(event.category);
                    return (
                      <button
                        key={i}
                        onClick={() => handleEventClick(event)}
                        className="w-full text-left p-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-white/10"
                      >
                        <div className="font-bold text-sm text-zinc-900 dark:text-white">{title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs font-bold uppercase ${styles.textColor}`}>{event.category}</span>
                          <span className="text-xs text-zinc-500">{event.time.substring(0, 5)} IST</span>
                        </div>
                        <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 font-medium flex items-center gap-1">
                          <Icons.ArrowDown className="w-3 h-3" /> Scroll to event
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            );
          })()}
        </div>
      )}

      <div className="p-3 md:p-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200/50 dark:border-white/5">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-[10px] md:text-xs">
          {CATEGORIES.filter(c => c.value !== 'all').map((cat) => {
            const styles = getCategoryStyles(cat.value);
            return (
              <div key={cat.value} className="flex items-center gap-1 md:gap-1.5">
                <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${styles.bgColor} border ${styles.borderColor}`}></div>
                <span className="text-zinc-600 dark:text-zinc-400 font-medium">{cat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============================================
// FILTER COMPONENTS
// ============================================

const MonthFilter: React.FC<{
  selectedMonth: number | null;
  onSelectMonth: (month: number | null) => void;
}> = ({ selectedMonth, onSelectMonth }) => (
  <div className="flex flex-wrap gap-2 justify-center">
    <button
      onClick={() => onSelectMonth(null)}
      className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
        selectedMonth === null
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
          : 'bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10'
      }`}
    >
      All Months
    </button>
    {MONTHS.map((month) => (
      <button
        key={month.value}
        onClick={() => onSelectMonth(month.value)}
        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
          selectedMonth === month.value
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
            : 'bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10'
        }`}
      >
        {month.short}
      </button>
    ))}
  </div>
);

const CategoryFilter: React.FC<{
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}> = ({ selectedCategory, onSelectCategory }) => {
  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'Plane': return <Icons.Plane className="w-4 h-4" />;
      case 'Building2': return <Icons.Building2 className="w-4 h-4" />;
      case 'ChefHat': return <Icons.ChefHat className="w-4 h-4" />;
      case 'Luggage': return <Icons.Luggage className="w-4 h-4" />;
      case 'Globe': return <Icons.Globe className="w-4 h-4" />;
      default: return <Icons.Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelectCategory(cat.value)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
            selectedCategory === cat.value
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
              : 'glass-panel text-zinc-600 dark:text-zinc-400 hover:border-indigo-500/30'
          }`}
        >
          {getCategoryIcon(cat.icon)}
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
};

type ViewMode = 'grid' | 'calendar';
const ViewToggle: React.FC<{
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}> = ({ view, onViewChange }) => (
  <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-100 dark:bg-white/5">
    <button
      onClick={() => onViewChange('grid')}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
        view === 'grid'
          ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-md'
          : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
      }`}
    >
      <Icons.LayoutGrid className="w-4 h-4" />
      <span className="hidden sm:inline">Cards</span>
    </button>
    <button
      onClick={() => onViewChange('calendar')}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
        view === 'calendar'
          ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-md'
          : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
      }`}
    >
      <Icons.Calendar className="w-4 h-4" />
      <span className="hidden sm:inline">Calendar</span>
    </button>
  </div>
);

// ============================================
// EMPTY STATE COMPONENT
// ============================================

const EmptyState: React.FC<{ 
  t: (key: string) => string; 
  message?: string;
}> = ({ t, message }) => (
  <div className="text-center py-20 px-6">
    <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center">
      <Icons.Calendar className="w-12 h-12 text-zinc-400" />
    </div>
    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 leading-relaxed">
      {message || t('events.empty_title')}
    </h3>
    <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed md:leading-[1.8]">
      {t('events.empty_message')}
    </p>
    <Link
      href={ROUTES['virtual-tour']}
      className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all leading-relaxed"
    >
      {t('events.schedule_tour')}
    </Link>
  </div>
);

// ============================================
// MAIN EVENTS PAGE CLIENT COMPONENT
// ============================================

interface EventsPageClientProps {
  initialEvents: WingsEvent[];
  allEvents: WingsEvent[];
  pastEvents: WingsEvent[];
  windowStart: string;
  windowEnd: string;
}

export const EventsPageClient: React.FC<EventsPageClientProps> = ({
  initialEvents,
  allEvents,
  pastEvents,
  windowStart,
  windowEnd,
}) => {
  const { t, language } = useLanguage();
  const [selectedEvent, setSelectedEvent] = useState<WingsEvent | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter events based on selections
  const filteredEvents = useMemo(() => {
    // If no filters, show 30-day window events
    if (selectedMonth === null && selectedCategory === 'all') {
      return initialEvents;
    }
    // Otherwise filter from all events
    return filterEvents(allEvents, selectedMonth, selectedCategory);
  }, [initialEvents, allEvents, selectedMonth, selectedCategory]);

  const isFiltered = selectedMonth !== null || selectedCategory !== 'all';

  // Scroll to event card when clicked from calendar
  const handleScrollToEvent = (eventId: string, month: number) => {
    // First, set the month filter so the event card is visible
    setSelectedMonth(month);
    setSelectedCategory('all');
    
    // Wait for filter to apply, then scroll (client-side only)
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const eventCard = document.getElementById(`event-${eventId}`);
        if (eventCard) {
          eventCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add a highlight animation
          eventCard.classList.add('ring-4', 'ring-indigo-500', 'ring-opacity-50');
          setTimeout(() => {
            eventCard.classList.remove('ring-4', 'ring-indigo-500', 'ring-opacity-50');
          }, 2000);
        }
      }, 100);
    }
  };

  // Inject SEO Schema for events (client-side only)
  useEventSchema(allEvents);

  return (
    <div className="min-h-screen pt-3 pb-20 relative z-10">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-blob"></div>
      </div>

      {/* Hero Section */}
      <section className="px-6 mb-12 relative">
        <div className="max-w-7xl mx-auto text-center">
          {/* Language Toggle & Badge */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-panel border-indigo-500/30 animate-fade-in-up shadow-[0_0_20px_rgba(99,102,241,0.15)]">
              <Icons.Ticket className="w-4 h-4 text-indigo-500 animate-pulse" />
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest leading-relaxed">
                {t('events.badge')}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-2 animate-fade-in-up">
              <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider leading-relaxed">
                {t('hero.translate') || 'Translate'}
              </label>
              <LanguageToggle isHomepage={true} />
            </div>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-zinc-900 dark:text-white leading-[1.1] md:leading-[0.95] tracking-tighter mb-6 animate-fade-in-up [animation-delay:200ms]">
            {t('events.title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 animate-shimmer bg-[length:200%_auto] italic">
              {t('events.title_accent')}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed md:leading-[1.8] mb-8 animate-fade-in-up [animation-delay:400ms]">
            {t('events.subtitle')}
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 animate-fade-in-up [animation-delay:600ms]">
            <div className="flex items-center gap-2">
              <Icons.CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="font-bold text-zinc-700 dark:text-zinc-300 leading-relaxed">{t('events.stat_free')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.Award className="w-5 h-5 text-amber-500" />
              <span className="font-bold text-zinc-700 dark:text-zinc-300 leading-relaxed">{t('events.stat_certificate')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.Users className="w-5 h-5 text-indigo-500" />
              <span className="font-bold text-zinc-700 dark:text-zinc-300 leading-relaxed">{t('events.stat_hands_on')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calendar Section */}
      <section className="px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-3">
              📅 2026 Event Calendar
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Browse all 48 workshops throughout the year. Click any event to register!
            </p>
          </div>
          <EventCalendar 
            events={allEvents} 
            onScrollToEvent={handleScrollToEvent}
            language={language as 'en' | 'hi' | 'gu'}
          />
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Title with View Toggle */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white leading-relaxed">
                {t('events.upcoming_title')}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                {isFiltered 
                  ? `Showing ${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''}`
                  : t('events.upcoming_subtitle')
                }
              </p>
            </div>
            <ViewToggle view={viewMode} onViewChange={setViewMode} />
          </div>

          {/* Month Filter */}
          <div className="mb-6">
            <p className="text-center text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3">Filter by Month</p>
            <MonthFilter selectedMonth={selectedMonth} onSelectMonth={setSelectedMonth} />
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <p className="text-center text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3">Filter by Category</p>
            <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
          </div>

          {/* Clear Filters */}
          {isFiltered && (
            <div className="text-center mb-8">
              <button
                onClick={() => {
                  setSelectedMonth(null);
                  setSelectedCategory('all');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <Icons.X className="w-4 h-4" />
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Events Display */}
      <section className="px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          {filteredEvents.length === 0 ? (
            <EmptyState 
              t={t} 
              message={isFiltered ? "No events match your filters" : undefined}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={setSelectedEvent}
                  language={language as 'en' | 'hi' | 'gu'}
                  t={t}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6">
        <div className="max-w-4xl mx-auto glass-panel bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[40px] p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative z-10">
            <Icons.Sparkles className="w-12 h-12 mx-auto mb-6 opacity-80" />
            <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-relaxed md:leading-[1.3]">
              {t('events.cta_title')}
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed md:leading-[1.8]">
              {t('events.cta_subtitle')}
            </p>
            <Link
              href={ROUTES['admissions']}
              className="inline-block px-10 py-5 bg-white text-indigo-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all leading-relaxed"
            >
              {t('events.cta_button')}
            </Link>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {selectedEvent && (
        <RegistrationModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          language={language as 'en' | 'hi' | 'gu'}
          t={t}
        />
      )}
    </div>
  );
};

