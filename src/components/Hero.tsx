
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import Button from './ui-custom/Button';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={cn('relative min-h-screen flex items-center justify-center overflow-hidden', className)}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
        <div className="absolute top-1/3 left-0 right-0 h-2/3 bg-[radial-gradient(ellipse_at_center,_rgba(253,228,181,0.15),_transparent_70%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="overflow-hidden mb-2">
            <FadeIn delay={100}>
              <span className="inline-block text-sm md:text-base font-medium text-orangery-500 mb-3">Empowering innovative ventures</span>
            </FadeIn>
          </div>
          
          <div className="mb-6 overflow-hidden">
            <FadeIn delay={200}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight max-w-3xl mx-auto leading-tight md:leading-tight">
                We invest in future-defining technology
              </h1>
            </FadeIn>
          </div>
          
          <div className="overflow-hidden mb-8">
            <FadeIn delay={300}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Orangery Ventures partners with exceptional founders to build the next generation of technology companies transforming how we live.
              </p>
            </FadeIn>
          </div>
          
          <FadeIn delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg">
                Our Portfolio
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <FadeIn delay={600}>
          <div className="animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center">
              <div className="w-1 h-2 bg-foreground/50 rounded-full mt-2 animate-fade-in-down"></div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;
