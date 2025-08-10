import React, { useState, useEffect } from 'react';
import { Copy, Send, CheckCircle, Info, X } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

interface TextToJsonConverterProps {
  onAddToHistory: (inputText: string, outputJson: string) => void;
}

const TextToJsonConverter: React.FC<TextToJsonConverterProps> = ({ onAddToHistory }) => {
  const [inputText, setInputText] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [copied, setCopied] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth <= 640);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);
  const [showInfoCard, setShowInfoCard] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsProcessing(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/generate-prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Failed to convert text');
      }

      const data = await response.json();
      const jsonOutput = JSON.stringify(data, null, 2);
      setOutputJson(jsonOutput);
      onAddToHistory(inputText, jsonOutput);
      if (isMobile) setMobilePage('output');
    } catch (error) {
      console.error('Error converting text:', error);
      setOutputJson(JSON.stringify({ error: 'Failed to convert text. Please try again.' }, null, 2));
    } finally {
      setIsProcessing(false);
    }
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

  const [mobilePage, setMobilePage] = useState<'input' | 'output'>('input');

  // removed duplicate isMobile declaration

  return (
    <div className={`h-full flex ${isMobile ? 'flex-col' : ''} mobile-h-auto`}>
      {/* Mobile view: page switcher */}
      {isMobile && (
    <div className="fixed bottom-6 left-0 w-full flex justify-center gap-2 bg-white border-t border-gray-200 py-2 z-50" style={{paddingBottom: 'env(safe-area-inset-bottom, 24px)'}}>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${mobilePage === 'input' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setMobilePage('input')}
          >Input</button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${mobilePage === 'output' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setMobilePage('output')}
          >Output</button>
        </div>
      )}

      {/* Left Panel - Input */}
      {(!isMobile || mobilePage === 'input') && (
        <div className="flex-1 flex flex-col p-6 border-r border-gray-200 mobile-p-2 mobile-border-0">
        <div className="mb-6 mobile-mb-2 flex flex-col items-center justify-center w-full relative">
          <button
            onClick={() => setShowInfoCard(!showInfoCard)}
            className="flex items-center space-x-2 text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200 mx-auto mobile:text-base mobile:mt-4"
            style={{ justifyContent: 'center', width: '100%' }}
          >
            <span className="text-center w-full">Text to JSON Converter</span>
            <Info className="w-5 h-5" />
          </button>
          <div className="w-full flex justify-center">
            <p className="text-gray-600 mt-1 text-center max-w-xs mobile:text-base z-10 bg-white bg-opacity-80 px-2 rounded">
              Transform your plain text into structured JSON format
            </p>
          </div>
        </div>

        {showInfoCard && (
          <div className="mb-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-100 relative flex flex-col gap-2 mobile-mb-2 mobile-p-2">
            <button
              onClick={() => setShowInfoCard(false)}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Close info card"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-6 h-6 text-indigo-600" />
              <h3 className="text-base font-semibold text-gray-900">Why Use JSON Prompts?</h3>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
              <span className="text-xs text-gray-700">JSON prompts provide <span className="font-semibold text-indigo-700">structure</span> and <span className="font-semibold text-indigo-700">clarity</span> for AI models, making your intent explicit and reducing ambiguity.</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4m5 2a9 9 0 11-18 0a9 9 0 0118 0z" /></svg>
              <span className="text-xs text-gray-700">They are <span className="font-semibold text-green-700">machine-readable</span>, enabling seamless integration with APIs, automation tools, and modern applications.</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 0a9 9 0 11-18 0a9 9 0 0118 0z" /></svg>
              <span className="text-xs text-gray-700">JSON prompts <span className="font-semibold text-purple-700">improve traceability</span> and <span className="font-semibold text-purple-700">versioning</span> for prompt engineering workflows.</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="text-xs text-gray-700">They <span className="font-semibold text-orange-700">enhance security</span> by allowing validation and sanitization before processing.</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8" /></svg>
              <span className="text-xs text-gray-700">Adopt JSON prompts to <span className="font-semibold text-cyan-700">future-proof</span> your AI and automation workflows.</span>
            </div>
          </div>
        )}

  <form onSubmit={handleSubmit} className={`flex-1 flex flex-col mobile-p-2 ${!showInfoCard ? 'mt-8' : ''}`}>
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

      )}

      {/* Right Panel - Output */}
      {(!isMobile || mobilePage === 'output') && (
        <div className="flex-1 flex flex-col p-6 mobile-p-2" style={isMobile ? { marginTop: 80 } : {}}>
          <div className="mb-6 flex items-center justify-center mobile-mb-2">
            <h3 className="text-xl font-semibold text-gray-900 align-item "> Generated JSON</h3>
          </div>

          <div className="flex-1">
            {outputJson ? (
              <div className="h-full min-h-[350px] bg-gray-50 rounded-lg border border-gray-200 overflow-hidden relative mobile-h-auto" style={isMobile ? { minHeight: '60vh' } : {}}>
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
                className={`w-full flex-1 overflow-auto mobile-output-scroll`}
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
              <div className="h-full min-h-[350px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mobile-h-auto" style={isMobile ? { minHeight: '60vh' } : {}}>
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
      )}
    </div>
  );
};

export default TextToJsonConverter;