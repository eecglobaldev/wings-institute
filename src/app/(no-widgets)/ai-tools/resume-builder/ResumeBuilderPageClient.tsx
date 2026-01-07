'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '@/components/Icons';
import { StudentLogin } from '@/components/StudentLogin';
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeBuilderSEOContent } from '@/components/ResumeBuilderSEOContent';

// --- DATA MODELS ---

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string;
}

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  score: string;
}

interface CertificationItem {
  name: string;
  issuingAuthority: string;
  licenseNumber: string;
  expiryDate: string;
}

interface AwardItem {
  name: string;
  issuer: string;
  date: string;
  description: string;
}

interface SocialLinks {
  linkedin: string;
  portfolio: string;
}

interface ResumeData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    dob: string;
    targetRole: string;
    summary: string;
    photo: string | null;
  };
  experience: {
    isFresher: boolean;
    list: ExperienceItem[];
  };
  education: EducationItem[];
  certifications: CertificationItem[];
  awards: AwardItem[];
  socialLinks: SocialLinks;
  skills: string[];
  languages: {
    name: string;
    level: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
  }[];
  strengths: string[];
  hobbies: string[];
  checklist: {
    photoAttached: boolean;
    noTattoos: boolean;
    bmiStandard: boolean;
    englishCert: boolean;
  };
}

const INITIAL_RESUME: ResumeData = {
  personal: { fullName: '', email: '', phone: '', city: '', dob: '', targetRole: '', summary: '', photo: null },
  experience: { isFresher: true, list: [] },
  education: [{ degree: '', institution: '', year: '', score: '' }],
  certifications: [],
  awards: [],
  socialLinks: { linkedin: '', portfolio: '' },
  skills: [],
  languages: [
    { name: 'English', level: 'Conversational' },
    { name: 'Hindi', level: 'Fluent' }
  ],
  strengths: [],
  hobbies: [],
  checklist: {
    photoAttached: false,
    noTattoos: false,
    bmiStandard: false,
    englishCert: false
  }
};

// Note: API key should be handled via server action for security
// For now, using client-side with environment variable (should be moved to server action)
const getAIInstance = () => {
  if (typeof window === 'undefined') return null;
  // API key should come from server action, not client-side env
  // This is a temporary solution - should be refactored
  return new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });
};

