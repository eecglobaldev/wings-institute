
import { Department } from '@/components/CQTypes';

export const DEPARTMENTS: Department[] = [
  // --- AVIATION SECTOR ---
  {
    id: 'cabin-crew-safety',
    name: 'Cabin Crew - Safety',
    nameHi: 'केबिन क्रू - सुरक्षा (Safety)',
    description: 'Emergency procedures, safety demos, and in-flight protocols.',
    descriptionHi: 'आपातकालीन प्रक्रियाएं, सेफ्टी डेमो, और इन-फ्लाइट प्रोटोकॉल।',
    icon: 'ShieldCheck',
    color: 'from-rose-500 to-red-600'
  },
  {
    id: 'cabin-crew-service',
    name: 'Cabin Crew - Service',
    nameHi: 'केबिन क्रू - सेवा (Service)',
    description: 'Hospitality, food & beverage service, and passenger care.',
    descriptionHi: 'हॉस्पिटैलिटी, F&B सर्विस, और पैसेंजर केयर।',
    icon: 'Coffee',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'check-in',
    name: 'Airport Check-In Operations',
    nameHi: 'एयरपोर्ट चेक-इन ऑपरेशन्स',
    description: 'DCS systems, baggage acceptance, and travel document verification.',
    descriptionHi: 'DCS सिस्टम, बैगेज स्वीकृति, और यात्रा दस्तावेज़ सत्यापन।',
    icon: 'Ticket',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'avsec-training',
    name: 'AVSEC - Aviation Security',
    nameHi: 'AVSEC - विमानन सुरक्षा',
    description: 'Security protocols, Dangerous Goods (DGR), AEP color codes, and anti-sabotage measures.',
    descriptionHi: 'सिक्योरिटी प्रोटोकॉल, DGR (खतरनाक सामान), और एंटी-साबोटेज उपाय।',
    icon: 'ShieldAlert',
    color: 'from-red-600 to-rose-700'
  },
  {
    id: 'boarding-gate',
    name: 'Boarding Gate',
    nameHi: 'बोर्डिंग गेट',
    description: 'Boarding procedures, announcements, and turnaround management.',
    descriptionHi: 'बोर्डिंग प्रक्रियाएं, घोषणाएं (Announcements), और टर्नअराउंड प्रबंधन।',
    icon: 'Users',
    color: 'from-indigo-500 to-violet-600'
  },
  {
    id: 'security-bcas',
    name: 'Frisking & Screening',
    nameHi: 'तलाशी और स्क्रीनिंग',
    description: 'Passenger screening, HHMD/DFMD usage, and prohibited items.',
    descriptionHi: 'पैसेंजर स्क्रीनिंग, HHMD/DFMD का उपयोग, और प्रतिबंधित वस्तुएं।',
    icon: 'ScanLine',
    color: 'from-slate-600 to-slate-800'
  },
  {
    id: 'ramp-operations',
    name: 'Ramp Operations',
    nameHi: 'रैम्प ऑपरेशन्स',
    description: 'Marshaling, baggage handling, and aircraft turnaround safety.',
    descriptionHi: 'मार्शलिंग, बैगेज हैंडलिंग, और विमान टर्नअराउंड सुरक्षा।',
    icon: 'Plane',
    color: 'from-orange-500 to-amber-600'
  },
  {
    id: 'international-regs',
    name: 'International Travel',
    nameHi: 'अंतर्राष्ट्रीय यात्रा (International)',
    description: 'Visa requirements, customs, and immigration procedures.',
    descriptionHi: 'वीज़ा आवश्यकताएं, कस्टम्स (Customs), और इमिग्रेशन प्रक्रियाएं।',
    icon: 'Globe',
    color: 'from-violet-600 to-purple-600'
  },

  // --- HOSPITALITY SECTOR ---
  {
    id: 'hotel-mgmt-generic',
    name: 'Hotel Management (General)',
    nameHi: 'होटल प्रबंधन (General)',
    description: 'Industry overview, star classifications, and department hierarchy.',
    descriptionHi: 'इंडस्ट्री ओवरव्यू, स्टार वर्गीकरण, और डिपार्टमेंट पदानुक्रम।',
    icon: 'Building',
    color: 'from-teal-500 to-emerald-600'
  },
  {
    id: 'front-office',
    name: 'Front Office',
    nameHi: 'फ्रंट ऑफिस (Front Office)',
    description: 'Guest check-in/out, concierge, PMS operations, and reservations.',
    descriptionHi: 'गेस्ट चेक-इन/आउट, कंसीयज, PMS ऑपरेशन्स, और रिजर्वेशन।',
    icon: 'ConciergeBell',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'fnb-service',
    name: 'F&B Service',
    nameHi: 'F&B सर्विस',
    description: 'Fine dining etiquette, cutlery, wine service, and banquet operations.',
    descriptionHi: 'फाइन डाइनिंग शिष्टाचार, कटलरी, वाइन सर्विस, और बैंक्वेट ऑपरेशन्स।',
    icon: 'Utensils',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'food-production',
    name: 'Food Production',
    nameHi: 'फूड प्रोडक्शन (Kitchen)',
    description: 'Culinary arts, kitchen hygiene, vegetable cuts, and cooking methods.',
    descriptionHi: 'पाक कला, किचन हाइजीन, और कुकिंग के तरीके।',
    icon: 'ChefHat',
    color: 'from-red-600 to-orange-700'
  },
  {
    id: 'housekeeping',
    name: 'Housekeeping',
    nameHi: 'हाउसकीपिंग (Housekeeping)',
    description: 'Room cleaning standards, bed making, chemicals, and laundry.',
    descriptionHi: 'रूम क्लीनिंग स्टैंडर्ड्स, बेड मेकिंग, केमिकल्स, और लॉन्ड्री।',
    icon: 'BedDouble',
    color: 'from-lime-500 to-green-600'
  },
  
  // --- CAREER SKILLS ---
  {
    id: 'grooming',
    name: 'Grooming & Etiquette',
    nameHi: 'ग्रूमिंग और शिष्टाचार',
    description: 'Professional appearance standards for Aviation and Hospitality.',
    descriptionHi: 'एविएशन और हॉस्पिटैलिटी के लिए प्रोफेशनल अपीयरेंस स्टैंडर्ड्स।',
    icon: 'Briefcase',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'interview-prep',
    name: 'Interview Readiness',
    nameHi: 'इंटरव्यू तैयारी',
    description: 'HR questions, situational judgement, and behavioral (STAR) method.',
    descriptionHi: 'HR प्रश्न, सिचुएशनल जजमेंट, और व्यवहार (STAR) पद्धति।',
    icon: 'UserCheck',
    color: 'from-fuchsia-600 to-pink-600'
  },
  {
    id: 'aviation-english',
    name: 'Aviation English & PA',
    nameHi: 'विमानन अंग्रेजी और PA',
    description: 'In-flight announcements, vocabulary, and communication skills.',
    descriptionHi: 'इन-फ्लाइट अनाउंसमेंट्स, शब्दावली (Vocabulary), और कम्युनिकेशन स्किल्स।',
    icon: 'Languages',
    color: 'from-sky-500 to-cyan-600'
  }
];

