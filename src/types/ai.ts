export type AIProvider = 'local' | 'cloud';

export interface AISettings {
  id?: number;
  provider: AIProvider;
  endpointUrl: string;       // Default: "http://localhost:11434/v1" for Ollama or "https://api.openai.com/v1"
  modelName: string;         // Default: "llama3:latest" or "gpt-4o-mini"
  apiKey?: string;           // Optional for local, stored only in client
  temperature: number;       // Default: 0.7
  socraticStrictness: 'high' | 'balanced' | 'exploratory'; // How strictly it withholds direct answers
  updatedAt: string;
}

export type SupportedLanguage = 'es' | 'ca' | 'ga' | 'eu' | 'va';
