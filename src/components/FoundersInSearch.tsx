
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import { Card, CardContent } from '@/components/ui/card';

interface FoundersInSearchProps {
  className?: string;
}

const FoundersInSearch: React.FC<FoundersInSearchProps> = ({ className }) => {
  const founderTypes = [
    {
      title: "First-Time Founders with Significant Non-Tech Experience",
      description: "Corporate leaders, operators, and business owners making the leap into startups, bringing unique domain expertise and execution ability."
    },
    {
      title: "Illegible Founders",
      description: "Those who reject easy categorization, whether due to unconventional backgrounds, markets, or business models. We specialize in funding what others overlook."
    },
    {
      title: "Female Executives, Researchers, and Business Owners",
      description: "Backing women leaders who bring deep expertise and a fresh perspective to building transformative companies."
    },
    {
      title: "Outlier Thinkers & Builders",
      description: "Founders who don't fit traditional VC patterns but have undeniable potential to create market-defining businesses."
    }
  ];

  return (
    <section id="founders" className={cn('py-20 bg-white', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-8 text-center">Founders in Search</h2>
          </FadeIn>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {founderTypes.map((type, index) => (
            <FadeIn key={index} delay={150 + index * 50}>
              <Card className="border-0 shadow-sm h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-3 font-serif">{type.title}</h3>
                  <p className="text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersInSearch;
