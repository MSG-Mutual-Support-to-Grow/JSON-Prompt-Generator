import React from 'react';
import { ScrollIcon, HandHelpingIcon, StarIcon } from 'lucide-react';

const Footer: React.FC = () => {
  const licenseInfo = {
    title: 'License',
    description: 'This project is part of the JSON-Prompt-Generator repository.'
  };

  const contributingRules = [
    'PEP 8 for Python code',
    'TypeScript standards for frontend',
    'Add docstrings/comments for clarity'
  ];

  const credits = [
    { label: 'Backend', tech: 'FastAPI + Pydantic AI + Mistral AI' },
    { label: 'Frontend', tech: 'React + Tailwind CSS + Vite' },
    { label: 'Icons', tech: 'Lucide React' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="grid md:grid-cols-3 gap-12">
          {/* License Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <ScrollIcon className="h-6 w-6 text-blue-400 mr-3" />
              {licenseInfo.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {licenseInfo.description}
            </p>
          </div>

          {/* Contributing Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <HandHelpingIcon className="h-6 w-6 text-blue-400 mr-3" />
              Contributing
            </h3>
            <p className="text-gray-300 mb-4">Pull requests are welcome! Please follow:</p>
            <ul className="space-y-2">
              {contributingRules.map((rule, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-400 mr-2 mt-1">→</span>
                  <span className="text-gray-300">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Credits Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <StarIcon className="h-6 w-6 text-blue-400 mr-3" />
              Credits
            </h3>
            <ul className="space-y-3">
              {credits.map((credit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-400 mr-2 mt-1">→</span>
                  <div>
                    <strong className="text-white">{credit.label}:</strong>
                    <span className="text-gray-300 ml-2">{credit.tech}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            Built with ❤️ using React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
