import React, { useState } from 'react';
import { Copy, CheckCircle, Clock, MessageSquare, FileText, Code2 } from 'lucide-react';
import { HistoryItem } from '../App';

interface HistoryViewProps {
  history: HistoryItem[];
}

const HistoryView: React.FC<HistoryViewProps> = ({ history }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (history.length === 0) {
    return (
      <div className="w-full h-screen bg-black text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center p-6">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-gray-800/50 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-gray-700/50">
              <MessageSquare className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">No conversion history</h3>
            <p className="text-gray-400 text-lg">
              Start converting text to JSON prompts to see your history here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex-shrink-0 text-center p-6 md:p-8 border-b border-gray-800/50">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">Conversion History</h2>
          <p className="text-gray-400 text-sm md:text-base">Your latest {history.length} text-to-JSON conversions</p>
        </div>

        {/* Scrollable History List */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="space-y-4 md:space-y-6">
              {history.map((item, index) => (
                <div key={item.id} className="bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800/30 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-700/50">
                  {/* Header with timestamp */}
                  <div className="p-4 md:p-5 border-b border-gray-800/30 flex items-center justify-between bg-gray-800/20">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/10 rounded-lg border border-white/10">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-sm md:text-base text-white font-medium">Conversion #{history.length - index}</span>
                        <p className="text-xs md:text-sm text-gray-400">{formatDate(item.timestamp)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6">
                    <div className="space-y-4 md:space-y-6">
                      {/* Input Text */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-4 h-4 text-blue-400" />
                          <h4 className="text-sm md:text-base font-medium text-white">Input Text</h4>
                        </div>
                        <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30">
                          <p className="text-sm md:text-base text-gray-200 whitespace-pre-wrap leading-relaxed">
                            {item.inputText}
                          </p>
                        </div>
                      </div>

                      {/* Generated JSON */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-green-400" />
                            <h4 className="text-sm md:text-base font-medium text-white">Generated JSON</h4>
                          </div>
                          <button
                            onClick={() => copyToClipboard(item.outputJson, item.id)}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
                              copiedId === item.id
                                ? 'bg-green-500 text-white shadow-lg scale-105'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm border border-white/10 hover:scale-105'
                            }`}
                          >
                            {copiedId === item.id ? (
                              <>
                                <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 md:w-4 md:h-4" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30 overflow-hidden">
                          <div className="max-h-64 md:max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-gray-800/50 scrollbar-thumb-gray-600/50 hover:scrollbar-thumb-gray-500/50">
                            <pre className="p-4 md:p-5 text-xs md:text-sm text-gray-100 font-mono leading-relaxed">
                              <code>{item.outputJson}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryView;