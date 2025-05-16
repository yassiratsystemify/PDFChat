import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File, X } from 'lucide-react';
import { usePdf } from '../context/PdfContext';
import { motion } from 'framer-motion';

const FileUpload: React.FC = () => {
  const { document, isProcessing, error, processDocument, clearDocument } = usePdf();
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      processDocument(file);
    }
  }, [processDocument]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: isProcessing
  });
  
  return (
    <div className="w-full">
      {!document ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 bg-gray-50'
          } ${error ? 'border-red-300' : ''} transition-colors duration-200`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm font-medium text-gray-900">
            {isDragActive ? "Drop the PDF here" : "Drag & drop your PDF here"}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            or <span className="text-purple-600 font-medium">browse files</span>
          </p>
          {isProcessing && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
              <p className="mt-2 text-xs text-gray-500">Processing PDF...</p>
            </div>
          )}
          {error && (
            <p className="mt-2 text-xs text-red-500">{error}</p>
          )}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full">
              <File className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {document.name}
              </p>
              <p className="text-xs text-gray-500">
                {(document.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearDocument();
            }}
            className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;