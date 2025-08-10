import React from 'react';
import { PaletteIcon, ArrowRightLeftIcon, CopyIcon, ClockIcon, SmartphoneIcon } from 'lucide-react';

const FrontendFeatures: React.FC = () => {
  const features = [
    {
      icon: ArrowRightLeftIcon,
      title: 'Text Input → JSON Output instantly via API'
    },
    {
      icon: CopyIcon,
      title: 'Copy JSON to Clipboard'
    },
    {
      icon: ClockIcon,
      title: 'View Conversion History'
    },
    {
      icon: SmartphoneIcon,
      title: 'Responsive Design for desktop & mobile'
    }
  ];

  return (
    <section id="frontend-features" className="section-padding bg-gray-50">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <PaletteIcon className="inline-block mr-4 h-8 w-8 text-blue-600" />
            Frontend Features
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="card p-6 text-center group transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start">
                  <IconComponent className="h-6 w-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-medium leading-relaxed text-left">
                    {feature.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FrontendFeatures;