export const MAX_LIVES = 5;
export const QUESTIONS_PER_ROUND = 20;
export const TOTAL_SETS = 5; // 5 Sets of 20 = 100 Questions
export const PASSING_SCORE = 12; // 60% to unlock next set

export const UI_TEXT = {
  en: {
    quit: "Quit",
    quitToDashboard: "Quit to Dashboard",
    cancel: "Cancel",
    question: "Question",
    scoreXP: "XP",
    confirmAnswer: "Confirm Selection",
    nextQuestion: "Next Challenge",
    loadingMore: "Designing scenarios...",
    finishQuiz: "Complete Training",
    correct: "Excellent!",
    incorrect: "Incorrect",
    explanationReveal: "Reveal Expert Insight",
    expertInsight: "Expert Analysis",
    preparing: "Initializing Simulation",
    generating: "Curating scenario-based challenges for",
    readyHeader: "Wings CareerQuest",
    readySubtext: "The ultimate career readiness platform for Aviation & Hospitality professionals. Test your skills across 16 specialized departments.",
    moduleComplete: "Simulation Complete",
    finishedSession: "You have completed Set",
    score: "Final Score",
    accuracy: "Precision",
    perfectScore: "Mastery Achieved!",
    perfectText: "You have demonstrated exceptional knowledge and are ready for the industry.",
    retryModule: "Replay Set",
    nextSet: "Start Next Set",
    returnDashboard: "Back to Hub",
    trainingMode: "Proficiency Level",
    trainee: "Trainee",
    professional: "Professional",
    expert: "Expert",
    scenario: "Operational Scenario",
    chooseMode: "Choose Your Training Mode",
    motivationalMessage: "You’re building real confidence with every question. Keep going!",
    // Categories
    catAll: "All Departments",
    catAviation: "Aviation",
    catHospitality: "Hospitality",
    catSkills: "Career Skills",
    selectCategory: "What is your career focus?",
    footer: "© 2025 Wings Air Hostess & Hotel Management Institute, Vadodara. All rights reserved.",
    // Levels
    selectSet: "Select Training Module",
    set: "Set",
    locked: "Locked",
    completed: "Completed",
    unlockNext: "Score 12/20 to unlock next set",
    set1Desc: "Fundamentals & Terminology",
    set2Desc: "Standard Procedures (SOPs)",
    set3Desc: "Operational Scenarios",
    set4Desc: "Emergency & Critical Care",
    set5Desc: "Mastery & Regulation"
  },
  hi: {
    quit: "बाहर निकलें",
    quitToDashboard: "डैशबोर्ड पर जाएं",
    cancel: "रद्द करें",
    question: "प्रश्न",
    scoreXP: "अंक",
    confirmAnswer: "उत्तर की पुष्टि करें",
    nextQuestion: "अगला प्रश्न",
    loadingMore: "परिदृश्य तैयार हो रहे हैं...",
    finishQuiz: "क्विज़ समाप्त करें",
    correct: "अति उत्कृष्ट!",
    incorrect: "गलत",
    explanationReveal: "विशेषज्ञ की राय देखें",
    expertInsight: "विशेषज्ञ विश्लेषण",
    preparing: "सिमुलेशन शुरू हो रहा है",
    generating: "हम आपके लिए चुनौतियां तैयार कर रहे हैं: ",
    readyHeader: "Wings CareerQuest",
    readySubtext: "एविएशन और हॉस्पिटैलिटी करियर के लिए अंतिम तैयारी मंच। 16 विशिष्ट विभागों में अपने कौशल का परीक्षण करें।",
    moduleComplete: "सिमुलेशन पूर्ण",
    finishedSession: "आपने सेट पूरा कर लिया है",
    score: "अंतिम स्कोर",
    accuracy: "सटीकता",
    perfectScore: "महारत हासिल की!",
    perfectText: "आपने असाधारण ज्ञान का प्रदर्शन किया है और उद्योग के लिए तैयार हैं।",
    retryModule: "सेट फिर से करें",
    nextSet: "अगला सेट शुरू करें",
    returnDashboard: "हब पर वापस जाएं",
    trainingMode: "प्रशिक्षु (Trainee)",
    trainee: "प्रशिक्षु (Trainee)",
    professional: "पेशेवर (Professional)",
    expert: "विशेषज्ञ (Expert)",
    scenario: "परिदृश्य",
    chooseMode: "अपना प्रशिक्षण मोड चुनें",
    motivationalMessage: "हर प्रश्न के साथ आपका आत्मविश्वास बढ़ रहा है। आगे बढ़ते रहें!",
    // Categories
    catAll: "सभी विभाग",
    catAviation: "विमानन (Aviation)",
    catHospitality: "आतिथ्य (Hospitality)",
    catSkills: "करियर कौशल",
    selectCategory: "आपका करियर फोकस क्या है?",
    footer: "© 2025 विंग्स एयर होस्टेस और होटल मैनेजमेंट इंस्टीट्यूट, वडोदरा। सर्वाधिकार सुरक्षित।",
    // Levels
    selectSet: "प्रशिक्षण मॉड्यूल चुनें",
    set: "सेट",
    locked: "लॉक है",
    completed: "पूर्ण",
    unlockNext: "अगला सेट खोलने के लिए 12/20 स्कोर करें",
    set1Desc: "मूल बातें और शब्दावली (Basics)",
    set2Desc: "मानक प्रक्रियाएं (SOPs)",
    set3Desc: "परिचालन परिदृश्य (Scenarios)",
    set4Desc: "आपातकालीन और गंभीर देखभाल (Emergency)",
    set5Desc: "महारत और नियम (Regulations)"
  }
};
