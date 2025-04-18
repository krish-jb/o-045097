
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className }) => {
  return (
    <section id="about" className={cn('py-20 md:py-32 bg-gray-50', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn>
            <div>
              <span className="text-sm md:text-base font-medium text-orangery-500 mb-2 inline-block">About us</span>
              <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight mb-6">We got started 2025 with a single mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To bring a fresh take into Baltic venture ecosystem.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We are founder-driven and embrace diversity. Orangery brings an inclusive take to venture, inviting and inspiring first-time founders to try tech entrepreneurship.
              </p>
            </div>
          </FadeIn>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-20 md:mt-32">
          {[
            { number: "75+", label: "Portfolio companies" },
            { number: "24", label: "Countries" },
            { number: "90%", label: "Follow-on funding rate" },
            { number: "12", label: "Unicorns created" }
          ].map((stat, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className="text-center p-6 glass-panel rounded-xl">
                <h3 className="text-2xl md:text-4xl font-serif font-medium mb-2">{stat.number}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
