'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '@/components/Icons';
import { FAQSection } from '@/components/FAQSection';
import { JobsAtWingsSEOContent } from '@/components/JobsAtWingsSEOContent';

// --- DATA STRUCTURES ---

type QuestionType = 'Psychometric' | 'Aptitude' | 'Domain';

interface Question {
  id: number;
  type: QuestionType;
  text: string;
  options: string[];
  correctIndex: number;
}

interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  icon: keyof typeof Icons;
  genderRestriction?: 'Female Only';
  description: string;
  impact: string[];
  requirements: string[];
  questions: Question[];
}

const JOBS: JobRole[] = [
  {
    id: 'counselor',
    title: 'Student Counselor',
    department: 'Admissions',
    location: 'Vadodara Campus',
    type: 'Full-Time',
    salary: '₹15k - ₹20k + Incentives',
    genderRestriction: 'Female Only',
    icon: 'Users',
    description: "You are the Architect of Dreams. You don't just sell courses; you guide confused students toward a life-changing career path. We need a 'Pleasing Personality' who can switch effortlessly between English, Hindi, and Gujarati to build trust with parents and students.",
    impact: [
      "Mentor 100+ students monthly to find their right career path.",
      "Convert inquiries into admissions through genuine consultation.",
      "Maintain high parent satisfaction through transparent communication."
    ],
    requirements: ["Fluency in English, Hindi & Gujarati (Mandatory)", "Pleasing Personality & High Empathy", "3+ Years in Ed-Tech/Education Sales"],
    questions: [
      {
        id: 1,
        type: 'Psychometric',
        text: "A student is eligible but cannot afford the fees. They are crying. What do you do?",
        options: ["Tell them to come back when they have money.", "Offer a fake discount to close the deal.", "Empathize, calm them down, and explain our EMI/Loan partners.", "Ask security to escort them out."],
        correctIndex: 2
      },
      {
        id: 2,
        type: 'Aptitude',
        text: "If you need 10 admissions from 50 leads, what is your required conversion rate?",
        options: ["10%", "20%", "5%", "25%"],
        correctIndex: 1
      },
      {
        id: 3,
        type: 'Domain',
        text: "Which language is most critical for convincing local parents in Vadodara?",
        options: ["French", "Gujarati", "Spanish", "German"],
        correctIndex: 1
      },
      {
        id: 4,
        type: 'Psychometric',
        text: "A parent is shouting because their child wasn't placed yet. You:",
        options: ["Shout back to assert dominance.", "Blame the placement team.", "Listen without interrupting, acknowledge their frustration, and show data.", "Ignore their calls."],
        correctIndex: 2
      },
      {
        id: 5,
        type: 'Domain',
        text: "What is the primary role of a counselor?",
        options: ["To force students into courses", "To guide students based on their aptitude", "To collect cash only", "To sit at the desk"],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'english-teacher',
    title: 'English Faculty',
    department: 'Academics',
    location: 'Vadodara Campus',
    type: 'Full-Time',
    salary: '₹15k - ₹25k',
    genderRestriction: 'Female Only',
    icon: 'Languages',
    description: "Transform vernacular students into global professionals. You must possess 'Excellent Proficiency' in fundamental grammar and be 'Extremely Fluent'. You will eliminate Mother Tongue Influence (MTI) and instill corporate communication standards.",
    impact: [
      "Improve student IELTS/English scores by 2 bands.",
      "Conduct mock interviews and group discussions.",
      "Teach phonetics, voice modulation, and public speaking."
    ],
    requirements: ["MA in English / CELTA / TESOL", "Extremely Fluent in English (Native Level)", "Expertise in Grammar Fundamentals"],
    questions: [
      {
        id: 1,
        type: 'Domain',
        text: "Identify the error: 'She is knowing the answer.'",
        options: ["She knows the answer.", "She was knowing.", "She knowing.", "No error."],
        correctIndex: 0
      },
      {
        id: 2,
        type: 'Psychometric',
        text: "A student is too shy to speak in class due to poor English. You:",
        options: ["Force them to stand up immediately.", "Ignore them.", "Use small group activities to build confidence gradually.", "Tell them they will fail."],
        correctIndex: 2
      },
      {
        id: 3,
        type: 'Domain',
        text: "What is 'Phonetics' primarily concerned with?",
        options: ["Spelling", "Grammar rules", "The sounds of human speech", "Writing skills"],
        correctIndex: 2
      },
      {
        id: 4,
        type: 'Domain',
        text: "Which of these is a 'Passive Voice' sentence?",
        options: ["I ate the apple.", "The apple was eaten by me.", "I am eating.", "I will eat."],
        correctIndex: 1
      },
      {
        id: 5,
        type: 'Aptitude',
        text: "Select the synonym for 'Eloquent':",
        options: ["Silent", "Articulate", "Confused", "Shy"],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'pd-coach',
    title: 'Personality Development Coach',
    department: 'Academics',
    location: 'Vadodara Campus',
    type: 'Full-Time/ Part-Time',
    salary: '₹15k - ₹25k',
    genderRestriction: 'Female Only',
    icon: 'Sparkles',
    description: "You are the 'Confidence Sculptor'. Your job is to transform shy individuals into charismatic leaders using Role Plays, Activities, and Games. You don't just lecture; you make them perform.",
    impact: [
      "Design and execute high-energy role-play scenarios.",
      "Break students' stage fear through gamified learning.",
      "Teach body language, posture, and corporate etiquette."
    ],
    requirements: ["Psychology Background / Certified Life Coach", "Expertise in Activity-Based Learning", "High Energy & Charisma"],
    questions: [
      {
        id: 1,
        type: 'Domain',
        text: "What is the 'STAR' technique used for?",
        options: ["Star gazing", "Structuring interview answers (Situation, Task, Action, Result)", "Rating movies", "Teaching grammar"],
        correctIndex: 1
      },
      {
        id: 2,
        type: 'Psychometric',
        text: "A student freezes on stage during a speech. You:",
        options: ["Laugh to lighten the mood.", "Ask them to sit down immediately.", "Walk up, stand next to them, and guide them through the first sentence.", "Give them zero marks."],
        correctIndex: 2
      },
      {
        id: 3,
        type: 'Domain',
        text: "Which activity best builds teamwork?",
        options: ["Solo essay writing", "The Human Knot game", "Listening to a lecture", "Reading a book"],
        correctIndex: 1
      },
      {
        id: 4,
        type: 'Domain',
        text: "In body language, crossed arms usually signify:",
        options: ["Openness", "Defensiveness or resistance", "Happiness", "Fatigue"],
        correctIndex: 1
      },
      {
        id: 5,
        type: 'Psychometric',
        text: "What is the best way to teach empathy?",
        options: ["PowerPoint Presentation", "Role-playing a difficult customer scenario", "Reading a definition", "Writing an exam"],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'aviation-instructor',
    title: 'Aviation Instructor',
    department: 'Aviation Faculty',
    location: 'Vadodara Campus',
    type: 'Full-Time',
    salary: '₹20k - ₹30k',
    genderRestriction: 'Female Only',
    icon: 'Plane',
    description: "The 'Sky Guardian'. You must have expertise in In-flight Service, Safety, Emergency Procedures, Aviation Security, Ground Ops, Ramp Safety, and Check-in (Galileo). You are shaping the safety professionals of tomorrow.",
    impact: [
      "Conduct rigorous safety drills (Evacuation/Water Safety) in Mock Aircraft.",
      "Teach Galileo/Amadeus CRS systems.",
      "Ensure students pass airline mock exams with 100% accuracy."
    ],
    requirements: ["Ex-Cabin Crew/Ground Staff (5+ Years)", "Thorough knowledge of DGCA/IATA rules", "Extremely Fluent in English"],
    questions: [
      {
        id: 1,
        type: 'Domain',
        text: "What is the primary action during a 'Decompression'?",
        options: ["Call the captain", "Don oxygen mask immediately", "Serve water", "Open the door"],
        correctIndex: 1
      },
      {
        id: 2,
        type: 'Domain',
        text: "Which system is primarily used for Reservations & Check-in?",
        options: ["Photoshop", "Galileo / Amadeus", "Tally", "MS Paint"],
        correctIndex: 1
      },
      {
        id: 3,
        type: 'Domain',
        text: "What does 'FOD' stand for in Ramp Safety?",
        options: ["Flying Object Detection", "Foreign Object Debris", "Flight Operations Desk", "Fuel On Demand"],
        correctIndex: 1
      },
      {
        id: 4,
        type: 'Aptitude',
        text: "If a flight has 180 pax and 3 crew, what is the ratio?",
        options: ["1:50", "1:60", "1:30", "1:45"],
        correctIndex: 1
      },
      {
        id: 5,
        type: 'Domain',
        text: "What is the code for 'Dangerous Goods Regulations'?",
        options: ["DGR", "DDR", "GDR", "RGD"],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'hospitality-trainer',
    title: 'Hospitality Trainer',
    department: 'Hotel Faculty',
    location: 'Vadodara Campus',
    type: 'Full-Time',
    salary: '₹20k - ₹25k',
    icon: 'ConciergeBell',
    description: "The 'Luxury Standard Bearer'. You must have thorough knowledge of Front Office (PMS), F&B Service (Fine Dine), Food Production basics, and Housekeeping Operations. You are training students for the Oberois and Tajs of the world.",
    impact: [
      "Train students on PMS software and Check-in/Checkout protocols.",
      "Conduct practicals for Silver Service and Banquet setups.",
      "Teach the art of luxury guest interaction."
    ],
    requirements: ["BHM Degree", "Managerial Experience in 5-Star Hotels", "Extremely Fluent in English"],
    questions: [
      {
        id: 1,
        type: 'Domain',
        text: "What is the standard size of a 'Cover' in F&B?",
        options: ["12x12 inches", "24x15 inches", "18x24 inches", "30x30 inches"],
        correctIndex: 1
      },
      {
        id: 2,
        type: 'Domain',
        text: "Which department is responsible for 'Turndown Service'?",
        options: ["Front Office", "F&B Service", "Housekeeping", "Maintenance"],
        correctIndex: 2
      },
      {
        id: 3,
        type: 'Psychometric',
        text: "A guest shouts at a trainee waiter. You:",
        options: ["Fire the trainee.", "Step in, apologize to the guest, and coach the trainee privately.", "Shout back at the guest.", "Ignore it."],
        correctIndex: 1
      },
      {
        id: 4,
        type: 'Domain',
        text: "What does 'MAP' (Modified American Plan) include?",
        options: ["Room only", "Room + Breakfast", "Room + Breakfast + 1 Major Meal", "Room + All Meals"],
        correctIndex: 2
      },
      {
        id: 5,
        type: 'Domain',
        text: "What is the temperature danger zone for food?",
        options: ["5°C to 60°C", "0°C to 100°C", "-18°C to 0°C", "100°C+"],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'chef',
    title: 'Chef Instructor',
    department: 'Culinary',
    location: 'Vadodara Campus',
    type: 'Full-Time / Part-Time',
    salary: '₹15k - ₹25k',
    icon: 'ChefHat',
    description: "We need a 'Culinary Mentor', not just a cook. You must have expertise in teaching Indian & International cuisine, Baking, Confectionery, and high-end Plating. You will run our commercial kitchen lab.",
    impact: [
      "Teach knife skills, mother sauces, and molecular gastronomy.",
      "Manage kitchen hygiene (HACCP) and inventory.",
      "Mentor students to create their own recipes."
    ],
    requirements: ["Culinary Degree", "Sous Chef Level Experience", "Expert in Baking & Plating", "Fluent in English"],
    questions: [
      {
        id: 1,
        type: 'Domain',
        text: "Which of these is NOT a Mother Sauce?",
        options: ["Béchamel", "Velouté", "Hollandaise", "Marinara"],
        correctIndex: 3
      },
      {
        id: 2,
        type: 'Domain',
        text: "What is the difference between Baking and Roasting?",
        options: ["No difference", "Structure vs Structureless", "Temperature", "Time"],
        correctIndex: 1 
      },
      {
        id: 3,
        type: 'Domain',
        text: "Which chopping board colour is for Raw Vegetables?",
        options: ["Green", "White", "Red", "Yellow"],
        correctIndex: 0
      },
      {
        id: 4,
        type: 'Aptitude',
        text: "If a recipe calls for 500g flour for 4 pax, how much for 20 pax?",
        options: ["2000g", "2500g", "3000g", "1500g"],
        correctIndex: 1
      },
      {
        id: 5,
        type: 'Domain',
        text: "What is 'Mise en place'?",
        options: ["Cleaning up", "Putting in place (Preparation)", "Cooking", "Serving"],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'travel-faculty',
    title: 'Travel & Tourism Faculty',
    department: 'Academics',
    location: 'Vadodara Campus',
    type: 'Full-Time',
    salary: '₹20k - ₹25k',
    icon: 'Globe',
    description: "The 'Global Guide'. You must have thorough knowledge of Travel Itineraries (Domestic & Intl), World Geography, Timezones, Visa/Passport procedures, and CRS (Galileo). You teach students how to sell the world.",
    impact: [
      "Teach calculation of fares, time zones, and currency conversion.",
      "Guide students in crafting sellable tour packages.",
      "Train on live CRS software for ticketing."
    ],
    requirements: ["IATA Certified / Tourism Degree", "Expertise in Galileo/Amadeus", "Thorough Geography Knowledge", "Extremely Fluent in English"],
    questions: [
      {
        id: 1,
        type: 'Domain',
        text: "What is the 3-letter code for London Heathrow?",
        options: ["LON", "LHR", "HTR", "LHD"],
        correctIndex: 1
      },
      {
        id: 2,
        type: 'Aptitude',
        text: "If it is 12:00 PM in London (GMT), what time is it in Mumbai (IST)?",
        options: ["3:30 PM", "4:30 PM", "5:30 PM", "6:30 PM"],
        correctIndex: 2
      },
      {
        id: 3,
        type: 'Domain',
        text: "Which visa is required for a flight stopover without leaving the airport?",
        options: ["Tourist Visa", "Transit Visa", "Student Visa", "Business Visa"],
        correctIndex: 1
      },
      {
        id: 4,
        type: 'Domain',
        text: "Which organization regulates international air transport?",
        options: ["WHO", "IATA", "UNESCO", "NATO"],
        correctIndex: 1
      },
      {
        id: 5,
        type: 'Domain',
        text: "What is a 'Schengen Visa' used for?",
        options: ["Travel to USA", "Travel to UK", "Travel to most European countries", "Travel to Asia"],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'grooming-instructor',
    title: 'Grooming Instructor',
    department: 'Faculty',
    location: 'Vadodara Campus',
    type: 'Full-Time',
    salary: '₹15k - ₹20k',
    genderRestriction: 'Female Only',
    icon: 'Star',
    description: "The 'Image Consultant'. You must have expertise in Professional Makeup and Hair Styling apt for Aviation. Knowledge of skin/hair care routines and corporate dressing is mandatory. You make our students look like professionals.",
    impact: [
      "Conduct daily makeup and hair workshops.",
      "Teach skin care routines and hygiene.",
      "Ensure every student meets the 'Wings Grooming Standard'."
    ],
    requirements: ["Professional Makeup Artist / Cosmetologist", "Experience in Corporate/Aviation Grooming", "Fluent in English"],
    questions: [
      {
        id: 1,
        type: 'Domain',
        text: "What is the primary rule of 'Day Makeup' for aviation?",
        options: ["Heavy glitter", "Subtle, natural, and professional", "Dark smokey eyes", "No makeup at all"],
        correctIndex: 1
      },
      {
        id: 2,
        type: 'Domain',
        text: "Which product is used to prep the skin before foundation?",
        options: ["Toner", "Primer", "Blush", "Setting Spray"],
        correctIndex: 1
      },
      {
        id: 3,
        type: 'Domain',
        text: "For a French Twist hairstyle, what is essential?",
        options: ["Hair gel", "Bobby pins & U-pins", "Ribbons", "Flowers"],
        correctIndex: 1
      },
      {
        id: 4,
        type: 'Psychometric',
        text: "A student has severe acne and feels ugly. You:",
        options: ["Tell them to quit aviation.", "Teach them corrective makeup and suggest a dermatologist kindly.", "Ignore them.", "Make fun of them."],
        correctIndex: 1
      },
      {
        id: 5,
        type: 'Domain',
        text: "What is the standard nail paint policy for most airlines?",
        options: ["Neon colors", "Black or Blue", "Classic Red, Nude, or French Manicure", "Chipped polish"],
        correctIndex: 2
      }
    ]
  }
];

export const CareersPageClient: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobRole | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [testResult, setTestResult] = useState<'PASS' | 'FAIL' | null>(null);
  const [score, setScore] = useState(0);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open (guarded)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (selectedJob) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedJob]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [testStarted, testResult, selectedJob]);

  const startTest = () => {
    setTestStarted(true);
    setAnswers(new Array(selectedJob?.questions.length).fill(-1));
  };

  const handleAnswer = (qIndex: number, optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const submitTest = () => {
    if (!selectedJob) return;
    
    let correctCount = 0;
    selectedJob.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) correctCount++;
    });

    const percentage = (correctCount / selectedJob.questions.length) * 100;
    setScore(percentage);
    
    if (percentage >= 80) {
        setTestResult('PASS');
        setGeneratedCode(`WINGS-${selectedJob.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`);
    } else {
        setTestResult('FAIL');
        setGeneratedCode('');
    }
  };

  const resetSelection = () => {
    setSelectedJob(null);
    setTestStarted(false);
    setTestResult(null);
    setAnswers([]);
    setScore(0);
    setGeneratedCode('');
    setCopied(false);
  };

  const handleCopyCode = () => {
    if (typeof window === 'undefined' || !navigator.clipboard) return;
    
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen w-full bg-zinc-50 dark:bg-black/20 pt-3 pb-24">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.05),transparent_50%)]"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      </div>

      {/* HERO */}
      <section className="px-6 mb-20 text-center relative z-20" aria-hidden={!!selectedJob}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold uppercase tracking-widest mb-6 shadow-xl animate-fade-in-up">
           <Icons.Briefcase className="w-4 h-4" /> Recruitment Portal
        </div>



        <h1 className="font-display text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-6 animate-fade-in-up [animation-delay:200ms]">
           Join the <span className="text-wings-red">Elite Squad.</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:400ms]">
           We are not just hiring employees; we are recruiting mentors. If you are the top 1% in your field, we want you.
        </p>
      </section>

      {/* JOB GRID & FAQs - ALWAYS RENDERED TO PREVENT FOOTER JUMP */}
      <div className="space-y-32" aria-hidden={!!selectedJob}>
          <section className="px-6 max-w-7xl mx-auto relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {JOBS.map((job) => (
                    <button 
                      key={job.id} 
                      onClick={() => setSelectedJob(job)}
                      className="group relative flex flex-col p-8 md:p-10 rounded-[3rem] bg-white/70 dark:bg-zinc-900/70 border border-white/40 dark:border-white/5 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-left overflow-hidden animate-fade-in-up"
                    >
                      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-wings-red/10 to-transparent rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-wings-red/20 transition-all"></div>
                      
                      <div className="flex justify-between items-start mb-8 relative z-10 w-full">
                          <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-white/10 flex items-center justify-center text-zinc-900 dark:text-white group-hover:bg-wings-red group-hover:text-white transition-all shadow-sm">
                            {React.createElement((Icons as any)[job.icon], { className: "w-8 h-8" })}
                          </div>
                          <div className="flex flex-col items-end gap-2">
                              <span className="px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-white/50 dark:bg-black/20">
                                {job.type}
                              </span>
                              {job.genderRestriction && (
                                  <span className="px-4 py-1.5 rounded-full border border-pink-200 bg-pink-50 text-[10px] font-black uppercase tracking-widest text-pink-600">
                                    {job.genderRestriction}
                                  </span>
                              )}
                          </div>
                      </div>

                      <h3 className="text-3xl font-display font-black text-zinc-900 dark:text-white mb-3 tracking-tight">{job.title}</h3>
                      <p className="text-base text-zinc-500 dark:text-zinc-400 mb-10 leading-relaxed line-clamp-2 font-medium">{job.description}</p>

                      <div className="mt-auto flex items-center justify-between border-t border-zinc-200/50 dark:border-white/10 pt-8 w-full">
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase text-zinc-400 font-black tracking-[0.2em] mb-1">Department</span>
                            <span className="text-base font-bold text-zinc-800 dark:text-zinc-200">{job.department}</span>
                          </div>
                          <div className="flex items-center gap-3 text-wings-red font-black text-sm uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                            Analyze Role <Icons.ArrowRight className="w-5 h-5" />
                          </div>
                      </div>
                    </button>
                ))}
              </div>
          </section>

          <FAQSection 
              title="Life at Wings."
              color="zinc"
              schemaId="careers-life-at-wings"
              data={[
                  { q: "What are the office timings?", a: "Our office hours are 10:00 AM to 7:00 PM, Monday to Saturday." },
                  { q: "What is the work environment like?", a: "We boast one of the most conducive working environments with the most modern and beautiful infrastructure in Vadodara. It is designed to ensure comfort and productivity." },
                  { q: "Is there scope for growth?", a: "Yes. Our team actually works like a team. We offer a lot of flexibility to learn and grow, encouraging our staff to take ownership and advance their careers." }
              ]}
          />

          {/* SEO Content Module */}
          <JobsAtWingsSEOContent />
      </div>

      {/* JOB DETAIL & ASSESSMENT MODAL */}
      {selectedJob && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-zinc-950/80 backdrop-blur-xl">
            {/* Modal Container */}
            <div className="w-full max-w-4xl h-[90vh] supports-[height:100dvh]:h-[90dvh] max-h-[90dvh] bg-white dark:bg-zinc-900 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-500 border border-white/10 isolate">
               
               {/* Close Button */}
               <button 
                  onClick={resetSelection}
                  className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-black/50 hover:bg-wings-red text-white transition-all flex items-center justify-center border border-white/20 active:scale-90"
               >
                  <Icons.X className="w-6 h-6" />
               </button>

               {/* Scrollable Content Area */}
               <div 
                  ref={scrollContainerRef}
                  className="flex-1 overflow-y-auto overscroll-y-none scroll-smooth min-h-0 touch-pan-y"
               >
                  {/* Header Image/Gradient */}
                  <div className="h-64 bg-zinc-900 relative overflow-hidden flex items-end p-8 md:p-12 shrink-0">
                     <div className="absolute inset-0 bg-gradient-to-r from-wings-red to-violet-900 opacity-90"></div>
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
                     <div className="relative z-10 text-white w-full">
                        <div className="flex flex-col md:flex-row justify-between items-end w-full gap-6">
                            <div>
                                <div className="flex items-center gap-4 mb-4 opacity-80 text-sm font-black uppercase tracking-widest">
                                <Icons.MapPin className="w-5 h-5" /> {selectedJob.location} • {selectedJob.salary}
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tighter">{selectedJob.title}</h2>
                            </div>
                            {selectedJob.genderRestriction && (
                                <div className="px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-xl font-black text-xs uppercase tracking-widest border border-white/30 shadow-lg">
                                    {selectedJob.genderRestriction}
                                </div>
                            )}
                        </div>
                     </div>
                  </div>

                  <div className="p-8 md:p-16">
                     
                     {!testStarted ? (
                        /* JOB DESCRIPTION VIEW */
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                           <div className="lg:col-span-2 space-y-12">
                              <div>
                                 <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                                    <Icons.Target className="w-6 h-6 text-wings-red" /> The Mission
                                 </h3>
                                 <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-xl font-medium">
                                    {selectedJob.description}
                                 </p>
                              </div>

                              <div>
                                 <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">Your Impact</h3>
                                 <ul className="space-y-4">
                                    {selectedJob.impact.map((item, i) => (
                                       <li key={i} className="flex items-start gap-4 text-zinc-600 dark:text-zinc-300 text-lg font-medium">
                                          <div className="w-2 h-2 rounded-full bg-wings-red mt-2.5 shrink-0 shadow-[0_0_8px_rgba(79,70,229,0.5)]"></div>
                                          {item}
                                       </li>
                                    ))}
                                 </ul>
                              </div>

                              <div>
                                 <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">Requirements</h3>
                                 <div className="flex flex-wrap gap-3">
                                    {selectedJob.requirements.map((req, i) => (
                                       <span key={i} className="px-5 py-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-sm font-bold text-zinc-700 dark:text-zinc-300 shadow-sm">
                                          {req}
                                       </span>
                                    ))}
                                 </div>
                              </div>
                           </div>

                           {/* Sidebar CTA */}
                           <div className="lg:col-span-1">
                              <div className="glass-panel p-8 rounded-[2.5rem] bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 lg:sticky lg:top-8 h-fit shadow-lg">
                                 <h3 className="font-black text-xl mb-3 text-zinc-900 dark:text-white uppercase tracking-tight">Ready to Apply?</h3>
                                 <p className="text-sm text-zinc-500 mb-8 leading-relaxed font-medium">
                                    To maintain our elite standards, you must pass a role-specific aptitude test to unlock the application protocol.
                                 </p>
                                 
                                 <div className="space-y-5 mb-10">
                                    <div className="flex justify-between items-center text-sm border-b border-zinc-200 dark:border-white/5 pb-3">
                                       <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Questions</span>
                                       <span className="font-black text-zinc-900 dark:text-white">5</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-b border-zinc-200 dark:border-white/5 pb-3">
                                       <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Passing Score</span>
                                       <span className="font-black text-wings-red">80%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                       <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Time Limit</span>
                                       <span className="font-black text-zinc-900 dark:text-white">Untimed</span>
                                    </div>
                                 </div>

                                 <button 
                                    onClick={startTest}
                                    className="w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95 touch-manipulation"
                                 >
                                   Start Assessment
                                 </button>
                              </div>
                           </div>
                        </div>
                     ) : !testResult ? (
                        /* TEST VIEW */
                        <div className="max-w-2xl mx-auto pb-20">
                           <div className="mb-12 flex items-center justify-between">
                              <div>
                                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 block mb-1">Aptitude Protocol</span>
                                 <h3 className="text-3xl font-display font-black text-zinc-900 dark:text-white tracking-tighter">Evaluation Phase</h3>
                              </div>
                              <div className="flex flex-col items-end">
                                 <span className="text-2xl font-black text-wings-red font-mono">
                                    {answers.filter(a => a !== -1).length}/5
                                 </span>
                                 <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Answered</span>
                              </div>
                           </div>

                           <div className="space-y-10">
                              {selectedJob.questions.map((q, idx) => (
                                 <div key={q.id} className="p-8 rounded-[2.5rem] border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-black/20 shadow-sm">
                                    <div className="flex items-center gap-4 mb-6">
                                       <span className="px-3 py-1 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-widest">
                                          {q.type}
                                       </span>
                                       <h4 className="font-black text-zinc-400 uppercase text-xs tracking-widest">Question 0{idx + 1}</h4>
                                    </div>
                                    <p className="text-2xl text-zinc-900 dark:text-white mb-10 font-bold leading-tight tracking-tight">{q.text}</p>
                                    <div className="grid gap-4">
                                       {q.options.map((opt, optIdx) => (
                                          <button
                                             key={optIdx}
                                             onClick={() => handleAnswer(idx, optIdx)}
                                             className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group
                                                ${answers[idx] === optIdx 
                                                   ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-xl' 
                                                   : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-white/5 hover:border-wings-red/30'
                                                }
                                             `}
                                          >
                                             <span className={`text-lg font-bold tracking-tight ${answers[idx] === optIdx ? '' : 'text-zinc-600 dark:text-zinc-300'}`}>{opt}</span>
                                             <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${answers[idx] === optIdx ? 'bg-wings-red border-wings-red' : 'border-zinc-200 dark:border-zinc-800'}`}>
                                                {answers[idx] === optIdx && <Icons.Check className="w-4 h-4 text-white" />}
                                             </div>
                                          </button>
                                       ))}
                                    </div>
                                 </div>
                              ))}
                           </div>

                           <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-white/10">
                              <button 
                                 onClick={submitTest}
                                 disabled={answers.includes(-1)}
                                 className="w-full py-7 bg-wings-red text-white rounded-[2rem] font-black text-2xl shadow-2xl shadow-wings-red/40 hover:-translate-y-1 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] uppercase tracking-tighter"
                              >
                                 Finalize Submission
                              </button>
                           </div>
                        </div>
                     ) : (
                        /* RESULT VIEW */
                        <div className="max-w-2xl mx-auto text-center py-20">
                           {testResult === 'PASS' ? (
                              <div className="animate-fade-in-up">
                                 <div className="w-32 h-32 bg-green-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-glow text-white rotate-6 hover:rotate-0 transition-transform duration-500">
                                    <Icons.Check className="w-16 h-16" strokeWidth={3} />
                                 </div>
                                 <h2 className="text-5xl md:text-7xl font-display font-black text-zinc-900 dark:text-white mb-4 tracking-tighter">Validated.</h2>
                                 <p className="text-2xl text-zinc-500 mb-12 font-medium">Score: <span className="text-green-600 dark:text-green-400 font-black">{score}%</span> Precision Protocol Passed.</p>
                                 
                                 <div className="bg-white dark:bg-zinc-950 border-4 border-dashed border-green-500/50 p-10 rounded-[3rem] mb-12 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl"></div>
                                    
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">Phase 01: Priority Credentials</p>
                                    
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                                        <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-[1.8rem] border border-zinc-200 dark:border-white/10 font-mono text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-widest select-all break-all shadow-inner">
                                            {generatedCode}
                                        </div>
                                        <button 
                                            onClick={handleCopyCode}
                                            className="p-6 rounded-[1.8rem] bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-lg active:scale-90"
                                            title="Copy Code"
                                        >
                                            {copied ? <Icons.Check className="w-6 h-6" /> : <Icons.Copy className="w-6 h-6" />}
                                        </button>
                                    </div>

                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">Phase 02: Digital Submission</p>
                                    <a 
                                       href={`mailto:hr@wingsinstitute.com?subject=Application for ${selectedJob.title} [${generatedCode}]&body=Hi Team,%0D%0A%0D%0AI have passed the aptitude test with ${score}%. Please find my CV attached.%0D%0A%0D%0APass Code: ${generatedCode}`}
                                       className="w-full py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-4 hover:scale-[1.02] transition-all shadow-xl active:scale-95"
                                    >
                                       <Icons.Mail className="w-6 h-6" /> Initialize Email Protocol
                                    </a>
                                 </div>
                                 <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest px-8 leading-relaxed">Verification protocol: Subject line must include the above code for priority processing by HR neural filters.</p>
                              </div>
                           ) : (
                              <div className="animate-fade-in-up">
                                 <div className="w-32 h-32 bg-red-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl text-white -rotate-6">
                                    <Icons.Lock className="w-16 h-16 strokeWidth={3}" />
                                 </div>
                                 <h2 className="text-5xl md:text-7xl font-display font-black text-zinc-900 dark:text-white mb-4 tracking-tighter">Rejected.</h2>
                                 <p className="text-2xl text-zinc-500 mb-12 font-medium">Score: <span className="text-red-600 font-black">{score}%</span> <br/> Threshold of 80% not reached.</p>
                                 
                                 <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-900/30 p-10 rounded-[3rem] mb-12 text-lg text-red-800 dark:text-red-200 font-medium leading-relaxed">
                                    We demand excellence. Your evaluation indicates a gap in domain awareness required for this role. We recommend a cooldown period of 90 days before re-evaluation.
                                 </div>
                                 
                                 <button onClick={resetSelection} className="text-zinc-400 font-black uppercase tracking-[0.3em] hover:text-wings-red transition-colors text-xs border-b-2 border-zinc-200 dark:border-white/10 pb-1">
                                    Return to Job Grid
                                 </button>
                              </div>
                           )}
                        </div>
                     )}

                     {/* Footer Safe Zone Spacer */}
                     <div className="h-32"></div>
                  </div>
               </div>
            </div>
         </div>
      )}

    </div>
  );
};

