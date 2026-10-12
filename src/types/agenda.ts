export type EventType = 'exam' | 'study_session' | 'assignment_due' | 'class';

export interface StudyBlock {
  id?: number;
  title: string;
  subject: string;
  date: string;              // YYYY-MM-DD
  startTime: string;         // HH:mm
  durationMinutes: number;   // e.g. 45
  type: EventType;
  completed: boolean;
  notes?: string;
  gradeKey?: '1eso' | '2batx' | 'both';
  syncedWithGoogle: boolean;
  googleEventId?: string;
}

export interface DaySchedule {
  date: string;
  dayName: string;
  isToday: boolean;
  blocks: StudyBlock[];
}
