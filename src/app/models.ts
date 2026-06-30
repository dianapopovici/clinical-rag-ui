export interface Source {
  id: string;
  score: number;
  text: string;
}

export interface RagAnswer {
  answer: string;
  sources: Source[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  sources?: Source[];
}