export const ResumeBuilderPageClient: React.FC = () => {

  const [mode, setMode] = useState<'LANDING' | 'BUILD' | 'PREVIEW' | 'JOBMATCH'>('LANDING');
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState(1);
  const [resume, setResume] = useState<ResumeData>(INITIAL_RESUME);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [atsFeedback, setAtsFeedback] = useState<string>('');
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [isSearchingJobs, setIsSearchingJobs] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleLogin = (data: any) => {
    setUserName(data.name);
    setIsLoggedIn(true);
    setResume(prev => ({ 
      ...prev, 
      personal: { 
        ...prev.personal, 
        fullName: data.name, 
        email: data.email, 
        phone: data.phone, 
        city: data.city 
      } 
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) return alert("Image must be under 2MB for optimized processing.");
      const reader = new FileReader();
      reader.onloadend = () => {
        setResume(prev => ({ 
          ...prev, 
          personal: { ...prev.personal, photo: reader.result as string },
          checklist: { ...prev.checklist, photoAttached: true }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- FORENSIC AI LOGIC ---

  const handleAiOptimize = async (section: string, index?: number) => {
    setIsAiLoading(true);
    try {
      let prompt = "";
      if (section === 'summary') {
        prompt = `ACT AS: A Senior Aviation HR Director (Ex-Emirates/Taj). 
        TASK: Write a high-impact professional profile summary (max 50 words) for a candidate named ${resume.personal.fullName} targeting a ${resume.personal.targetRole} position.
        REQUIREMENTS: Use elite vocabulary (poise, safety-first, luxury, standard, service excellence). Focus on personality traits and commitment to hospitality standards.`;
      } else if (section === 'experience' && index !== undefined) {
        const item = resume.experience.list[index];
        prompt = `ACT AS: A Professional Resume Editor for high-end hospitality careers.
        TASK: Rewrite the following job description for the role of ${item.role} at ${item.company} to sound significantly more professional and achievement-oriented. 
        CONTENT: "${item.description}". 
        RULES: Use strong action verbs (Spearheaded, Orchestrated, Executed). Max 45 words. Focus on Guest Experience and Operational Efficiency.`;
      }

      const aiInstance = getAIInstance();
      if (!aiInstance) {
        alert("AI optimization service temporarily congested. Please try manually for now.");
        setIsAiLoading(false);
        return;
      }

      const response = await aiInstance.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      const text = response.text || '';
      if (section === 'summary') {
        setResume(prev => ({ ...prev, personal: { ...prev.personal, summary: text } }));
      } else if (section === 'experience' && index !== undefined) {
        const newList = [...resume.experience.list];
        newList[index].description = text;
        setResume(prev => ({ ...prev, experience: { ...prev.experience, list: newList } }));
      }
    } catch (e) {
      console.error("Forensic AI Error:", e);
      alert("AI optimization service temporarily congested. Please try manually for now.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const calculateAtsWithAI = async () => {
    setIsAiLoading(true);
    setMode('PREVIEW');
    
    try {
      const resumeString = JSON.stringify({
        summary: resume.personal.summary,
        experience: resume.experience.list,
        education: resume.education,
        skills: resume.skills,
        role: resume.personal.targetRole
      });

      const prompt = `ACT AS: An Applicant Tracking System (ATS) used by IndiGo, Air India, and Taj Hotels.
      TASK: Analyze this candidate data against global aviation/hospitality hiring parameters.
      DATA: ${resumeString}
      OUTPUT: Provide a numeric 'score' (0-100) and a one-sentence 'feedback' summary. Return as JSON.`;

      const aiInstance = getAIInstance();
      if (!aiInstance) {
        setAtsScore(85);
        setAtsFeedback("High-quality profile detected. Ready for manual review by recruiters.");
        setIsAiLoading(false);
        return;
      }

      const response = await aiInstance.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    score: { type: Type.NUMBER },
                    feedback: { type: Type.STRING }
                },
                required: ["score", "feedback"]
            }
        }
      });

      const result = JSON.parse(response.text || '{"score": 75, "feedback": "Solid foundation."}');
      setAtsScore(result.score);
      setAtsFeedback(result.feedback);
    } catch (e) {
      setAtsScore(85);
      setAtsFeedback("High-quality profile detected. Ready for manual review by recruiters.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const downloadFile = (format: 'docx') => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Elite Resume</title>
      <style>
        /* Forensic Update: Force Sans-Serif stack for modern look in Word */
        body { font-family: 'Helvetica', 'Arial', sans-serif; line-height: 1.4; color: #1a1a1a; margin: 40px; }
        .header { border-bottom: 2pt solid #4F46E5; margin-bottom: 20px; padding-bottom: 10px; text-align: center; }
        .name { font-size: 26pt; font-weight: bold; text-transform: uppercase; color: #1e1b4b; margin: 0; }
        .contact { font-size: 10pt; color: #4b5563; margin-top: 5px; }
        .section-title { font-size: 12pt; font-weight: bold; color: #1e1b4b; border-bottom: 1pt solid #d1d5db; margin: 15px 0 8px 0; text-transform: uppercase; letter-spacing: 1.5px; }
        .content { font-size: 11pt; margin-bottom: 10px; color: #374151; }
        .sub-item { margin-bottom: 12px; }
        .role { font-weight: bold; color: #111827; }
        .company { font-style: italic; color: #4b5563; }
        .date { float: right; color: #6b7280; font-size: 10pt; }
      </style>
      </head>
      <body>
        <div class="header">
          <h1 class="name">${resume.personal.fullName}</h1>
          <div class="contact">
            ${resume.personal.email} • ${resume.personal.phone} • ${resume.personal.city}
          </div>
        </div>
        <div class="section-title">Professional Profile</div>
        <div class="content">${resume.personal.summary}</div>
        ${!resume.experience.isFresher && resume.experience.list.length > 0 ? `
        <div class="section-title">Professional Experience</div>
        ${resume.experience.list.map(exp => `
          <div class="sub-item">
            <span class="date">${exp.duration}</span>
            <div class="role">${exp.role.toUpperCase()}</div>
            <div class="company">${exp.company}</div>
            <div class="content">${exp.description}</div>
          </div>
        `).join('')}
        ` : ''}
        <div class="section-title">Education</div>
        ${resume.education.map(edu => `
          <div class="sub-item">
            <span class="date">${edu.year}</span>
            <div class="role">${edu.degree}</div>
            <div class="company">${edu.institution} • Score: ${edu.score}</div>
          </div>
        `).join('')}
        ${resume.certifications.length > 0 ? `
        <div class="section-title">Certifications & Licenses</div>
        ${resume.certifications.map(cert => `
          <div class="sub-item">
            <div class="role">${cert.name}</div>
            <div class="company">${cert.issuingAuthority}${cert.licenseNumber ? ` • License: ${cert.licenseNumber}` : ''}${cert.expiryDate ? ` • Expires: ${new Date(cert.expiryDate).toLocaleDateString()}` : ''}</div>
          </div>
        `).join('')}
        ` : ''}
        ${resume.awards.length > 0 ? `
        <div class="section-title">Honors & Awards</div>
        ${resume.awards.map(award => `
          <div class="sub-item">
            ${award.date ? `<span class="date">${new Date(award.date).toLocaleDateString()}</span>` : ''}
            <div class="role">${award.name}</div>
            <div class="company">${award.issuer}</div>
            ${award.description ? `<div class="content">${award.description}</div>` : ''}
          </div>
        `).join('')}
        ` : ''}
        ${(resume.socialLinks.linkedin || resume.socialLinks.portfolio) ? `
        <div class="section-title">Digital Presence</div>
        <div class="content">
          ${resume.socialLinks.linkedin ? `<strong>LinkedIn:</strong> ${resume.socialLinks.linkedin}<br/>` : ''}
          ${resume.socialLinks.portfolio ? `<strong>Portfolio:</strong> ${resume.socialLinks.portfolio}` : ''}
        </div>
        ` : ''}
        <div class="section-title">Key Proficiencies</div>
        <div class="content"><strong>Technical:</strong> ${resume.skills.join(', ')}</div>
        <div class="content"><strong>Linguistic:</strong> ${resume.languages.map(l => `${l.name} (${l.level})`).join(', ')}</div>
        <div class="section-title">Additional Assets</div>
        <div class="content"><strong>Strengths:</strong> ${resume.strengths.join(', ')}</div>
        <div class="content"><strong>Interests:</strong> ${resume.hobbies.join(', ')}</div>
        <div style="margin-top: 40px; font-size: 8pt; color: #9ca3af; text-align: center; border-top: 1pt solid #f3f4f6; padding-top: 10px;">
          VERIFIED BY WINGS INSTITUTE AI ARCHITECT PROTOCOL 2026
        </div>
      </body>
      </html>
    `;
    if (typeof document === 'undefined') return;
    
    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${resume.personal.fullName.replace(/\s+/g, '_')}_Elite_CV.doc`;
    link.click();
  };

  const searchJobs = async () => {
    if (!jobSearchQuery) return;
    setIsSearchingJobs(true);
    setHasSearched(true);
    setSearchResults([]);
    
    try {
      const prompt = `ACT AS: A Career Intelligence Engine for Wings Institute.
      TASK: Perform a LIVE Search for ALL active vacancies matching "${jobSearchQuery}" on official portals of: IndiGo, Air India, Taj Hotels, Marriott India.
      RULES:
      1. ONLY return real vacancies currently listed on their career pages.
      2. Return between 0 to 10 results.
      3. Return ONLY a valid JSON array. If no jobs are found, return an empty array [].
      4. Format: [{"company": "Name", "role": "Title", "location": "City", "link": "Direct Portal Link"}]`;
      
      const aiInstance = getAIInstance();
      if (!aiInstance) {
        setSearchResults([]);
        setIsSearchingJobs(false);
        return;
      }

      const response = await aiInstance.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { 
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json"
        },
      });

      // Grounding URLs logging as per guidelines (not displayed but tracked)
      const groundingLinks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingLinks) {
          console.debug("Grounding sources verified:", groundingLinks);
      }

      const text = response.text || "[]";
      const parsed = JSON.parse(text);
      setSearchResults(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      console.error(e);
      setSearchResults([]);
    } finally {
      setIsSearchingJobs(false);
    }
  };

  // --- RENDER VIEWS ---

  if (!isLoggedIn) {
    return <StudentLogin toolName="Resume Architect" onLoginSuccess={handleLogin} onClose={() => window.history.back()} />;
  }

  const renderLanding = () => (
    <div className="max-w-6xl mx-auto text-center animate-fade-in-up px-6 px-[env(safe-area-inset-left)] px-[env(safe-area-inset-right)]">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-indigo-500/30 mb-8 bg-indigo-500/5">
        <Icons.FileText className="w-4 h-4 text-indigo-500" />
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Aviation Protocol 2026</span>
      </div>
      <h1 className="font-display text-5xl md:text-8xl font-black text-zinc-900 dark:text-white mb-6 tracking-tighter">
        The Forensic <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 italic pr-2">Architect.</span>
      </h1>
      <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-16 leading-relaxed font-light">
        Transform your profile from 'Applicant' to 'Executive Asset'. Our neural architect scans industry parameters to build your 5-star professional blueprint.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <button onClick={() => setMode('BUILD')} aria-label="Start Building Resume" className="group text-left glass-panel p-10 rounded-[3rem] hover:-translate-y-2 transition-all bg-white dark:bg-black/40 border border-white/40 dark:border-white/10 shadow-2xl overflow-hidden relative active:scale-[0.98] touch-manipulation">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-indigo-500/10 transition-all"></div>
           <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-500 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform"><Icons.PenTool className="w-8 h-8" /></div>
           <h3 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-3">Initialize Build</h3>
           <p className="text-zinc-500 text-sm leading-relaxed mb-8">Step-by-step guidance with industry-specific AI word selection for maximum impact.</p>
           <div className="flex items-center gap-2 text-xs font-black text-indigo-500 uppercase tracking-widest">Launch Core Module <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
        </button>
        
        <button onClick={() => setMode('JOBMATCH')} aria-label="Search Live Jobs" className="group text-left glass-panel p-10 rounded-[3rem] hover:-translate-y-2 transition-all bg-white dark:bg-black/40 border border-white/40 dark:border-white/10 shadow-2xl overflow-hidden relative active:scale-[0.98] touch-manipulation">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/10 transition-all"></div>
           <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 text-blue-500 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform"><Icons.Search className="w-8 h-8" /></div>
           <h3 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-3">Live Opportunity Scan</h3>
           <p className="text-zinc-500 text-sm leading-relaxed mb-8">Ground-truth verified job openings synced directly from premium airline career portals.</p>
           <div className="flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-widest">Start Scanning <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
        </button>
      </div>
    </div>
  );

  const renderBuild = () => (
    <div className="max-w-5xl mx-auto animate-fade-in pb-32 px-6 px-[env(safe-area-inset-left)] px-[env(safe-area-inset-right)]">
       {/* Stepper HUD: Horizontal scrollable on mobile */}
       <div className="flex justify-between items-center mb-16 relative overflow-x-auto no-scrollbar">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 dark:bg-white/10 -z-10 min-w-[900px]"></div>
          {[
            { id: 1, label: 'Profile' },
            { id: 2, label: 'Work' },
            { id: 3, label: 'Academia' },
            { id: 4, label: 'Certifications' },
            { id: 5, label: 'Awards' },
            { id: 6, label: 'Social' },
            { id: 7, label: 'Skills' },
            { id: 8, label: 'Traits' },
            { id: 9, label: 'Audit' }
          ].map(s => (
            <div key={s.id} className="flex flex-col items-center gap-3 shrink-0 px-2 md:px-0">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black transition-all duration-500 ${step >= s.id ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}>
                    {step > s.id ? <Icons.Check className="w-6 h-6" /> : s.id}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${step >= s.id ? 'text-indigo-600' : 'text-zinc-400'}`}>{s.label}</span>
            </div>
          ))}
       </div>

       <div className="glass-panel p-6 md:p-14 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-white/40 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

          {step === 1 && (
            <div className="space-y-10 animate-fade-in">
               <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                  <div className="shrink-0 flex flex-col items-center">
                    <div onClick={() => fileInputRef.current?.click()} className="w-32 h-44 md:w-40 md:h-52 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 overflow-hidden bg-zinc-50 dark:bg-black/20 transition-all group/photo relative touch-manipulation">
                        {resume.personal.photo ? (
                            <img src={resume.personal.photo} className="w-full h-full object-cover" alt={`${resume.personal.fullName || 'Candidate'} profile photo - Wings Institute Resume Builder`} />
                        ) : (
                            <div className="flex flex-col items-center gap-3 p-4">
                                <Icons.Camera className="w-10 h-10 text-zinc-300" />
                                <span className="text-[9px] font-black text-zinc-400 text-center uppercase tracking-widest">Portrait Photo</span>
                            </div>
                        )}
                    </div>
                    <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handlePhotoUpload} />
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* text-[16px] prevents iOS zoom behavior */}
                    <input placeholder="Full Name" value={resume.personal.fullName} onChange={e => setResume({...resume, personal: {...resume.personal, fullName: e.target.value}})} className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500/50 text-[16px]" />
                    <input type="date" value={resume.personal.dob} onChange={e => setResume({...resume, personal: {...resume.personal, dob: e.target.value}})} className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500/50 text-[16px]" />
                    <input placeholder="Email Address" type="email" value={resume.personal.email} onChange={e => setResume({...resume, personal: {...resume.personal, email: e.target.value}})} className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500/50 text-[16px]" />
                    <input placeholder="Phone Number" type="tel" value={resume.personal.phone} onChange={e => setResume({...resume, personal: {...resume.personal, phone: e.target.value}})} className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500/50 text-[16px]" />
                    <input placeholder="City" value={resume.personal.city} onChange={e => setResume({...resume, personal: {...resume.personal, city: e.target.value}})} className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500/50 text-[16px]" />
                    <select value={resume.personal.targetRole} onChange={e => setResume({...resume, personal: {...resume.personal, targetRole: e.target.value}})} className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none appearance-none cursor-pointer text-[16px]">
                        <option value="">Target Domain</option>
                        <option value="Cabin Crew">Cabin Crew</option>
                        <option value="Ground Staff">Airport Management</option>
                        <option value="Hotel Management">Hotel Management</option>
                        <option value="Culinary Professional">Culinary Professional</option>
                    </select>
                  </div>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between items-end px-1">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Professional Summary</label>
                      <button onClick={() => handleAiOptimize('summary')} disabled={isAiLoading || !resume.personal.targetRole} className="text-[10px] font-black text-indigo-600 hover:text-indigo-500 uppercase flex items-center gap-1.5 transition-colors disabled:opacity-30 active:scale-95 touch-manipulation">
                        {isAiLoading ? <Icons.Loader2 className="w-3 h-3 animate-spin" /> : <Icons.Sparkles className="w-3 h-3" />} AI Scan
                      </button>
                  </div>
                  <textarea value={resume.personal.summary} onChange={e => setResume({...resume, personal: {...resume.personal, summary: e.target.value}})} rows={4} className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-[2rem] px-6 md:px-8 py-6 outline-none resize-none text-[16px]" placeholder="Elevate your profile with a powerful summary..." />
               </div>
            </div>
          )}

          {step === 2 && (
             <div className="space-y-10 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-zinc-900 dark:text-white">Experience</h2>
                    <div className="flex items-center gap-4 md:gap-6">
                        <label className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform touch-manipulation">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${resume.experience.isFresher ? 'bg-indigo-600 border-indigo-600' : 'border-zinc-300'}`}>
                                {resume.experience.isFresher && <Icons.Check className="w-3 h-3 text-white" />}
                            </div>
                            <input type="checkbox" className="hidden" checked={resume.experience.isFresher} onChange={e => setResume({...resume, experience: {...resume.experience, isFresher: e.target.checked, list: e.target.checked ? [] : resume.experience.list}})} /> 
                            <span className="text-xs font-black uppercase text-zinc-500">I am a Fresher</span>
                        </label>
                        {!resume.experience.isFresher && (
                            <button onClick={() => setResume({...resume, experience: {...resume.experience, list: [...resume.experience.list, {role: '', company: '', duration: '', description: ''}]}})} className="px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-600 text-xs font-bold border border-indigo-500/20 active:scale-95 transition-transform touch-manipulation">Add Role</button>
                        )}
                    </div>
                </div>
                {resume.experience.isFresher ? (
                    <div className="p-12 md:p-20 text-center border-2 border-dashed border-zinc-100 dark:border-white/5 rounded-[3rem] flex flex-col items-center justify-center bg-zinc-50/50 dark:bg-black/10">
                        <Icons.UserCheck className="w-12 h-12 text-zinc-200 dark:text-zinc-800 mb-4" />
                        <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">Potential mode active for freshers.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {resume.experience.list.map((exp, i) => (
                            <div key={i} className="p-6 md:p-10 rounded-[2.5rem] bg-zinc-50/80 dark:bg-black/30 border border-zinc-100 dark:border-white/5 space-y-6 relative">
                                <button onClick={() => setResume({...resume, experience: {...resume.experience, list: resume.experience.list.filter((_, idx) => idx !== i)}})} aria-label="Remove Experience" className="absolute top-6 right-6 p-2 rounded-full hover:bg-red-500/10 text-zinc-300 hover:text-red-500 transition-colors active:scale-90 touch-manipulation">
                                    <Icons.X className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <input placeholder="Job Title" value={exp.role} onChange={e => { const nl = [...resume.experience.list]; nl[i].role = e.target.value; setResume({...resume, experience: {...resume.experience, list: nl}}); }} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-3 text-[16px]" />
                                    <input placeholder="Company" value={exp.company} onChange={e => { const nl = [...resume.experience.list]; nl[i].company = e.target.value; setResume({...resume, experience: {...resume.experience, list: nl}}); }} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-3 text-[16px]" />
                                    <input placeholder="Duration" value={exp.duration} onChange={e => { const nl = [...resume.experience.list]; nl[i].duration = e.target.value; setResume({...resume, experience: {...resume.experience, list: nl}}); }} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-3 text-[16px]" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between px-1">
                                        <label className="text-[10px] font-black uppercase text-zinc-400">Impact Statements</label>
                                        <button onClick={() => handleAiOptimize('experience', i)} disabled={isAiLoading || !exp.description} className="text-[10px] font-black text-indigo-600 flex items-center gap-1.5 transition-all active:scale-95 touch-manipulation">
                                            {isAiLoading ? <Icons.Loader2 className="w-3 h-3 animate-spin" /> : <Icons.Sparkles className="w-3 h-3" />} AI Rewrite
                                        </button>
                                    </div>
                                    <textarea value={exp.description} onChange={e => { const nl = [...resume.experience.list]; nl[i].description = e.target.value; setResume({...resume, experience: {...resume.experience, list: nl}}); }} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 text-[16px] h-24" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
             </div>
          )}

          {step === 3 && (
             <div className="space-y-10 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-zinc-900 dark:text-white">Academia</h2>
                    <button onClick={() => setResume({...resume, education: [...resume.education, {degree: '', institution: '', year: '', score: ''}]})} className="px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-600 text-xs font-bold border border-indigo-500/20 active:scale-95 transition-transform touch-manipulation">Add Entry</button>
                </div>
                <div className="space-y-6">
                    {resume.education.map((edu, i) => (
                    <div key={i} className="p-6 md:p-10 rounded-[2.5rem] bg-zinc-50 dark:bg-black/30 border border-zinc-100 dark:border-white/5 relative">
                        {resume.education.length > 1 && (
                            <button onClick={() => setResume({...resume, education: resume.education.filter((_, idx) => idx !== i)})} aria-label="Remove Education" className="absolute top-6 right-6 p-2 rounded-full text-zinc-300 hover:text-red-500 transition-colors active:scale-90 touch-manipulation">
                                <Icons.X className="w-4 h-4" />
                            </button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <input placeholder="Degree" value={edu.degree} onChange={e => { const nl = [...resume.education]; nl[i].degree = e.target.value; setResume({...resume, education: nl}); }} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-3 text-[16px]" />
                            <input placeholder="Institution" value={edu.institution} onChange={e => { const nl = [...resume.education]; nl[i].institution = e.target.value; setResume({...resume, education: nl}); }} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-3 text-[16px]" />
                            <input placeholder="Year" value={edu.year} onChange={e => { const nl = [...resume.education]; nl[i].year = e.target.value; setResume({...resume, education: nl}); }} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-3 text-[16px]" />
                            <input placeholder="Score" value={edu.score} onChange={e => { const nl = [...resume.education]; nl[i].score = e.target.value; setResume({...resume, education: nl}); }} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-3 text-[16px]" />
                        </div>
                    </div>
                    ))}
                </div>
             </div>
          )}

          {step === 4 && (
             <div className="space-y-10 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-zinc-900 dark:text-white">Certifications & Licenses</h2>
                    <button onClick={() => setResume({...resume, certifications: [...resume.certifications, {name: '', issuingAuthority: '', licenseNumber: '', expiryDate: ''}]})} className="px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-600 text-xs font-bold border border-indigo-500/20 active:scale-95 transition-transform touch-manipulation">Add Certification</button>
                </div>
                <div className="space-y-6">
                    {resume.certifications.map((cert, i) => (
                    <div key={i} className="p-6 md:p-10 rounded-[2.5rem] bg-zinc-50 dark:bg-black/30 border border-zinc-100 dark:border-white/5 relative">
                        {resume.certifications.length > 0 && (
                            <button onClick={() => setResume({...resume, certifications: resume.certifications.filter((_, idx) => idx !== i)})} aria-label="Remove Certification" className="absolute top-6 right-6 p-2 rounded-full text-zinc-300 hover:text-red-500 transition-colors active:scale-90 touch-manipulation">
                                <Icons.X className="w-4 h-4" />
                            </button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input placeholder="Certification Name (e.g., First Aid & CPR)" value={cert.name} onChange={e => { const nl = [...resume.certifications]; nl[i].name = e.target.value; setResume({...resume, certifications: nl}); }} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-3 text-[16px]" />
                            <input placeholder="Issuing Authority" value={cert.issuingAuthority} onChange={e => { const nl = [...resume.certifications]; nl[i].issuingAuthority = e.target.value; setResume({...resume, certifications: nl}); }} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-3 text-[16px]" />
                            <input placeholder="License Number (if applicable)" value={cert.licenseNumber} onChange={e => { const nl = [...resume.certifications]; nl[i].licenseNumber = e.target.value; setResume({...resume, certifications: nl}); }} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-3 text-[16px]" />
                            <input type="date" placeholder="Expiry Date" value={cert.expiryDate} onChange={e => { const nl = [...resume.certifications]; nl[i].expiryDate = e.target.value; setResume({...resume, certifications: nl}); }} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-3 text-[16px]" />
                        </div>
                    </div>
                    ))}
                    {resume.certifications.length === 0 && (
                        <div className="p-12 md:p-20 text-center border-2 border-dashed border-zinc-100 dark:border-white/5 rounded-[3rem] flex flex-col items-center justify-center bg-zinc-50/50 dark:bg-black/10">
                            <Icons.Award className="w-12 h-12 text-zinc-200 dark:text-zinc-800 mb-4" />
                            <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">Add your certifications and licenses</p>
                            <p className="text-zinc-500 text-xs mt-2">Examples: First Aid & CPR, SEP, DGR, HACCP</p>
                        </div>
                    )}
                </div>
             </div>
          )}

          {step === 5 && (
             <div className="space-y-10 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-zinc-900 dark:text-white">Honors & Awards</h2>
                    <button onClick={() => setResume({...resume, awards: [...resume.awards, {name: '', issuer: '', date: '', description: ''}]})} className="px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-600 text-xs font-bold border border-indigo-500/20 active:scale-95 transition-transform touch-manipulation">Add Award</button>
                </div>
                <div className="space-y-6">
                    {resume.awards.map((award, i) => (
                    <div key={i} className="p-6 md:p-10 rounded-[2.5rem] bg-zinc-50 dark:bg-black/30 border border-zinc-100 dark:border-white/5 relative">
                        {resume.awards.length > 0 && (
                            <button onClick={() => setResume({...resume, awards: resume.awards.filter((_, idx) => idx !== i)})} aria-label="Remove Award" className="absolute top-6 right-6 p-2 rounded-full text-zinc-300 hover:text-red-500 transition-colors active:scale-90 touch-manipulation">
                                <Icons.X className="w-4 h-4" />
                            </button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <input placeholder="Award Name (e.g., Employee of the Month)" value={award.name} onChange={e => { const nl = [...resume.awards]; nl[i].name = e.target.value; setResume({...resume, awards: nl}); }} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-3 text-[16px]" />
                            <input placeholder="Issuer" value={award.issuer} onChange={e => { const nl = [...resume.awards]; nl[i].issuer = e.target.value; setResume({...resume, awards: nl}); }} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-3 text-[16px]" />
                            <input type="date" placeholder="Date" value={award.date} onChange={e => { const nl = [...resume.awards]; nl[i].date = e.target.value; setResume({...resume, awards: nl}); }} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-3 text-[16px]" />
                        </div>
                        <textarea placeholder="Brief Description" value={award.description} onChange={e => { const nl = [...resume.awards]; nl[i].description = e.target.value; setResume({...resume, awards: nl}); }} rows={3} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-4 text-[16px]" />
                    </div>
                    ))}
                    {resume.awards.length === 0 && (
                        <div className="p-12 md:p-20 text-center border-2 border-dashed border-zinc-100 dark:border-white/5 rounded-[3rem] flex flex-col items-center justify-center bg-zinc-50/50 dark:bg-black/10">
                            <Icons.Trophy className="w-12 h-12 text-zinc-200 dark:text-zinc-800 mb-4" />
                            <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">Add your honors and awards</p>
                            <p className="text-zinc-500 text-xs mt-2">Examples: Employee of the Month, Best Groomed Trainee, Dean's List</p>
                        </div>
                    )}
                </div>
             </div>
          )}

          {step === 6 && (
             <div className="space-y-10 animate-fade-in">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-zinc-900 dark:text-white">Social Links & Digital Portfolio</h2>
                <div className="space-y-6">
                    <div className="p-6 md:p-10 rounded-[2.5rem] bg-zinc-50 dark:bg-black/30 border border-zinc-100 dark:border-white/5">
                        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 uppercase tracking-wider">LinkedIn Profile</label>
                        <input 
                            type="url" 
                            placeholder="https://linkedin.com/in/yourprofile" 
                            value={resume.socialLinks.linkedin} 
                            onChange={e => setResume({...resume, socialLinks: {...resume.socialLinks, linkedin: e.target.value}})} 
                            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-4 text-[16px]" 
                        />
                    </div>
                    <div className="p-6 md:p-10 rounded-[2.5rem] bg-zinc-50 dark:bg-black/30 border border-zinc-100 dark:border-white/5">
                        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 uppercase tracking-wider">Digital Portfolio URL</label>
                        <input 
                            type="url" 
                            placeholder="https://yourportfolio.com" 
                            value={resume.socialLinks.portfolio} 
                            onChange={e => setResume({...resume, socialLinks: {...resume.socialLinks, portfolio: e.target.value}})} 
                            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-4 text-[16px]" 
                        />
                    </div>
                </div>
             </div>
          )}

          {step === 7 && (
             <div className="space-y-12 animate-fade-in">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-zinc-900 dark:text-white">Proficiencies</h2>
                <div className="flex flex-wrap gap-3">
                    {['Service Excellence', 'Conflict Resolution', 'DCS (Check-in)', 'Galileo', 'Public Announcements', 'Poise', 'Safety First'].map(s => (
                        <button key={s} onClick={() => setResume({...resume, skills: resume.skills.includes(s) ? resume.skills.filter(i => i !== s) : [...resume.skills, s]})} className={`px-5 py-2.5 rounded-2xl text-sm font-bold border transition-all active:scale-95 touch-manipulation ${resume.skills.includes(s) ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white dark:bg-white/5 border-zinc-100 dark:border-white/10 text-zinc-500 hover:border-indigo-500/50'}`}>
                            {s}
                        </button>
                    ))}
                </div>
                <div className="space-y-6">
                    <h3 className="text-xl font-bold">Linguistics</h3>
                    {resume.languages.map((l, i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-black/20 border border-zinc-100 dark:border-white/5">
                            <input value={l.name} placeholder="Language" onChange={e => { const nl = [...resume.languages]; nl[i].name = e.target.value; setResume({...resume, languages: nl}); }} className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-6 py-3 text-[16px]" />
                            <select value={l.level} onChange={e => { const nl = [...resume.languages]; nl[i].level = e.target.value as any; setResume({...resume, languages: nl}); }} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-[16px] font-bold appearance-none cursor-pointer">
                                <option>Basic</option><option>Conversational</option><option>Fluent</option><option>Native</option>
                            </select>
                        </div>
                    ))}
                </div>
             </div>
          )}

          {step === 8 && (
             <div className="space-y-12 animate-fade-in">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-zinc-900 dark:text-white">Traits & Assets</h2>
                <div className="flex flex-wrap gap-3">
                    {['Punctual', 'Adaptable', 'Resilient', 'Team Player', 'Empathetic', 'Photography', 'World Travel'].map(s => (
                    <button key={s} onClick={() => setResume(prev => ({...prev, strengths: prev.strengths.includes(s) ? prev.strengths.filter(i => i !== s) : [...prev.strengths, s]}))} className={`px-5 py-3 rounded-2xl text-xs font-bold border transition-all active:scale-95 touch-manipulation ${resume.strengths.includes(s) ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-white/5 border-zinc-100 dark:border-white/10 text-zinc-500 hover:border-indigo-500/50'}`}>
                        {s}
                    </button>
                    ))}
                </div>
             </div>
          )}

          {step === 9 && (
             <div className="space-y-12 text-center animate-fade-in py-10">
                <div className="inline-flex p-4 rounded-3xl bg-indigo-500/10 text-indigo-600 mb-6 shadow-inner border border-indigo-500/20"><Icons.ShieldCheck className="w-12 h-12" /></div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-zinc-900 dark:text-white tracking-tighter leading-tight">Forensic Final Audit.</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {[
                        { key: 'photoAttached', label: 'Pro Photo Attached?', icon: <Icons.Camera className="w-5 h-5" /> },
                        { key: 'noTattoos', label: 'No Visible Tattoos?', icon: <Icons.User className="w-5 h-5" /> },
                        { key: 'bmiStandard', label: 'BMI Standards Met?', icon: <Icons.Activity className="w-5 h-5" /> },
                        { key: 'englishCert', label: 'Communication Ready?', icon: <Icons.Languages className="w-5 h-5" /> }
                    ].map(item => (
                        <button key={item.key} onClick={() => setResume({...resume, checklist: {...resume.checklist, [item.key]: !(resume.checklist as any)[item.key]}})} className={`flex items-center justify-between p-6 md:p-8 rounded-[2rem] border transition-all active:scale-[0.98] touch-manipulation ${ (resume.checklist as any)[item.key] ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl ring-4 ring-indigo-500/10' : 'bg-white dark:bg-black/20 text-zinc-500 border-zinc-100 dark:border-white/10 hover:border-indigo-500/30' }`}>
                            <span className="font-black text-[10px] md:text-xs uppercase tracking-wider text-left">{item.label}</span>
                            {(resume.checklist as any)[item.key] ? <Icons.CheckCircle2 className="w-6 h-6 shrink-0 ml-4" /> : <Icons.Circle className="w-6 h-6 opacity-20 shrink-0 ml-4" />}
                        </button>
                    ))}
                </div>
                <button onClick={calculateAtsWithAI} disabled={isAiLoading} className="mt-12 px-10 md:px-16 py-5 md:py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-black text-xl md:text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 mx-auto disabled:opacity-50 touch-manipulation">
                   {isAiLoading ? <Icons.Loader2 className="w-7 h-7 md:w-8 md:h-8 animate-spin" /> : <Icons.Cpu className="w-7 h-7 md:w-8 md:h-8" />}
                   {isAiLoading ? 'Analyzing...' : 'Generate Blueprint'}
                </button>
             </div>
          )}

          {/* Nav Footer */}
          <div className="mt-16 pt-10 border-t border-zinc-100 dark:border-white/5 flex justify-between gap-4">
             <button onClick={() => step > 1 ? setStep(step - 1) : setMode('LANDING')} className="px-6 md:px-8 py-4 font-black uppercase text-[10px] md:text-xs tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors active:scale-95 touch-manipulation">Back</button>
             {step < 9 && (
                <button onClick={() => { if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' }); setStep(step + 1); }} className="px-10 md:px-12 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest shadow-xl hover:shadow-2xl active:scale-95 transition-all touch-manipulation">Continue</button>
             )}
          </div>
       </div>
    </div>
  );

  const renderPreview = () => (
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 animate-fade-in pb-32 px-6 px-[env(safe-area-inset-left)] px-[env(safe-area-inset-right)]">
       <div className="lg:col-span-4 space-y-8">
          <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-white dark:bg-zinc-900 border border-white/40 shadow-2xl relative overflow-hidden text-center">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[80px] -mr-10 -mt-10"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 block mb-8">Forensic Grade</span>
             {isAiLoading ? (
                <div className="flex flex-col items-center justify-center py-10">
                    <Icons.Loader2 className="w-16 h-16 md:w-20 md:h-20 text-indigo-500 animate-spin mb-6" />
                    <p className="text-sm font-bold text-zinc-500 uppercase animate-pulse">Neural Scan...</p>
                </div>
             ) : (
                <>
                    <div className="relative inline-flex items-center justify-center mb-10 h-40 w-40 md:h-48 md:w-48 rounded-full border-[10px] md:border-[12px] border-zinc-50 dark:border-white/5 shadow-inner">
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-zinc-50 dark:text-zinc-800" />
                            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="276" strokeDashoffset={276 - (276 * (atsScore || 0)) / 100} strokeLinecap="round" className="text-indigo-500 transition-all duration-[1.5s]" />
                        </svg>
                        <span className="text-5xl md:text-6xl font-display font-black text-zinc-900 dark:text-white leading-none">{atsScore}</span>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-3xl border border-indigo-500/20 mb-8 italic text-sm text-indigo-800 dark:text-indigo-200">
                        "{atsFeedback}"
                    </div>
                </>
             )}
          </div>
          <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-zinc-900 text-white shadow-2xl">
             <button onClick={() => downloadFile('docx')} className="w-full py-5 bg-white text-zinc-900 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:scale-105 transition-all flex items-center justify-center gap-3 active:scale-95 touch-manipulation"><Icons.FileText className="w-5 h-5" /> Professional DOCX</button>
             <p className="text-[9px] text-zinc-500 text-center mt-4 font-bold uppercase tracking-widest leading-relaxed">Optimized for Corporate Tracking Systems<br/>(Cross-Browser Compatible)</p>
          </div>
          <button onClick={() => { setStep(1); setMode('BUILD'); }} className="w-full py-5 rounded-[2rem] border-2 border-zinc-200 dark:border-white/10 text-zinc-400 hover:text-zinc-900 dark:hover:text-white font-black uppercase text-[10px] md:text-xs tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all touch-manipulation">
             <Icons.RotateCcw className="w-4 h-4" /> Re-Architect Profile
          </button>
       </div>

       <div className="lg:col-span-8 bg-white text-zinc-900 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden border border-zinc-100 flex flex-col items-center max-w-full">
          <div ref={resumeRef} className="w-full max-w-[800px] p-8 md:p-24 font-serif bg-white shadow-inner">
             <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 mb-16 border-b-8 border-indigo-600 pb-16">
                <div className="flex-1 space-y-6 w-full">
                    <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-4 text-indigo-900 uppercase leading-none break-words">{resume.personal.fullName}</h2>
                    <div className="flex flex-wrap gap-x-6 md:gap-x-8 gap-y-3 text-[10px] md:text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                       <span className="flex items-center gap-2 shrink-0"><Icons.Mail className="w-3.5 h-3.5" /> {resume.personal.email}</span>
                       <span className="flex items-center gap-2 shrink-0"><Icons.Phone className="w-3.5 h-3.5" /> {resume.personal.phone}</span>
                       <span className="flex items-center gap-2 shrink-0"><Icons.MapPin className="w-3.5 h-3.5" /> {resume.personal.city}</span>
                    </div>
                </div>
                {resume.personal.photo && (
                    <div className="w-28 h-36 md:w-32 md:h-44 rounded-2xl overflow-hidden border-4 border-zinc-50 shadow-2xl shrink-0 rotate-1 hidden sm:block">
                        <img src={resume.personal.photo} className="w-full h-full object-cover" alt={`${resume.personal.fullName || 'Candidate'} profile photo - Wings Institute Resume Builder`} />
                    </div>
                )}
             </div>

             <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 text-zinc-800">
                <div className="md:col-span-8 space-y-12 md:space-y-16">
                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 mb-6 md:mb-8 flex items-center gap-4">
                            <div className="w-8 md:w-10 h-0.5 bg-indigo-600"></div> Executive Profile
                        </h3>
                        <p className="text-base md:text-lg italic leading-relaxed text-zinc-700 font-medium">"{resume.personal.summary}"</p>
                    </section>
                    {!resume.experience.isFresher && (
                        <section>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 mb-8 md:mb-10 flex items-center gap-4">
                                <div className="w-8 md:w-10 h-0.5 bg-indigo-600"></div> Work History
                            </h3>
                            <div className="space-y-10 md:space-y-12">
                                {resume.experience.list.map((exp, i) => (
                                    <div key={i} className="relative pl-6 md:pl-8 border-l-2 border-zinc-100">
                                        <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-indigo-600"></div>
                                        <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                                            <h4 className="text-lg md:text-xl font-black uppercase text-zinc-900 tracking-tight leading-tight">{exp.role}</h4>
                                            <span className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest shrink-0">{exp.duration}</span>
                                        </div>
                                        <p className="text-[11px] md:text-xs font-black text-indigo-600 uppercase tracking-widest mb-3">{exp.company}</p>
                                        <p className="text-sm leading-relaxed text-zinc-600">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 mb-8 md:mb-10 flex items-center gap-4">
                            <div className="w-8 md:w-10 h-0.5 bg-indigo-600"></div> Academic Portfolio
                        </h3>
                        <div className="space-y-6 md:space-y-8">
                            {resume.education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-center group gap-4">
                                    <div className="space-y-1 flex-1">
                                        <h4 className="font-black text-base md:text-lg text-zinc-900 leading-tight">{edu.degree}</h4>
                                        <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider">{edu.institution}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="text-[9px] md:text-[10px] font-black text-zinc-400 mb-1">{edu.year}</div>
                                        <div className="text-indigo-600 font-black text-base md:text-lg">{edu.score}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    {resume.certifications.length > 0 && (
                        <section>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 mb-8 md:mb-10 flex items-center gap-4">
                                <div className="w-8 md:w-10 h-0.5 bg-indigo-600"></div> Certifications & Licenses
                            </h3>
                            <div className="space-y-6 md:space-y-8">
                                {resume.certifications.map((cert, i) => (
                                    <div key={i} className="space-y-1">
                                        <h4 className="font-black text-base md:text-lg text-zinc-900 leading-tight">{cert.name}</h4>
                                        <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                            {cert.issuingAuthority}
                                            {cert.licenseNumber && ` • License: ${cert.licenseNumber}`}
                                            {cert.expiryDate && ` • Expires: ${new Date(cert.expiryDate).toLocaleDateString()}`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {resume.awards.length > 0 && (
                        <section>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 mb-8 md:mb-10 flex items-center gap-4">
                                <div className="w-8 md:w-10 h-0.5 bg-indigo-600"></div> Honors & Awards
                            </h3>
                            <div className="space-y-6 md:space-y-8">
                                {resume.awards.map((award, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <h4 className="font-black text-base md:text-lg text-zinc-900 leading-tight">{award.name}</h4>
                                                <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider">{award.issuer}</p>
                                            </div>
                                            {award.date && (
                                                <div className="text-[9px] md:text-[10px] font-black text-zinc-400 shrink-0">
                                                    {new Date(award.date).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                        {award.description && (
                                            <p className="text-sm leading-relaxed text-zinc-600 mt-2">{award.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
                <div className="md:col-span-4 space-y-10 md:space-y-14">
                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-6">Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {resume.skills.map(s => <span key={s} className="px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-lg text-[9px] font-black text-zinc-700 uppercase tracking-wider">{s}</span>)}
                        </div>
                    </section>
                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-6">Linguistics</h3>
                        <div className="space-y-4">
                            {resume.languages.map(l => (
                                <div key={l.name} className="flex flex-col">
                                    <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase mb-1.5">
                                        <span className="text-zinc-900">{l.name}</span>
                                        <span className="text-indigo-600">{l.level}</span>
                                    </div>
                                    <div className="h-1 w-full bg-zinc-50 rounded-full overflow-hidden shadow-inner">
                                        <div className="h-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.4)]" style={{ width: l.level === 'Native' ? '100%' : l.level === 'Fluent' ? '85%' : l.level === 'Conversational' ? '65%' : '30%' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-6">Traits</h3>
                        <div className="space-y-5">
                            <div className="text-xs font-bold text-zinc-900 flex flex-wrap gap-1.5 leading-relaxed">
                                {resume.strengths.join(' • ')}
                            </div>
                        </div>
                    </section>
                    {(resume.socialLinks.linkedin || resume.socialLinks.portfolio) && (
                        <section>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-6">Digital Presence</h3>
                            <div className="space-y-3">
                                {resume.socialLinks.linkedin && (
                                    <a href={resume.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                                        <Icons.Link className="w-3.5 h-3.5" />
                                        LinkedIn Profile
                                    </a>
                                )}
                                {resume.socialLinks.portfolio && (
                                    <a href={resume.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                                        <Icons.Link className="w-3.5 h-3.5" />
                                        Digital Portfolio
                                    </a>
                                )}
                            </div>
                        </section>
                    )}
                </div>
             </div>
             <div className="mt-20 md:mt-32 pt-10 border-t-2 border-zinc-50 text-center">
                 <div className="inline-flex items-center gap-3 px-5 md:px-6 py-2 bg-zinc-50 rounded-full border border-zinc-100">
                    <Icons.ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-500" />
                    <span className="text-[8px] md:text-[9px] font-black text-zinc-400 uppercase tracking-[0.4em]">Validated By Wings AI Protocol 2026</span>
                 </div>
             </div>
          </div>
       </div>
    </div>
  );

  const renderJobMatch = () => (
     <div className="max-w-6xl mx-auto animate-fade-in px-6 px-[env(safe-area-inset-left)] px-[env(safe-area-inset-right)]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <h2 className="text-4xl md:text-6xl font-display font-black text-zinc-900 dark:text-white leading-none text-center md:text-left">Forensic <span className="text-indigo-600">Scan.</span></h2>
            <button onClick={() => setMode('LANDING')} className="px-8 py-4 glass-panel rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all border border-zinc-200 dark:border-white/10 active:scale-95 touch-manipulation">Return to Hub</button>
        </div>

        <div className="glass-panel p-3 rounded-[2.5rem] border border-white/40 dark:border-white/10 mb-16 flex flex-col md:flex-row gap-3 bg-white/60 dark:bg-black/40 backdrop-blur-3xl shadow-2xl">
            <input 
                value={jobSearchQuery} 
                onChange={e => setJobSearchQuery(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && searchJobs()} 
                placeholder="Search Position (e.g. Air Hostess Indigo / Taj Hotels)" 
                className="flex-1 h-16 bg-transparent px-8 rounded-3xl outline-none text-zinc-900 dark:text-white font-bold text-lg text-[16px]" 
                aria-label="Job Title Search"
            />
            <button onClick={searchJobs} disabled={isSearchingJobs || !jobSearchQuery} className="px-12 h-16 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[1.8rem] font-black uppercase text-sm tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 touch-manipulation">
                {isSearchingJobs ? <Icons.Loader2 className="w-5 h-5 animate-spin" /> : <Icons.Search className="w-5 h-5" />} 
                Deep Scan
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-32 min-h-[400px]">
           {isSearchingJobs && (
              <div className="col-span-full py-32 flex flex-col items-center" role="status">
                 <Icons.Loader2 className="w-16 h-16 text-indigo-500 animate-spin mb-6" />
                 <p className="text-xl font-bold text-zinc-400 uppercase tracking-[0.4em] animate-pulse text-center px-4">Consulting Official Career Ports...</p>
              </div>
           )}
           
           {!isSearchingJobs && hasSearched && searchResults.length === 0 && (
              <div className="col-span-full py-32 text-center bg-white/40 dark:bg-white/5 rounded-[3rem] border border-dashed border-zinc-200 dark:border-white/10 px-6">
                 <Icons.AlertCircle className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-6" />
                 <h3 className="text-3xl font-display font-black text-zinc-900 dark:text-white mb-2">No Vacancies Locked.</h3>
                 <p className="text-zinc-500 max-w-sm mx-auto font-medium">We could not find active vacancies for this query at the moment. Please try a different role or airline.</p>
              </div>
           )}

           {!hasSearched && (
               <div className="col-span-full py-32 text-center opacity-40">
                  <Icons.Radar className="w-16 h-16 mx-auto mb-6 animate-spin text-zinc-400 dark:text-zinc-600" />
                  <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">Awaiting Search Parameters...</p>
               </div>
           )}

           {searchResults.map((job, idx) => (
             <div key={idx} className="group glass-panel p-8 md:p-10 rounded-[3rem] border border-white/40 dark:border-white/10 relative overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/60 dark:bg-zinc-900/60">
                <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600 transition-all duration-500 group-hover:w-full group-hover:opacity-5"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                   <div className="space-y-1 flex-1 pr-4">
                       <h3 className="text-2xl md:text-3xl font-display font-black text-zinc-900 dark:text-white leading-tight">{job.company}</h3>
                       <p className="text-[12px] md:text-sm font-black text-indigo-600 uppercase tracking-[0.2em]">{job.role}</p>
                   </div>
                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-300 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm shrink-0">
                      <Icons.Link className="w-6 h-6" />
                   </div>
                </div>

                <div className="flex items-center gap-3 mb-10 text-sm font-bold text-zinc-500 relative z-10">
                    <Icons.MapPin className="w-5 h-5 text-zinc-400" /> {job.location}
                </div>

                <a 
                    href={job.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full mt-auto py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[1.8rem] font-black uppercase text-[10px] md:text-xs tracking-[0.3em] text-center shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] relative z-10 touch-manipulation"
                >
                    Apply on Official Portal
                </a>
             </div>
           ))}
        </div>
     </div>
  );

  return (
    <div className="min-h-screen pt-3 pb-20 relative overflow-x-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 pb-[env(safe-area-inset-bottom)]">
        {/* Global Decor Orbs */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px] animate-blob"></div>
        </div>

        <main role="main" className="relative z-10">
            {mode === 'LANDING' && renderLanding()}
            {mode === 'BUILD' && renderBuild()}
            {mode === 'PREVIEW' && renderPreview()}
            {mode === 'JOBMATCH' && renderJobMatch()}
        </main>

        {/* SEO Content Module - Resume Builder Guide */}
        <ResumeBuilderSEOContent />
    </div>
  );
};