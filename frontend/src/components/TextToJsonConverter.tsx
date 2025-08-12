import React, { useState, useEffect, useRef } from 'react';
import { Copy, Send, CheckCircle, X, Sparkles, Code2, AlertCircle, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

interface TextToJsonConverterProps {
  onAddToHistory: (inputText: string, outputJson: string) => void;
}

interface ErrorState {
  message: string;
  type: 'error' | 'warning' | 'info';
}

interface ConversationItem {
  id: string;
  type: 'input' | 'output';
  content: string;
  timestamp: Date;
}

const TextToJsonConverter: React.FC<TextToJsonConverterProps> = ({ onAddToHistory }) => {
  const [inputText, setInputText] = useState('');
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);
  const conversationEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when conversation updates
  useEffect(() => {
    if (conversation.length > 0) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        const outputContainer = document.getElementById('output-container');
        if (outputContainer) {
          // Smooth scroll to bottom
          outputContainer.scrollTo({
            top: outputContainer.scrollHeight,
            behavior: 'smooth'
          });
        }
      });
    }
  }, [conversation]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputText.trim() && !isProcessing) {
        handleSubmit(e as any);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userInput = inputText.trim();
    setInputText('');
    
    // Add user input to conversation
    const inputItem: ConversationItem = {
      id: `input-${Date.now()}`,
      type: 'input',
      content: userInput,
      timestamp: new Date()
    };
    setConversation(prev => [...prev, inputItem]);

    setIsProcessing(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/generate-prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error occurred' }));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract only the json_prompt part from the response
      const cleanJsonOutput = data.json_prompt || data;
      const jsonOutput = JSON.stringify(cleanJsonOutput, null, 2);
      
      // Add output to conversation
      const outputItem: ConversationItem = {
        id: `output-${Date.now()}`,
        type: 'output',
        content: jsonOutput,
        timestamp: new Date()
      };
      setConversation(prev => [...prev, outputItem]);
      
      onAddToHistory(userInput, jsonOutput);
      
      // Show success message briefly
      setError({ message: 'JSON prompt generated successfully!', type: 'info' });
      setTimeout(() => setError(null), 3000);
      
    } catch (error) {
      console.error('Error converting text:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to convert text. Please try again.';
      setError({ message: errorMessage, type: 'error' });
      
      // Add error to conversation
      const errorItem: ConversationItem = {
        id: `error-${Date.now()}`,
        type: 'output',
        content: `Error: ${errorMessage}`,
        timestamp: new Date()
      };
      setConversation(prev => [...prev, errorItem]);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setError({ message: 'Failed to copy to clipboard', type: 'warning' });
    }
  };

  const clearConversation = () => {
    setConversation([]);
    setInputText('');
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
    <div className="w-full h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Error Alert */}
      {error && <ErrorAlert error={error} />}
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex-shrink-0 text-center p-4 md:p-6 border-b border-gray-800/30">
          <div className="flex items-center justify-center gap-2 md:gap-2 mb-1 md:mb-2 flex-wrap mt-2 md:mt-0">
            <div className="p-2 md:p-2 bg-white/10 rounded-lg md:rounded-xl backdrop-blur-sm border border-white/10">
              <Sparkles className="w-6 h-6 md:w-6 md:h-6 text-white" />
            </div>
            <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
              JSON Prompt Generator
            </h1>
          </div>
          <p className="text-gray-400 text-sm max-w-lg mx-auto px-2 text-center leading-relaxed hidden md:block">
            Transform your ideas into structured JSON prompts with AI precision
          </p>
        </div>

        {/* Main Content - Split Layout */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row">
          {/* Left Panel - Input */}
          <div className="flex-1 min-h-0 flex flex-col md:border-r border-gray-800/30">
            <div className="flex-shrink-0 p-3 md:p-4 border-b border-gray-800/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h2 className="text-sm font-semibold text-white">Input</h2>
              </div>
            </div>
            <div className="flex-1 min-h-0 p-3 md:p-4">
              <form onSubmit={handleSubmit} className="h-full flex flex-col">
                <div className="flex-1 min-h-0 mb-3 md:mb-4">
                  <textarea
                    id="input-text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your text here to convert into a JSON prompt..."
                    className="w-full h-full bg-gray-900/40 backdrop-blur-sm border border-gray-700/40 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 resize-none transition-all duration-200 text-sm md:text-base p-3 md:p-4"
                    required
                  />
                </div>
                <div className="flex-shrink-0 space-y-2 md:space-y-3">
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isProcessing}
                    className="w-full py-2.5 md:py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 md:w-5 md:h-5" />
                        <span>Generate JSON</span>
                      </>
                    )}
                  </button>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      Press Enter to generate JSON prompt
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Panel - Output */}
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="flex-shrink-0 p-3 md:p-4 border-b border-gray-800/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h2 className="text-sm font-semibold text-white">Output</h2>
                </div>
                {conversation.length > 0 && conversation[conversation.length - 1]?.type === 'output' && (
                  <div className="flex items-center gap-1 md:gap-2">
                    <button
                      onClick={() => copyToClipboard(conversation[conversation.length - 1].content, 'latest')}
                      className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        copied === 'latest'
                          ? 'bg-green-500 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm border border-white/10'
                      }`}
                    >
                      {copied === 'latest' ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          <span className="hidden sm:inline">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={clearConversation}
                      className="px-2 md:px-3 py-1.5 text-gray-400 bg-gray-800/20 backdrop-blur-sm rounded-lg hover:bg-gray-700/20 transition-all duration-200 border border-gray-700/20 text-xs"
                    >
                      <span className="hidden sm:inline">Clear</span>
                      <X className="w-3 h-3 sm:hidden" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 min-h-0 p-3 md:p-4">
              <div className="h-full bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-700/40 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto p-4" id="output-container" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {conversation.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-800/30 rounded-xl mx-auto mb-4 flex items-center justify-center border border-gray-700/30">
                          <Code2 className="w-8 h-8 text-gray-500" />
                        </div>
                        <p className="text-gray-400 text-lg mb-2 font-medium">No output yet</p>
                        <p className="text-gray-500 text-sm">Generated JSON will appear here</p>
                      </div>
                    </div>
                  ) : isProcessing ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-white" />
                        <span className="text-gray-300">Generating JSON prompt...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full">
                      <pre className="text-xs md:text-sm text-gray-100 font-mono leading-relaxed whitespace-pre-wrap break-all word-break-break-all overflow-wrap-break-word">
                        <code className="block w-full text-gray-100">
                          {conversation.length > 0 && conversation[conversation.length - 1]?.type === 'output' 
                            ? conversation[conversation.length - 1].content 
                            : 'No JSON output available'}
                        </code>
                      </pre>
                      <div ref={conversationEndRef} className="h-4 w-full"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToJsonConverter;
