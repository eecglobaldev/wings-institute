import { parseISO, format, getMonth, getYear, getDaysInMonth, startOfMonth, getDay } from 'date-fns';
import type { WingsEvent } from '@/types';

// Month names for filters
export const MONTHS = [
  { value: 0, label: 'January', short: 'Jan' },
  { value: 1, label: 'February', short: 'Feb' },
  { value: 2, label: 'March', short: 'Mar' },
  { value: 3, label: 'April', short: 'Apr' },
  { value: 4, label: 'May', short: 'May' },
  { value: 5, label: 'June', short: 'Jun' },
  { value: 6, label: 'July', short: 'Jul' },
  { value: 7, label: 'August', short: 'Aug' },
  { value: 8, label: 'September', short: 'Sep' },
  { value: 9, label: 'October', short: 'Oct' },
  { value: 10, label: 'November', short: 'Nov' },
  { value: 11, label: 'December', short: 'Dec' },
];

// Category definitions with colors and icons
export const CATEGORIES = [
  { value: 'all', label: 'All Events', icon: 'Sparkles' },
  { value: 'aviation', label: 'Aviation', icon: 'Plane' },
  { value: 'hospitality', label: 'Hotel Management', icon: 'Building2' },
  { value: 'culinary', label: 'Culinary Arts', icon: 'ChefHat' },
  { value: 'airport', label: 'Airport Mgmt', icon: 'Luggage' },
  { value: 'tourism', label: 'Travel & Tourism', icon: 'Globe' },
];

/**
 * Get calendar grid data for a month
 */
export const getCalendarDays = (
  year: number,
  month: number
): { day: number; isCurrentMonth: boolean; date: Date }[] => {
  const firstDay = startOfMonth(new Date(year, month));
  const daysInMonth = getDaysInMonth(firstDay);
  const startWeekday = getDay(firstDay); // 0 = Sunday

  const days: { day: number; isCurrentMonth: boolean; date: Date }[] = [];

  // Add empty slots for days before the 1st
  for (let i = 0; i < startWeekday; i++) {
    const prevDate = new Date(year, month, -startWeekday + i + 1);
    days.push({ day: prevDate.getDate(), isCurrentMonth: false, date: prevDate });
  }

  // Add days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true, date: new Date(year, month, i) });
  }

  // Add remaining days to complete the grid (6 rows × 7 days = 42)
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const nextDate = new Date(year, month + 1, i);
    days.push({ day: i, isCurrentMonth: false, date: nextDate });
  }

  return days;
};

/**
 * Get events for a specific day
 */
export const getEventsForDay = (
  events: WingsEvent[],
  year: number,
  month: number,
  day: number
): WingsEvent[] => {
  return events.filter(event => {
    const eventDate = parseISO(event.date);
    return (
      getYear(eventDate) === year &&
      getMonth(eventDate) === month &&
      eventDate.getDate() === day
    );
  });
};

/**
 * Helper function to format event date for display
 */
export const formatEventDate = (
  dateString: string,
  timeString: string
): {
  day: string;
  month: string;
  weekday: string;
  time: string;
  fullDate: string;
} => {
  const date = parseISO(dateString);

  return {
    day: format(date, 'd'),
    month: format(date, 'MMM'),
    weekday: format(date, 'EEEE'),
    time: timeString.substring(0, 5), // HH:mm
    fullDate: format(date, 'MMMM d, yyyy'),
  };
};

/**
 * Get category color and icon
 */
export const getCategoryStyles = (category: string): {
  bgColor: string;
  textColor: string;
  borderColor: string;
} => {
  switch (category) {
    case 'aviation':
      return {
        bgColor: 'bg-sky-500/10',
        textColor: 'text-sky-600 dark:text-sky-400',
        borderColor: 'border-sky-500/30',
      };
    case 'hospitality':
      return {
        bgColor: 'bg-amber-500/10',
        textColor: 'text-amber-600 dark:text-amber-400',
        borderColor: 'border-amber-500/30',
      };
    case 'culinary':
      return {
        bgColor: 'bg-orange-500/10',
        textColor: 'text-orange-600 dark:text-orange-400',
        borderColor: 'border-orange-500/30',
      };
    case 'airport':
      return {
        bgColor: 'bg-violet-500/10',
        textColor: 'text-violet-600 dark:text-violet-400',
        borderColor: 'border-violet-500/30',
      };
    case 'tourism':
      return {
        bgColor: 'bg-emerald-500/10',
        textColor: 'text-emerald-600 dark:text-emerald-400',
        borderColor: 'border-emerald-500/30',
      };
    case 'career':
      return {
        bgColor: 'bg-indigo-500/10',
        textColor: 'text-indigo-600 dark:text-indigo-400',
        borderColor: 'border-indigo-500/30',
      };
    case 'grooming':
      return {
        bgColor: 'bg-pink-500/10',
        textColor: 'text-pink-600 dark:text-pink-400',
        borderColor: 'border-pink-500/30',
      };
    default:
      return {
        bgColor: 'bg-zinc-500/10',
        textColor: 'text-zinc-600 dark:text-zinc-400',
        borderColor: 'border-zinc-500/30',
      };
  }
};

