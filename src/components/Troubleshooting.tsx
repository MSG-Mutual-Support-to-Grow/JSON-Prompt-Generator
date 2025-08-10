import React from 'react';
import { BugIcon } from 'lucide-react';

const Troubleshooting: React.FC = () => {
  const troubleItems = [
    {
      title: 'Backend not starting?',
      solution: 'Activate venv and check .env file'
    },
    {
      title: 'CORS issues?',
      solution: 'Update allow_origins in main.py'
    },
    {
      title: 'Port conflicts?',
      solution: 'Change with --port flag in uvicorn or vite'
    }
  ];

  return (
    <section id="troubleshooting" className="section-padding bg-gray-50">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <BugIcon className="inline-block mr-4 h-8 w-8 text-blue-600" />
            Troubleshooting
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {troubleItems.map((item, index) => (
            <div
              key={item.title}
              className="card p-8 border-l-4 border-red-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-lg font-bold text-red-600 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {item.solution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Troubleshooting;
