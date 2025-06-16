
import React from 'react';
import { useWedding } from '@/context/WeddingContext';
import EditableText from './EditableText';
import FadeIn from '@/components/animations/FadeIn';

const MoreInfo: React.FC = () => {
  const { weddingData, updateWeddingData } = useWedding();

  const updateMoreInfoTitle = (newTitle: string) => {
    updateWeddingData({
      moreInfo: { ...weddingData.moreInfo, title: newTitle }
    });
  };

  const updateMoreInfoContent = (newContent: string) => {
    updateWeddingData({
      moreInfo: { ...weddingData.moreInfo, content: newContent }
    });
  };

  return (
    <section id="more-info" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <EditableText
              value={weddingData.moreInfo.title}
              onSave={updateMoreInfoTitle}
              label="Edit More Info Title"
              className="block text-3xl md:text-5xl font-serif font-medium tracking-tight mb-8"
            />
          </FadeIn>
          
          <FadeIn delay={150}>
            <EditableText
              value={weddingData.moreInfo.content}
              onSave={updateMoreInfoContent}
              label="Edit More Info Content"
              multiline
              className="text-lg text-muted-foreground leading-relaxed"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default MoreInfo;
