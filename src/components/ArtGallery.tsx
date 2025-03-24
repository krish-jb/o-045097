
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface ArtGalleryProps {
  className?: string;
}

const ArtGallery: React.FC<ArtGalleryProps> = ({ className }) => {
  return (
    <section className={cn('py-20 md:py-32 bg-white', className)} id="inspiration">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight mb-6">Our Inspiration</h2>
            <p className="text-lg text-muted-foreground">
              Like the delicate blooms in an orangery that flourish with careful cultivation, 
              we nurture startups with both artistry and purpose. These classical paintings 
              represent our philosophy: beauty emerging from thoughtful cultivation.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          <FadeIn delay={200}>
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-w-3 aspect-h-4 relative">
                <img 
                  src="/lovable-uploads/51f42b91-88a0-499c-a53f-6f289a1ec5a7.png" 
                  alt="Chrysanthemums in a Garden" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-serif font-medium mb-2">The Diversity of Growth</h3>
                <p className="text-muted-foreground">
                  Like the diverse blooms in this garden, we embrace varied founders and ideas, 
                  each contributing unique beauty to the collective vision.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-w-3 aspect-h-4 relative">
                <img 
                  src="/lovable-uploads/6c04fc31-dfd3-4987-a95e-32368f458397.png" 
                  alt="Potted Flowers and Plants" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-serif font-medium mb-2">Cultivated Potential</h3>
                <p className="text-muted-foreground">
                  Each startup is like a carefully tended plant in our orangery, given the specific 
                  conditions and nurturing needed to reach its full potential.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ArtGallery;
