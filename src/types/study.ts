export type MessageRole = 'student' | 'tutor' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  isSocraticQuestion?: boolean;
  suggestedPrompts?: string[];
  isTaskCompleted?: boolean;
  completionSummary?: string;
}

export interface FlashCard {
  id: string;
  concept: string;
  hint: string;
  explanation: string;
  masteryScore: number; // 0 to 100
}

export interface StudyTopic {
  id: string;
  subject: string;
  name: string;
  level: string;
  keyConcepts: string[];
}

export type StudyTaskStatus = 'pending' | 'active' | 'paused' | 'completed';

export interface StudyTaskSession {
  topicId: string;
  status: StudyTaskStatus;
  selectedActivityId: string;
  messages: ChatMessage[];
  flashcardConcept?: string;
  flashcardExplanation?: string;
  flashcardRevealed: boolean;
  lastActiveAt?: string | Date;
  updatedAt?: string;
  completedAt?: string;
  completionSummary?: string;
}
