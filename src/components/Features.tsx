import React from 'react';
import { ServerIcon, MonitorIcon, CheckCircleIcon } from 'lucide-react';

const Features: React.FC = () => {
  const backendFeatures = [
    'Advanced Pydantic AI Integration: Strong validation and structured responses',
    'Mistral AI Powered: Context-aware JSON generation with relevant keys only',
    'Smart Validation: Multi-layer type checking and error recovery',
    'Async Operations: High-performance async/await for scalability',
    'Robust Error Handling: Built-in retry logic, graceful fallbacks',
    'Multi-Domain Support: Handles code generation, travel planning, data science, writing, and more'
  ];

  const frontendFeatures = [
    'Instant Text-to-JSON Conversion',
    'Conversion History: Stores latest 5 conversions',
    'Copy to Clipboard for generated JSON',
    'Responsive UI with sidebar navigation',
    'Customizable JSON Structure'
  ];

  return (
    <section id="features" className="section-padding bg-gray-50">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🚀 Features
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Backend Features */}
          <div className="card p-8 md:p-10 animate-fade-in-up">
            <div className="flex items-center mb-6">
              <ServerIcon className="h-8 w-8 text-blue-600 mr-4" />
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                Backend (FastAPI + Pydantic AI + Mistral AI)
              </h3>
            </div>
            <ul className="space-y-4">
              {backendFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">
                    <strong>{feature.split(':')[0]}:</strong>
                    {feature.split(':')[1]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Frontend Features */}
          <div className="card p-8 md:p-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center mb-6">
              <MonitorIcon className="h-8 w-8 text-blue-600 mr-4" />
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                Frontend (React + Tailwind)
              </h3>
            </div>
            <ul className="space-y-4">
              {frontendFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
