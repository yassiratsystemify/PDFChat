import React from 'react';
import { FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-white bg-opacity-20 p-2 rounded-lg">
            <FileText className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold">PDF Chat</h1>
        </div>
        <div className="ml-auto text-sm">
          <span className="opacity-75">Powered by AI</span>
        </div>
      </div>
    </header>
  );
};

export default Header;