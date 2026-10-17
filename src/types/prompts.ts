import type { StudentGrade } from './auth';

export type PromptFunctionalRole = 'socratic' | 'agenda' | 'project' | 'recall';

export interface PromptLayer {
  level: 'level1' | 'level2A' | 'level2B' | 'level3';
  badge: string;
  title: string;
  subtitle: string;
  source: string;
  content: string;
}

export interface AssembledPrompt {
  role: PromptFunctionalRole;
  gradeKey: StudentGrade;
  subject: string;
  topicId: string;
  topicName: string;
  activityId?: string;
  activityTitle?: string;
  systemInstruction: string;
  layers: {
    level1Functional: PromptLayer;
    level3Regulatory: PromptLayer;
    level2BaseTopic: PromptLayer;
    level2SpecificActivity?: PromptLayer;
  };
}

export interface TopicContextDefinition {
  id: string;
  gradeKey: StudentGrade;
  subject: string;
  name: string;
  fileKey: string;
  keyConcepts: string[];
  markdownContent?: string;
}

export interface ActivityDefinition {
  id: string;
  topicId: string;
  gradeKey: StudentGrade;
  subject: string;
  order: number;
  title: string;
  sentenceOrCase: string;
  variationType: string;
  fileKey: string;
  markdownContent?: string;
}
