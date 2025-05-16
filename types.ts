export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface PdfDocument {
  file: File;
  name: string;
  size: number;
  url: string;
  text?: string;
}

export interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  clearMessages: () => void;
  sendMessage: (content: string) => Promise<void>;
}

export interface PdfContextType {
  document: PdfDocument | null;
  isProcessing: boolean;
  error: string | null;
  setDocument: (doc: PdfDocument | null) => void;
  processDocument: (file: File) => Promise<void>;
  clearDocument: () => void;
}