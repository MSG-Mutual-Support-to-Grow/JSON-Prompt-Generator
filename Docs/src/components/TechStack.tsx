import React from 'react';
import { WrenchIcon } from 'lucide-react';

const TechStack: React.FC = () => {
  const backendTech = [
    'FastAPI (Python 3.9+)',
    'Pydantic AI with Mistral AI integration',
    'Uvicorn',
    'python-dotenv'
  ];

  const frontendTech = [
    'React + TypeScript',
    'Vite',
    'Tailwind CSS',
    'Lucide React Icons'
  ];

  return (
    <section id="tech-stack" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <WrenchIcon className="inline-block mr-4 h-8 w-8 text-blue-600" />
            Tech Stack
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Backend */}
          <div className="text-center">
            <div className="card p-8 md:p-10">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">Backend</h3>
              <div className="space-y-4">
                {backendTech.map((tech, index) => (
                  <div
                    key={tech}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium shadow-lg transform hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Frontend */}
          <div className="text-center">
            <div className="card p-8 md:p-10">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">Frontend</h3>
              <div className="space-y-4">
                {frontendTech.map((tech, index) => (
                  <div
                    key={tech}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-medium shadow-lg transform hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
