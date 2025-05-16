import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ChatContextType, Message } from '../types';
import { usePdf } from './PdfContext';
import { simulateAiResponse } from '../utils/aiUtils';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const { document } = usePdf();

  const addMessage = (content: string, role: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || !document?.text) return;

    // Add user message
    addMessage(content, 'user');
    
    // Start loading state
    setIsLoading(true);
    
    try {
      // Send message to webhook and get response
      const response = await simulateAiResponse(content, document.text, sessionId);
      
      // Add AI response
      addMessage(response, 'assistant');
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage('Sorry, I encountered an error processing your request. Please try again.', 'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        addMessage,
        clearMessages,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};