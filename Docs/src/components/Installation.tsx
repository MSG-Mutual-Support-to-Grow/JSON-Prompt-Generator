import React, { useState } from 'react';
import { SettingsIcon, CopyIcon, CheckIcon, ExternalLinkIcon } from 'lucide-react';

const Installation: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const CodeBlock: React.FC<{ code: string; id: string }> = ({ code, id }) => (
    <div className="relative">
      <button
        onClick={() => handleCopy(code, id)}
        className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 z-10"
      >
        {copiedCode === id ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <CopyIcon className="h-4 w-4" />
        )}
      </button>
      <div className="code-block">
        <pre className="p-6 text-sm md:text-base overflow-x-auto">
          <code className="text-gray-300 font-mono leading-relaxed">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );

  const steps = [
    {
      number: 1,
      title: 'Clone Repository',
      code: `git clone https://github.com/your-username/JSON-Prompt-Generator.git
cd JSON-Prompt-Generator`
    },
    {
      number: 2,
      title: 'Backend Setup',
      code: `cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\\Scripts\\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt`,
      envCode: 'MISTRAL_API_KEY=your_mistral_api_key_here',
      runCode: 'uvicorn main:app --reload',
      links: [
        { label: 'API', url: 'http://127.0.0.1:8000' },
        { label: 'Swagger UI', url: 'http://127.0.0.1:8000/docs' }
      ]
    },
    {
      number: 3,
      title: 'Frontend Setup',
      code: `cd ../frontend
npm install
npm run dev`,
      links: [
        { label: 'App', url: 'http://localhost:5173' }
      ]
    }
  ];

  return (
    <section id="installation" className="section-padding bg-white">
      <div className="max-w-5xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <SettingsIcon className="inline-block mr-4 h-8 w-8 text-blue-600" />
            Installation & Setup
          </h2>
        </div>
        
        <div className="space-y-12">
          {steps.map((step) => (
            <div key={step.number} className="card p-8 md:p-10 animate-fade-in-up">
              <div className="flex items-center mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  {step.number}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  {step.title}
                </h3>
              </div>

              <CodeBlock code={step.code} id={`step-${step.number}`} />

              {step.number === 2 && (
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-3">Create <code className="bg-gray-100 px-2 py-1 rounded text-sm">.env</code> file:</p>
                    <CodeBlock code={step.envCode!} id="env-file" />
                  </div>
                  
                  <div>
                    <p className="font-semibold text-gray-900 mb-3">Run Backend Server:</p>
                    <CodeBlock code={step.runCode!} id="run-backend" />
                  </div>
                </div>
              )}

              {step.links && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-3">URLs:</p>
                  <ul className="space-y-2">
                    {step.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                        >
                          {link.label}: {link.url}
                          <ExternalLinkIcon className="h-4 w-4 ml-1" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Installation;
