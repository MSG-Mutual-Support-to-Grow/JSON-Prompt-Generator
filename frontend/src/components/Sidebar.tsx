import React from 'react';
import { MessageSquare, History, Plus, Menu, X, Info } from 'lucide-react';

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
      {/* Sidebar toggle button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-3 bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg hover:bg-gray-800/80 transition-all duration-200 border border-gray-700/50 lg:hidden"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800/50 flex flex-col z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 border-b border-gray-800/50 mt-12 lg:mt-0">
          {/* Close button for mobile */}
          <button
            onClick={onToggle}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 lg:hidden"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg border border-white/10">
              <img 
                src="/images/logo.png" 
                alt="JSON Prompt Generator Logo" 
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  // Fallback to Sparkles icon if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.innerHTML = `<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"></path></svg>`;
                  target.parentNode?.appendChild(fallback);
                }}
              />
            </div>
            <div>
              <h1 className="text-base font-semibold text-white">JSON Prompt</h1>
              <p className="text-xs text-gray-400">Generator</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-3">
          <button
            onClick={onNewChat}
            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 group border border-white/10"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">New Conversion</span>
          </button>

          <div className="space-y-1">
            <button
              onClick={() => {
                onViewChange('converter');
                if (window.innerWidth < 1024) onToggle();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                activeView === 'converter'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium">Converter</span>
            </button>

            <button
              onClick={() => {
                onViewChange('history');
                if (window.innerWidth < 1024) onToggle();
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                activeView === 'history'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <History className="w-4 h-4" />
                <span className="font-medium">History</span>
              </div>
              {historyCount > 0 && (
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  activeView === 'history' 
                    ? 'bg-black/10 text-black' 
                    : 'bg-white/10 text-white'
                }`}>
                  {historyCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-gray-800/50">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50 relative shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-white/10 rounded-lg border border-white/10">
                <Info className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-white">Why JSON Prompts?</h3>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <p className="text-gray-300 text-xs">
                  <span className="font-medium text-white">Structure & Clarity:</span> Provide explicit structure for AI models
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <p className="text-gray-300 text-xs">
                  <span className="font-medium text-white">Machine-Readable:</span> Seamless integration with APIs
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <p className="text-gray-300 text-xs">
                  <span className="font-medium text-white">Enhanced Security:</span> Enable validation before processing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;