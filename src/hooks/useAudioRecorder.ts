
import { useState, useRef, useCallback, useEffect } from 'react';

export interface AudioRecorderState {
    isRecording: boolean;
    recordingTime: number;
    audioBlob: Blob | null;
    error: string | null;
    startRecording: () => Promise<void>;
    stopRecording: () => void;
    resetRecording: () => void;
}

export const useAudioRecorder = (): AudioRecorderState => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const timerRef = useRef<number | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const getSupportedMimeType = () => {
        // iOS/Safari highly prefers audio/mp4. Chrome/Android prefers webm.
        const types = [
            'audio/mp4',
            'audio/webm;codecs=opus',
            'audio/webm',
            'audio/aac',
            'audio/mpeg'
        ];
        
        for (const type of types) {
            if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(type)) {
                return type;
            }
        }
        return '';
    };

    const startRecording = useCallback(async () => {
        setError(null);
        setAudioBlob(null);
        chunksRef.current = [];
        
        try {
            // Ensure any existing tracks are stopped
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(t => t.stop());
            }

            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                } 
            });
            
            streamRef.current = stream;
            const mimeType = getSupportedMimeType();
            
            const options: MediaRecorderOptions = {};
            if (mimeType) options.mimeType = mimeType;
            
            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                // Determine final type, defaulting to mp4 for iOS if recorder doesn't specify
                const finalMime = mediaRecorder.mimeType || mimeType || 'audio/mp4';
                const blob = new Blob(chunksRef.current, { type: finalMime });
                
                if (blob.size > 0) {
                    setAudioBlob(blob);
                } else {
                    setError("No audio data captured. Please try again.");
                }

                // Clean up hardware after data is safe
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                    streamRef.current = null;
                }
            };

            // timeslice 1000ms is more stable on mobile devices than small slices
            mediaRecorder.start(1000); 
            setIsRecording(true);
            setRecordingTime(0);
            
            timerRef.current = window.setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

        } catch (err: any) {
            console.error("Forensic Mic Error:", err);
            setError("Permission denied or microphone unavailable. Please check your settings.");
            setIsRecording(false);
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    }, []);

    const resetRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        setAudioBlob(null);
        setRecordingTime(0);
        setError(null);
        setIsRecording(false);
        
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    return {
        isRecording,
        recordingTime,
        audioBlob,
        error,
        startRecording,
        stopRecording,
        resetRecording
    };
};
