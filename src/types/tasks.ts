export type TaskPhase = 'planning' | 'research' | 'writing' | 'review';

export interface DriveAttachment {
  fileId: string;
  name: string;
  mimeType: string;
  iconUrl?: string;
  webViewLink?: string;
  lastModified?: string;
}

export interface AutonomyCriterion {
  id: string;
  label: string;
  checked: boolean;
  explanation: string;
}

export interface ProjectTask {
  id?: number;
  title: string;
  subject: string;
  dueDate: string;
  currentPhase: TaskPhase;
  autonomyScore: number;     // 0 to 100 percentage based on completed self-learning criteria
  driveFiles: DriveAttachment[];
  criteria: AutonomyCriterion[];
  notes: string;
  gradeKey?: '1eso' | '2batx' | 'both';
  pedagogicalNote?: string; // Anotación de adaptación al estadio cognitivo de Piaget
  topicId?: string;
  activityId?: string;
}
