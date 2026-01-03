'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Icons } from '@/components/Icons';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { VirtualTourSEOContent } from '@/components/VirtualTourSEOContent';
import { useLanguage } from '@/contexts/LanguageContext';
import { ROUTES } from '@/lib/routes';

// --- DATA STRUCTURE ---
const ZONES = [
  { 
    id: 'a330', 
    name: 'Mock Airbus A330',
    subtitle: 'In-Flight Simulation Lab',
    category: 'Aviation',
    image: '/images/slider-images/meal-service-training.jpg',
    desc: 'The crown jewel of our campus. A fully operational single-aisle aircraft fuselage replica for safety drills, meal service simulation, and emergency evacuation training.',
    specs: [
        { label: 'Capacity', value: '24 Pax' },
        { label: 'Equipment', value: 'Safety Demo Kit' },
        { label: 'Feature', value: 'Real PA System' }
    ]
  },
  { 
    id: 'restaurant', 
    name: 'The Grand Restaurant',
    subtitle: 'Fine Dining Simulator',
    category: 'Hospitality',
    image: '/images/slider-images/hotel-management-course.jpg',
    desc: 'A luxury restaurant setup for mastering Silver Service, wine pouring, napkin folding, and VIP guest handling protocols.',
    specs: [
        { label: 'Covers', value: '60 Seater' },
        { label: 'Style', value: 'Fine Dine' },
        { label: 'Bar', value: 'Mocktail Station' }
    ]
  },
  { 
    id: 'kitchen', 
    name: 'Culinary Kitchen',
    code: 'CUL-PROD', 
    subtitle: 'Commercial Production',
    category: 'Production',
    image: '/images/slider-images/wings-cooking-course.jpg',
    desc: 'Industrial-grade kitchen ranges, ovens, and prep stations. Where Hotel Management students become MasterChefs.',
    specs: [
        { label: 'Type', value: 'Commercial' },
        { label: 'Ranges', value: 'High Pressure' },
        { label: 'Safety', value: 'HACCP Rated' }
    ]
  },
  { 
    id: 'bakery', 
    name: 'The Patisserie',
    subtitle: 'Baking & Confectionery',
    category: 'Production',
    image: '/images/slider-images/baking-classes.jpg',
    desc: 'Precision temperature-controlled baking environment. Students master the chemistry of flour and sugar to create international standard pastries and breads.',
    specs: [
        { label: 'Ovens', value: 'Rotary Rack' },
        { label: 'Temp', value: 'Climate Control' },
        { label: 'Stations', value: 'Marble Top' }
    ]
  },
  { 
    id: 'smart-class', 
    name: 'Smart Classrooms',
    subtitle: 'Digital Learning Spaces',
    category: 'Academics',
    image: '/images/slider-images/smart-classrooms.jpg',
    desc: 'Audio-visual equipped smart classrooms for interactive theory sessions, projecting flight paths and GDS software.',
    specs: [
        { label: 'Tech', value: 'Projector/AV' },
        { label: 'Seats', value: 'Ergonomic' },
        { label: 'Climate', value: 'Central AC' }
    ]
  },
  {
    id: 'spa',
    name: 'Grooming Studio',
    subtitle: 'Aesthetics & Skincare',
    category: 'Wellness',
    image: '/images/slider-images/grroming-spa.jpg',
    desc: 'A professional-grade aesthetics studio. Students learn skincare routines, dermatology basics, and personal hygiene standards required by international airlines.',
    stats: { size: 'Luxury Spa', status: 'Open' },
    specs: [
        { label: 'Stations', value: '15 Individual' },
        { label: 'Products', value: 'Organic' },
        { label: 'Lighting', value: 'Hi-Lumen' }
    ]
  },
  { 
    id: 'makeup', 
    name: 'Make Up Stations',
    subtitle: 'Professional Styling Lab',
    category: 'Styling',
    image: '/images/slider-images/makeup-stations.jpg',
    desc: 'Master the "Airline Look". Our vanity studio features Hollywood-style mirrors and professional kits to teach hair styling and makeup application.',
    specs: [
        { label: 'Mirrors', value: '40 Vanity Units' },
        { label: 'Training', value: 'Hair & Skin' },
        { label: 'Standard', value: 'International' }
    ]
  },
  { 
    id: 'fitness', 
    name: 'Fitness Center',
    subtitle: 'Physical Training Hub',
    category: 'Health',
    image: '/images/slider-images/fitness-center.jpg',
    desc: 'Aviation requires stamina. Our in-house gym ensures every student maintains the strict BMI standards required by carriers like Indigo and Emirates.',
    specs: [
        { label: 'Equip', value: 'Cardio & Weights' },
        { label: 'Focus', value: 'BMI Mgmt' },
        { label: 'Sessions', value: 'Daily Training' }
    ]
  },
  { 
    id: 'yoga', 
    name: 'Yoga Center',
    subtitle: 'Mental Wellness & Flexibility',
    category: 'Wellness',
    image: '/images/slider-images/yoga-sessions.jpg',
    desc: 'A serene space dedicated to mental well-being and flexibility. Yoga sessions help students manage stress, maintain poise, and develop the calm demeanor required for high-pressure aviation careers.',
    specs: [
        { label: 'Focus', value: 'Flexibility' },
        { label: 'Sessions', value: 'Daily Morning' },
        { label: 'Vibe', value: 'Zen' }
    ]
  },
  { 
    id: 'credibility', 
    name: 'The Credibility Wall',
    subtitle: 'Our Legacy of Success',
    category: 'History',
    image: '/images/slider-images/wings-certificate.jpg',
    desc: 'A testament to our 17-year legacy. This wall showcases our awards, affiliations, and the success stories of thousands of alumni flying high globally.',
    specs: [
        { label: 'Awards', value: 'National' },
        { label: 'Alumni', value: '5000+' },
        { label: 'Est.', value: '2008' }
    ]
  },
  {
    id: 'counselling',
    name: 'Strategy Room',
    subtitle: 'Career Counseling Hub',
    category: 'Guidance',
    image: '/images/slider-images/wings-job-interview-skills.jpg',
    desc: 'The starting point of every success story. A private, data-driven environment where career paths are mapped using psychometric analysis and industry trends.',
    specs: [
        { label: 'Access', value: 'Private' },
        { label: 'Tools', value: 'AI Profiling' },
        { label: 'Mentors', value: 'Senior Faculty' }
    ]
  },
  { 
    id: 'computer-lab', 
    name: 'Computer Lab',
    subtitle: 'Digital Skills Center',
    category: 'Tech',
    image: '/images/slider-images/computer-lab.jpg',
    desc: 'High-tech lab equipped with the latest aviation software including Galileo and Amadeus. Students learn digital ticketing and reservation systems hands-on.',
    specs: [
        { label: 'Systems', value: 'High Speed' },
        { label: 'Software', value: 'Galileo/Amadeus' },
        { label: 'Focus', value: 'Digital Skills' }
    ]
  },
];

// --- FEED INTERFACE ---
interface InstaPost {
    id: string | number;
    media_url: string;
    caption?: string;
    permalink?: string;
    like_count?: number;
    media_type?: string;
}

// PERMANENT CURATED FEED (No API Required)
const STATIC_FEED: InstaPost[] = [
    { id: 1, media_url: '/images/virtual-tour/AVSEC.jpg', like_count: 511204, caption: 'AVSEC Training Workshop ✈️ #AviationLife' },
    { id: 2, media_url: '/images/virtual-tour/airport-visit.jpg', like_count: 250892, caption: 'Vadodara Airport Visit ✈️ #AirportLife' },
    { id: 3, media_url: '/images/virtual-tour/student-graduation.jpg', like_count: 1882105, caption: 'Proud Wings Students - Graduation Day!' },
    { id: 4, media_url: '/images/virtual-tour/internship.jpg', like_count: 301543, caption: 'Internship Diaries: Real world experience 🏨' },
    { id: 5, media_url: '/images/virtual-tour/spa-for-grooming.jpg', like_count: 281980, caption: 'In-House Spa #GroomingSessions' },
    { id: 6, media_url: '/images/virtual-tour/in-flight-experience.jpg', like_count: 581100, caption: 'In Flight Experience #Aviation' },
    { id: 7, media_url: '/images/virtual-tour/baking-cake-making.jpg', like_count: 159340, caption: 'Culinary Arts: Creating magic in the kitchen 👨‍🍳' },
    { id: 8, media_url: '/images/virtual-tour/theme-restaurant-competition.jpeg', like_count: 108765, caption: 'Theme Restaurant Competition' },
    { id: 9, media_url: '/images/virtual-tour/BDQ-airport-visit.jpeg', like_count: 875945, caption: 'One with the Airport Director - BDQ' },
    { id: 10, media_url: '/images/virtual-tour/first-aid-training.jpg', like_count: 289300, caption: 'First Aid Training' },
    { id: 11, media_url: '/images/virtual-tour/towel-art.jpg', like_count: 420876, caption: 'Towel Art #Hospitality' },
    { id: 12, media_url: '/images/virtual-tour/team-work.jpg', like_count: 181450, caption: 'Teamwork Activities' },
];

