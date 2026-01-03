
import { GoogleGenAI, Type } from "@google/genai";
import { Question, Difficulty, Language } from "@/components/CQTypes";

// Note: API key should be handled via server action for security
// For now, using client-side with environment variable (should be moved to server action)
const getAIInstance = () => {
  if (typeof window === 'undefined') return null;
  // API key should come from server action, not client-side env
  // This is a temporary solution - should be refactored
  return new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });
};

export const generateQuestions = async (
  topic: string, 
  count: number = 20, 
  difficulty: Difficulty,
  language: Language = 'en',
  setNumber: number = 1
): Promise<Question[]> => {
  const aiInstance = getAIInstance();
  if (!aiInstance) {
    console.error("API Key is missing or not available in client context");
    return mockQuestions(topic, language);
  }

  // 1. Determine Domain (Aviation vs Hospitality)
  const hospitalityKeywords = ['Hotel', 'Front Office', 'F&B', 'Food', 'Housekeeping', 'Chef', 'Kitchen'];
  const isHospitality = hospitalityKeywords.some(keyword => topic.includes(keyword));
  const isInterview = topic.includes('Interview');
  const isEnglish = topic.includes('English');

  // 2. Define Persona based on Domain
  let systemRole = "";
  if (isInterview) {
    systemRole = `
      ACT AS: A Senior Airline Recruiter (IndiGo/Emirates) and Hotel HR Manager.
      EXPERTISE: Behavioral Interviewing (STAR Method), Grooming Standards, Body Language, and Psychometric Evaluation.
    `;
  } else if (isEnglish) {
    systemRole = `
      ACT AS: An Aviation Communication Specialist and Voice & Accent Trainer.
      EXPERTISE: ICAO English Proficiency, In-flight Announcements (PA), Grammar, 24-Hour Clock, and Hospitality Vocabulary.
    `;
  } else if (isHospitality) {
    systemRole = `
      ACT AS: A Senior Hotel Management Auditor and Executive Trainer for 5-Star Luxury Hotels (Oberoi/Taj Standard).
      EXPERTISE: FSSAI (Food Safety), AHLEI Standards, Hotel Operations, and Luxury Guest Service.
    `;
  } else {
    systemRole = `
      ACT AS: A Senior Aviation Examiner and Lead Instructor for Wings Institute (India). 
      EXPERTISE: DGCA (Directorate General of Civil Aviation) Civil Aviation Requirements (CARs), BCAS (Bureau of Civil Aviation Security) AvSec Orders, and IATA guidelines.
    `;
  }

  // 3. SET-SPECIFIC STRATEGY (The Core Logic for 100 Unique Questions)
  // We use strict MUTUALLY EXCLUSIVE boundaries to ensure no repetition.
  let setFocus = "";
  switch(setNumber) {
    case 1:
      setFocus = "STRICT CONTEXT: FUNDAMENTALS & TERMINOLOGY. Questions must ONLY cover: Definitions, Full forms of abbreviations (e.g., DGCA, PNR), Identification of zones/parts, and basic hierarchy. DO NOT include scenarios or emergency procedures.";
      break;
    case 2:
      setFocus = "STRICT CONTEXT: STANDARD OPERATING PROCEDURES (SOPs). Questions must ONLY cover: The correct SEQUENCE of actions for routine tasks, Checklists, Documentation requirements, and Standard software/tool usage. DO NOT include basic definitions.";
      break;
    case 3:
      setFocus = "STRICT CONTEXT: OPERATIONAL SCENARIOS. Questions must be SITUATIONAL. 'A passenger is shouting... what is the first step?'. Focus on soft skills, conflict resolution, and handling minor delays. NO routine SOPs.";
      break;
    case 4:
      setFocus = "STRICT CONTEXT: EMERGENCY & CRITICAL HANDLING. Questions must ONLY cover: Safety hazards, Medical emergencies (CPR/First Aid), Fire drills, Bomb threats, and Security breaches. High stakes decision making.";
      break;
    case 5:
      setFocus = "STRICT CONTEXT: MASTERY, REGULATIONS & MANAGEMENT. Questions must ONLY cover: Specific Acts/Rules (Aircraft Rules 1937), Fines/Penalties, VIP Protocols, and Manager-level resource allocation. The hardest level.";
      break;
    default:
      setFocus = "General Assessment";
  }

  // 4. Define Difficulty Constraints
  let difficultyContext = "";
  if (difficulty === Difficulty.Beginner) {
    difficultyContext = "TARGET AUDIENCE: New Trainee (0-6 months). Questions should be straightforward fact-recall. Use simple language.";
  } else if (difficulty === Difficulty.Intermediate) {
    difficultyContext = "TARGET AUDIENCE: Working Professional (1-2 years). Questions should involve application of knowledge to common tasks.";
  } else {
    difficultyContext = "TARGET AUDIENCE: Supervisor/Expert (5+ years). Questions should involve critical thinking, nuance, and exception handling.";
  }

  const model = "gemini-3-flash-preview";
  
  // Strict Hinglish Instruction for Industry Accuracy
  const languageInstruction = language === 'hi' 
    ? "OUTPUT LANGUAGE: HINDI (Devanagari). CRITICAL: Keep ALL technical Aviation/Hospitality terms in English/Hinglish (e.g., write 'Cockpit' as 'Cockpit' or 'कॉकपिट', DO NOT write 'विमान चालक कक्ष'). Write 'Check-in' as 'Check-in', not 'पंजीकरण'. The grammar should be Hindi, but the nouns must be industry-standard English." 
    : "OUTPUT LANGUAGE: English. Professional Industry Standard.";

  const prompt = `
    ${systemRole}

    TASK: Generate a batch of exactly ${count} multiple-choice questions for the department: "${topic}".
    
    ${setFocus}
    ${difficultyContext}
    
    ${languageInstruction}

    QUALITY CONTROL RULES:
    1. ACCURACY: Ensure every correct answer is valid per current standards (DGCA for Aviation / AHLEI & FSSAI for Hotels).
    2. DISTRACTORS: Wrong options must be plausible mistakes, not obvious jokes.
    3. EXPLANATION: Must be educational. Explain WHY the answer is right.
    4. MOTIVATION: Generate a UNIQUE, high-energy affirmation (max 15 words) for getting this specific question right.
    5. UNIQUENESS: Do not repeat questions. Follow the SET FOCUS strictly.
    
    CRITICAL: This is Set ${setNumber} of 5. DO NOT generate questions that belong in other sets. Stick strictly to the "SET FOCUS" defined above to ensure the user gets 100 unique questions total.

    Ensure the output is strictly valid JSON array.
  `;

  try {
    const response = await aiInstance.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING, description: "The question text" },
              scenario: { type: Type.STRING, description: "Context/Situation (Required for Sets 3, 4, 5)", nullable: true },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Array of 4 options. One correct, three plausible distractors."
              },
              correctIndex: { type: Type.INTEGER, description: "0-3 index of correct answer" },
              explanation: { type: Type.STRING, description: "Detailed educational feedback." },
              motivationalMessage: { type: Type.STRING, description: "A unique, short, inspiring 1-sentence affirmation." }
            },
            required: ["text", "options", "correctIndex", "explanation", "motivationalMessage"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No data returned from AI");
    
    const rawData = JSON.parse(jsonText);
    
    return rawData.map((q: any, index: number) => ({
      id: `${topic.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}-set${setNumber}-${index}`,
      category: topic,
      text: q.text,
      scenario: q.scenario || undefined,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      motivationalMessage: q.motivationalMessage || "Your potential is limitless. Keep soaring!"
    }));

  } catch (error) {
    console.error("Gemini API Error:", error);
    return mockQuestions(topic, language);
  }
};

// Fallback for dev or error cases
const mockQuestions = (topic: string, language: Language): Question[] => {
  return [
    {
      id: 'mock-1',
      category: topic,
      text: "AI service is unavailable. Please try again.",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctIndex: 0,
      explanation: "Connectivity issue.",
      motivationalMessage: "Stay resilient and try again."
    }
  ];
};
