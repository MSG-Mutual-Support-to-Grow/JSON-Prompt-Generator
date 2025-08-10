import React from 'react';
import { MessageSquare, History, Plus, Menu, X } from 'lucide-react';

interface SidebarProps {
  activeView: 'converter' | 'history';
  onViewChange: (view: 'converter' | 'history') => void;
  onNewChat: () => void;
  historyCount: number;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  onViewChange, 
  onNewChat, 
  historyCount,
  isOpen,
  onToggle
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar toggle button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 lg:hidden"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Desktop sidebar toggle */}
      <button
        onClick={onToggle}
        className="hidden lg:block fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-gray-600" />
        ) : (
          <Menu className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-gray-200 mt-12 lg:mt-0">
          {/* Close button for mobile */}
          <button
            onClick={onToggle}
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-6 h-6 text-indigo-600" />
            <h1 className="text-lg font-semibold text-gray-900">Text to JSON</h1>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-2">
          <button
            onClick={onNewChat}
            className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200 group"
          >
            <Plus className="w-4 h-4 group-hover:text-indigo-600" />
            <span>New Conversion</span>
          </button>

          <button
            onClick={() => {
              onViewChange('converter');
              if (window.innerWidth < 1024) onToggle();
            }}
            className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors duration-200 ${
              activeView === 'converter'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Converter</span>
          </button>

          <button
            onClick={() => {
              onViewChange('history');
              if (window.innerWidth < 1024) onToggle();
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors duration-200 ${
              activeView === 'history'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <History className="w-4 h-4" />
              <span>History</span>
            </div>
            {historyCount > 0 && (
              <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full">
                {historyCount}
              </span>
            )}
          </button>
        </div>

        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Convert plain text into structured JSON prompts for better AI interactions
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;