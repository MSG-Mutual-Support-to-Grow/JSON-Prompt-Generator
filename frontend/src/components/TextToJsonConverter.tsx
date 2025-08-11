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
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);
  const conversationEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll to bottom when conversation updates
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [conversation, isProcessing]);

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
      const jsonOutput = JSON.stringify(data, null, 2);
      
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputText.trim() && !isProcessing) {
        handleSubmit(e as any);
      }
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
    <div className="w-full h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Error Alert */}
      {error && <ErrorAlert error={error} />}
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header - Only show when conversation is empty */}
        {conversation.length === 0 && (
          <div className="flex-shrink-0 text-center p-6 md:p-8">
            <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
              <div className="p-2 md:p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
                JSON Prompt Generator
              </h1>
            </div>
            <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto px-4">
              Transform your ideas into structured JSON prompts with AI precision
            </p>
          </div>
        )}

        {/* Conversation Area */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            {conversation.length > 0 && (
              <div className="space-y-4 md:space-y-6 py-6">
                {conversation.map((item) => (
                  <div key={item.id} className={`flex ${item.type === 'input' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`${item.type === 'input' ? 'max-w-[85%] md:max-w-[70%]' : 'w-full max-w-[95%]'}`}>
                      {item.type === 'input' ? (
                        <div className="bg-white text-black rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-lg ml-auto">
                          <p className="text-sm md:text-base whitespace-pre-wrap">{item.content}</p>
                        </div>
                      ) : (
                        <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-800/40 overflow-hidden shadow-xl">
                          <div className="p-3 md:p-4 border-b border-gray-800/40 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Code2 className="w-4 h-4 text-green-400" />
                              <span className="text-sm font-medium text-white">Generated JSON</span>
                            </div>
                            <button
                              onClick={() => copyToClipboard(item.content, item.id)}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                                copied === item.id
                                  ? 'bg-green-500 text-white shadow-lg scale-105'
                                  : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm border border-white/10'
                              }`}
                            >
                              {copied === item.id ? (
                                <>
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="p-4 md:p-6">
                            <pre className="text-xs md:text-sm text-gray-100 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                              <code>{item.content}</code>
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-800/40 p-4 md:p-6 flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span className="text-gray-300">Generating JSON prompt...</span>
                    </div>
                  </div>
                )}
                
                {/* Invisible div to scroll to */}
                <div ref={conversationEndRef} />
              </div>
            )}

            {/* Empty state for conversation */}
            {conversation.length === 0 && (
              <div className="text-center py-12 md:py-16">
                <div className="w-16 h-16 bg-gray-800/30 rounded-xl mx-auto mb-4 flex items-center justify-center border border-gray-700/30">
                  <Code2 className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-400 text-lg mb-2 font-medium">Start a conversation</p>
                <p className="text-gray-500 text-sm">Enter your text below to begin converting to JSON prompts</p>
              </div>
            )}
          </div>
        </div>

        {/* Input Area - Fixed at bottom */}
        <div className="flex-shrink-0 border-t border-gray-800/30 bg-black/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <textarea
                  id="input-text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Message JSON Prompt Generator..."
                  className={`w-full px-4 py-4 pr-14 bg-gray-800/20 backdrop-blur-sm border border-gray-700/20 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white/10 focus:border-gray-600/30 resize-none transition-all duration-200 text-sm md:text-base ${
                    isMobile ? 'min-h-[60px] max-h-[120px]' : 'min-h-[56px] max-h-[150px]'
                  }`}
                  required
                  rows={1}
                  style={{ height: 'auto' }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, isMobile ? 120 : 150) + 'px';
                  }}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isProcessing}
                  className="absolute bottom-2 right-2 p-2 bg-white text-black rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg disabled:hover:bg-white"
                >
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>

              {conversation.length > 0 && (
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={clearConversation}
                    className="px-4 py-2 text-gray-400 bg-gray-800/20 backdrop-blur-sm rounded-lg hover:bg-gray-700/20 transition-all duration-200 border border-gray-700/20 text-sm"
                  >
                    Clear conversation
                  </button>
                </div>
              )}
              
              <div className="text-center">
                <p className="text-xs text-gray-500">Press Enter to send, Shift+Enter for new line</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToJsonConverter;
