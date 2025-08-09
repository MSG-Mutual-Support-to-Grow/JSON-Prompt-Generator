import React, { useState } from 'react';

interface OutputDisplayProps {
  outputJson: any;
  isVisible: boolean;
}

type CopyStatus = 'idle' | 'copied' | 'error';

const OutputDisplay: React.FC<OutputDisplayProps> = ({ outputJson, isVisible }) => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(outputJson, null, 2));
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
      console.error('Failed to copy to clipboard:', err);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="output-section">
      <div className="output-header">
        <h3 className="output-title">Generated JSON Output</h3>
        <button
          onClick={handleCopyToClipboard}
          className={`copy-button ${copyStatus === 'copied' ? 'copied' : ''}`}
        >
          {copyStatus === 'copied' ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5,15 L5,5 A2,2 0 0,1 7,3 L17,3"></path>
              </svg>
              Copy Code
            </>
          )}
        </button>
      </div>
      
      <pre className="json-output">
        {JSON.stringify(outputJson, null, 2)}
      </pre>
    </div>
  );
};

export default OutputDisplay;
