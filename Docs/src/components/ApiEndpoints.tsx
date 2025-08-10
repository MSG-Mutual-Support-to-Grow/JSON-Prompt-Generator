import React, { useState } from 'react';
import { RadioIcon, CopyIcon, CheckIcon } from 'lucide-react';

const ApiEndpoints: React.FC = () => {
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

  const requestExample = `{
  "text": "plan a trip to Tokyo in December",
  "num_keys": 5,
  "include_ai_content": true
}`;

  const responseExample = `{
  "response": {
    "text": "plan a trip to Tokyo in December",
    "city": "Tokyo",
    "country": "Japan",
    "month": "December",
    "activities": ["sightseeing", "food tours"]
  },
  "source": "mistral"
}`;

  return (
    <section id="api" className="section-padding bg-gray-50">
      <div className="max-w-5xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <RadioIcon className="inline-block mr-4 h-8 w-8 text-blue-600" />
            API Endpoints
          </h2>
        </div>
        
        <div className="space-y-8">
          {/* POST Endpoint */}
          <div className="card p-8 md:p-10">
            <div className="flex items-center mb-6">
              <span className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-bold mr-4">
                POST
              </span>
              <code className="text-lg md:text-xl font-mono font-semibold text-gray-900">
                /prompts/transform
              </code>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Transform plain text into structured JSON with context-aware key selection.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Request:</h4>
                <CodeBlock code={requestExample} id="request-example" />
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Response Example:</h4>
                <CodeBlock code={responseExample} id="response-example" />
              </div>
            </div>
          </div>

          {/* GET Endpoint */}
          <div className="card p-8 md:p-10">
            <div className="flex items-center mb-6">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-bold mr-4">
                GET
              </span>
              <code className="text-lg md:text-xl font-mono font-semibold text-gray-900">
                /
              </code>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              Health check endpoint to verify that the API is running and accessible.
            </p>
          </div>
        </div>

        {/* Health Check Example */}
        <div className="mt-12 card p-8 md:p-10 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Health Check Test</h3>
          <p className="text-gray-700 mb-4">Test the health endpoint:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-900 mb-2">Browser:</p>
              <a 
                href="http://127.0.0.1:8000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                http://127.0.0.1:8000
              </a>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-2">Swagger UI:</p>
              <a 
                href="http://127.0.0.1:8000/docs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                http://127.0.0.1:8000/docs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApiEndpoints;
