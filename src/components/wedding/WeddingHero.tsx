import React from "react";
import { useWedding } from "@/context/useWedding";
import EditableText from "./EditableText";
import FadeIn from "@/components/animations/FadeIn";

const WeddingHero: React.FC = () => {
    const { weddingData, updateWeddingData } = useWedding();

    const updateGroomName = (newName: string) => {
        updateWeddingData({
            couple: { ...weddingData.couple, groomName: newName },
        });
    };

    const updateBrideName = (newName: string) => {
        updateWeddingData({
            couple: { ...weddingData.couple, brideName: newName },
        });
    };

    const updateWeddingQuote = (newQuote: string) => {
        updateWeddingData({
            couple: { ...weddingData.couple, weddingQuote: newQuote },
        });
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <img
                    src="/couple/our_story.jpg"
                    alt="Wedding Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10 max-w-4xl">
                <div className="max-w-3xl mx-auto text-center">
                    <FadeIn delay={200}>
                        <EditableText
                            value={weddingData.couple.weddingQuote}
                            onSave={updateWeddingQuote}
                            label="Edit Wedding Quote"
                            className="block text-2xl md:text-3xl lg:text-4xl font-serif font-medium tracking-tight text-white/90 leading-tight mb-8"
                        />
                    </FadeIn>

                    <FadeIn delay={300}>
                        <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white leading-tight mb-6">
                            <EditableText
                                value={weddingData.couple.groomName}
                                onSave={updateGroomName}
                                label="Edit Groom's Name"
                                className="inline-block mr-4"
                            />
                            <span className="text-white/80">&</span>
                            <EditableText
                                value={weddingData.couple.brideName}
                                onSave={updateBrideName}
                                label="Edit Bride's Name"
                                className="inline-block ml-4"
                            />
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default WeddingHero;
