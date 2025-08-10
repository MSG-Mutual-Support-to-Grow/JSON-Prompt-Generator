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
      <div className="min-h-screen bg-black text-white">
        {/* Background Pattern */}
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
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
    <div className="min-h-screen bg-black text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 h-full overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Conversion History</h2>
            <p className="text-gray-400 text-lg md:text-xl">Your latest {history.length} text-to-JSON conversions</p>
          </div>

          <div className="space-y-6">
            {history.map((item) => (
              <div key={item.id} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 overflow-hidden shadow-xl">
                <div className="p-4 md:p-6 border-b border-gray-800/50 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg border border-white/10">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm md:text-base text-gray-300 font-medium">{formatDate(item.timestamp)}</span>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <h4 className="text-sm md:text-base font-medium text-white">Input Text</h4>
                      </div>
                      <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl max-h-40 overflow-y-auto border border-gray-700/50">
                        <p className="text-sm md:text-base text-gray-200 whitespace-pre-wrap leading-relaxed">{item.inputText}</p>
                      </div>
                    </div>

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
                              ? 'bg-green-500 text-white shadow-lg'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm border border-white/10'
                          }`}
                        >
                          {copiedId === item.id ? (
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                          ) : (
                            <Copy className="w-3 h-3 md:w-4 md:h-4" />
                          )}
                          <span>{copiedId === item.id ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl max-h-40 overflow-y-auto border border-gray-700/50">
                        <pre className="text-xs md:text-sm text-gray-100 font-mono leading-relaxed">
                          <code>{item.outputJson}</code>
                        </pre>
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
  );
};

export default HistoryView;