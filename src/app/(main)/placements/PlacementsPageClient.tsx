'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/components/Icons';
import { FAQSection } from '@/components/FAQSection';
import { PlacementSEOContent } from '@/components/PlacementSEOContent';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

export function PlacementsPageClient() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { language, t } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  // Reset video playing state when video changes
  useEffect(() => {
    setIsVideoPlaying(false);
  }, [currentVideoIndex]);

  const fameWall = [
    { name: "Nandini Singh", role: "Cabin Crew", company: "Air India", category: "Aviation", image: "/images/success-stories/Nandini-Singh.png" },
    { name: "Namrata Bhosale", role: "Cabin Crew", company: "Air Asia", category: "Aviation", image: "/images/success-stories/Namrata-Bhosale.png" },
    { name: "Rummana Salat", role: "Airport Ground Staff", company: "Singapore Airlines", category: "Aviation", image: "/images/success-stories/Rummana-Salat.png" },
    { name: "Asmita Parmar", role: "Airport Ground Staff", company: "Indigo Airlines", category: "Aviation", image: "/images/success-stories/Asmita-Parmar.jpg" },
    { name: "Sagar Solanki", role: "Ground Staff", company: "Indigo Airlines", category: "Aviation", image: "/images/success-stories/Sagar-Solanki.jpg" },
    { name: "Pinal Panchal", role: "Ground Staff", company: "Indigo Airlines", category: "Aviation", image: "/images/success-stories/Pinal-Panchal.jpg" },
    { name: "Mohd. Fahad Diwan.", role: "Ground Staff", company: "Indigo Airlines", category: "Aviation", image: "/images/success-stories/Mohd-Fahad-Diwan.jpeg" },
    { name: "Ronak Makwana", role: "Ground Staff", company: "Air Vistara", category: "Aviation", image: "/images/success-stories/Ronak-Makwana.jpeg" },
    { name: "Ekta Christian", role: "Cabin Crew", company: "Air Asia", category: "Cabin Crew", image: "/images/success-stories/Ekta-Christian.png" },
    { name: "Shahid Malek", role: "Airport Lounge GSO", company: "Bengaluru International Airport", category: "Airport Hospitality", image: "/images/success-stories/Shahid-Malek.jpg" },
    { name: "Parth Doshi", role: "Ground Staff", company: "Mumbai International Airport", category: "Aviation", image: "/images/success-stories/Parth-Doshi.png" },
    { name: "Tofik Saiyed", role: "Airport Ground Staff", company: "Mumbai International Airport", category: "Ground Staff", image: "/images/success-stories/Tofik-Saiyed.jpg" },
    { name: "Anal Desai", role: "Cabin Crew", company: "Qatar Airways", category: "Aviation", image: "/images/success-stories/Anal-Desai.jpg" },
    { name: "Ayush Patel", role: "Ground Staff", company: "Viet Jet", category: "Aviation", image: "/images/success-stories/Ayush-Patel.jpg" },
    { name: "Shreya Vaghela", role: "Airport Retail", company: "Vadodara International Airport", category: "Aviation", image: "/images/success-stories/Shreya-Vaghela.jpg" },
    { name: "Riya Parmar", role: "Airport Retail", company: "Vadodara International Airport", category: "Aviation", image: "/images/success-stories/Riya-Parmar.jpg" },
    { name: "Akash Pitroda", role: "Ground Staff", company: "Etihad Airways", category: "Aviation", image: "/images/success-stories/Akash-Pitroda.jpg" },
    { name: "Prince Jaglawala", role: "Ground Staff", company: "Ahmedabad International Airport", category: "Aviation", image: "/images/success-stories/Prince-Jaglawala.jpg" },
    { name: "Heer Dabhi", role: "Ground Staff", company: "Air Arabia", category: "Aviation", image: "/images/success-stories/Heer-Dabhi.jpg" },
    { name: "Nirali Verma", role: "Airport Retail", company: "Vadodara International Airport", category: "Aviation", image: "/images/success-stories/Nirali-Verma.jpg" },
    { name: "Krish Mehta", role: "Ground Staff", company: "Ahmedabad International Airport", category: "Aviation", image: "/images/success-stories/Krish-Mehta.jpg" },
    { name: "Rahul Pandya", role: "Ground Staff", company: "Ahmedabad International Airport", category: "Airport", image: "/images/success-stories/Rahul-Pandya.jpg" },
    { name: "Mrunali Amin", role: "Airport Staff", company: "Vadodara International Airport", category: "Airport", image: "/images/success-stories/Mrunali-Amin.jpg" },
    { name: "Pushkar Taylor", role: "British Cruise Line", company: "Marella Voyager", category: "Cruise Staff", image: "/images/success-stories/Pushkar-Taylor.jpg" },
    { name: "Benazir Malek", role: "Chef", company: "Training", category: "Culinary Arts", image: "/images/success-stories/Benazir-Yusuf-Malek-chef-training.jpg" },
    { name: "Neha Bariya", role: "Ground Staff", company: "Air Arabia", category: "Airport Staff", image: "/images/success-stories/Neha-Bariya-Ground-Staff-Air-Arabia.jpg" },
    { name: "Nancy Bhavsar", role: "Cabin Crew", company: "Spicejet", category: "Cabin Crew", image: "/images/success-stories/Nancy-Bhavsar-Cabin-Crew-SpiceJet.jpg" },
    { name: "Zeel Patel", role: "Aviation Staff", company: "Singapore Airlines", category: "Aviation Staff", image: "/images/success-stories/Zeel-Patel-Singapore-Airlines.jpg" }
  ];

  const videoVault = [
    { 
      id: 1,
      title: "Wings Institute Success Story", 
      subtitle: "Student Success Story",
      views: "15k", 
      color: "from-blue-600 to-indigo-600", 
      thumbnail: "https://img.youtube.com/vi/SH6uPanErRM/maxresdefault.jpg",
      videoId: "SH6uPanErRM",
      youtubeUrl: "https://youtube.com/shorts/SH6uPanErRM",
      icon: <Icons.UserCheck className="w-4 h-4" />
    },
    { 
      id: 2,
      title: "Wings Institute Training", 
      subtitle: "Wings Campus",
      views: "22k", 
      color: "from-pink-500 to-rose-500", 
      thumbnail: "https://img.youtube.com/vi/2wMbRT97tsI/maxresdefault.jpg",
      videoId: "2wMbRT97tsI",
      youtubeUrl: "https://youtube.com/shorts/2wMbRT97tsI",
      icon: <Icons.Luggage className="w-4 h-4" />
    },
    { 
      id: 3,
      title: "Wings Institute Experience", 
      subtitle: "Student Journey",
      views: "50k", 
      color: "from-wings-red to-orange-600", 
      thumbnail: "https://img.youtube.com/vi/clt0OMm3UjE/maxresdefault.jpg",
      videoId: "clt0OMm3UjE",
      youtubeUrl: "https://youtube.com/shorts/clt0OMm3UjE",
      icon: <Icons.Sparkles className="w-4 h-4" />
    },
    { 
      id: 4,
      title: "Wings Institute Placement", 
      subtitle: "Aviation Dept",
      views: "10k", 
      color: "from-purple-500 to-violet-600", 
      thumbnail: "https://img.youtube.com/vi/phvKKfEnFkw/maxresdefault.jpg",
      videoId: "phvKKfEnFkw",
      youtubeUrl: "https://youtube.com/shorts/phvKKfEnFkw",
      icon: <Icons.Plane className="w-4 h-4" />
    },
    { 
      id: 5,
      title: "Wings Institute Success", 
      subtitle: "Events Team",
      views: "35k", 
      color: "from-emerald-500 to-teal-600", 
      thumbnail: "https://img.youtube.com/vi/xkknjYxqxTU/maxresdefault.jpg",
      videoId: "xkknjYxqxTU",
      youtubeUrl: "https://youtube.com/shorts/xkknjYxqxTU",
      icon: <Icons.PartyPopper className="w-4 h-4" />
    },
    { 
      id: 6,
      title: "Wings Institute Journey", 
      subtitle: "Student Experience",
      views: "18k", 
      color: "from-blue-600 to-cyan-600", 
      thumbnail: "https://img.youtube.com/vi/TQME7lXgOtg/maxresdefault.jpg",
      videoId: "TQME7lXgOtg",
      youtubeUrl: "https://youtube.com/shorts/TQME7lXgOtg",
      icon: <Icons.Plane className="w-4 h-4" />
    }
  ];

  const currentVideo = videoVault[currentVideoIndex];

  return (
    <div className="min-h-screen pt-3 pb-20 relative z-10">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-wings-red/5 dark:bg-red-900/10 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* Hero Section */}
      <section className="px-6 mb-16 lg:mb-20 relative">
        <div className="max-w-7xl mx-auto text-center">

          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-4">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-white/20 animate-fade-in-up bg-white/40 dark:bg-white/5 backdrop-blur-md`}>
              <Icons.Rocket className="w-4 h-4 text-blue-500" />
              <span className={`text-xs text-zinc-600 dark:text-zinc-300 uppercase tracking-widest ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('place.badge')}</span>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-center gap-2 mb-8 lg:mb-0 animate-fade-in-up">
              <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {t('hero.translate') || 'Translate'}
              </label>
              <LanguageToggle isHomepage={true} />
            </div>
          </div>
          
          <h1 className={`font-display text-5xl md:text-8xl font-black text-zinc-900 dark:text-white tracking-tighter mb-6 animate-fade-in-up [animation-delay:200ms] ${isVernacular ? 'leading-[1.1]' : 'leading-[0.9]'}`}>
            {t('place.title')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-wings-red italic pr-2">
              {t('place.title_accent')}
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto mb-10 animate-fade-in-up [animation-delay:400ms] ${isVernacular ? 'leading-[1.8] font-semibold' : 'leading-relaxed'}`}>
            {t('place.subtitle')}
          </p>

          <div className="inline-flex flex-wrap justify-center gap-4 md:gap-8 animate-fade-in-up [animation-delay:600ms] p-1">
            <div className="flex flex-col items-center px-6 py-2.5 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-sm">
              <span className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white">98%</span>
              <span className={`text-[9px] uppercase tracking-widest text-zinc-500 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('place.stat_selection')}</span>
            </div>
            <div className="flex flex-col items-center px-6 py-2.5 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-sm">
              <span className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white">100%</span>
              <span className={`text-[9px] uppercase tracking-widest text-zinc-500 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('place.stat_placement')}</span>
            </div>
            <div className="flex flex-col items-center px-6 py-2.5 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-sm">
              <span className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white">100+</span>
              <span className={`text-[9px] uppercase tracking-widest text-zinc-500 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('place.stat_recruiters')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO VAULT */}
      <section className="px-6 mb-20 lg:mb-24">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
            <div>
              <h2 className={`font-display text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-2 ${isVernacular ? 'leading-[1.2]' : ''}`}>
                {t('place.stories')} <span className="italic text-zinc-400">{t('place.stories_accent')}</span>
              </h2>
              <p className={`text-zinc-600 dark:text-zinc-400 text-lg ${isVernacular ? 'leading-[1.6] font-semibold' : ''}`}>{t('place.video_desc')}</p>
            </div>
            <a href="https://www.youtube.com/wingsinstitute" target="_blank" rel="noopener noreferrer" className={`group flex items-center gap-2 px-6 py-3 rounded-full bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white transition-all text-sm ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
              <Icons.Youtube className="w-5 h-5" />
              <span>{t('place.subscribe')}</span>
            </a>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            
            {/* Phone Mockup */}
            <div className="relative mx-auto lg:mx-0 shrink-0">
              <div className="w-[300px] h-[600px] md:w-[340px] md:h-[680px] bg-zinc-900 rounded-[3rem] border-[12px] border-zinc-900 shadow-2xl relative overflow-hidden ring-4 ring-zinc-200/20 dark:ring-white/5">
                
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-900 rounded-b-2xl z-30"></div>
                
                <div className="w-full h-full relative bg-black">
                  {isVideoPlaying ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&playsinline=1`}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={currentVideo.title}
                    ></iframe>
                  ) : (
                    <>
                      <Image
                        src={currentVideo.thumbnail}
                        alt={currentVideo.title}
                        fill
                        priority
                        fetchPriority="high"
                        quality={85}
                        className="object-cover"
                        sizes="(max-width: 768px) 300px, 340px"
                      />
                      <button
                        onClick={() => setIsVideoPlaying(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors z-30 cursor-pointer group"
                        aria-label={`Play ${currentVideo.title}`}
                      >
                        <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Icons.PlayCircle className="w-10 h-10 text-white ml-1" />
                        </div>
                      </button>
                    </>
                  )}
                  
                  <div className={`absolute inset-0 bg-gradient-to-b ${currentVideo.color} mix-blend-overlay opacity-20 pointer-events-none`}></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none"></div>

                  <div className={`absolute top-8 left-0 right-0 px-6 flex justify-between items-center z-20 text-white/90 text-xs pointer-events-none ${isVernacular ? 'font-semibold' : 'font-medium'}`}>
                    <span className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">{t('place.wings_shorts')}</span>
                    <span className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">{currentVideo.views} {t('place.views')}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-xs font-bold mb-3">
                      {currentVideo.icon} {currentVideo.subtitle}
                    </div>
                    <h3 className="font-bold text-2xl leading-tight mb-4 drop-shadow-md">
                      {currentVideo.title}
                    </h3>
                  </div>
                </div>
              </div>
              
              <div className="absolute -inset-4 bg-gradient-to-b from-wings-red/20 to-blue-600/20 blur-3xl -z-10 rounded-[4rem]"></div>
            </div>

            {/* Video List */}
            <div className="flex-1 w-full max-w-lg">
              <h3 className={`text-sm uppercase tracking-widest text-zinc-500 mb-4 px-2 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('place.next_up')}</h3>
              <div className="flex flex-col gap-2.5 pr-2">
                {videoVault.map((video, idx) => (
                  <div 
                    key={video.id}
                    onClick={() => {
                      setCurrentVideoIndex(idx);
                      setIsVideoPlaying(false);
                    }}
                    className={`
                      group relative flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 border
                      ${currentVideoIndex === idx 
                        ? 'bg-white dark:bg-zinc-800 border-wings-red/50 shadow-lg scale-[1.02]' 
                        : 'bg-white/40 dark:bg-white/5 border-white/40 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 hover:border-zinc-300'
                      }
                    `}
                  >
                    <div className="w-20 h-24 shrink-0 rounded-xl overflow-hidden relative shadow-sm">
                      <Image src={video.thumbnail} alt={`Alumni testimonial video - ${video.title} Wings Institute placement success`} width={80} height={96} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                      {currentVideoIndex === idx && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-wings-red animate-ping"></div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 py-1">
                      <h4 className={`font-bold text-sm mb-1 line-clamp-2 ${currentVideoIndex === idx ? 'text-wings-red' : 'text-zinc-900 dark:text-white'}`}>
                        {video.title}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mb-2">
                        {video.icon} <span className="truncate">{video.subtitle}</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-zinc-100 dark:bg-white/10 px-2 py-0.5 rounded text-zinc-500">
                          <Icons.PlayCircle className="w-3 h-3 inline mr-1" />
                          {video.views}
                        </span>
                      </div>
                    </div>

                    <div className="pr-2 text-zinc-300 dark:text-zinc-600 group-hover:text-wings-red transition-colors">
                      <Icons.PlayCircle className="w-6 h-6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WALL OF FAME SECTION */}
      <section className="px-6 mb-16 lg:mb-20" id="wall-of-fame">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className={`text-wings-red text-xs tracking-wider uppercase mb-3 block flex items-center gap-2 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
                <span className="w-8 h-[2px] bg-wings-red"></span> {t('place.hall_fame')}
              </span>
              <h2 className={`font-display text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.2]' : ''}`}>
                {t('place.meet_stars')}
              </h2>
            </div>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6">
            {fameWall.map((student, idx) => (
              <div key={idx} className="break-inside-avoid relative group rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-zinc-900">
                <div className="aspect-[3/4] relative">
                  <Image 
                    src={student.image} 
                    alt={`${student.name}, Wings Institute alumnus working as ${student.role} at ${student.company}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 rounded-lg bg-wings-red text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
                        {student.company}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl mb-1">{student.name}</h3>
                    <p className="text-zinc-300 text-sm font-medium flex items-center gap-2">
                      {student.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 mb-16 lg:mb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-panel p-10 md:p-12 rounded-[3rem] border border-wings-red/20 bg-gradient-to-br from-white to-red-50 dark:from-zinc-900 dark:to-zinc-950 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-wings-red/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className={`font-display text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 ${isVernacular ? 'leading-[1.3]' : ''}`}>
                {t('place.cta_title')} <span className="text-wings-red italic">{t('place.cta_title_accent')}</span> {t('place.cta_title_end')}
              </h2>
              <p className={`text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto ${isVernacular ? 'leading-[1.8] font-semibold' : 'leading-relaxed'}`}>
                {t('place.cta_desc')}
              </p>
              <Link 
                href="/admissions"
                className={`group relative px-10 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all inline-flex items-center justify-center gap-3 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}
              >
                {t('place.cta_btn')} <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Module */}
      <PlacementSEOContent />

      {/* FAQ Section */}
      <FAQSection 
        title={t('place.faq_title')}
        color="blue"
        schemaId="placement-page-faq"
        data={[
          { q: t('place.faq1_q'), a: t('place.faq1_a') },
          { q: t('place.faq2_q'), a: t('place.faq2_a') },
          { q: t('place.faq3_q'), a: t('place.faq3_a') },
          { q: t('place.faq4_q'), a: t('place.faq4_a') }
        ]}
      />

    </div>
  );
}

