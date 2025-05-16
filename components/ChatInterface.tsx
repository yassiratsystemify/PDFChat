import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { useChat } from '../context/ChatContext';
import { usePdf } from '../context/PdfContext';
import { motion } from 'framer-motion';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage } = useChat();
  const { document } = usePdf();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    await sendMessage(input);
    setInput('');
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4" ref={chatContainerRef}>
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chat with your PDF</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                {document 
                  ? "Ask questions about your document and get instant answers. Try asking for a summary or specific information." 
                  : "Upload a PDF first, then you can ask questions about its content."}
              </p>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        )}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-0"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={document ? "Ask a question about your PDF..." : "Upload a PDF to start chatting..."}
            disabled={!document || isLoading}
            className="flex-1 py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-200"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!document || !input.trim() || isLoading}
            className={`p-2 rounded-full ${
              !document || !input.trim() || isLoading
                ? 'bg-gray-200 text-gray-400'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            } focus:outline-none transition-colors duration-200`}
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;