import React, { useEffect, useState } from 'react';
import { FileTextIcon } from 'lucide-react';

const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Text to JSON Prompt Converter';

  useEffect(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    const timer = setTimeout(typeWriter, 500);
    return () => clearTimeout(timer);
  }, []);

  const badges = [
    'React + Tailwind',
    'FastAPI + Pydantic AI',
    'Mistral AI'
  ];

  return (
    <section className="gradient-bg pt-20 pb-16 md:pt-24 md:pb-20 text-white relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center container-padding">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <FileTextIcon className="inline-block mr-4 mb-2 h-12 w-12 md:h-16 md:w-16 text-yellow-400" />
            <span className="text-shadow-lg">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
            A complete Full-Stack AI-powered application that converts plain text into 
            context-aware, structured JSON prompts for better AI model comprehension.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {badges.map((badge, index) => (
              <span
                key={badge}
                className="btn-secondary animate-bounce-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {badge}
              </span>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                const element = document.querySelector('#installation');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-primary"
            >
              Get Started
            </button>
            <button 
              onClick={() => {
                const element = document.querySelector('#api');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-secondary"
            >
              View API Docs
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Hero;
