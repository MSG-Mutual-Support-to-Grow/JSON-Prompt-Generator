import React, { useState, useEffect } from 'react';
import { Copy, Send, CheckCircle, Info, X, Sparkles, Code2, AlertCircle, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

interface TextToJsonConverterProps {
  onAddToHistory: (inputText: string, outputJson: string) => void;
}

interface ErrorState {
  message: string;
  type: 'error' | 'warning' | 'info';
}

const TextToJsonConverter: React.FC<TextToJsonConverterProps> = ({ onAddToHistory }) => {
  const [inputText, setInputText] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showInfoCard, setShowInfoCard] = useState(true);
  const [mobilePage, setMobilePage] = useState<'input' | 'output'>('input');
  const [error, setError] = useState<ErrorState | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsProcessing(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/generate-prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error occurred' }));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      const jsonOutput = JSON.stringify(data, null, 2);
      setOutputJson(jsonOutput);
      onAddToHistory(inputText, jsonOutput);
      if (isMobile) setMobilePage('output');
      
      setError({ message: 'JSON prompt generated successfully!', type: 'info' });
      setTimeout(() => setError(null), 3000);
      
    } catch (error) {
      console.error('Error converting text:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to convert text. Please try again.';
      setError({ message: errorMessage, type: 'error' });
      setOutputJson('');
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
      setError({ message: 'Failed to copy to clipboard', type: 'warning' });
    }
  };

  const clearAll = () => {
    setInputText('');
    setOutputJson('');
    setError(null);
  };

  const ErrorAlert = ({ error }: { error: ErrorState }) => {
    const bgColor = error.type === 'error' ? 'bg-red-900/20 border-red-500/30' : 
                   error.type === 'warning' ? 'bg-yellow-900/20 border-yellow-500/30' : 
                   'bg-green-900/20 border-green-500/30';
    const textColor = error.type === 'error' ? 'text-red-400' : 
                     error.type === 'warning' ? 'text-yellow-400' : 
                     'text-green-400';
    
    return (
      <div className={`fixed top-4 right-4 z-50 max-w-sm p-4 ${bgColor} backdrop-blur-sm rounded-xl border ${textColor} shadow-lg animate-in slide-in-from-top-2 duration-300`}>
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium">{error.message}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-black text-white overflow-hidden">
      {/* Error Alert */}
      {error && <ErrorAlert error={error} />}
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 h-full">
        {/* Mobile Navigation */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-gray-800 z-40 safe-area-bottom">
            <div className="flex justify-center gap-2 p-4 max-w-md mx-auto">
              <button
                className={`flex-1 flex flex-col items-center gap-1 px-4 py-3 rounded-xl text-xs font-medium transition-all duration-200 ${
                  mobilePage === 'input' 
                    ? 'bg-white text-black shadow-lg scale-105' 
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
                onClick={() => setMobilePage('input')}
              >
                <Send className="w-4 h-4" />
                Input
              </button>
              <button
                className={`flex-1 flex flex-col items-center gap-1 px-4 py-3 rounded-xl text-xs font-medium transition-all duration-200 ${
                  mobilePage === 'output' 
                    ? 'bg-white text-black shadow-lg scale-105' 
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
                onClick={() => setMobilePage('output')}
              >
                <Code2 className="w-4 h-4" />
                Output
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`h-full ${isMobile ? 'flex flex-col pb-24' : 'flex'}`}>
          {/* Input Panel */}
          {(!isMobile || mobilePage === 'input') && (
            <div className={`${isMobile ? 'flex-1' : 'w-1/2'} p-4 md:p-6 lg:p-8 h-full overflow-y-auto`}>
              <div className="max-w-2xl mx-auto h-full flex flex-col">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
                    <div className="p-2 md:p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                      <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
                      JSON Prompt Generator
                    </h1>
                  </div>
                  <p className="text-gray-400 text-base md:text-lg max-w-lg mx-auto px-4">
                    Transform your ideas into structured JSON prompts with AI precision
                  </p>
                </div>

                {/* Info Card */}
                {showInfoCard && (
                  <div className="mb-6 bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-gray-800/50 relative shadow-xl">
                    <button
                      onClick={() => setShowInfoCard(false)}
                      className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white/10 rounded-lg border border-white/10">
                        <Info className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Why JSON Prompts?</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm">
                          <span className="font-medium text-white">Structure & Clarity:</span> Provide explicit structure for AI models
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm">
                          <span className="font-medium text-white">Machine-Readable:</span> Seamless integration with APIs
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm">
                          <span className="font-medium text-white">Enhanced Security:</span> Enable validation before processing
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4 min-h-0">
                  <div className="flex-1 min-h-0 flex flex-col">
                    <label htmlFor="input-text" className="block text-sm font-medium text-gray-300 mb-2">
                      Describe your idea
                    </label>
                    <textarea
                      id="input-text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter your text here to convert it into a structured JSON prompt..."
                      className="flex-1 w-full min-h-[200px] max-h-[400px] px-4 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-gray-600 resize-none transition-all duration-200 text-sm md:text-base"
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={!inputText.trim() || isProcessing}
                      className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white text-black rounded-xl font-medium hover:bg-gray-100 focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg text-sm md:text-base"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Converting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Convert to JSON</span>
                        </>
                      )}
                    </button>

                    {(inputText || outputJson) && (
                      <button
                        type="button"
                        onClick={clearAll}
                        className="px-6 py-4 text-gray-300 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-700/50 transition-all duration-200 border border-gray-700/50 text-sm md:text-base"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Output Panel */}
          {(!isMobile || mobilePage === 'output') && (
            <div className={`${isMobile ? 'flex-1' : 'w-1/2'} p-4 md:p-6 lg:p-8 h-full overflow-y-auto ${!isMobile ? 'border-l border-gray-800/50' : ''}`}>
              <div className="max-w-2xl mx-auto h-full flex flex-col">
                <div className="text-center mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Generated JSON</h2>
                  <p className="text-gray-400 text-sm">Your structured prompt output</p>
                </div>

                <div className="flex-1 min-h-[300px]">
                  {outputJson ? (
                    <div className="h-full bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 overflow-hidden relative shadow-xl">
                      <div className="absolute top-4 right-4 z-10">
                        <button
                          onClick={copyToClipboard}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            copied
                              ? 'bg-green-500 text-white shadow-lg scale-105'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm border border-white/10'
                          }`}
                        >
                          {copied ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      
                      <div className="h-full overflow-auto scrollbar-thin scrollbar-track-gray-800/50 scrollbar-thumb-gray-600/50 hover:scrollbar-thumb-gray-500/50">
                        <pre className="p-6 pr-20 text-sm text-gray-100 font-mono leading-relaxed">
                          <code>{outputJson}</code>
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full bg-gray-900/30 backdrop-blur-sm rounded-xl border-2 border-dashed border-gray-700/50 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-gray-800/50 rounded-xl mx-auto mb-4 flex items-center justify-center border border-gray-700/50">
                          <Code2 className="w-8 h-8 text-gray-500" />
                        </div>
                        <p className="text-gray-500 text-lg mb-2 font-medium">Your JSON output will appear here</p>
                        <p className="text-gray-600 text-sm">Enter some text and click convert to get started</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextToJsonConverter;
