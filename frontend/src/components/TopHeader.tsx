import React from 'react';

const TopHeader: React.FC = () => {
  return (
    <header className="top-header">
      <div className="top-header-content">
        <div className="project-logo">
          🌙
        </div>
        <h1 className="project-title">Text to JSON Converter</h1>
        <span className="project-subtitle">Transform plain text into structured JSON</span>
      </div>
    </header>
  );
};

export default TopHeader;
