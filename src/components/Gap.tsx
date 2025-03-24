
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import { Card, CardContent } from '@/components/ui/card';

interface GapProps {
  className?: string;
}

const Gap: React.FC<GapProps> = ({ className }) => {
  const statistics = [
    {
      title: "Stagnant Growth",
      description: "Number of early stage rounds is not growing in the Baltics since 2021"
    },
    {
      title: "Limited Ecosystem",
      description: "Total number of startups in Lithuania is stagnant for more than 5 years ~ 1000"
    },
    {
      title: "Funding Inequality",
      description: "90% of VC funding still goes to repeat founders and traditional tech backgrounds"
    }
  ];

  return (
    <section id="gap" className={cn('py-20 bg-gray-50', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-8 text-center">The Gap</h2>
          </FadeIn>
          
          <FadeIn delay={100}>
            <p className="text-xl text-center mb-8">
              Narrow founder pipeline - missed opportunities, slow growth
            </p>
          </FadeIn>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {statistics.map((stat, index) => (
            <FadeIn key={index} delay={150 + index * 50}>
              <Card className="border-0 shadow-sm h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-3 font-serif">{stat.title}</h3>
                  <p className="text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gap;
