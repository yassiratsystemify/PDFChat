import React, { createContext, useState, useContext, ReactNode } from 'react';
import { PdfContextType, PdfDocument } from '../types';
import { extractTextFromPdf } from '../utils/pdfUtils';

const PdfContext = createContext<PdfContextType | undefined>(undefined);

export const usePdf = () => {
  const context = useContext(PdfContext);
  if (!context) {
    throw new Error('usePdf must be used within a PdfProvider');
  }
  return context;
};

interface PdfProviderProps {
  children: ReactNode;
}

export const PdfProvider: React.FC<PdfProviderProps> = ({ children }) => {
  const [document, setDocumentState] = useState<PdfDocument | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setDocument = (doc: PdfDocument | null) => {
    setDocumentState(doc);
    setError(null);
  };

  const processDocument = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Create a URL for the file
      const url = URL.createObjectURL(file);
      
      // Extract text by sending to webhook
      const text = await extractTextFromPdf(file);
      
      // Create a document object
      const doc: PdfDocument = {
        file,
        name: file.name,
        size: file.size,
        url,
        text,
      };
      
      setDocumentState(doc);
    } catch (err) {
      console.error('Error processing PDF:', err);
      setError('Failed to process PDF. Please try again with a different file.');
      setDocumentState(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearDocument = () => {
    if (document?.url) {
      URL.revokeObjectURL(document.url);
    }
    setDocumentState(null);
    setError(null);
  };

  return (
    <PdfContext.Provider
      value={{
        document,
        isProcessing,
        error,
        setDocument,
        processDocument,
        clearDocument,
      }}
    >
      {children}
    </PdfContext.Provider>
  );
};