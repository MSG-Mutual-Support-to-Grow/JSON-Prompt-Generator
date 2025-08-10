import React, { useState } from 'react';
import { Copy, Send, CheckCircle, Info, X } from 'lucide-react';

interface TextToJsonConverterProps {
  onAddToHistory: (inputText: string, outputJson: string) => void;
}

const TextToJsonConverter: React.FC<TextToJsonConverterProps> = ({ onAddToHistory }) => {
  const [inputText, setInputText] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInfoCard, setShowInfoCard] = useState(true);

  const convertTextToJson = (text: string): string => {
    if (!text.trim()) return '';

    const prompt = {
      role: "user",
      content: text.trim(),
      metadata: {
        timestamp: new Date().toISOString(),
        type: "text_prompt",
        length: text.length,
        word_count: text.split(' ').filter(word => word.length > 0).length
      },
      context: {
        format: "conversational",
        intent: "query",
        priority: "normal"
      }
    };

    return JSON.stringify(prompt, null, 2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsProcessing(true);
    
    setTimeout(() => {
      const jsonOutput = convertTextToJson(inputText);
      setOutputJson(jsonOutput);
      onAddToHistory(inputText, jsonOutput);
      setIsProcessing(false);
    }, 500);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const clearAll = () => {
    setInputText('');
    setOutputJson('');
  };

  const getTextareaHeight = (text: string, minHeight: number = 200) => {
    const lineHeight = 24;
    const lines = text.split('\n').length;
    const calculatedHeight = Math.max(lines * lineHeight + 32, minHeight);
    return Math.min(calculatedHeight, 400);
  };

  return (
  <div className="h-full flex mobile-flex-col mobile-h-auto">
      {/* Left Panel - Input */}
  <div className="flex-1 flex flex-col p-6 border-r border-gray-200 mobile-p-2 mobile-border-0">
  <div className="mb-6 mobile-mb-2">
          <button
            onClick={() => setShowInfoCard(!showInfoCard)}
            className="flex items-center space-x-2 text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200 ml-10 mobile-ml-0 mobile-text-base"
          >
            <span>Text to JSON Converter</span>
            <Info className="w-5 h-5" />
          </button>
          <p className="text-gray-600 mt-1 ml-10 mobile-ml-0 mobile-text-base">Transform your plain text into structured JSON format</p>
        </div>

        {showInfoCard && (
          <div className="mb-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-100 relative mobile-mb-2 mobile-p-2">
            <button
              onClick={() => setShowInfoCard(false)}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Why Convert to JSON?</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Converting plain text to JSON prompts creates structured, machine-readable formats that 
              improve AI model comprehension and enable better integration with modern applications.
            </p>
          </div>
        )}

  <form onSubmit={handleSubmit} className="flex-1 flex flex-col mobile-p-2">
          <div className="flex-1 mb-4 mobile-mb-2">
            <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-2 mobile-text-base">
              Input Text
            </label>
            <textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here to convert it into a structured JSON prompt..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-colors duration-200 mobile-text-base"
              style={{ height: `${getTextareaHeight(inputText)}px` }}
              required
            />
          </div>

          <div className="flex space-x-3 mobile-flex-col mobile-space-x-0 mobile-space-y-2">
            <button
              type="submit"
              disabled={!inputText.trim() || isProcessing}
              className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mobile-w-full mobile-p-2"
            >
              <Send className="w-4 h-4" />
              <span>{isProcessing ? 'Converting...' : 'Convert to JSON'}</span>
            </button>

            {(inputText || outputJson) && (
              <button
                type="button"
                onClick={clearAll}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 mobile-w-full mobile-p-2"
              >
                Clear All
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Right Panel - Output */}
  <div className="flex-1 flex flex-col p-6 mobile-p-2">
  <div className="mb-6 flex items-center justify-center mobile-mb-2">
          <h3 className="text-xl font-semibold text-gray-900 align-item "> Generated JSON</h3>
        </div>

        <div className="flex-1">
          {outputJson ? (
            <div className="h-full bg-gray-50 rounded-lg border border-gray-200 overflow-hidden relative mobile-h-auto">
              <button
                onClick={copyToClipboard}
                className={`absolute top-3 right-3 z-10 flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-200 mobile-p-2 ${
                  copied
                    ? 'bg-green-100 text-green-700 shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm border border-gray-200'
                }`}
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <div
                className="h-full w-full max-h-[400px] min-h-[150px] overflow-auto mobile-output-scroll"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <pre
                  className="w-full min-w-[300px] p-4 pr-20 text-sm text-gray-800 mobile-text-base overflow-x-auto"
                  style={{ whiteSpace: 'pre', margin: 0 }}
                >
                  <code>{outputJson}</code>
                </pre>
              </div>
            </div>
          ) : (
            <div className="h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mobile-h-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Send className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm mobile-text-base">Your JSON output will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextToJsonConverter;