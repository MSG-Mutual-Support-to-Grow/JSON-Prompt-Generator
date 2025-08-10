import React, { useState } from 'react';
import { Copy, CheckCircle, Clock, MessageSquare } from 'lucide-react';
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
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No conversion history</h3>
          <p className="text-gray-600">
            Start converting text to JSON prompts to see your history here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Conversion History</h2>
          <p className="text-gray-600">Your latest {history.length} text-to-JSON conversions</p>
        </div>

        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{formatDate(item.timestamp)}</span>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Input Text</h4>
                    <div className="bg-gray-50 p-3 rounded-lg max-h-32 overflow-y-auto">
                      <p className="text-sm text-gray-800 whitespace-pre-wrap">{item.inputText}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-700">Generated JSON</h4>
                      <button
                        onClick={() => copyToClipboard(item.outputJson, item.id)}
                        className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-all duration-200 ${
                          copiedId === item.id
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {copiedId === item.id ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === item.id ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg max-h-32 overflow-y-auto">
                      <pre className="text-xs text-gray-800">
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
  );
};

export default HistoryView;