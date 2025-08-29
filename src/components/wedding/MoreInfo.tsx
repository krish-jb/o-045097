import type React from "react";
import { useId } from "react";
import FadeIn from "@/components/animations/FadeIn";
import  useWedding from "@/hooks/useWedding";
import EditableText from "./EditableText";

const MoreInfo: React.FC = () => {
    const { weddingData, updateWeddingData } = useWedding();
    if(weddingData.moreInfo.disabled){
        return;
    }
    const moreInfoId = useId();
    const updateMoreInfoTitle = (newTitle: string) => {
        updateWeddingData({
            moreInfo: { ...weddingData.moreInfo, title: newTitle },
        });
    };

    const updateMoreInfoContent = (newContent: string) => {
        updateWeddingData({
            moreInfo: { ...weddingData.moreInfo, content: newContent },
        });
    };

    return (
        <section id={moreInfoId} className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <FadeIn>
                        <EditableText
                            value={weddingData.moreInfo.title}
                            onSave={updateMoreInfoTitle}
                            label="Edit More Info Title"
                            className="text-3xl md:text-5xl font-serif font-medium tracking-tight mb-4"
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
