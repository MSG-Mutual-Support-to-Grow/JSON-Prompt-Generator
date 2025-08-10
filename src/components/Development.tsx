import React from 'react';
import { WrenchIcon } from 'lucide-react';

const Development: React.FC = () => {
  const devItems = [
    {
      title: 'Code Style',
      description: 'PEP 8 (backend), TypeScript best practices (frontend)'
    },
    {
      title: 'Strong Typing',
      description: 'Pydantic models for backend validation'
    },
    {
      title: 'CORS Ready',
      description: 'Accepts requests from http://localhost:3000 and http://localhost:5173'
    }
  ];

  return (
    <section id="development" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <WrenchIcon className="inline-block mr-4 h-8 w-8 text-blue-600" />
            Development
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {devItems.map((item, index) => (
            <div
              key={item.title}
              className="card p-8 text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Development;
