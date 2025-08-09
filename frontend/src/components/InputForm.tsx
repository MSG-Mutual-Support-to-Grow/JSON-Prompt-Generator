import React, { useState, KeyboardEvent } from 'react';

interface InputFormProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [inputText, setInputText] = useState<string>('');

  const handleSubmit = () => {
    if (inputText.trim()) {
      onSubmit(inputText);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="input-form">
      <label htmlFor="textInput" className="form-label">
        Enter your text content:
      </label>
      <textarea
        id="textInput"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type or paste your text here...

Example: 'John is a 25-year-old software engineer from New York. He enjoys playing guitar and hiking on weekends. His favorite programming language is JavaScript and he works at a tech startup.'

Tip: Press Ctrl+Enter to submit quickly"
        className="textarea-input"
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading || !inputText.trim()}
        className="submit-button"
      >
        {isLoading ? (
          <>
            <div className="loading-spinner"></div>
            Converting...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16,18 22,12 16,6"></polyline>
              <path d="M8,6 L2,12 L8,18"></path>
            </svg>
            Convert to JSON
          </>
        )}
      </button>
    </div>
  );
};

export default InputForm;