export const VirtualTourPageClient: React.FC = () => {
  const { language, t } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  // Translated zones
  const TRANSLATED_ZONES = [
    { 
      id: 'a330', 
      name: t('vt.zone1_name'),
      subtitle: t('vt.zone1_subtitle'),
      category: 'Aviation',
      image: '/images/slider-images/meal-service-training.jpg',
      desc: t('vt.zone1_desc'),
      specs: [
          { label: t('vt.zone1_spec1_label'), value: t('vt.zone1_spec1_value') },
          { label: t('vt.zone1_spec2_label'), value: t('vt.zone1_spec2_value') },
          { label: t('vt.zone1_spec3_label'), value: t('vt.zone1_spec3_value') }
      ]
    },
    { 
      id: 'restaurant', 
      name: t('vt.zone2_name'),
      subtitle: t('vt.zone2_subtitle'),
      category: 'Hospitality',
      image: '/images/slider-images/hotel-management-course.jpg',
      desc: t('vt.zone2_desc'),
      specs: [
          { label: t('vt.zone2_spec1_label'), value: t('vt.zone2_spec1_value') },
          { label: t('vt.zone2_spec2_label'), value: t('vt.zone2_spec2_value') },
          { label: t('vt.zone2_spec3_label'), value: t('vt.zone2_spec3_value') }
      ]
    },
    { 
      id: 'kitchen', 
      name: t('vt.zone3_name'),
      subtitle: t('vt.zone3_subtitle'),
      category: 'Production',
      image: '/images/slider-images/wings-cooking-course.jpg',
      desc: t('vt.zone3_desc'),
      specs: [
          { label: t('vt.zone3_spec1_label'), value: t('vt.zone3_spec1_value') },
          { label: t('vt.zone3_spec2_label'), value: t('vt.zone3_spec2_value') },
          { label: t('vt.zone3_spec3_label'), value: t('vt.zone3_spec3_value') }
      ]
    },
    { 
      id: 'bakery', 
      name: t('vt.zone4_name'),
      subtitle: t('vt.zone4_subtitle'),
      category: 'Production',
      image: '/images/slider-images/baking-classes.jpg',
      desc: t('vt.zone4_desc'),
      specs: [
          { label: t('vt.zone4_spec1_label'), value: t('vt.zone4_spec1_value') },
          { label: t('vt.zone4_spec2_label'), value: t('vt.zone4_spec2_value') },
          { label: t('vt.zone4_spec3_label'), value: t('vt.zone4_spec3_value') }
      ]
    },
    { 
      id: 'smart-class', 
      name: t('vt.zone5_name'),
      subtitle: t('vt.zone5_subtitle'),
      category: 'Academics',
      image: '/images/slider-images/smart-classrooms.jpg',
      desc: t('vt.zone5_desc'),
      specs: [
          { label: t('vt.zone5_spec1_label'), value: t('vt.zone5_spec1_value') },
          { label: t('vt.zone5_spec2_label'), value: t('vt.zone5_spec2_value') },
          { label: t('vt.zone5_spec3_label'), value: t('vt.zone5_spec3_value') }
      ]
    },
    {
      id: 'spa',
      name: t('vt.zone6_name'),
      subtitle: t('vt.zone6_subtitle'),
      category: 'Wellness',
      image: '/images/slider-images/grroming-spa.jpg',
      desc: t('vt.zone6_desc'),
      specs: [
          { label: t('vt.zone6_spec1_label'), value: t('vt.zone6_spec1_value') },
          { label: t('vt.zone6_spec2_label'), value: t('vt.zone6_spec2_value') },
          { label: t('vt.zone6_spec3_label'), value: t('vt.zone6_spec3_value') }
      ]
    },
    { 
      id: 'makeup', 
      name: t('vt.zone7_name'),
      subtitle: t('vt.zone7_subtitle'),
      category: 'Styling',
      image: '/images/slider-images/makeup-stations.jpg',
      desc: t('vt.zone7_desc'),
      specs: [
          { label: t('vt.zone7_spec1_label'), value: t('vt.zone7_spec1_value') },
          { label: t('vt.zone7_spec2_label'), value: t('vt.zone7_spec2_value') },
          { label: t('vt.zone7_spec3_label'), value: t('vt.zone7_spec3_value') }
      ]
    },
    { 
      id: 'fitness', 
      name: t('vt.zone8_name'),
      subtitle: t('vt.zone8_subtitle'),
      category: 'Health',
      image: '/images/slider-images/fitness-center.jpg',
      desc: t('vt.zone8_desc'),
      specs: [
          { label: t('vt.zone8_spec1_label'), value: t('vt.zone8_spec1_value') },
          { label: t('vt.zone8_spec2_label'), value: t('vt.zone8_spec2_value') },
          { label: t('vt.zone8_spec3_label'), value: t('vt.zone8_spec3_value') }
      ]
    },
    { 
      id: 'yoga', 
      name: t('vt.zone9_name'),
      subtitle: t('vt.zone9_subtitle'),
      category: 'Wellness',
      image: '/images/slider-images/yoga-sessions.jpg',
      desc: t('vt.zone9_desc'),
      specs: [
          { label: t('vt.zone9_spec1_label'), value: t('vt.zone9_spec1_value') },
          { label: t('vt.zone9_spec2_label'), value: t('vt.zone9_spec2_value') },
          { label: t('vt.zone9_spec3_label'), value: t('vt.zone9_spec3_value') }
      ]
    },
    { 
      id: 'credibility', 
      name: t('vt.zone10_name'),
      subtitle: t('vt.zone10_subtitle'),
      category: 'History',
      image: '/images/slider-images/wings-certificate.jpg',
      desc: t('vt.zone10_desc'),
      specs: [
          { label: t('vt.zone10_spec1_label'), value: t('vt.zone10_spec1_value') },
          { label: t('vt.zone10_spec2_label'), value: t('vt.zone10_spec2_value') },
          { label: t('vt.zone10_spec3_label'), value: t('vt.zone10_spec3_value') }
      ]
    },
    {
      id: 'counselling',
      name: t('vt.zone11_name'),
      subtitle: t('vt.zone11_subtitle'),
      category: 'Guidance',
      image: '/images/slider-images/wings-job-interview-skills.jpg',
      desc: t('vt.zone11_desc'),
      specs: [
          { label: t('vt.zone11_spec1_label'), value: t('vt.zone11_spec1_value') },
          { label: t('vt.zone11_spec2_label'), value: t('vt.zone11_spec2_value') },
          { label: t('vt.zone11_spec3_label'), value: t('vt.zone11_spec3_value') }
      ]
    },
    { 
      id: 'computer-lab', 
      name: t('vt.zone12_name'),
      subtitle: t('vt.zone12_subtitle'),
      category: 'Tech',
      image: '/images/slider-images/computer-lab.jpg',
      desc: t('vt.zone12_desc'),
      specs: [
          { label: t('vt.zone12_spec1_label'), value: t('vt.zone12_spec1_value') },
          { label: t('vt.zone12_spec2_label'), value: t('vt.zone12_spec2_value') },
          { label: t('vt.zone12_spec3_label'), value: t('vt.zone12_spec3_value') }
      ]
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState<InstaPost | null>(null);
  
  // Use static feed directly - no loading state needed
  const feed = STATIC_FEED;
  
  const activeZone = TRANSLATED_ZONES[activeIdx];
  const autoPlayRef = useRef<number | null>(null);

  const handleNext = () => {
    setImgLoaded(false);
    setActiveIdx((prev) => (prev + 1) % TRANSLATED_ZONES.length);
  };

  const handlePrev = () => {
    setImgLoaded(false);
    setActiveIdx((prev) => (prev - 1 + TRANSLATED_ZONES.length) % TRANSLATED_ZONES.length);
  };

  const handleManualSelect = (idx: number) => {
    setImgLoaded(false);
    setActiveIdx(idx);
    setIsAutoPlay(false); 
  };

  // Auto-rotation logic for Tour (guarded)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (isAutoPlay) {
      autoPlayRef.current = window.setInterval(() => {
        handleNext();
      }, 8000); 
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay, activeIdx]);

  // Keyboard navigation (guarded)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { setIsAutoPlay(false); handleNext(); }
      if (e.key === 'ArrowLeft') { setIsAutoPlay(false); handlePrev(); }
      if (e.key === 'Escape' && fullScreenImage) {
          setFullScreenImage(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [fullScreenImage]);

  return (
    <div className="relative min-h-screen w-full bg-black font-sans text-white selection:bg-wings-red/30 overflow-x-hidden">
      
      {/* 0. HEADER (Fixed on top of everything) */}
      <Header />

      {/* 1. IMMERSIVE TOUR CONTAINER */}
      <div className="relative lg:h-[100dvh] w-full flex flex-col lg:block overflow-hidden">
      
          {/* MOBILE/TABLET CAROUSEL (Aspect ratio based to ensure complete image display) */}
          <div className="lg:hidden relative w-full aspect-[4/3] sm:aspect-video bg-zinc-900 z-20 group overflow-hidden">
                
                {/* Slider Track */}
                <div 
                    className="flex w-full h-full transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${activeIdx * 100}%)` }}
                >
                    {TRANSLATED_ZONES.map((zone) => (
                        <div key={zone.id} className="w-full h-full flex-shrink-0 relative flex items-center justify-center bg-black">
                            <img 
                                src={zone.image} 
                                alt={`${zone.name} - ${zone.subtitle} facility at Wings Institute Vadodara campus`}
                                className="w-full h-full object-cover object-center" 
                                loading="eager"
                            />
                        </div>
                    ))}
                </div>

                {/* Overlay Controls (Arrows) */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsAutoPlay(false); handlePrev(); }}
                        className="pointer-events-auto w-10 h-10 rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-wings-red transition-all active:scale-95"
                    >
                        <Icons.ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsAutoPlay(false); handleNext(); }}
                        className="pointer-events-auto w-10 h-10 rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-wings-red transition-all active:scale-95"
                    >
                        <Icons.ChevronRight className="w-5 h-5" />
                    </button>
                </div>
{/* Desktop HUD Top Bar */}
                <div className="absolute bottom-7 left-0 right-0 flex flex-col items-center z-30">
                 <div className="pointer-events-auto">
                    <h2 className={`text-xl font-display font-bold text-white tracking-wide ${isVernacular ? 'leading-[1.4]' : ''}`}>{t('vt.header')}<span className="text-white/50">{t('vt.header_accent')}</span></h2>
                </div>
             </div>
                {/* Dots Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
                    {TRANSLATED_ZONES.map((_, i) => (
                        <button 
                            key={i}
                            onClick={() => { setIsAutoPlay(false); handleManualSelect(i); }}
                            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${i === activeIdx ? 'w-6 bg-wings-red' : 'w-1.5 bg-white/40'}`}
                        />
                    ))}
                </div>
          </div>

          {/* DESKTOP BACKGROUND (Hidden on Mobile) */}
          <div className="hidden lg:block absolute inset-0 z-0 bg-black">
             {TRANSLATED_ZONES.map((zone, idx) => (
                <div 
                    key={zone.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <img 
                        src={zone.image} 
                        alt={`${zone.name} - ${zone.subtitle} training facility at Wings Institute Alkapuri Vadodara`}
                        onLoad={() => idx === activeIdx && setImgLoaded(true)}
                        className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${idx === activeIdx ? 'scale-110' : 'scale-100'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                </div>
             ))}
             {/* Cinematic Noise */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-20 mix-blend-overlay"></div>
             
             {/* Desktop HUD Top Bar */}
             <div className="absolute top-24 left-12 z-40 pointer-events-none">
                 <div className="pointer-events-auto">
                    <h2 className={`text-xl font-display font-bold text-white tracking-wide ${isVernacular ? 'leading-[1.4]' : ''}`}>{t('vt.header')}<span className="text-white/50">{t('vt.header_accent')}</span></h2>
                </div>
             </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className={`
                relative z-10 flex flex-col lg:flex-row items-end justify-between 
                h-auto lg:h-full lg:absolute lg:inset-0 order-2
                bg-zinc-900 lg:bg-transparent
                p-6 md:p-12
          `}>
             
             {/* Left Content (Text) */}
             <div className="w-full lg:max-w-3xl pointer-events-auto flex flex-col justify-start lg:justify-end h-full lg:h-auto lg:mb-10 pt-6 lg:pt-0">
                
                {/* Title */}
                <h1 className={`text-3xl md:text-5xl lg:text-8xl font-display font-black text-white mb-3 md:mb-6 drop-shadow-xl tracking-tighter animate-fade-in-up [animation-delay:100ms] ${isVernacular ? 'leading-[1.1]' : 'leading-[0.9]'}`}>
                    {activeZone.name}
                </h1>

                {/* Description */}
                <div className="relative animate-fade-in-up [animation-delay:200ms] mb-6 md:mb-8">
                    <p className={`text-zinc-400 lg:text-zinc-200 text-sm md:text-lg max-w-xl lg:border-l-4 lg:border-wings-red lg:pl-6 lg:bg-gradient-to-r lg:from-black/60 lg:to-transparent lg:p-4 lg:rounded-r-2xl lg:backdrop-blur-sm ${isVernacular ? 'leading-[1.8] font-semibold' : 'leading-relaxed'}`}>
                        {activeZone.desc}
                    </p>
                </div>

                {/* Mobile View All Thumbnails Toggle (Only on smaller screens) */}
                {/* Mobile: Simple Image Slider Thumbnails */}
                <div className="lg:hidden flex items-center gap-2 mb-8 overflow-x-auto">
                 
                    <div className="flex-1 flex overflow-x-auto gap-2">
                        {TRANSLATED_ZONES.map((zone, idx) => (
                            <button 
                                key={idx}
                                onClick={() => handleManualSelect(idx)}
                                className={`aspect-video rounded-lg overflow-hidden border-2 transition-all min-w-[64px] min-h-[48px] w-20 ${idx === activeIdx ? 'border-wings-red opacity-100' : 'border-transparent opacity-50'}`}
                            >
                                <img src={zone.image} alt={`${zone.name} virtual tour thumbnail - Wings Institute Vadodara`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                   
                </div>

             </div>

             {/* --- NAVIGATION SIDEBAR (Desktop Only) --- */}
             <div className="hidden lg:flex flex-col gap-4 pointer-events-auto h-full justify-end pl-12 border-l border-white/5 bg-gradient-to-l from-black/80 to-transparent pr-4 absolute right-0 top-0 bottom-0 w-80 pt-20 pb-8 ">
                <div className={`text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4 rotate-90 origin-left absolute top-32 -left-3 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
                    {t('vt.select_facility')}
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-hide py-4 flex flex-col justify-center">
                    {TRANSLATED_ZONES.map((zone, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleManualSelect(idx)}
                            className={`group flex items-center gap-4 w-full text-left transition-all duration-300 ${idx === activeIdx ? 'translate-x-[-10px]' : 'opacity-80 hover:opacity-100 hover:translate-x-[-5px]'}`}
                        >
                            <div className={`text-xs font-mono font-bold w-6 text-right ${idx === activeIdx ? 'text-wings-red' : 'text-white/40'}`}>
                                {String(idx + 1).padStart(2, '0')}
                            </div>
                            <div className="flex-1">
                                <div className={`text-sm uppercase text-white tracking-wider transition-colors ${idx === activeIdx ? 'text-white' : 'text-white group-hover:text-yellow-400'} ${isVernacular ? 'font-extrabold leading-[1.4]' : 'font-bold'}`}>
                                    {zone.name}
                                </div>
                            </div>
                            <div className={`w-1 h-8 rounded-full transition-all duration-300 ${idx === activeIdx ? 'bg-wings-red h-12' : 'bg-white/10 group-hover:bg-white/30'}`}></div>
                        </button>
                    ))}
                </div>

                {/* DESKTOP CTA */}
                <div className="pt-4 mt-auto">
                    <Link 
                        href={ROUTES['admissions']}
                        className={`w-full group relative px-6 py-4 bg-wings-red text-white uppercase tracking-widest text-sm overflow-hidden hover:bg-red-700 transition-colors shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center justify-center ${isVernacular ? 'font-extrabold' : 'font-bold'}`}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                        {t('vt.schedule_visit')} <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                </div>
             </div>

          </div>
      </div>

      {/* 2. CAMPUS LIFE PHOTO GRID */}
      <div className="relative z-20 bg-zinc-900 border-t border-white/10 py-20">
         <div className="max-w-6xl mx-auto px-4">
            
            {/* Social Header */}
            <div className="flex items-center gap-6 mb-10 border-b border-white/10 pb-8">
               <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                  <div className="w-full h-full bg-zinc-900 rounded-full p-1">
                     <img src="/images/wings-logo.png" alt="Wings Institute logo - Premier Aviation and Hospitality Training Gujarat" className="w-full h-full object-contain rounded-full bg-black/50" />
                  </div>
               </div>
               <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                     <h2 className={`text-xl text-white ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('vt.insta_handle')}</h2>
                     <a href="https://www.instagram.com/wingsinstitute/?hl=en" target="_blank" rel="noopener noreferrer" className={`px-4 py-1.5 bg-white text-black text-xs rounded-lg hover:bg-gray-200 transition-colors text-center ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('vt.insta_follow')}</a>
                  </div>
                  <div className={`flex gap-6 text-sm text-white mb-2 ${isVernacular ? 'font-semibold' : ''}`}>
                     <span><strong>5,000+</strong> {t('vt.insta_alumni')}</span>
                     <span><strong>57.3K</strong> {t('vt.insta_followers')}</span>
                     <span><strong>100%</strong> {t('vt.insta_placement')}</span>
                  </div>
                  <div className={`text-sm text-zinc-400 ${isVernacular ? 'leading-[1.6]' : ''}`}>
                     <span className={`text-white ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('vt.insta_buzz')}</span> • {t('vt.insta_subtitle')}
                  </div>
               </div>
            </div>

            {/* Photo Grid (Now interactive for full-screen inspection) */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-4">
            {feed.map((img) => (
                <div 
                    key={img.id} 
                    onClick={() => setFullScreenImage(img)}
                    className="relative group aspect-square bg-zinc-800 overflow-hidden cursor-zoom-in block"
                >
                    <img 
                        src={img.media_url} 
                        alt={img.caption || 'Campus Life'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2 text-center p-4">
                        <Icons.Maximize className="w-6 h-6 mb-2" />
                        {img.like_count !== null && img.like_count !== undefined && (
                            <div className={`flex items-center gap-1 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
                                <Icons.Heart className="w-4 h-4 fill-white" /> {img.like_count.toLocaleString()}
                            </div>
                        )}
                        {img.caption && (
                            <span className={`text-[10px] uppercase tracking-wider line-clamp-2 ${isVernacular ? 'font-semibold' : 'font-medium'}`}>{img.caption}</span>
                        )}
                    </div>
                </div>
            ))}
            </div>

            {/* Load More / CTA */}
            <div className="text-center mt-12">
               <a 
                  href="https://www.instagram.com/wingsinstitute/?hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-wings-red text-sm hover:text-white transition-colors uppercase tracking-widest ${isVernacular ? 'font-extrabold' : 'font-bold'}`}
               >
                  <Icons.Instagram className="w-4 h-4" /> {t('vt.insta_view_feed')}
               </a>
            </div>

         </div>
      </div>

      {/* 3. LIGHTBOX OVERLAY */}
      {fullScreenImage && (
          <div 
            className="fixed inset-0 z-[10] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
            onClick={() => setFullScreenImage(null)}
          >
             {/* Close Button */}
             <button 
                className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full bg-white/10 hover:bg-wings-red text-white flex items-center justify-center border border-white/20 transition-all z-20 active:scale-90"
                onClick={() => setFullScreenImage(null)}
             >
                <Icons.X className="w-6 h-6" />
             </button>

             {/* Image Container */}
             <div 
                className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
             >
                <div className="relative group max-h-[80vh] w-full flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <img 
                        src={fullScreenImage.media_url} 
                        alt={fullScreenImage.caption} 
                        className="max-w-full max-h-[80vh] object-contain"
                    />
                </div>
                
                {/* Meta Info Below Image */}
                {fullScreenImage.caption && (
                    <div className="mt-8 text-center max-w-2xl px-4 animate-in slide-in-from-bottom-4 duration-500">
                        <p className={`text-zinc-200 text-lg md:text-2xl font-medium font-serif italic mb-4 ${isVernacular ? 'leading-[1.8]' : 'leading-relaxed'}`}>
                            "{fullScreenImage.caption}"
                        </p>
                        <div className={`flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-wings-red ${isVernacular ? 'leading-[1.6]' : ''}`}>
                           <span className="flex items-center gap-1.5"><Icons.Heart className="w-4 h-4 fill-current" /> {fullScreenImage.like_count?.toLocaleString()} {t('vt.insta_likes')}</span>
                           <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
                           <span className="text-zinc-500">{t('vt.insta_campus_life')}</span>
                        </div>
                    </div>
                )}
             </div>
          </div>
      )}

      {/* SEO Content Module */}
      <div className="relative z-20 bg-black">
        <VirtualTourSEOContent />
      </div>

      {/* 5. FOOTER (Placed naturally below the grid) */}
      <div className="relative z-20 bg-black border-t border-white/10">
         <Footer />
      </div>

    </div>
  );
};

