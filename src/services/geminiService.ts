
import { GoogleGenAI, Type } from "@google/genai";
import { Industry, Round, Question, FeedbackData } from '@/components/InterviewCoach/types';
import { getStaticQuestions } from '@/components/InterviewCoach/questionBank';
import { PAScript, PAFeedback } from '@/components/PASimulator/types';

/* Fix: Initialize GoogleGenAI directly with process.env.API_KEY as per coding guidelines */
/* Note: For client-side usage, we use NEXT_PUBLIC_GEMINI_API_KEY. For server-side, use API_KEY */
const getAI = () => {
    if (typeof window !== 'undefined') {
        // Client-side: use public env var (should be moved to server action for security)
        return new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });
    }
    // Server-side: use private env var
    return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
};

export const getAIQuestions = async (industry: Industry, round: Round, t: (key: any) => string): Promise<Question[]> => {
    const staticPool = getStaticQuestions(industry.id, round.id);
    const ai = getAI();
    let aiQuestions: Question[] = [];

    if (ai) {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: [{ parts: [{ text: `Generate 5 UNIQUE, professional, and challenging interview questions for a ${round.title} role in the ${industry.title} industry. Output MUST be a JSON array with keys: "en", "hi", "gu".` }] }],
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                en: { type: Type.STRING },
                                hi: { type: Type.STRING },
                                gu: { type: Type.STRING }
                            },
                            required: ["en", "hi", "gu"]
                        }
                    }
                }
            });
            
            const text = response.text;
            if (text) {
                const parsed = JSON.parse(text);
                if (Array.isArray(parsed)) aiQuestions = parsed;
            }
        } catch (error) {
            console.warn("AI Question generation failed, using static pool.", error);
        }
    }

    const combined = [...aiQuestions, ...staticPool];
    return combined.filter((q, index, self) =>
        index === self.findIndex((t) => t.en === q.en)
    );
};

export const transcribeAudio = async (audioBlob: Blob, language: string, t: (key: any) => string): Promise<string> => {
    const ai = getAI();
    // Check for API key based on environment (client vs server)
    const apiKey = typeof window !== 'undefined' 
        ? process.env.NEXT_PUBLIC_GEMINI_API_KEY 
        : process.env.API_KEY;
    if (!apiKey) throw new Error(t('noApiKey'));

    const reader = new FileReader();
    const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]);
        };
        reader.onerror = reject;
    });
    reader.readAsDataURL(audioBlob);
    const base64Data = await base64Promise;

    const cleanMimeType = audioBlob.type.split(';')[0];

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: {
                parts: [
                    { text: "Transcribe this audio exactly as spoken. It may contain English, Hindi, or a mix. Return ONLY the transcription text." },
                    { inlineData: { mimeType: cleanMimeType, data: base64Data } }
                ]
            }
        });
        return response.text?.trim() || "";
    } catch (e) {
        console.error("Transcription Error:", e);
        throw new Error("Unable to process audio. Please try speaking clearer or using a different browser.");
    }
};

const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const analyzePAAnnouncement = async (
    script: PAScript, 
    audioBlobEn: Blob, 
    durationEn: number,
    audioBlobHi: Blob,
    durationHi: number
): Promise<PAFeedback> => {
    const ai = getAI();
    if (!process.env.API_KEY) throw new Error("API Key Missing");

    if (audioBlobEn.size === 0 || audioBlobHi.size === 0) {
        throw new Error("One or more audio recordings are empty. Please re-record.");
    }

    try {
        const base64En = await blobToBase64(audioBlobEn);
        const base64Hi = await blobToBase64(audioBlobHi);
        
        // Clean MIME types for standard API consumption
        const mimeEn = audioBlobEn.type.split(';')[0] || 'audio/mp4';
        const mimeHi = audioBlobHi.type.split(';')[0] || 'audio/mp4';

        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: {
                parts: [
                    { text: `Analyze this In-Flight PA announcement performance. 
                    
                    I am providing two separate audio files:
                    1. The first audio is the user's ENGLISH recording.
                    2. The second audio is the user's HINDI recording.
                    
                    SCRIPTS TO EVALUATE AGAINST:
                    ENGLISH SCRIPT: "${script.contentEn}"
                    HINDI SCRIPT: "${script.contentHi}"
                    
                    DATA:
                    English Duration: ${durationEn} seconds.
                    Hindi Duration: ${durationHi} seconds.
                    Target Pacing: ${script.targetWPM} WPM.
                    
                    EVALUATION CRITERIA:
                    - Analyze the English recording against the English script.
                    - Analyze the Hindi recording against the Hindi script.
                    - Provide an aggregated Overall Score (0-10).
                    - Evaluate Accuracy (% of words correct for each).
                    - Evaluate Clarity & Diction (phrasing and pronunciation quality).
                    - Evaluate Tone (Professional, authoritative, calm).
                    
                    Return ONLY JSON.` },
                    { inlineData: { mimeType: mimeEn, data: base64En } },
                    { inlineData: { mimeType: mimeHi, data: base64Hi } }
                ]
            },
            config: {
                systemInstruction: "You are a senior Chief Cabin Crew trainer for Air India. You are an expert in evaluating both Hindi and English flight announcements. Evaluate the two provided audio files (English and Hindi) for accuracy, clarity, and authority. Provide detailed combined feedback in JSON format.",
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.NUMBER },
                        wpm: { type: Type.NUMBER },
                        accuracy: { type: Type.NUMBER },
                        clarity: { type: Type.NUMBER },
                        tone: { type: Type.STRING },
                        pros: { type: Type.ARRAY, items: { type: Type.STRING } },
                        cons: { type: Type.ARRAY, items: { type: Type.STRING } },
                        transcription: { type: Type.STRING, description: "Combined transcription of both recordings" }
                    },
                    required: ["score", "wpm", "accuracy", "clarity", "tone", "pros", "cons", "transcription"]
                }
            }
        });

        return JSON.parse(response.text || "{}") as PAFeedback;
    } catch (e) {
        console.error("Forensic PA Analysis Error:", e);
        throw new Error("Analysis failed. This can happen on some iOS versions due to audio encoding. Please try a shorter recording or ensure your mic is clear.");
    }
};

export const getFinalAIFeedback = async (question: Question, answer: string, language: string, t: (key: any) => string): Promise<FeedbackData> => {
    const ai = getAI();
    if (!process.env.API_KEY) throw new Error(t('noApiKey'));

    const langName = { en: 'English', hi: 'Hindi', gu: 'Gujarati' }[language] || 'English';
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: { 
                parts: [{ 
                    text: `Analyze this interview response.
                    Question: "${question.en}"
                    Candidate Answer: "${answer}"
                    Target Language for Feedback/Analysis: ${langName}.
                    CRITICAL: The 'modelAnswer' field MUST be in English only, regardless of the target language for the rest of the feedback.` 
                }] 
            },
            config: {
                systemInstruction: "You are a senior HR manager for a 5-star airline and hotel group. Provide critical, professional feedback in JSON format. Scores are 0-10. Be encouraging but honest. IMPORTANT: The 'modelAnswer' field must always be provided in high-quality professional English.",
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.NUMBER },
                        metrics: {
                            type: Type.OBJECT,
                            properties: {
                                clarity: { type: Type.NUMBER },
                                confidence: { type: Type.NUMBER },
                                role: { type: Type.NUMBER }
                            },
                            required: ["clarity", "confidence", "role"]
                        },
                        analytics: {
                            type: Type.OBJECT,
                            properties: {
                                paceFeedback: { type: Type.STRING },
                                fillers: { type: Type.ARRAY, items: { type: Type.STRING } }
                            },
                            required: ["paceFeedback", "fillers"]
                        },
                        whatWentWell: { type: Type.ARRAY, items: { type: Type.STRING } },
                        areasForImprovement: { type: Type.ARRAY, items: { type: Type.STRING } },
                        modelAnswer: { type: Type.STRING, description: "Professional suggested answer strictly in English." }
                    },
                    required: ["score", "metrics", "analytics", "whatWentWell", "areasForImprovement", "modelAnswer"]
                }
            }
        });

        const rawText = response.text;
        if (!rawText) throw new Error("AI returned empty analysis.");
        
        const feedback = JSON.parse(rawText);
        
        if (feedback.score > 10) feedback.score /= 10;
        
        return feedback as FeedbackData;
    } catch (error) {
        console.error("Gemini Analysis Exception:", error);
        throw new Error("Analysis failed. This usually happens if the answer is too short or noisy. Please try giving a more detailed response.");
    }
};
