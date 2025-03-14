
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface ManifestoProps {
  className?: string;
}

const Manifesto: React.FC<ManifestoProps> = ({ className }) => {
  const manifestoItems = [
    {
      number: "01",
      title: "Technology as transformation",
      description: "We believe that technology is not just an incremental improvement but a transformative force that reshapes industries and societies."
    },
    {
      number: "02",
      title: "Founder-first approach",
      description: "Exceptional founders are at the heart of every venture we support. We invest in people first, understanding their vision and helping them realize their potential."
    },
    {
      number: "03",
      title: "Long-term perspective",
      description: "True innovation requires patience. We take a long-term view, supporting companies through their entire journey, not just their initial growth stages."
    },
    {
      number: "04",
      title: "Ethical innovation",
      description: "We champion technologies that make the world better, not just different. We believe that ethical considerations should be built into innovation from the start."
    },
    {
      number: "05",
      title: "Global mindset",
      description: "Great ideas come from everywhere. We invest globally, finding the best founders wherever they may be, and helping them scale across markets."
    }
  ];

  return (
    <section id="manifesto" className={cn('py-20 md:py-32 bg-white', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <span className="text-sm md:text-base font-medium text-orangery-500 mb-2 inline-block">Our beliefs</span>
            <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight mb-10 md:mb-20">Manifesto</h2>
          </div>
        </FadeIn>
        
        <div className="grid gap-10 md:gap-16">
          {manifestoItems.map((item, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className="border-t border-gray-200 pt-10 grid md:grid-cols-12 gap-6 md:gap-10">
                <div className="md:col-span-2">
                  <span className="text-orangery-500 text-lg md:text-xl font-medium">{item.number}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-xl md:text-2xl font-serif mb-2 md:mb-0">{item.title}</h3>
                </div>
                <div className="md:col-span-6">
                  <p className="text-muted-foreground text-lg">{item.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
