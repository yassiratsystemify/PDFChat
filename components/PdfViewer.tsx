import React from 'react';
import { usePdf } from '../context/PdfContext';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const PdfViewer: React.FC = () => {
  const { document } = usePdf();

  if (!document) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 p-6"
      >
        <FileText className="h-16 w-16 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No PDF Selected</h3>
        <p className="text-sm text-gray-500 text-center mt-2">
          Upload a PDF using the upload button to view it here and chat about its contents.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full w-full bg-white rounded-lg shadow-sm overflow-hidden"
    >
      <div className="bg-gray-100 py-2 px-4 border-b flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700 truncate">{document.name}</h3>
      </div>
      <div className="h-full">
        <iframe
          src={document.url}
          title="PDF Viewer"
          className="w-full h-full"
          style={{ minHeight: "500px" }}
        />
      </div>
    </motion.div>
  );
};

export default PdfViewer;