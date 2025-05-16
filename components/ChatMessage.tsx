import React from 'react';
import { Message } from '../types';
import { User, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex max-w-3/4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-purple-100 ml-2' : 'bg-gray-100 mr-2'
        }`}>
          {isUser ? (
            <User className="h-4 w-4 text-purple-600" />
          ) : (
            <Bot className="h-4 w-4 text-gray-600" />
          )}
        </div>
        <div
          className={`px-4 py-2 rounded-lg ${
            isUser
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;