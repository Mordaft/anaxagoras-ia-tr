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
  priority?: 'urgent' | 'high' | 'normal';
  rescheduledCount?: number;
  originalDate?: string;
  origin?: 'institutional' | 'student';
  teacherNotes?: string;
}

export interface InstitutionalTaskProgression {
  block: StudyBlock;
  notificationMessage: string;
  sourceSubject: string;
  reason: 'topic_completed' | 'exam_scheduled' | 'assignment_published';
}

export interface DaySchedule {
  date: string;
  dayName: string;
  isToday: boolean;
  blocks: StudyBlock[];
}

export interface AgendaStats {
  urgentPriorities: Array<{
    title: string;
    subject: string;
    date: string;
    type: EventType;
    daysLeft: number;
  }>;
  afternoonDistribution: {
    classesEndTime: string;
    todayStudyMinutes: number;
    freeTimeHours: number;
    totalBlocksToday: number;
  };
  subjectBreakdown: Array<{
    subject: string;
    minutes: number;
    blockCount: number;
    percentage: number;
  }>;
  homeworkProgress: {
    completed: number;
    total: number;
    percentage: number;
  };
}

export interface PlanDialogMessage {
  id: string;
  role: 'assistant' | 'student';
  content: string;
  timestamp: string;
}
