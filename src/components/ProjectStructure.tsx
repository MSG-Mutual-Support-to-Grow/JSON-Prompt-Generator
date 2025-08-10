import React, { useState } from 'react';
import { FolderIcon, CopyIcon, CheckIcon } from 'lucide-react';

const ProjectStructure: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const projectStructure = `JSON-Prompt-Generator/
├── backend/                  # FastAPI backend
│   ├── main.py                # API entry point
│   ├── services/
│   │   └── generator.py       # AI + JSON generation logic
│   ├── requirements.txt
│   └── .env                   # Environment variables (not in git)
│
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── components/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TextToJsonConverter.tsx
│   │   │   └── HistoryView.tsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
└── README.md`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(projectStructure);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section id="project-structure" className="section-padding bg-gray-50">
      <div className="max-w-4xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <FolderIcon className="inline-block mr-4 h-8 w-8 text-blue-600" />
            Project Structure
          </h2>
        </div>
        
        <div className="card relative">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 flex items-center space-x-2"
          >
            {copied ? (
              <>
                <CheckIcon className="h-4 w-4" />
                <span className="text-sm">Copied!</span>
              </>
            ) : (
              <>
                <CopyIcon className="h-4 w-4" />
                <span className="text-sm">Copy</span>
              </>
            )}
          </button>

          {/* Code Block */}
          <div className="code-block">
            <pre className="p-6 md:p-8 text-sm md:text-base overflow-x-auto">
              <code className="text-gray-300 font-mono leading-relaxed">
                {projectStructure}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectStructure;
