import React from 'react';
import { PdfProvider } from './context/PdfContext';
import { ChatProvider } from './context/ChatContext';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import PdfViewer from './components/PdfViewer';
import ChatInterface from './components/ChatInterface';
import { motion } from 'framer-motion';

function App() {
  return (
    <PdfProvider>
      <ChatProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          
          <main className="flex-1 container mx-auto px-4 py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Document</h2>
              <p className="text-gray-600 mb-4">
                Upload a PDF file to chat with its contents using AI. Get answers, summaries, and insights instantly.
              </p>
              <FileUpload />
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6 h-[600px]">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-full"
              >
                <PdfViewer />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 h-full"
              >
                <ChatInterface />
              </motion.div>
            </div>
          </main>
          
          <footer className="bg-white border-t border-gray-200 py-4">
            <div className="container mx-auto px-4 text-center text-sm text-gray-500">
              <p>&copy; 2025 PDF Chat App. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </ChatProvider>
    </PdfProvider>
  );
}

export default App;