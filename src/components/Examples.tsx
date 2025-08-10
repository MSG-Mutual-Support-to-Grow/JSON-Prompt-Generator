import React from 'react';
import { LightbulbIcon, CodeIcon, PlaneIcon, PenToolIcon } from 'lucide-react';

const Examples: React.FC = () => {
  const examples = [
    {
      icon: CodeIcon,
      title: 'Programming',
      description: 'Generates language, framework, libraries, etc.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: PlaneIcon,
      title: 'Travel',
      description: 'Generates destination, budget, activities, etc.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: PenToolIcon,
      title: 'Content Writing',
      description: 'Generates topic, tone, audience, word_count.',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section id="examples" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <LightbulbIcon className="inline-block mr-4 h-8 w-8 text-blue-600" />
            Example Workflows
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {examples.map((example, index) => {
            const IconComponent = example.icon;
            return (
              <div
                key={example.title}
                className="card p-8 text-center group cursor-pointer transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${example.color} flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {example.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {example.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Examples;
