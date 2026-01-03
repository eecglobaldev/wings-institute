
import React from 'react';
import { Plane, Luggage, Building, Mic, Square, ChevronLeft, Play, X, User } from 'lucide-react';

export const CabinCrewIcon = ({ className }: { className?: string }) => <Plane className={className} />;
export const AirportStaffIcon = ({ className }: { className?: string }) => <Luggage className={className} />;
export const HotelIcon = ({ className }: { className?: string }) => <Building className={className} />;
export const MicIcon = ({ className }: { className?: string }) => <Mic className={className} />;
export const StopIcon = ({ className }: { className?: string }) => <Square className={className} fill="currentColor" />; // Use Square for stop
export const ChevronLeftIcon = ({ className }: { className?: string }) => <ChevronLeft className={className} />;
export const PlayIcon = ({ className }: { className?: string }) => <Play className={className} />;
export const XIcon = ({ className }: { className?: string }) => <X className={className} />;
