import React, { useState, useEffect } from 'react';
import { convertTextToJson } from './services/api';

function App() {
  const [input, setInput] = useState("");
  const [outputJson, setOutputJson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await convertTextToJson(input);
      setOutputJson(result);
    } catch (err) {
      setError('Failed to convert text to JSON. Please try again later.');
      console.error('Conversion error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (outputJson) {
      navigator.clipboard.writeText(JSON.stringify(outputJson, null, 2));
    }
  };

  // Handle Ctrl+Enter keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        if (!isLoading && input.trim()) {
          handleSubmit(e);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [input, isLoading]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #000000, #581c87, #000000)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating sparkle icon */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '33%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        zIndex: 30,
        animation: 'float 3s ease-in-out infinite'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" style={{ width: '48px', height: '48px', opacity: 0.6 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      </div>
      
      <div style={{ position: 'relative', zIndex: 20, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1024px' }}>
        <header style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '32px', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: '8px' }}>
            Plain Text to JSON Prompt Converter
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.125rem', marginTop: '16px' }}>Transform your plain text into structured JSON format</p>
        </header>
        
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '512px' }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter your text here..."
              rows={4}
              style={{
                width: '100%',
                borderRadius: '16px',
                background: 'rgba(0, 0, 0, 0.8)',
                border: '2px solid #8b5cf6',
                fontSize: '18px',
                color: '#e5e5e5',
                padding: '16px 64px 16px 24px',
                outline: 'none',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                resize: 'none',
                fontWeight: 400,
                letterSpacing: '0.01em'
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: isLoading || !input.trim() ? '#9ca3af' : '#e5e5e5',
                fontSize: '24px',
                background: 'none',
                border: 'none',
                cursor: isLoading || !input.trim() ? 'default' : 'pointer',
                transition: 'color 0.3s'
              }}
            >
              {isLoading ? (
                <div style={{
                  width: '24px',
                  height: '24px',
                  border: '2px solid #9ca3af',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              )}
            </button>
          </div>
          
          <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
            Press Ctrl+Enter to submit quickly
          </div>
        </form>

        {error && (
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: '#fecaca',
            width: '100%',
            maxWidth: '512px'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {outputJson && (
          <div style={{ marginTop: '32px', width: '100%', maxWidth: '1024px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'white' }}>Generated JSON:</h3>
              <button
                onClick={copyToClipboard}
                style={{
                  padding: '8px 16px',
                  background: '#7c3aed',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = '#6d28d9'}
                onMouseOut={(e) => e.target.style.background = '#7c3aed'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '16px', height: '16px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.375a2.25 2.25 0 01-2.25-2.25V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                Copy JSON
              </button>
            </div>
            <pre style={{
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '16px',
              padding: '24px',
              color: '#e5e5e5',
              fontSize: '14px',
              overflow: 'auto',
              maxHeight: '384px',
              whiteSpace: 'pre-wrap'
            }}>
              {JSON.stringify(outputJson, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: 'bold',
        fontSize: '20px',
        letterSpacing: '0.05em',
        userSelect: 'none',
        opacity: 0.8
      }}>
        Text to JSON Converter
      </div>
    </div>
  );
}

export default App;
